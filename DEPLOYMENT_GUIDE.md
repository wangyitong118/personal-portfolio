# Notion CMS 部署指南

## 一句话总结
**在手机 Notion App 里改一行字，你的个人网站就会自动同步更新，连代码都不用碰！**

## 已完成的工作
我已经为你准备好了所有代码，包括：
1. ✅ Notion API 客户端 (`data/notion-client.ts`)
2. ✅ 动态数据获取 (`data/site-data-dynamic.ts`)
3. ✅ 组件适配（所有组件都支持动态数据）
4. ✅ Webhook 处理器 (`scripts/notion-webhook.js`)
5. ✅ 详细设置指南 (`NOTION_SETUP.md`)

## 快速开始（3步完成）

### 第1步：配置 Notion
1. 访问 [Notion Developers](https://www.notion.so/my-integrations)
2. 创建新集成 → 复制 `secret_` 开头的 API 密钥
3. 在 Notion 中创建数据库（按照 `NOTION_SETUP.md` 的结构）
4. 分享数据库给你的集成
5. 复制数据库 ID（32位字符）

### 第2步：配置环境变量
在项目根目录的 `.env.local` 文件中填入：

```env
# Notion Integration
NOTION_API_KEY=你的_Notion_集成密钥
NOTION_DATABASE_ID=你的_Notion_数据库_ID

# Cloudflare Pages 自动部署（可选）
CF_ACCOUNT_ID=你的_Cloudflare_账户_ID
CF_API_TOKEN=你的_Cloudflare_API_Token
CF_PAGES_PROJECT_NAME=personal-portfolio-8zh
```

### 第3步：测试连接
```bash
npm run dev
```
访问 `http://localhost:3000`，如果看到数据从 Notion 加载，说明配置成功！

## 自动同步设置（真正实现"手机改字，网站更新"）

### 方案A：Webhook 自动触发（推荐⭐）
**效果**：在 Notion 中修改内容 → 5秒内网站自动更新

#### 设置步骤：
1. **部署 Webhook 处理器**（选择一种）：
   - **Vercel**（最简单）：导入 GitHub 仓库，添加环境变量，自动部署
   - **Cloudflare Workers**：复制 `scripts/notion-webhook.js` 到 Worker
   - **其他平台**：任何支持 Node.js 的服务器

2. **配置 Notion Webhook**：
   - 在 Notion 集成页面点击 "Create a webhook"
   - 触发器选择 `page.updated` 和 `page.added`
   - URL 填写你部署的 Webhook 地址

3. **测试**：
   - 在手机 Notion App 中修改任意内容
   - 等待几秒钟
   - 刷新网站查看更新！

#### 环境变量说明：
- `CF_ACCOUNT_ID`: Cloudflare 账户 ID（在 Cloudflare Dashboard 右上角）
- `CF_API_TOKEN`: 需要 `Pages:Edit` 权限的 API Token
- `WEBHOOK_SECRET`: 自定义密钥，增强安全性

### 方案B：定时构建（简单但延迟）
**效果**：每小时自动检查 Notion 更新

在 Cloudflare Pages 项目设置中：
1. 添加 `NOTION_API_KEY` 和 `NOTION_DATABASE_ID` 环境变量
2. 开启 "Auto publish"
3. 网站会每小时自动从 Notion 获取最新数据

### 方案C：手动触发（最灵活）
**效果**：需要时手动触发更新

每次在 Notion 中修改内容后：
1. 登录 Cloudflare Pages 控制台
2. 找到你的项目 `personal-portfolio-8zh`
3. 点击 "Retry deployment"

## 手机端操作指南

### iPhone/Android Notion App：
1. 打开 Notion App
2. 找到你的个人网站数据库
3. 点击任意项目进行编辑
4. 保存更改
5. **网站会在几秒内自动更新！**

### 修改内容示例：
- **个人信息**：修改姓名、职位、联系方式
- **技能**：调整熟练度百分比、添加新技能
- **项目**：更新项目描述、技术栈、链接
- **经历**：添加新工作经历、教育背景

## 故障排除

### 常见问题：
1. **数据不显示**
   - ✅ 检查 `.env.local` 文件是否正确
   - ✅ 确认数据库已分享给集成
   - ✅ 查看浏览器控制台错误信息

2. **Webhook 不工作**
   - ✅ 检查 Webhook URL 是否正确
   - ✅ 确认 Cloudflare API Token 有足够权限
   - ✅ 查看服务器日志

3. **构建失败**
   - ✅ 检查 Notion API 密钥是否有效
   - ✅ 确认数据库结构符合要求
   - ✅ 查看 Cloudflare Pages 构建日志

### 测试命令：
```bash
# 本地测试
npm run dev

# 构建测试
npm run build

# 检查环境变量
echo $NOTION_API_KEY
```

## 高级功能

### 1. 多语言支持
在 Notion 数据库中添加 `Language` 字段，网站可以根据用户语言显示不同内容。

### 2. 草稿/发布状态
添加 `Status` 字段（`draft`/`published`），控制哪些内容对外显示。

### 3. 图片管理
在 Notion 中上传图片，网站会自动同步显示。

### 4. 内容版本控制
利用 Notion 的历史记录功能，随时回滚到之前的版本。

## 安全建议

1. **不要提交敏感信息**
   - `.env.local` 文件已在 `.gitignore` 中
   - 只在部署平台添加环境变量

2. **限制集成权限**
   - 只给集成读取权限
   - 定期轮换 API 密钥

3. **备份数据**
   - 定期导出 Notion 数据库
   - 保持 GitHub 仓库同步

## 联系方式

- **邮箱**: 15141251539@163.com
- **电话**: 15141251539
- **网站**: https://personal-portfolio-8zh.pages.dev

## 最后提醒

**你现在可以：**
1. 在手机 Notion App 中修改内容
2. 网站会自动同步更新
3. 无需触碰任何代码
4. 专注于内容创作，技术问题交给我！

有任何问题，随时联系我！ 🚀