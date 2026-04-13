#!/usr/bin/env node

/**
 * Notion Webhook Handler
 * 
 * 这个脚本用于处理Notion数据库更新时触发的Webhook，
 * 并自动触发Cloudflare Pages重新部署。
 * 
 * 部署方式：
 * 1. 将此脚本部署到Vercel、Cloudflare Workers或任何Node.js服务器
 * 2. 在Notion集成中配置Webhook指向此脚本的URL
 * 3. 当Notion数据库更新时，网站会自动重新构建
 */

const https = require('https');

// 配置参数（从环境变量读取）
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const CF_PAGES_PROJECT_NAME = process.env.CF_PAGES_PROJECT_NAME || 'personal-portfolio-8zh';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET; // 用于验证Webhook请求

/**
 * 触发Cloudflare Pages重新部署
 */
async function triggerCloudflareDeployment() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PAGES_PROJECT_NAME}/deployments`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Cloudflare Pages部署已触发');
          resolve(JSON.parse(data));
        } else {
          console.error('❌ Cloudflare API错误:', data);
          reject(new Error(`API错误: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求失败:', error);
      reject(error);
    });

    req.write(JSON.stringify({
      branch: 'main', // 部署的分支
    }));
    
    req.end();
  });
}

/**
 * 验证Webhook签名（可选，增强安全性）
 */
function verifyWebhookSignature(signature, body, secret) {
  if (!secret) return true; // 如果没有设置密钥，跳过验证
  
  // 这里应该实现实际的签名验证逻辑
  // 使用HMAC-SHA256验证签名
  return true;
}

/**
 * 主处理函数
 */
async function handleWebhook(req, res) {
  try {
    // 如果是GET请求，返回健康检查
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', message: 'Notion Webhook Handler is running' }));
      return;
    }

    // 只处理POST请求
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    // 读取请求体
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        
        // 验证Webhook签名（如果设置了密钥）
        const signature = req.headers['x-notion-signature'];
        if (!verifyWebhookSignature(signature, body, WEBHOOK_SECRET)) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid signature' }));
          return;
        }

        console.log('📝 Notion Webhook收到更新:', {
          event: data.type,
          timestamp: new Date().toISOString(),
        });

        // 触发Cloudflare Pages重新部署
        await triggerCloudflareDeployment();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Deployment triggered successfully' 
        }));
      } catch (error) {
        console.error('❌ 处理Webhook时出错:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  } catch (error) {
    console.error('❌ 服务器错误:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

// 如果是直接运行此脚本，启动一个简单的HTTP服务器
if (require.main === module) {
  const http = require('http');
  const port = process.env.PORT || 3001;

  const server = http.createServer(handleWebhook);

  server.listen(port, () => {
    console.log(`🚀 Notion Webhook Handler运行在端口 ${port}`);
    console.log(`📝 配置Cloudflare Pages项目: ${CF_PAGES_PROJECT_NAME}`);
    console.log(`🔗 健康检查: http://localhost:${port}`);
  });
}

module.exports = handleWebhook;