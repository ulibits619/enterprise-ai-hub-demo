// ===== Application Logic =====

// ---- State ----
let currentPage = 'home';
let isDarkTheme = true;

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    // Check if already logged in (demo)
    if (sessionStorage.getItem('loggedIn')) {
        showApp();
    }
});

// ---- Login ----
function handleLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> 登录中...';
    btn.disabled = true;
    
    setTimeout(() => {
        sessionStorage.setItem('loggedIn', 'true');
        showApp();
        showToast('success', '登录成功，欢迎回来！');
    }, 800);
    return false;
}

function handleLogout() {
    sessionStorage.removeItem('loggedIn');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<i class="ri-login-box-line"></i> 登 录';
    btn.disabled = false;
    showToast('info', '已安全退出');
}

function showApp() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    initApp();
}

function initApp() {
    renderAppsGrid('all');
    renderStoreGrid('all');
    renderToolsGrid('all');
    renderWorkspace('recent');
    renderUsersTable();
    renderRolesGrid();
    renderAuditTable();
    renderToolAuditTable();
    renderTopAssetsTable();
    // Init charts after a slight delay
    setTimeout(() => {
        initCharts();
    }, 300);
}

// ---- Particles ----
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        const colors = ['rgba(79,110,247,0.4)', 'rgba(168,85,247,0.3)', 'rgba(6,182,212,0.3)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}

// ---- Navigation ----
function navigate(page) {
    currentPage = page;
    // Update nav active
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    // Update pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    
    // Update breadcrumb
    const names = {
        home: 'AI 对话', apps: '应用中心', store: '资产商店',
        tools: '部门工具', workspace: '个人工作台', dashboard: '数据看板', admin: '管理后台'
    };
    document.getElementById('breadcrumb').innerHTML = '<span>' + (names[page] || page) + '</span>';
    
    // Re-init charts if needed
    if (page === 'dashboard') {
        setTimeout(() => initCharts(), 200);
        animateCounters();
    }
    
    // Scroll to top
    document.getElementById('page-container').scrollTop = 0;
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
    const icon = document.getElementById('theme-icon');
    icon.className = isDarkTheme ? 'ri-moon-line' : 'ri-sun-line';
    // Re-init charts for theme
    if (currentPage === 'dashboard') {
        setTimeout(() => initCharts(), 200);
    }
}

// ---- Render Functions ----

function renderAppCard(app) {
    return `
        <div class="app-card" onclick="showToast('info', '打开应用: ${app.name}')">
            <div class="app-card-header">
                <div class="app-icon" style="background: ${app.gradient}">
                    <i class="${app.icon}"></i>
                </div>
                <div>
                    <div class="app-card-title">${app.name}</div>
                    <div class="app-card-type">${app.typeName}</div>
                </div>
            </div>
            <div class="app-card-desc">${app.desc}</div>
            <div class="app-card-footer">
                <div class="app-card-stat"><i class="ri-bar-chart-line"></i> ${formatNumber(app.usage)} 次调用</div>
                <div class="app-card-stat"><i class="ri-user-line"></i> ${app.users}</div>
            </div>
        </div>
    `;
}

function renderAssetCard(asset) {
    const badgeClass = 'badge-' + asset.type;
    const stars = '★'.repeat(Math.floor(asset.rating)) + (asset.rating % 1 >= 0.5 ? '½' : '');
    return `
        <div class="asset-card" onclick="showToast('info', '查看资产: ${asset.name}')">
            <div class="asset-card-header">
                <span class="asset-type-badge ${badgeClass}">${asset.typeName}</span>
                <button class="asset-fav-btn ${asset.favorited ? 'active' : ''}" onclick="event.stopPropagation(); toggleFav(this)">
                    <i class="${asset.favorited ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
                </button>
            </div>
            <div class="asset-card-title">${asset.name}</div>
            <div class="asset-card-desc">${asset.desc}</div>
            <div class="asset-tags">
                ${asset.tags.map(t => `<span class="asset-tag">${t}</span>`).join('')}
            </div>
            <div class="asset-card-footer">
                <div class="asset-rating">
                    <i class="ri-star-fill"></i>
                    <span>${asset.rating}</span>
                </div>
                <div class="asset-author">
                    <div class="avatar-xs" style="background: ${asset.authorColor}">${asset.author[0]}</div>
                    ${asset.author}
                </div>
                <div class="asset-downloads">
                    <i class="ri-download-line"></i> ${formatNumber(asset.downloads)}
                </div>
            </div>
        </div>
    `;
}

// (Home apps/assets moved; chat is now on home page)

function renderAppsGrid(filter) {
    const container = document.getElementById('apps-grid');
    const filtered = filter === 'all' ? APPS_DATA : APPS_DATA.filter(a => a.type === filter);
    container.innerHTML = filtered.map(renderAppCard).join('');
}

function renderStoreGrid(filter) {
    const container = document.getElementById('store-grid');
    const filtered = filter === 'all' ? ASSETS_DATA : ASSETS_DATA.filter(a => a.type === filter);
    container.innerHTML = filtered.map(renderAssetCard).join('');
}

function filterApps(type, btn) {
    document.querySelectorAll('#page-apps .filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAppsGrid(type);
}

function filterAssets(type, btn) {
    document.querySelectorAll('#page-store .filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderStoreGrid(type);
}

// Workspace
function switchWorkspaceTab(tab, btn) {
    document.querySelectorAll('.ws-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderWorkspace(tab);
}

function renderWorkspace(tab) {
    const container = document.getElementById('workspace-content');
    if (tab === 'recent') {
        container.innerHTML = '<div class="app-grid full">' + APPS_DATA.slice(0, 6).map(renderAppCard).join('') + '</div>';
    } else if (tab === 'favorites') {
        const favs = ASSETS_DATA.filter(a => a.favorited);
        container.innerHTML = '<div class="asset-grid full">' + favs.map(renderAssetCard).join('') + '</div>';
    } else {
        const mine = ASSETS_DATA.slice(0, 3);
        container.innerHTML = '<div class="asset-grid full">' + mine.map(renderAssetCard).join('') + '</div>';
    }
}

// Admin - Users
function renderUsersTable() {
    const body = document.getElementById('users-table-body');
    body.innerHTML = USERS_DATA.map(u => {
        const statusClass = u.status === 'active' ? 'status-active' :
                           u.status === 'inactive' ? 'status-inactive' : 'status-pending';
        const statusText = u.status === 'active' ? '启用' :
                          u.status === 'inactive' ? '禁用' : '待审核';
        return `
            <tr>
                <td>
                    <div style="display:flex;align-items:center;gap:10px">
                        <div class="avatar-sm" style="background:${u.color}">${u.name[0]}</div>
                        <span style="font-weight:600">${u.name}</span>
                    </div>
                </td>
                <td>${u.email}</td>
                <td>${u.dept}</td>
                <td>${u.role}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${u.lastLogin}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn" title="编辑"><i class="ri-edit-line"></i></button>
                        <button class="action-btn" title="权限"><i class="ri-shield-user-line"></i></button>
                        <button class="action-btn" title="更多"><i class="ri-more-line"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Admin - Roles
function renderRolesGrid() {
    const container = document.getElementById('roles-grid');
    container.innerHTML = ROLES_DATA.map(r => `
        <div class="role-card">
            <div class="role-card-header">
                <span class="role-name">${r.name}</span>
                ${r.isSystem ? '<span class="role-system">系统预置</span>' : '<span class="role-system" style="background:rgba(249,115,22,0.12);color:#f97316">自定义</span>'}
            </div>
            <div class="role-desc">${r.desc}</div>
            <div class="role-permissions">
                ${r.permissions.map(p => `<span class="role-perm-tag">${p}</span>`).join('')}
            </div>
            <div class="role-user-count">
                <i class="ri-group-line"></i> ${r.userCount} 位用户
            </div>
        </div>
    `).join('');
}

// Admin - Audit
function renderAuditTable() {
    const body = document.getElementById('audit-table-body');
    body.innerHTML = AUDIT_DATA.map(a => `
        <tr>
            <td style="white-space:nowrap">${a.time}</td>
            <td style="font-weight:600">${a.user}</td>
            <td>${a.action}</td>
            <td>${a.resource}</td>
            <td style="color:var(--text-secondary)">${a.detail}</td>
            <td style="color:var(--text-muted);font-family:monospace;font-size:12px">${a.ip}</td>
        </tr>
    `).join('');
}

// Admin tab switch
function switchAdminTab(tab, btn) {
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + tab).classList.add('active');
}

// Top Assets Table
function renderTopAssetsTable() {
    const body = document.getElementById('top-assets-body');
    if (!body) return;
    body.innerHTML = TOP_ASSETS.map(a => `
        <tr>
            <td><strong style="color:var(--accent)">#${a.rank}</strong></td>
            <td style="font-weight:600">${a.name}</td>
            <td><span class="asset-type-badge badge-${a.type === '提示词' ? 'prompt' : a.type === 'SKILL' ? 'skill' : a.type === '智能体' ? 'agent' : 'workflow'}">${a.type}</span></td>
            <td>${formatNumber(a.usage)}</td>
            <td><i class="ri-star-fill" style="color:#fbbf24"></i> ${a.rating}</td>
            <td><i class="ri-arrow-${a.trend === 'up' ? 'up' : 'down'}-line" style="color:${a.trend === 'up' ? '#22c55e' : '#ef4444'}"></i></td>
        </tr>
    `).join('');
}

// ---- Charts (ECharts) ----
let trendChart, distChart, tokenChart;

function initCharts() {
    const textColor = isDarkTheme ? '#8b8fa8' : '#5c6078';
    const lineColor = isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    
    // Trend Chart
    const trendDom = document.getElementById('chart-trend');
    if (trendDom && trendDom.offsetHeight > 0) {
        if (trendChart) trendChart.dispose();
        trendChart = echarts.init(trendDom);
        trendChart.setOption({
            tooltip: { trigger: 'axis', backgroundColor: isDarkTheme ? '#1e2235' : '#fff', borderColor: lineColor, textStyle: { color: isDarkTheme ? '#f0f2f5' : '#1a1d2e' } },
            legend: { data: ['调用次数', '活跃用户'], textStyle: { color: textColor }, top: 0 },
            grid: { left: 50, right: 20, top: 40, bottom: 30 },
            xAxis: { type: 'category', data: ['3/5', '3/6', '3/7', '3/8', '3/9', '3/10', '3/11'], axisLine: { lineStyle: { color: lineColor } }, axisLabel: { color: textColor } },
            yAxis: [
                { type: 'value', name: '调用次数', axisLine: { show: false }, splitLine: { lineStyle: { color: lineColor } }, axisLabel: { color: textColor }, nameTextStyle: { color: textColor } },
                { type: 'value', name: '用户数', axisLine: { show: false }, splitLine: { show: false }, axisLabel: { color: textColor }, nameTextStyle: { color: textColor } },
            ],
            series: [
                {
                    name: '调用次数', type: 'bar', barWidth: 24, yAxisIndex: 0,
                    data: [6200, 7100, 6800, 7500, 8200, 7900, 8432],
                    itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4f6ef7' }, { offset: 1, color: 'rgba(79,110,247,0.2)' }
                    ]), borderRadius: [4, 4, 0, 0] }
                },
                {
                    name: '活跃用户', type: 'line', smooth: true, yAxisIndex: 1,
                    data: [410, 445, 420, 480, 510, 490, 523],
                    lineStyle: { color: '#a855f7', width: 3 },
                    itemStyle: { color: '#a855f7' },
                    areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(168,85,247,0.2)' }, { offset: 1, color: 'rgba(168,85,247,0)' }
                    ]) }
                }
            ]
        });
    }
    
    // Distribution Chart
    const distDom = document.getElementById('chart-distribution');
    if (distDom && distDom.offsetHeight > 0) {
        if (distChart) distChart.dispose();
        distChart = echarts.init(distDom);
        distChart.setOption({
            tooltip: { trigger: 'item', backgroundColor: isDarkTheme ? '#1e2235' : '#fff', borderColor: lineColor, textStyle: { color: isDarkTheme ? '#f0f2f5' : '#1a1d2e' } },
            series: [{
                type: 'pie', radius: ['45%', '72%'], center: ['50%', '52%'],
                label: { color: textColor, fontSize: 12 },
                data: [
                    { value: 35, name: '智能对话', itemStyle: { color: '#4f6ef7' } },
                    { value: 25, name: '智能体', itemStyle: { color: '#22c55e' } },
                    { value: 22, name: 'AI工具', itemStyle: { color: '#a855f7' } },
                    { value: 18, name: '工作流', itemStyle: { color: '#f97316' } }
                ],
                emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.3)' } }
            }]
        });
    }
    
    // Token Chart
    const tokenDom = document.getElementById('chart-tokens');
    if (tokenDom && tokenDom.offsetHeight > 0) {
        if (tokenChart) tokenChart.dispose();
        tokenChart = echarts.init(tokenDom);
        tokenChart.setOption({
            tooltip: { trigger: 'axis', backgroundColor: isDarkTheme ? '#1e2235' : '#fff', borderColor: lineColor, textStyle: { color: isDarkTheme ? '#f0f2f5' : '#1a1d2e' } },
            grid: { left: 80, right: 20, top: 20, bottom: 30 },
            xAxis: { type: 'value', axisLine: { lineStyle: { color: lineColor } }, splitLine: { lineStyle: { color: lineColor } }, axisLabel: { color: textColor } },
            yAxis: { type: 'category', data: ['人事部', '运营部', '客服部', '市场部', '产品部', '数据部', '研发部'], axisLine: { lineStyle: { color: lineColor } }, axisLabel: { color: textColor } },
            series: [{
                type: 'bar', barWidth: 18,
                data: [
                    { value: 2400, itemStyle: { color: '#84cc16' } },
                    { value: 3200, itemStyle: { color: '#14b8a6' } },
                    { value: 4100, itemStyle: { color: '#06b6d4' } },
                    { value: 4800, itemStyle: { color: '#f97316' } },
                    { value: 5200, itemStyle: { color: '#ec4899' } },
                    { value: 5800, itemStyle: { color: '#a855f7' } },
                    { value: 7200, itemStyle: { color: '#4f6ef7' } },
                ],
                itemStyle: { borderRadius: [0, 4, 4, 0] },
                label: { show: true, position: 'right', color: textColor, fontSize: 12, formatter: params => '¥' + formatNumber(params.value) }
            }]
        });
    }
    
    // Resize handler
    window.addEventListener('resize', () => {
        trendChart && trendChart.resize();
        distChart && distChart.resize();
        tokenChart && tokenChart.resize();
    });
}

function switchTrend(period, btn) {
    document.querySelectorAll('.chart-actions .chart-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // In a real app, would fetch different data; here just visual feedback
    showToast('info', '切换至' + (period === 'week' ? '近7天' : '近30天') + '视图');
}

// ---- Modal ----
function showPublishModal() {
    document.getElementById('publish-modal').classList.remove('hidden');
}

function closePublishModal() {
    document.getElementById('publish-modal').classList.add('hidden');
}

function submitPublish() {
    closePublishModal();
    showToast('success', '资产已提交审核，请等待管理员审批');
}

// ---- Favorites Toggle ----
function toggleFav(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('active')) {
        icon.className = 'ri-heart-fill';
        showToast('success', '已添加到收藏');
    } else {
        icon.className = 'ri-heart-line';
        showToast('info', '已取消收藏');
    }
}

// ---- Counter Animation ----
function animateCounters() {
    document.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        const increment = target / 60;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = formatNumber(Math.floor(current));
        }, 25);
    });
}

// ---- Toast ----
function showToast(type, message) {
    const container = document.getElementById('toast-container');
    const icons = { success: 'ri-check-line', error: 'ri-close-line', info: 'ri-information-line' };
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = `<i class="${icons[type]}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ---- Utility ----
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 10000) return (num / 10000).toFixed(1) + 'W';
    return num.toLocaleString('en-US');
}

// =========================================================
//  CHAT FUNCTIONS
// =========================================================

let totalTokens = 0;
let isAITyping = false;

// Simulated AI response data keyed by topic keywords
const AI_RESPONSES = [
    {
        keywords: ['python', '爬虫', '脚本'],
        response: `好的，我来帮你写一个简单的 Python 爬虫脚本。以下是一个使用 <code>requests</code> 和 <code>BeautifulSoup</code> 的示例：

<pre>import requests
from bs4 import BeautifulSoup

def crawl(url):
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    titles = soup.find_all('h2')
    for title in titles:
        print(title.get_text())

crawl('https://example.com')</pre>

这个脚本会抓取目标页面所有的 <code>h2</code> 标签内容。你可以根据需要修改选择器和目标 URL。`,
        tokens: 386
    },
    {
        keywords: ['周报', '报告', '生成'],
        response: `好的，我来帮你生成一份项目周报模板：

**📊 项目周报 - 2026年第11周**

**一、本周工作完成情况**
• 完成用户权限系统 RBAC 模块开发，进度 100%
• 完成 API 接口文档更新，覆盖 35 个接口
• 修复了 5 个 P1 级 Bug，3 个 P2 级 Bug

**二、下周计划**
• 启动数据看板前端开发
• 完成单元测试覆盖率提升至 80%
• 通过安全审计检查

**三、风险与阻塞**
• ⚠️ 第三方服务 API 变更，需要适配

你可以根据实际情况替换内容，我也可以帮你调整格式和追加内容。`,
        tokens: 428
    },
    {
        keywords: ['翻译', '英文', 'translate'],
        response: `没问题！请把需要翻译的内容发给我，我会帮你转换成英文。

以下是一些翻译示例：

| 中文 | English |
|------|------|
| 企业AI应用门户 | Enterprise AI Application Portal |
| 统一AI入口 | Unified AI Entry Point |
| 资产复用率 | Asset Reuse Rate |
| 全链路数据看板 | Full-Link Data Dashboard |

我支持 50+ 语种互译，包括专业术语的精准翻译。请提供你需要翻译的内容。`,
        tokens: 312
    },
    {
        keywords: ['分析', '数据', '趋势', '销售'],
        response: `我可以帮你分析数据趋势！请提供数据或描述你的数据集。

基于常见的销售数据分析，我通常会从以下维度切入：

📈 **分析维度**
1. **时间趋势** — 同比/环比增长率
2. **商品分布** — 头部商品贡献度
3. **客户分层** — RFM 模型分析
4. **地域分布** — 各地区业绩对比
5. **异常检测** — 识别异常波动

请把数据发给我，或告诉我你想了解哪个方面的分析细节。`,
        tokens: 352
    }
];

const DEFAULT_AI_RESPONSE = {
    response: `收到你的消息了！我正在认真思考你的问题。

作为企业 AI 智能助手，我可以帮助你：
• 📝 撰写和编辑文档  
• 💻 生成和审查代码  
• 📊 分析和可视化数据  
• 🌍 多语言翻译  
• 💡 头脑风暴和创意生成

请详细描述你的需求，我会提供更精准的帮助。`,
    tokens: 280
};

// Get current time string
function getTimeStr() {
    const d = new Date();
    return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
}

// Send a user message
function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || isAITyping) return;

    // Hide welcome
    const welcome = document.getElementById('chat-welcome');
    if (welcome) welcome.style.display = 'none';

    // Append user message
    appendMessage('user', text);
    input.value = '';
    autoResizeInput(input);

    // Simulate AI response
    isAITyping = true;
    showTypingIndicator();

    // Find matching response
    const lowerText = text.toLowerCase();
    let resp = AI_RESPONSES.find(r => r.keywords.some(k => lowerText.includes(k)));
    if (!resp) resp = DEFAULT_AI_RESPONSE;

    // Simulate delay
    const delay = 1200 + Math.random() * 1500;
    setTimeout(() => {
        removeTypingIndicator();
        appendMessage('ai', resp.response, resp.tokens);
        totalTokens += resp.tokens;
        document.getElementById('token-count').textContent = formatNumber(totalTokens);
        isAITyping = false;
    }, delay);
}

// Append a message bubble
function appendMessage(type, content, tokens) {
    const container = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + type;

    const avatarLetter = type === 'user' ? 'A' : 'AI';
    const time = getTimeStr();

    let metaHtml = `<span>${time}</span>`;
    if (type === 'ai') {
        metaHtml += `<span>${tokens || 0} tokens</span>`;
        metaHtml += `
            <div class="chat-message-actions">
                <button class="chat-msg-action-btn" title="复制" onclick="copyMsg(this)"><i class="ri-file-copy-line"></i></button>
                <button class="chat-msg-action-btn" title="点赞" onclick="likeMsg(this)"><i class="ri-thumb-up-line"></i></button>
                <button class="chat-msg-action-btn" title="重新生成"><i class="ri-refresh-line"></i></button>
            </div>`;
    }

    msg.innerHTML = `
        <div class="chat-message-avatar">${avatarLetter}</div>
        <div>
            <div class="chat-message-content">${content}</div>
            <div class="chat-message-meta">${metaHtml}</div>
        </div>
    `;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

// Typing indicator
function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    const typing = document.createElement('div');
    typing.className = 'chat-message ai';
    typing.id = 'typing-msg';
    typing.innerHTML = `
        <div class="chat-message-avatar">AI</div>
        <div>
            <div class="chat-message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-msg');
    if (el) el.remove();
}

// Chat keyboard handling
function handleChatKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// Auto resize textarea
function autoResizeInput(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

// Use suggestion
function useSuggestion(btn) {
    const text = btn.querySelector('span').textContent;
    document.getElementById('chat-input').value = text;
    sendMessage();
}

// Toggle chat history sidebar
function toggleChatHistory() {
    document.getElementById('chat-sidebar').classList.toggle('open');
}

// Clear chat
function clearChat() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    const welcome = document.getElementById('chat-welcome');
    if (welcome) {
        welcome.style.display = '';
        container.appendChild(welcome);
    }
    totalTokens = 0;
    document.getElementById('token-count').textContent = '0';
    showToast('info', '已新建对话');
}

// Load history chat (renders actual conversation from CHAT_HISTORY_DATA)
function loadHistoryChat(idx) {
    // highlight active
    document.querySelectorAll('.chat-history-item').forEach((item, i) => {
        item.classList.toggle('active', i === idx);
    });
    if (idx === 0) {
        clearChat();
        return;
    }

    const history = CHAT_HISTORY_DATA[idx];
    if (!history || !history.messages.length) {
        showToast('info', '该对话暂无记录');
        return;
    }

    // Clear current chat and hide welcome
    const container = document.getElementById('chat-messages');
    const welcome = document.getElementById('chat-welcome');
    if (welcome) welcome.style.display = 'none';

    // Remove all messages except welcome
    const msgs = container.querySelectorAll('.chat-message');
    msgs.forEach(m => m.remove());

    // Render history messages
    history.messages.forEach(msg => {
        const el = document.createElement('div');
        el.className = 'chat-message ' + (msg.role === 'user' ? 'user' : 'ai');
        const avatarLetter = msg.role === 'user' ? 'A' : 'AI';

        // Format content: convert markdown code blocks to styled divs
        let formattedContent = msg.content
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
            .replace(/## (.+?)(<br>|$)/g, '<h3 style="margin:8px 0 4px;font-size:15px;">$1</h3>')
            .replace(/### (.+?)(<br>|$)/g, '<h4 style="margin:6px 0 4px;font-size:14px;">$1</h4>')
            .replace(/\| (.+)/g, (match) => {
                return '<div style="font-family:monospace;font-size:12px;line-height:1.8;">' + match + '</div>';
            });

        let metaHtml = `<span>${msg.time}</span>`;
        if (msg.role === 'ai') {
            metaHtml += `
                <div class="chat-message-actions">
                    <button class="chat-msg-action-btn" title="复制" onclick="copyMsg(this)"><i class="ri-file-copy-line"></i></button>
                    <button class="chat-msg-action-btn" title="点赞" onclick="likeMsg(this)"><i class="ri-thumb-up-line"></i></button>
                </div>`;
        }

        el.innerHTML = `
            <div class="chat-message-avatar">${avatarLetter}</div>
            <div>
                <div class="chat-message-content">${formattedContent}</div>
                <div class="chat-message-meta">${metaHtml}</div>
            </div>
        `;
        container.appendChild(el);
    });

    container.scrollTop = container.scrollHeight;
    showToast('info', '已加载对话: ' + history.title);
}

// Copy message
function copyMsg(btn) {
    const content = btn.closest('.chat-message').querySelector('.chat-message-content').textContent;
    navigator.clipboard.writeText(content).then(() => {
        showToast('success', '已复制到剪贴板');
    }).catch(() => {
        showToast('info', '复制成功');
    });
}

// Like message
function likeMsg(btn) {
    const icon = btn.querySelector('i');
    if (icon.className === 'ri-thumb-up-line') {
        icon.className = 'ri-thumb-up-fill';
        btn.style.color = 'var(--accent)';
        showToast('success', '感谢你的反馈！');
    } else {
        icon.className = 'ri-thumb-up-line';
        btn.style.color = '';
    }
}

// ===== Department Tools Functions =====

function renderToolsGrid(filter) {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;
    const filtered = filter === 'all' ? TOOLS_DATA : TOOLS_DATA.filter(t => t.type === filter);
    grid.innerHTML = filtered.map(tool => {
        const isPending = tool.status === 'pending';
        const visClass = tool.visibility === 'all' ? 'visibility' : tool.visibility === 'department' ? 'restricted' : 'private';
        const dlClass = tool.downloadPerm === 'all' ? 'download' : tool.downloadPerm === 'department' ? 'restricted' : 'private';
        const canDownload = tool.downloadPerm === 'all';
        return `
        <div class="tool-card ${isPending ? 'pending-card' : ''}">
            ${isPending ? '<div class="tool-card-pending-badge"><i class="ri-time-line"></i> 待审核</div>' : ''}
            <div class="tool-card-header">
                <div class="tool-card-icon" style="background:${tool.gradient}"><i class="${tool.icon}"></i></div>
                <div class="tool-card-title-group">
                    <div class="tool-card-title">${tool.name}</div>
                    <div class="tool-card-dept"><i class="ri-building-line"></i> ${tool.dept}</div>
                </div>
                <span class="tool-card-type-badge ${tool.type === 'shell' ? 'shell' : ''}">${tool.typeName}</span>
            </div>
            <div class="tool-card-desc">${tool.desc}</div>
            <div class="tool-card-tags">${tool.tags.map(t => '<span class="tag">' + t + '</span>').join('')}</div>
            <div class="tool-card-meta">
                <span><i class="ri-file-zip-line"></i> ${tool.fileSize}</span>
                <span><i class="ri-price-tag-3-line"></i> ${tool.version}</span>
                <span><i class="ri-download-line"></i> ${tool.downloads} 下载</span>
            </div>
            <div class="tool-card-env"><i class="ri-terminal-box-line"></i> ${tool.env}</div>
            <div class="tool-card-permissions">
                <span class="perm-badge ${visClass}"><i class="ri-eye-line"></i> ${tool.visibilityLabel}</span>
                <span class="perm-badge ${dlClass}"><i class="ri-download-line"></i> ${tool.downloadLabel}</span>
            </div>
            <div class="tool-card-footer">
                <div class="tool-card-author">
                    <div class="avatar-sm" style="background:${tool.authorColor}">${tool.author[0]}</div>
                    ${tool.author}
                </div>
                <div class="tool-card-actions">
                    ${isPending ? '<button class="btn-tool" disabled><i class="ri-time-line"></i> 审核中</button>' :
                      canDownload ? '<button class="btn-tool download-btn" onclick="downloadTool(\'' + tool.name + '\')"><i class="ri-download-line"></i> 下载</button>' :
                                    '<button class="btn-tool request-btn" onclick="requestToolAccess(\'' + tool.name + '\')"><i class="ri-lock-line"></i> 申请权限</button>'}
                    <button class="btn-tool" onclick="showToast('info', '查看详情: ${tool.name}')"><i class="ri-eye-line"></i></button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function filterTools(type, btn) {
    document.querySelectorAll('#page-tools .filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderToolsGrid(type);
}

function downloadTool(name) {
    showToast('success', '工具「' + name + '」开始下载（Demo模拟）');
}

function requestToolAccess(name) {
    showToast('info', '已提交「' + name + '」的访问权限申请，等待管理员审批');
}

// -- Tool Upload Modal --
function showToolUploadModal() {
    document.getElementById('tool-upload-modal').classList.remove('hidden');
}

function closeToolUploadModal() {
    document.getElementById('tool-upload-modal').classList.add('hidden');
}

function submitToolUpload() {
    closeToolUploadModal();
    showToast('success', '工具已提交审核，请等待管理员审核通过');
}

// -- Tool Permission Modal --
let currentPermToolName = '';

function showToolPermModal(name) {
    currentPermToolName = name;
    document.getElementById('perm-tool-name').textContent = name;
    document.getElementById('tool-perm-modal').classList.remove('hidden');
}

function closeToolPermModal() {
    document.getElementById('tool-perm-modal').classList.add('hidden');
}

function saveToolPerm() {
    const vis = document.getElementById('perm-visibility').value;
    const dl = document.getElementById('perm-download').value;
    // Validate: download scope must not exceed visibility scope
    const scopeOrder = { user: 0, department: 1, all: 2 };
    if (dl !== 'none' && scopeOrder[dl] > scopeOrder[vis]) {
        showToast('error', '下载范围不能超出可见范围');
        return;
    }
    closeToolPermModal();
    showToast('success', '「' + currentPermToolName + '」权限配置已保存');
}

// -- Tool Audit Table in Admin --
function renderToolAuditTable() {
    const tbody = document.getElementById('tool-audit-body');
    if (!tbody) return;
    tbody.innerHTML = TOOLS_DATA.map(tool => {
        const statusMap = {
            published: '<span class="status-badge published">已上架</span>',
            pending: '<span class="status-badge pending">待审核</span>',
            rejected: '<span class="status-badge rejected">已驳回</span>'
        };
        return `<tr>
            <td><strong>${tool.name}</strong></td>
            <td>${tool.typeName}</td>
            <td>${tool.dept}</td>
            <td>${tool.author}</td>
            <td class="perm-cell"><i class="ri-eye-line"></i> ${tool.visibilityLabel}</td>
            <td class="perm-cell"><i class="ri-download-line"></i> ${tool.downloadLabel}</td>
            <td>${statusMap[tool.status] || tool.status}</td>
            <td>
                <div class="tool-audit-actions">
                    ${tool.status === 'pending' ?
                        '<button class="btn-xs approve" onclick="approveToolAudit(\'' + tool.name + '\')"><i class="ri-check-line"></i> 通过</button>' +
                        '<button class="btn-xs" onclick="showToast(\'info\', \'驳回: ' + tool.name + '\')"><i class="ri-close-line"></i> 驳回</button>'
                    : ''}
                    <button class="btn-xs perm" onclick="showToolPermModal('${tool.name}')"><i class="ri-shield-keyhole-line"></i> 权限</button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

function approveToolAudit(name) {
    showToast('success', '「' + name + '」审核通过，请配置可见与下载权限');
    showToolPermModal(name);
}

