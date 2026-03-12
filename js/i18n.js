// ===== Internationalization (i18n) =====

const I18N = {
    zh: {
        // Login
        'login.title': '企业AI应用门户',
        'login.subtitle': 'Enterprise AI Hub',
        'login.feat1': 'AI智能对话 · 多模型支持',
        'login.feat2': '应用市场 · 一键部署',
        'login.feat3': '资产管理 · 知识沉淀',
        'login.feat4': '数据看板 · 决策分析',
        'login.username': '用户名 / 工号',
        'login.password': '密码',
        'login.remember': '记住登录状态',
        'login.forgot': '忘记密码？',
        'login.btn': '登 录',
        'login.or': '或',
        'login.sso': '企业SSO统一登录',

        // Sidebar Nav
        'nav.chat': 'AI 对话',
        'nav.apps': '应用中心',
        'nav.store': '资产商店',
        'nav.tools': '部门工具',
        'nav.workspace': '个人工作台',
        'nav.dashboard': '数据看板',
        'nav.admin': '管理后台',
        'nav.user.name': '管理员',
        'nav.user.role': '超级管理员',

        // Sidebar history
        'history.new': '新对话',

        // Header
        'header.search': '搜索应用、资产、提示词...',
        'header.logout': '退出',

        // Chat
        'chat.title': 'AI 智能助手',
        'chat.model': 'GPT-4o · 企业版',
        'chat.welcome': '你好，欢迎使用 AI 智能助手',
        'chat.welcome.desc': '我可以帮你编写代码、分析数据、生成文档、回答问题等',
        'chat.suggest1': '帮我写一个Python爬虫脚本',
        'chat.suggest2': '帮我生成一份项目周报',
        'chat.suggest3': '将以下内容翻译成英文',
        'chat.suggest4': '分析这份销售数据的趋势',
        'chat.input': '输入你的问题... (Enter发送, Shift+Enter换行)',
        'chat.disclaimer': 'AI 生成的内容仅供参考，请注意核实',
        'chat.history.title': '对话历史',

        // Apps
        'apps.title': '应用中心',
        'apps.desc': '探索和使用企业级AI应用，提升工作效率',
        'apps.all': '全部应用',

        // Store
        'store.title': '资产商店',
        'store.desc': '发现和复用高质量AI资产，加速业务创新',

        // Tools
        'tools.title': '部门工具',
        'tools.desc': '各部门自研AI工具集中管理与共享',
        'tools.upload': '上传工具',

        // Workspace
        'workspace.title': '个人工作台',
        'workspace.desc': '管理你的收藏、历史记录和个人资产',

        // Dashboard
        'dashboard.title': '数据看板',
        'dashboard.desc': '全链路数据统计与分析，辅助管理决策',
        'stat.calls': '今日调用',
        'stat.users': '活跃用户',
        'stat.tokens': 'Token消耗',
        'stat.reuse': '资产复用率',
        'stat.registered': '注册用户',
        'stat.monthly': '月调用量',
        'stat.cost': '月Token成本',
        'stat.satisfaction': '平均满意度',
        'chart.trend': '使用趋势',
        'chart.distribution': '应用调用分布',
        'chart.7days': '近7天',
        'chart.30days': '近30天',
        'chart.topAssets': 'Top 资产排行',

        // Admin
        'admin.title': '管理后台',
        'admin.desc': '用户管理、角色权限、工具审核、审计日志',
        'admin.users': '用户管理',
        'admin.roles': '角色管理',
        'admin.audit': '审计日志',
        'admin.toolAudit': '工具审核',
        'admin.addUser': '添加用户',
        'admin.searchUser': '搜索用户...',
        'admin.allDepts': '全部部门',

        // Lang
        'lang.toggle': '中/EN'
    },
    en: {
        // Login
        'login.title': 'Enterprise AI Hub',
        'login.subtitle': 'Enterprise AI Hub',
        'login.feat1': 'AI Chat · Multi-model Support',
        'login.feat2': 'App Marketplace · One-click Deploy',
        'login.feat3': 'Asset Management · Knowledge Base',
        'login.feat4': 'Data Dashboard · Decision Analytics',
        'login.username': 'Username / Employee ID',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot password?',
        'login.btn': 'Sign In',
        'login.or': 'or',
        'login.sso': 'Enterprise SSO Login',

        // Sidebar Nav
        'nav.chat': 'AI Chat',
        'nav.apps': 'App Center',
        'nav.store': 'Asset Store',
        'nav.tools': 'Dept. Tools',
        'nav.workspace': 'Workspace',
        'nav.dashboard': 'Dashboard',
        'nav.admin': 'Admin',
        'nav.user.name': 'Admin',
        'nav.user.role': 'Super Admin',

        // Sidebar history
        'history.new': 'New Chat',

        // Header
        'header.search': 'Search apps, assets, prompts...',
        'header.logout': 'Logout',

        // Chat
        'chat.title': 'AI Assistant',
        'chat.model': 'GPT-4o · Enterprise',
        'chat.welcome': 'Hello, welcome to AI Assistant',
        'chat.welcome.desc': 'I can help you write code, analyze data, generate documents, answer questions, etc.',
        'chat.suggest1': 'Write me a Python web scraper',
        'chat.suggest2': 'Generate a weekly project report',
        'chat.suggest3': 'Translate the following to English',
        'chat.suggest4': 'Analyze sales data trends',
        'chat.input': 'Type your question... (Enter to send, Shift+Enter for newline)',
        'chat.disclaimer': 'AI-generated content is for reference only, please verify',
        'chat.history.title': 'Chat History',

        // Apps
        'apps.title': 'App Center',
        'apps.desc': 'Explore and use enterprise AI apps to boost productivity',
        'apps.all': 'All Apps',

        // Store
        'store.title': 'Asset Store',
        'store.desc': 'Discover and reuse high-quality AI assets to accelerate innovation',

        // Tools
        'tools.title': 'Dept. Tools',
        'tools.desc': 'Centralized management and sharing of department-built AI tools',
        'tools.upload': 'Upload Tool',

        // Workspace
        'workspace.title': 'Workspace',
        'workspace.desc': 'Manage your favorites, history, and personal assets',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.desc': 'Full-chain data analytics to support management decisions',
        'stat.calls': "Today's Calls",
        'stat.users': 'Active Users',
        'stat.tokens': 'Token Usage',
        'stat.reuse': 'Asset Reuse Rate',
        'stat.registered': 'Registered Users',
        'stat.monthly': 'Monthly Calls',
        'stat.cost': 'Monthly Token Cost',
        'stat.satisfaction': 'Avg. Satisfaction',
        'chart.trend': 'Usage Trends',
        'chart.distribution': 'App Usage Distribution',
        'chart.7days': 'Last 7 Days',
        'chart.30days': 'Last 30 Days',
        'chart.topAssets': 'Top Assets',

        // Admin
        'admin.title': 'Admin Panel',
        'admin.desc': 'User management, role permissions, tool audit, audit logs',
        'admin.users': 'Users',
        'admin.roles': 'Roles',
        'admin.audit': 'Audit Logs',
        'admin.toolAudit': 'Tool Audit',
        'admin.addUser': 'Add User',
        'admin.searchUser': 'Search users...',
        'admin.allDepts': 'All Departments',

        // Lang
        'lang.toggle': 'EN/中'
    }
};

let currentLang = 'zh';

function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLang();
    // Update breadcrumb
    const names = currentLang === 'zh'
        ? { home: 'AI 对话', apps: '应用中心', store: '资产商店', tools: '部门工具', workspace: '个人工作台', dashboard: '数据看板', admin: '管理后台' }
        : { home: 'AI Chat', apps: 'App Center', store: 'Asset Store', tools: 'Dept. Tools', workspace: 'Workspace', dashboard: 'Dashboard', admin: 'Admin' };
    document.getElementById('breadcrumb').innerHTML = '<span>' + (names[currentPage] || currentPage) + '</span>';
    showToast('info', currentLang === 'zh' ? '已切换为中文' : 'Switched to English');
}

function applyLang() {
    const t = I18N[currentLang];
    // Update all data-i18n text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    // Update all data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
    // Update lang toggle button text
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = t['lang.toggle'];
}
