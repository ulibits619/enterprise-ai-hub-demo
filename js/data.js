// ===== Mock Data =====

// Chat History Data
const CHAT_HISTORY_DATA = [
    {
        id: 0, title: '新对话', messages: []
    },
    {
        id: 1, title: 'Python数据处理脚本',
        messages: [
            { role: 'user', content: '帮我写一个Python脚本，读取CSV文件并统计每列的缺失值数量', time: '昨天 14:32' },
            { role: 'ai', content: '好的，以下是一个读取CSV文件并统计缺失值的Python脚本：\n\n```python\nimport pandas as pd\n\ndef analyze_missing(file_path):\n    df = pd.read_csv(file_path)\n    missing = df.isnull().sum()\n    total = len(df)\n    \n    print(f"数据集共 {total} 行")\n    print("\\n缺失值统计:")\n    for col in df.columns:\n        count = missing[col]\n        pct = (count / total) * 100\n        print(f"  {col}: {count} ({pct:.1f}%)")\n\nanalyze_missing("data.csv")\n```\n\n这个脚本会输出每列的缺失值数量和占比百分比。', time: '昨天 14:33' },
            { role: 'user', content: '能不能增加导出缺失值报告到Excel的功能？', time: '昨天 14:35' },
            { role: 'ai', content: '当然可以！下面是增强版，会将结果导出到Excel：\n\n```python\nimport pandas as pd\n\ndef analyze_and_export(input_file, output_file="missing_report.xlsx"):\n    df = pd.read_csv(input_file)\n    report = pd.DataFrame({\n        "列名": df.columns,\n        "缺失值数量": df.isnull().sum().values,\n        "缺失率(%)": (df.isnull().sum().values / len(df) * 100).round(2),\n        "数据类型": df.dtypes.values.astype(str)\n    })\n    report.to_excel(output_file, index=False)\n    print(f"报告已导出至: {output_file}")\n\nanalyze_and_export("data.csv")\n```\n\n执行后会在当前目录生成`missing_report.xlsx`文件。', time: '昨天 14:36' }
        ]
    },
    {
        id: 2, title: 'Q1营销方案讨论',
        messages: [
            { role: 'user', content: '我需要制定Q1的数字营销方案，主要面向B端企业客户，预算50万，请给出框架建议', time: '昨天 10:15' },
            { role: 'ai', content: '## Q1 B端数字营销方案框架\n\n**预算分配建议（50万）：**\n\n| 渠道 | 预算占比 | 金额 | 预期效果 |\n|------|---------|------|----------|\n| 内容营销 | 30% | 15万 | 白皮书、案例研究 |\n| 搜索广告(SEM) | 25% | 12.5万 | 精准获客 |\n| 行业活动/峰会 | 20% | 10万 | 品牌影响力 |\n| 社交媒体(LinkedIn) | 15% | 7.5万 | 思想领袖 |\n| 邮件营销 | 10% | 5万 | 存量客户激活 |\n\n**关键指标(KPI)：**\n- 营销合格线索(MQL): ≥200个\n- 内容下载量: ≥1000次\n- 官网访问增长: ≥30%\n\n需要我详细展开某个渠道的执行计划吗？', time: '昨天 10:17' },
            { role: 'user', content: '请详细展开内容营销的执行计划', time: '昨天 10:20' },
            { role: 'ai', content: '## 内容营销执行计划（15万预算）\n\n**月度内容排期：**\n\n**1月 - 建立认知**\n- 发布行业趋势白皮书（外包费用3万）\n- 每周2篇深度技术博客\n- 制作1个产品功能演示视频\n\n**2月 - 深度转化**\n- 3个客户成功案例（含数据佐证）\n- 举办1场线上研讨会（邀约行业KOL）\n- 产出ROI计算器互动工具\n\n**3月 - 收割转化** \n- 发布解决方案对比指南\n- 推出免费试用+内容引导流程\n- 季度营销效果复盘报告\n\n**内容分发矩阵：** 官网博客 → 微信公众号 → LinkedIn → 知乎专栏 → 邮件推送', time: '昨天 10:22' }
        ]
    },
    {
        id: 3, title: 'API接口文档生成',
        messages: [
            { role: 'user', content: '帮我为一个用户管理模块生成RESTful API接口文档，包括增删改查', time: '3月9日 15:40' },
            { role: 'ai', content: '## 用户管理模块 API 文档\n\n### 基础信息\n- **Base URL:** `/api/v1`\n- **认证方式:** Bearer Token\n- **Content-Type:** application/json\n\n---\n\n### 1. 获取用户列表\n`GET /users?page=1&size=20&keyword=`\n\n**Response 200:**\n```json\n{\n  "code": 0,\n  "data": {\n    "total": 100,\n    "list": [{"id": 1, "name": "张三", "email": "..."}]\n  }\n}\n```\n\n### 2. 创建用户\n`POST /users`\n\n**Request Body:**\n```json\n{\n  "name": "张三",\n  "email": "zhangsan@company.com",\n  "role": "developer",\n  "department": "研发部"\n}\n```\n\n### 3. 更新用户\n`PUT /users/:id`\n\n### 4. 删除用户\n`DELETE /users/:id`\n\n所有接口均需 Bearer Token 认证，返回统一的 `{code, message, data}` 格式。', time: '3月9日 15:42' }
        ]
    },
    {
        id: 4, title: '数据库优化建议',
        messages: [
            { role: 'user', content: '我们的PostgreSQL数据库查询越来越慢，有一个订单表约5000万行，主要慢查询是按时间范围+用户ID查订单，请给出优化建议', time: '3月9日 11:05' },
            { role: 'ai', content: '## PostgreSQL 大表查询优化建议\n\n### 1. 索引优化（立即见效）\n```sql\n-- 复合索引：覆盖最常用查询模式\nCREATE INDEX CONCURRENTLY idx_orders_user_time \n  ON orders(user_id, created_at DESC);\n\n-- 部分索引：仅索引近期数据\nCREATE INDEX idx_orders_recent \n  ON orders(user_id, created_at) \n  WHERE created_at > NOW() - INTERVAL \'90 days\';\n```\n\n### 2. 表分区（中期方案）\n```sql\n-- 按月分区\nCREATE TABLE orders (\n  id BIGSERIAL, user_id BIGINT, \n  created_at TIMESTAMPTZ\n) PARTITION BY RANGE (created_at);\n```\n\n### 3. 查询优化\n- 避免 `SELECT *`，只查必要字段\n- 使用 `EXPLAIN ANALYZE` 分析执行计划\n- 配置 `work_mem` 和 `shared_buffers`\n\n### 4. 预期效果\n优化后查询响应时间预计从 **5-10秒** 降至 **50-200ms**。', time: '3月9日 11:08' }
        ]
    },
    {
        id: 5, title: '竞品分析报告',
        messages: [
            { role: 'user', content: '帮我做一个企业AI助手产品的竞品分析，对比主流产品的核心功能和定价', time: '3月9日 09:20' },
            { role: 'ai', content: '## 企业AI助手竞品分析\n\n| 维度 | Microsoft Copilot | Google Duet AI | 百度智能云 | 阿里通义 |\n|------|-------------------|----------------|----------|--------|\n| **多轮对话** | ✅ | ✅ | ✅ | ✅ |\n| **代码生成** | ✅ GitHub版 | ✅ | ⚠️ 有限 | ✅ |\n| **文档处理** | ✅ Office集成 | ✅ Workspace | ✅ | ✅ |\n| **企业知识库** | ✅ | ✅ | ✅ | ✅ |\n| **私有部署** | ⚠️ 有限 | ❌ | ✅ | ✅ |\n| **定价(人/月)** | ¥220 | ¥200 | ¥150 | ¥99起 |\n| **数据安全** | 高 | 高 | 高 | 高 |\n\n**关键洞察：**\n1. 国际产品在生态集成上领先，国产方案在私有部署和定价上有优势\n2. 差异化机会：垂直行业定制 + 本地化数据安全合规\n3. 建议定价区间：¥120-180/人/月', time: '3月9日 09:23' }
        ]
    }
];


const APPS_DATA = [
    {
        id: 1, name: 'AI 智能对话', type: 'chat', typeName: '智能对话',
        icon: 'ri-chat-smile-2-line', gradient: 'linear-gradient(135deg, #4f6ef7, #3b5de7)',
        desc: '基于大模型的智能对话助手，支持多轮对话、上下文理解', usage: 12580, users: 856
    },
    {
        id: 2, name: '代码助手', type: 'tool', typeName: 'AI工具',
        icon: 'ri-code-s-slash-line', gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        desc: '智能代码生成、补全、审查和重构，支持主流编程语言', usage: 8930, users: 432
    },
    {
        id: 3, name: '文档智能体', type: 'agent', typeName: '智能体',
        icon: 'ri-file-text-line', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
        desc: '自动化文档生成、格式转换、内容摘要和翻译', usage: 6720, users: 623
    },
    {
        id: 4, name: '数据分析流', type: 'workflow', typeName: '工作流',
        icon: 'ri-bar-chart-box-line', gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
        desc: '端到端数据分析工作流，支持数据清洗、可视化和报告输出', usage: 4510, users: 289
    },
    {
        id: 5, name: '智能客服', type: 'agent', typeName: '智能体',
        icon: 'ri-customer-service-line', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        desc: '7×24小时智能客服系统，自动解答常见问题', usage: 15200, users: 380
    },
    {
        id: 6, name: '翻译引擎', type: 'tool', typeName: 'AI工具',
        icon: 'ri-translate', gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
        desc: '高精度多语言翻译，支持50+语言互译和专业术语', usage: 9870, users: 715
    },
    {
        id: 7, name: 'PPT 生成器', type: 'tool', typeName: 'AI工具',
        icon: 'ri-slideshow-line', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        desc: '一键生成专业PPT，支持自定义模板和样式', usage: 5640, users: 467
    },
    {
        id: 8, name: '会议纪要', type: 'workflow', typeName: '工作流',
        icon: 'ri-mic-line', gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        desc: '语音识别+智能摘要，自动生成会议纪要和待办事项', usage: 7380, users: 534
    },
    {
        id: 9, name: '营销文案', type: 'chat', typeName: '智能对话',
        icon: 'ri-quill-pen-line', gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
        desc: '专业级营销文案生成，覆盖社媒、广告、邮件等场景', usage: 6290, users: 378
    },
    {
        id: 10, name: '知识库问答', type: 'agent', typeName: '智能体',
        icon: 'ri-book-open-line', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        desc: '基于企业知识库的智能问答系统，支持RAG检索增强', usage: 11430, users: 892
    },
    {
        id: 11, name: '图像生成', type: 'tool', typeName: 'AI工具',
        icon: 'ri-image-add-line', gradient: 'linear-gradient(135deg, #d946ef, #a21caf)',
        desc: '文本描述生成高质量图像，支持多种风格和分辨率', usage: 4120, users: 256
    },
    {
        id: 12, name: '审批助手', type: 'workflow', typeName: '工作流',
        icon: 'ri-checkbox-circle-line', gradient: 'linear-gradient(135deg, #84cc16, #65a30d)',
        desc: 'AI辅助审批流程，智能风险评估和推荐决策', usage: 3890, users: 198
    }
];

const ASSETS_DATA = [
    {
        id: 1, name: '高效代码审查提示词', type: 'prompt', typeName: '提示词',
        desc: '用于代码审查的专业提示词模板，覆盖安全、性能、可读性等维度',
        tags: ['代码审查', '研发', '最佳实践'], rating: 4.9, downloads: 2340,
        author: '张明', authorColor: '#4f6ef7', favorited: true
    },
    {
        id: 2, name: '智能文本摘要 SKILL', type: 'skill', typeName: 'SKILL',
        desc: '自动提取长文本核心要点，支持中英文双语，可配置摘要长度',
        tags: ['文本处理', '摘要', '通用'], rating: 4.7, downloads: 1890,
        author: '李婷', authorColor: '#a855f7', favorited: false
    },
    {
        id: 3, name: '客户服务智能体', type: 'agent', typeName: '智能体',
        desc: '基于企业知识库的客服智能体，支持多轮对话和工单自动创建',
        tags: ['客服', '智能体', '知识库'], rating: 4.8, downloads: 1560,
        author: '王强', authorColor: '#22c55e', favorited: true
    },
    {
        id: 4, name: '文档翻译+校对流程', type: 'workflow', typeName: '工作流',
        desc: '一键翻译文档并自动校对，支持专业术语库和格式保留',
        tags: ['翻译', '校对', '文档'], rating: 4.6, downloads: 1230,
        author: '陈悦', authorColor: '#f97316', favorited: false
    },
    {
        id: 5, name: 'SQL查询生成器', type: 'prompt', typeName: '提示词',
        desc: '自然语言转SQL，支持复杂查询、多表关联，兼容MySQL/PostgreSQL',
        tags: ['SQL', '数据库', '研发'], rating: 4.8, downloads: 2100,
        author: '赵凯', authorColor: '#06b6d4', favorited: false
    },
    {
        id: 6, name: '数据清洗处理器', type: 'skill', typeName: 'SKILL',
        desc: '自动检测和清洗数据异常，支持缺失值填充、去重、格式标准化',
        tags: ['数据清洗', '数据分析'], rating: 4.5, downloads: 980,
        author: '刘洋', authorColor: '#ec4899', favorited: false
    },
    {
        id: 7, name: '周报自动生成器', type: 'workflow', typeName: '工作流',
        desc: '基于工作日志和项目进展自动生成周报，支持自定义模板',
        tags: ['周报', '办公', '自动化'], rating: 4.7, downloads: 3210,
        author: '孙芳', authorColor: '#8b5cf6', favorited: true
    },
    {
        id: 8, name: '需求分析模板', type: 'prompt', typeName: '提示词',
        desc: '结构化需求分析提示词，帮助快速生成PRD文档',
        tags: ['需求分析', '产品', '文档'], rating: 4.6, downloads: 1780,
        author: '黄磊', authorColor: '#14b8a6', favorited: false
    }
];

const USERS_DATA = [
    { name: '张明', email: 'zhangming@company.com', dept: '研发部', role: '开发者', status: 'active', lastLogin: '2026-03-11 13:45', color: '#4f6ef7' },
    { name: '李婷', email: 'liting@company.com', dept: '产品部', role: '普通用户', status: 'active', lastLogin: '2026-03-11 12:30', color: '#a855f7' },
    { name: '王强', email: 'wangqiang@company.com', dept: '客服部', role: '部门管理员', status: 'active', lastLogin: '2026-03-11 11:20', color: '#22c55e' },
    { name: '陈悦', email: 'chenyue@company.com', dept: '市场部', role: '普通用户', status: 'active', lastLogin: '2026-03-11 10:15', color: '#f97316' },
    { name: '赵凯', email: 'zhaokai@company.com', dept: '研发部', role: '开发者', status: 'active', lastLogin: '2026-03-11 09:50', color: '#06b6d4' },
    { name: '刘洋', email: 'liuyang@company.com', dept: '数据部', role: '开发者', status: 'inactive', lastLogin: '2026-03-08 16:30', color: '#ec4899' },
    { name: '孙芳', email: 'sunfang@company.com', dept: '运营部', role: '普通用户', status: 'active', lastLogin: '2026-03-11 14:20', color: '#8b5cf6' },
    { name: '黄磊', email: 'huanglei@company.com', dept: '产品部', role: '开发者', status: 'active', lastLogin: '2026-03-11 13:10', color: '#14b8a6' },
    { name: '周敏', email: 'zhoumin@company.com', dept: '人事部', role: '普通用户', status: 'pending', lastLogin: '2026-03-10 09:00', color: '#f43f5e' },
    { name: '吴昊', email: 'wuhao@company.com', dept: '研发部', role: '超级管理员', status: 'active', lastLogin: '2026-03-11 14:50', color: '#3b82f6' },
];

const ROLES_DATA = [
    {
        name: '超级管理员', isSystem: true,
        desc: '拥有系统所有权限，包括全局配置和用户管理',
        permissions: ['全部权限', '系统配置', '用户管理', '数据看板'],
        userCount: 3
    },
    {
        name: '部门管理员', isSystem: true,
        desc: '管理本部门AI应用的使用和配置，查看部门数据统计',
        permissions: ['部门管理', '应用配置', '数据查看', '审批管理'],
        userCount: 15
    },
    {
        name: '开发者', isSystem: true,
        desc: '创建、发布和管理AI资产，使用所有已授权应用',
        permissions: ['资产发布', '资产管理', '应用使用', '版本管理'],
        userCount: 128
    },
    {
        name: '普通用户', isSystem: true,
        desc: '搜索和使用已授权的AI应用和资产',
        permissions: ['应用使用', '资产搜索', '收藏评论'],
        userCount: 1120
    },
    {
        name: '访客', isSystem: true,
        desc: '浏览公开资产，不可使用AI应用',
        permissions: ['公开浏览'],
        userCount: 14
    },
    {
        name: '数据分析师', isSystem: false,
        desc: '自定义角色：拥有数据导出和看板权限',
        permissions: ['数据看板', '报表导出', '应用使用'],
        userCount: 22
    },
];

const AUDIT_DATA = [
    { time: '2026-03-11 14:52', user: '管理员', action: '登录系统', resource: '认证模块', detail: 'SSO登录成功', ip: '10.0.1.42' },
    { time: '2026-03-11 14:45', user: '张明', action: '发布资产', resource: 'SQL查询生成器', detail: '提交审核，版本 v2.1', ip: '10.0.2.88' },
    { time: '2026-03-11 14:30', user: '王强', action: '审核通过', resource: '客服智能体', detail: '审核通过并上架', ip: '10.0.3.15' },
    { time: '2026-03-11 14:15', user: '李婷', action: '权限变更', resource: '用户管理', detail: '赵凯角色变更为开发者', ip: '10.0.1.67' },
    { time: '2026-03-11 13:50', user: '吴昊', action: '配置修改', resource: '系统配置', detail: '更新Token消耗告警阈值', ip: '10.0.1.42' },
    { time: '2026-03-11 13:30', user: '孙芳', action: '应用使用', resource: '智能对话', detail: '调用GPT-4模型 Token:2450', ip: '10.0.4.33' },
    { time: '2026-03-11 13:15', user: '陈悦', action: '资产下载', resource: '营销文案模板', detail: '下载提示词模板 v1.3', ip: '10.0.2.19' },
    { time: '2026-03-11 12:40', user: '黄磊', action: '发布资产', resource: '需求分析模板', detail: '新资产发布，进入审核', ip: '10.0.3.52' },
];

const TOP_ASSETS = [
    { rank: 1, name: '周报自动生成器', type: '工作流', usage: 3210, rating: 4.7, trend: 'up' },
    { rank: 2, name: '高效代码审查提示词', type: '提示词', usage: 2340, rating: 4.9, trend: 'up' },
    { rank: 3, name: 'SQL查询生成器', type: '提示词', usage: 2100, rating: 4.8, trend: 'up' },
    { rank: 4, name: '智能文本摘要 SKILL', type: 'SKILL', usage: 1890, rating: 4.7, trend: 'down' },
    { rank: 5, name: '需求分析模板', type: '提示词', usage: 1780, rating: 4.6, trend: 'up' },
    { rank: 6, name: '客户服务智能体', type: '智能体', usage: 1560, rating: 4.8, trend: 'up' },
    { rank: 7, name: '文档翻译+校对流程', type: '工作流', usage: 1230, rating: 4.6, trend: 'down' },
    { rank: 8, name: '数据清洗处理器', type: 'SKILL', usage: 980, rating: 4.5, trend: 'up' },
];

// Department Tools Data
const TOOLS_DATA = [
    {
        id: 1, name: '供应链需求预测', type: 'python', typeName: 'Python',
        icon: 'ri-line-chart-line', gradient: 'linear-gradient(135deg, #4f6ef7, #3b5de7)',
        desc: '基于历史销售数据和季节因子的需求预测模型，输出未来30天各SKU预测量',
        dept: '供应链计划部', author: '赵凯', authorColor: '#06b6d4',
        fileSize: '2.4 MB', version: 'v1.3', downloads: 156,
        env: 'Python 3.10 | pandas, scikit-learn, matplotlib',
        visibility: 'department', visibilityLabel: '本部门可见',
        downloadPerm: 'department', downloadLabel: '本部门可下载',
        status: 'published', tags: ['预测', '供应链', '数据分析']
    },
    {
        id: 2, name: '财务报表自动核对', type: 'python', typeName: 'Python',
        icon: 'ri-money-dollar-circle-line', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
        desc: '自动核对SAP导出的财务报表与银行流水，标记差异项并生成核对报告',
        dept: '财务部', author: '孙芳', authorColor: '#8b5cf6',
        fileSize: '1.8 MB', version: 'v2.0', downloads: 89,
        env: 'Python 3.10 | openpyxl, pandas',
        visibility: 'all', visibilityLabel: '全员可见',
        downloadPerm: 'department', downloadLabel: '财务部可下载',
        status: 'published', tags: ['财务', '自动化', '报表']
    },
    {
        id: 3, name: '舆情监控爬虫', type: 'python', typeName: 'Python',
        icon: 'ri-radar-line', gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
        desc: '定时抓取指定平台的品牌舆情信息，支持情感分析和关键词告警',
        dept: '市场部', author: '陈悦', authorColor: '#f97316',
        fileSize: '3.1 MB', version: 'v1.1', downloads: 67,
        env: 'Python 3.10 | requests, beautifulsoup4, jieba',
        visibility: 'all', visibilityLabel: '全员可见',
        downloadPerm: 'all', downloadLabel: '全员可下载',
        status: 'published', tags: ['舆情', '爬虫', '市场']
    },
    {
        id: 4, name: '日志分析工具', type: 'shell', typeName: 'Shell',
        icon: 'ri-terminal-box-line', gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        desc: '快速分析Nginx/应用日志，提取错误、慢请求、流量趋势等关键指标',
        dept: '研发部', author: '张明', authorColor: '#4f6ef7',
        fileSize: '0.5 MB', version: 'v3.2', downloads: 234,
        env: 'Bash 5.0+ | awk, grep, gnuplot',
        visibility: 'all', visibilityLabel: '全员可见',
        downloadPerm: 'all', downloadLabel: '全员可下载',
        status: 'published', tags: ['日志', '运维', '研发']
    },
    {
        id: 5, name: '智能排班算法', type: 'python', typeName: 'Python',
        icon: 'ri-calendar-schedule-line', gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
        desc: '基于约束优化的员工排班算法，支持多班次、休假、技能约束',
        dept: '人事部', author: '周敏', authorColor: '#f43f5e',
        fileSize: '1.2 MB', version: 'v1.0', downloads: 45,
        env: 'Python 3.10 | ortools, pandas',
        visibility: 'user', visibilityLabel: '指定人员可见',
        downloadPerm: 'user', downloadLabel: '指定人员可下载',
        status: 'published', tags: ['排班', '人事', '优化']
    },
    {
        id: 6, name: '客户画像生成器', type: 'python', typeName: 'Python',
        icon: 'ri-user-search-line', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        desc: '基于客户交易和行为数据自动生成客户画像标签和分层',
        dept: '数据部', author: '刘洋', authorColor: '#ec4899',
        fileSize: '4.2 MB', version: 'v2.1', downloads: 0,
        env: 'Python 3.10 | pandas, sklearn, xgboost',
        visibility: 'all', visibilityLabel: '全员可见',
        downloadPerm: 'all', downloadLabel: '全员可下载',
        status: 'pending', tags: ['客户画像', '数据分析', '标签']
    }
];

