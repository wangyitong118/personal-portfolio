#!/usr/bin/env node

/**
 * Notion连接测试脚本
 * 用于验证Notion API密钥和数据库连接是否正常
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');

async function testNotionConnection() {
  console.log('🔍 开始测试Notion连接...\n');

  // 检查环境变量
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  console.log('📋 环境变量检查:');
  console.log(`   NOTION_API_KEY: ${apiKey ? '已设置' + (apiKey.startsWith('secret_') || apiKey.startsWith('ntn_') ? ' (格式正确)' : ' (格式可能不正确)') : '未设置'}`);
  console.log(`   NOTION_DATABASE_ID: ${databaseId ? '已设置 (' + databaseId.length + '字符)' : '未设置'}`);

  if (!apiKey || !databaseId) {
    console.error('\n❌ 错误: 环境变量未设置完整');
    console.log('   请检查 .env.local 文件或Cloudflare Pages环境变量');
    return false;
  }

  if (!apiKey.startsWith('secret_') && !apiKey.startsWith('ntn_')) {
    console.warn('\n⚠️  警告: API密钥格式可能不正确，应以 "secret_" 或 "ntn_" 开头');
  }

  // 测试Notion客户端
  try {
    console.log('\n🔗 测试Notion API连接...');
    const notion = new Client({ auth: apiKey });

    // 测试1: 查询数据库信息
    console.log('   1. 查询数据库信息...');
    const database = await notion.databases.retrieve({ database_id: databaseId });
    console.log(`   ✅ 数据库名称: "${database.title[0]?.plain_text || '未知'}"`);
    console.log(`   ✅ 数据库ID: ${database.id}`);

    // 测试2: 查询数据库内容
    console.log('   2. 查询数据库内容...');
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 5,
    });

    console.log(`   ✅ 找到 ${response.results.length} 条记录`);

    // 显示记录详情
    if (response.results.length > 0) {
      console.log('\n📊 数据库记录示例:');
      response.results.forEach((page, index) => {
        const properties = page.properties;
        console.log(`   ${index + 1}. 页面ID: ${page.id}`);
        
        // 尝试获取名称
        let name = '未命名';
        if (properties.名称?.title?.[0]?.plain_text) {
          name = properties.名称.title[0].plain_text;
        } else if (properties.Name?.title?.[0]?.plain_text) {
          name = properties.Name.title[0].plain_text;
        }
        
        // 尝试获取类型
        let type = '未知';
        if (properties.类型?.select?.name) {
          type = properties.类型.select.name;
        } else if (properties.Type?.select?.name) {
          type = properties.Type.select.name;
        }
        
        console.log(`      名称: "${name}"`);
        console.log(`      类型: ${type}`);
        
        // 显示所有属性
        console.log(`      属性列表: ${Object.keys(properties).join(', ')}`);
      });
    }

    // 测试3: 检查必要的属性
    console.log('\n🔍 检查必要的属性列...');
    const requiredProperties = ['名称', '类型', '排序'];
    const availableProperties = Object.keys(database.properties || {});
    
    console.log('   数据库中的属性列:');
    availableProperties.forEach(propName => {
      const prop = database.properties[propName];
      console.log(`     - ${propName} (${prop.type})`);
    });

    const missingProperties = requiredProperties.filter(
      prop => !availableProperties.includes(prop)
    );

    if (missingProperties.length > 0) {
      console.warn(`\n⚠️  缺少必要的属性列: ${missingProperties.join(', ')}`);
      console.log('   请在Notion数据库中添加这些列');
    } else {
      console.log('\n✅ 所有必要的属性列都存在');
    }

    console.log('\n🎉 Notion连接测试成功！');
    console.log('   你的Notion CMS配置正确，网站应该可以正常读取数据。');
    
    return true;

  } catch (error) {
    console.error('\n❌ Notion连接测试失败:');
    console.error(`   错误类型: ${error.constructor.name}`);
    console.error(`   错误信息: ${error.message}`);
    
    if (error.status === 401) {
      console.error('\n🔑 认证失败，可能的原因:');
      console.error('   1. API密钥无效或已过期');
      console.error('   2. 数据库未分享给你的Notion集成');
      console.error('   3. 集成权限不足');
    } else if (error.status === 404) {
      console.error('\n🔍 数据库未找到，可能的原因:');
      console.error('   1. 数据库ID不正确');
      console.error('   2. 数据库已被删除');
      console.error('   3. 集成无法访问该数据库');
    }
    
    return false;
  }
}

// 运行测试
testNotionConnection().then(success => {
  console.log('\n' + '='.repeat(50));
  if (success) {
    console.log('✅ 测试完成: Notion连接正常');
    process.exit(0);
  } else {
    console.log('❌ 测试完成: Notion连接有问题');
    console.log('\n💡 下一步建议:');
    console.log('   1. 检查Cloudflare Pages环境变量');
    console.log('   2. 确认Notion数据库已分享给集成');
    console.log('   3. 验证API密钥格式是否正确');
    process.exit(1);
  }
}).catch(error => {
  console.error('测试过程中发生未预期的错误:', error);
  process.exit(1);
});