# Notion CMS 集成指南

## 概述
通过 Notion 作为内容管理系统，你可以在手机 Notion App 里修改内容，网站会自动同步更新。

## 设置步骤

### 1. 创建 Notion 集成
1. 访问 [Notion Developers](https://www.notion.so/my-integrations)
2. 点击 "New integration"
3. 填写信息：
   - **Name**: `个人网站 CMS`
   - **Logo** (可选): 上传你的头像
   - **Associated workspace**: 选择你的工作区
4. 点击 "Submit"
5. 复制生成的 **Internal Integration Token** (以 `secret_` 开头)

### 2. 创建 Notion 数据库
1. 在你的 Notion 工作区创建一个新页面
2. 输入 `/database` 选择 "Database - Inline"
3. 配置数据库属性（必须按照以下结构）：

#### 数据库属性结构：
| 属性名 (Property Name) | 类型 (Type) | 说明 |
|------------------------|-------------|------|
| **Name** | Title | 项目/技能/经历的名称 |
| **Type** | Select | 内容类型：`SiteConfig`, `Skill`, `Project`, `Experience` |
| **Order** | Number | 显示顺序（从小到大） |
| **Description** | Text | 详细描述 |
| **Level** | Number | 技能熟练度 (0-100) |
| **Technologies** | Multi-select | 项目使用的技术栈 |
| **Company** | Text | 公司名称（仅 Experience 类型） |
| **Position** | Text | 职位（仅 Experience 类型） |
| **Period** | Text | 时间段（仅 Experience 类型） |
| **Location** | Text | 地点（仅 Experience 类型） |
| **Achievements** | Text | 成就列表，每行一个（仅 Experience 类型） |
| **GitHub** | URL | GitHub 链接 |
| **LiveURL** | URL | 在线演示链接 |
| **Email** | Text | 邮箱（仅 SiteConfig 类型） |
| **Phone** | Text | 电话（仅 SiteConfig 类型） |
| **LinkedIn** | URL | LinkedIn 链接（仅 SiteConfig 类型） |
| **Twitter** | URL | Twitter 链接（仅 SiteConfig 类型） |

### 3. 添加示例数据

#### SiteConfig (类型选择 `SiteConfig`)
- **Name**: 王一彤
- **Title**: 数据科学家 & AI工程师
- **Email**: 15141251539@163.com
- **Phone**: 15141251539
- **Location**: 远程 / 北京 / 上海 / 杭州
- **GitHub**: https://github.com/yourusername
- **LinkedIn**: https://linkedin.com/in/yourusername
- **Twitter**: https://twitter.com/yourusername

#### Skills (类型选择 `Skill`)
1. **数据管理与处理能力**
   - Description: SQL, Python, Pandas, Spark, 数据清洗, 特征工程, ETL流程
   - Level: 90
   - Order: 1

2. **模型训练与评估技术**
   - Description: Scikit-learn, PyTorch, TensorFlow, 模型调优, 交叉验证, A/B测试
   - Level: 85
   - Order: 2

3. **编程与工程化能力**
   - Description: Python, Git, Docker, CI/CD, 代码规范, 系统设计, API开发
   - Level: 88
   - Order: 3

4. **软技能与业务思维**
   - Description: 需求分析, 数据驱动决策, 跨团队协作, 技术文档, 项目管理
   - Level: 82
   - Order: 4

#### Projects (类型选择 `Project`)
1. **智能推荐系统**
   - Description: 基于协同过滤与深度学习的混合推荐系统，为电商平台提供个性化商品推荐。
   - Technologies: Python, PyTorch, Scikit-learn, FastAPI
   - GitHub: https://github.com/yourusername/recommendation-system
   - LiveURL: https://recsys-demo.vercel.app
   - Order: 1

2. **NLP 文本分类引擎**
   - Description: 基于 Transformer 的多标签文本分类系统，支持情感分析、主题识别等任务。
   - Technologies: Transformers, BERT, HuggingFace, Docker
   - GitHub: https://github.com/yourusername/nlp-classifier
   - LiveURL: https://nlp-demo.vercel.app
   - Order: 2

#### Experiences (类型选择 `Experience`)
1. **科技公司**
   - Position: 数据科学家
   - Period: 2023年6月 - 至今
   - Location: 北京
   - Description: 负责公司核心业务的数据分析与机器学习模型开发，驱动数据化运营决策。
   - Achievements: 
     - 主导推荐算法优化，将点击率提升了35%
     - 搭建了自动化特征工程流水线，模型开发效率提升50%
     - 构建了实时数据监控看板，支撑日均千万级数据处理
   - Order: 1

### 4. 分享数据库给集成
1. 在数据库页面右上角点击 "Share"
2. 点击 "Invite"
3. 搜索并选择你的集成名称 "个人网站 CMS"
4. 点击 "Invite"

### 5. 获取数据库 ID
1. 在浏览器中打开你的 Notion 数据库
2. 查看 URL：`https://www.notion.so/yourworkspace/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...`
3. 复制 `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 部分（32位字符）

### 6. 配置环境变量
在项目根目录的 `.env.local` 文件中添加：

```env
NOTION_API_KEY=你的_Notion_集成密钥
NOTION_DATABASE_ID=你的_Notion_数据库_ID
```

### 7. 测试连接
运行以下命令测试 Notion 连接：
```bash
npm run dev
```

访问 `http://localhost:3000`，如果看到数据从 Notion 加载，说明配置成功。

## 自动更新机制

### 方案一：Cloudflare Pages Webhook 自动构建（推荐）
这是最推荐的方案，可以在 Notion 更新时自动触发网站重新构建。

#### 步骤 1：部署 Webhook 处理器
我们已经为你创建了 Webhook 处理器脚本 (`scripts/notion-webhook.js`)，你需要将它部署到一个服务器上：

**选项 A：使用 Vercel（免费且简单）**
1. 访问 [Vercel](https://vercel.com) 并注册/登录
2. 导入你的 GitHub 仓库
3. 在项目设置中添加环境变量：
   - `CF_ACCOUNT_ID`: 你的 Cloudflare 账户 ID
   - `CF_API_TOKEN`: Cloudflare API Token（需要 `Pages:Edit` 权限）
   - `CF_PAGES_PROJECT_NAME`: `personal-portfolio-8zh`
   - `WEBHOOK_SECRET`: 自定义密钥（用于验证 Webhook）
4. Vercel 会自动部署并提供一个 URL，如 `https://your-app.vercel.app`

**选项 B：使用 Cloudflare Workers（与 Pages 同平台）**
1. 在 Cloudflare Dashboard 创建新的 Worker
2. 将 `scripts/notion-webhook.js` 的内容复制到 Worker 编辑器
3. 在 Worker 设置中添加环境变量
4. 部署 Worker 并获取 URL

**选项 C：使用 Railway/Render（其他平台）**
1. 创建新的 Node.js 项目
2. 上传脚本文件
3. 配置环境变量
4. 部署并获取 URL

#### 步骤 2：配置 Notion Webhook
1. 访问 [Notion Developers Webhooks](https://www.notion.so/my-integrations)
2. 找到你的 "个人网站 CMS" 集成
3. 点击 "Create a webhook"
4. 配置 Webhook：
   - **Workspace**: 选择你的工作区
   - **Trigger**: `page.updated` 和 `page.added`
   - **Filter**: 选择你的数据库
   - **URL**: 输入你部署的 Webhook URL（如 `https://your-app.vercel.app`）
5. 点击 "Create"

#### 步骤 3：测试 Webhook
1. 在 Notion 数据库中修改任意内容
2. 等待几秒钟
3. 检查 Cloudflare Pages 控制台，应该会自动触发新的部署
4. 部署完成后，访问你的网站查看更新

### 方案二：Cloudflare Pages 定时构建（简单但延迟）
1. 在 Cloudflare Pages 项目设置中：
   - 添加环境变量 `NOTION_API_KEY` 和 `NOTION_DATABASE_ID`
   - 开启 "Auto publish"
2. 在 `wrangler.toml` 中添加定时触发器：
   ```toml
   [triggers]
   crons = ["0 * * * *"]  # 每小时构建一次
   ```
3. 每次构建都会从 Notion 获取最新数据

### 方案三：GitHub Actions 定时构建
1. 在 GitHub 仓库的 Secrets 中添加环境变量
2. 创建 `.github/workflows/notion-sync.yml` 配置文件
3. 设置定时任务（如每小时检查一次）

### 方案四：手动触发（最简单）
每次在 Notion 中修改内容后，手动触发重新构建：
- 在 Cloudflare Pages 控制台点击 "Retry deployment"
- 或通过 API 触发：
  ```bash
  curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments" \
    -H "Authorization: Bearer {api_token}" \
    -H "Content-Type: application/json"
  ```

## 故障排除

### 常见问题
1. **数据不显示**
   - 检查环境变量是否正确
   - 确认数据库已分享给集成
   - 查看浏览器控制台错误信息

2. **类型错误**
   - 确保数据库属性名称和类型完全匹配
   - 检查 Select 类型的值是否正确

3. **权限问题**
   - 确认集成有读取数据库的权限
   - 重新分享数据库给集成

### 调试工具
```bash
# 检查环境变量
echo $NOTION_API_KEY
echo $NOTION_DATABASE_ID

# 测试 Notion API
curl -X GET 'https://api.notion.com/v1/databases/{database_id}' \
  -H 'Authorization: Bearer {notion_api_key}' \
  -H 'Notion-Version: 2022-06-28'
```

## 安全注意事项
1. **不要提交 `.env.local` 到 Git**
   - 确保 `.env.local` 在 `.gitignore` 中
   - 只在部署平台添加环境变量

2. **限制集成权限**
   - 只给集成读取权限
   - 不要分享敏感信息到数据库

3. **定期轮换 API 密钥**
   - 每 3-6 个月更新一次集成密钥
   - 及时撤销不再使用的集成

## 高级功能
1. **多语言支持**：添加语言字段，根据用户语言显示不同内容
2. **草稿/发布状态**：添加状态字段，控制内容发布
3. **内容版本控制**：利用 Notion 的历史记录功能
4. **图片管理**：在 Notion 中上传图片，自动同步到网站

## 联系方式
如有问题，请参考：
- [Notion API 文档](https://developers.notion.com/)
- [项目 GitHub Issues](https://github.com/yourusername/personal-portfolio/issues)
- 邮箱：15141251539@163.com