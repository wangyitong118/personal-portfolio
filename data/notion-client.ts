import { Client } from '@notionhq/client'

// Initialize Notion client with support for internal integration tokens (ntn_)
const apiKey = process.env.NOTION_API_KEY || ''
const notion = new Client({
  auth: apiKey,
  // Support for internal integration tokens
  ...(apiKey.startsWith('ntn_') ? {
    headers: {
      'Notion-Version': '2022-06-28',
    }
  } : {}),
})

// Types for Notion database properties
interface NotionPage {
  id: string
  properties: Record<string, any>
}

interface SiteConfigData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  twitter: string
}

interface SkillData {
  name: string
  description: string
  level: number
  gradient: string
}

interface ProjectData {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  color: string
}

interface ExperienceData {
  company: string
  position: string
  period: string
  location: string
  description: string
  achievements: string[]
  color: string
}

// Helper function to extract text from Notion rich text
function extractText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ''
  return richText.map((text) => text.plain_text).join('')
}

// Helper function to extract multi-select values
function extractMultiSelect(property: any): string[] {
  if (!property || !property.multi_select) return []
  return property.multi_select.map((item: any) => item.name)
}

// Helper function to extract number
function extractNumber(property: any): number {
  if (!property || property.number === null || property.number === undefined) return 0
  return property.number
}

// Helper function to extract URL
function extractUrl(property: any): string {
  if (!property || !property.url) return ''
  return property.url
}

// Fetch site configuration from Notion
export async function fetchSiteConfig(): Promise<SiteConfigData> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set')
    }

    // Query the database for site config (assuming first page is config)
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: '类型',
            select: {
              equals: 'SiteConfig'
            }
          },
          {
            property: 'Type',
            select: {
              equals: 'SiteConfig'
            }
          }
        ]
      }
    })

    if (response.results.length === 0) {
      throw new Error('No site configuration found in Notion database')
    }

    const page = response.results[0] as any
    const properties = page.properties

    return {
      name: extractText(properties.名称?.title) || extractText(properties.Name?.title) || '王一彤',
      title: extractText(properties.标题?.rich_text) || extractText(properties.Title?.rich_text) || '数据科学家 & AI工程师',
      email: extractText(properties.邮箱?.rich_text) || extractText(properties.Email?.rich_text) || '15141251539@163.com',
      phone: extractText(properties.电话?.rich_text) || extractText(properties.Phone?.rich_text) || '15141251539',
      location: extractText(properties.地点?.rich_text) || extractText(properties.Location?.rich_text) || '远程 / 北京 / 上海 / 杭州',
      github: extractUrl(properties.GitHub) || 'https://github.com/yourusername',
      linkedin: extractUrl(properties.LinkedIn) || 'https://linkedin.com/in/yourusername',
      twitter: extractUrl(properties.Twitter) || 'https://twitter.com/yourusername',
    }
  } catch (error) {
    console.error('Error fetching site config from Notion:', error)
    // Fallback to default data
    return {
      name: '王一彤',
      title: '数据科学家 & AI工程师',
      email: '15141251539@163.com',
      phone: '15141251539',
      location: '远程 / 北京 / 上海 / 杭州',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      twitter: 'https://twitter.com/yourusername',
    }
  }
}

// Fetch skills data from Notion
export async function fetchSkillsData(): Promise<SkillData[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: '类型',
            select: {
              equals: 'Skill'
            }
          },
          {
            property: 'Type',
            select: {
              equals: 'Skill'
            }
          }
        ]
      },
      sorts: [
        {
          property: '排序',
          direction: 'ascending'
        }
      ]
    })

    const skills: SkillData[] = response.results.map((page: any) => {
      const properties = page.properties
      
      // Determine gradient based on skill type or order
      const gradients = [
        'from-pink-400 to-rose-400',
        'from-purple-400 to-fuchsia-400',
        'from-teal-400 to-emerald-400',
        'from-amber-400 to-orange-400',
      ]
      const order = extractNumber(properties.排序) || extractNumber(properties.Order) || 0
      const gradientIndex = order % gradients.length
      
      return {
        name: extractText(properties.名称?.title) || extractText(properties.Name?.title) || '未命名技能',
        description: extractText(properties.描述?.rich_text) || extractText(properties.Description?.rich_text) || '',
        level: extractNumber(properties.熟练度) || extractNumber(properties.Level) || 0,
        gradient: gradients[gradientIndex] || 'from-pink-400 to-rose-400',
      }
    })

    return skills
  } catch (error) {
    console.error('Error fetching skills from Notion:', error)
    // Fallback to default data
    return [
      {
        name: '数据管理与处理能力',
        description: 'SQL, Python, Pandas, Spark, 数据清洗, 特征工程, ETL流程',
        level: 90,
        gradient: 'from-pink-400 to-rose-400',
      },
      {
        name: '模型训练与评估技术',
        description: 'Scikit-learn, PyTorch, TensorFlow, 模型调优, 交叉验证, A/B测试',
        level: 85,
        gradient: 'from-purple-400 to-fuchsia-400',
      },
      {
        name: '编程与工程化能力',
        description: 'Python, Git, Docker, CI/CD, 代码规范, 系统设计, API开发',
        level: 88,
        gradient: 'from-teal-400 to-emerald-400',
      },
      {
        name: '软技能与业务思维',
        description: '需求分析, 数据驱动决策, 跨团队协作, 技术文档, 项目管理',
        level: 82,
        gradient: 'from-amber-400 to-orange-400',
      },
    ]
  }
}

// Fetch projects data from Notion
export async function fetchProjectsData(): Promise<ProjectData[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: '类型',
            select: {
              equals: 'Project'
            }
          },
          {
            property: 'Type',
            select: {
              equals: 'Project'
            }
          }
        ]
      },
      sorts: [
        {
          property: '排序',
          direction: 'ascending'
        }
      ]
    })

    const projects: ProjectData[] = response.results.map((page: any, index: number) => {
      const properties = page.properties
      
      // Color palette for projects
      const colors = ['#f9a8d4', '#c4b5fd', '#99f6e4', '#fda4af']
      const colorIndex = index % colors.length
      
      return {
        title: extractText(properties.名称?.title) || extractText(properties.Title?.title) || '未命名项目',
        description: extractText(properties.描述?.rich_text) || extractText(properties.Description?.rich_text) || '',
        technologies: extractMultiSelect(properties.技术栈) || extractMultiSelect(properties.Technologies) || [],
        githubUrl: extractUrl(properties.GitHub) || 'https://github.com/yourusername',
        liveUrl: extractUrl(properties.LiveURL) || 'https://demo.vercel.app',
        color: colors[colorIndex] || '#f9a8d4',
      }
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects from Notion:', error)
    // Fallback to default data
    return [
      {
        title: '智能推荐系统',
        description: '基于协同过滤与深度学习的混合推荐系统，为电商平台提供个性化商品推荐。',
        technologies: ['Python', 'PyTorch', 'Scikit-learn', 'FastAPI'],
        githubUrl: 'https://github.com/yourusername/recommendation-system',
        liveUrl: 'https://recsys-demo.vercel.app',
        color: '#f9a8d4',
      },
      {
        title: 'NLP 文本分类引擎',
        description: '基于 Transformer 的多标签文本分类系统，支持情感分析、主题识别等任务。',
        technologies: ['Transformers', 'BERT', 'HuggingFace', 'Docker'],
        githubUrl: 'https://github.com/yourusername/nlp-classifier',
        liveUrl: 'https://nlp-demo.vercel.app',
        color: '#c4b5fd',
      },
      {
        title: '数据可视化平台',
        description: '交互式数据分析仪表盘，支持多维度数据探索、实时监控和自动报告生成。',
        technologies: ['Python', 'Plotly', 'Streamlit', 'Pandas'],
        githubUrl: 'https://github.com/yourusername/data-viz-platform',
        liveUrl: 'https://dataviz-demo.vercel.app',
        color: '#99f6e4',
      },
      {
        title: '计算机视觉检测系统',
        description: '基于目标检测的工业质检系统，实现产品缺陷自动识别与分类。',
        technologies: ['YOLOv8', 'OpenCV', 'PyTorch', 'Flask'],
        githubUrl: 'https://github.com/yourusername/cv-inspection',
        liveUrl: 'https://cv-demo.vercel.app',
        color: '#fda4af',
      },
    ]
  }
}

// Fetch experiences data from Notion
export async function fetchExperiencesData(): Promise<ExperienceData[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set')
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: '类型',
            select: {
              equals: 'Experience'
            }
          },
          {
            property: 'Type',
            select: {
              equals: 'Experience'
            }
          }
        ]
      },
      sorts: [
        {
          property: '排序',
          direction: 'ascending'
        }
      ]
    })

    const experiences: ExperienceData[] = response.results.map((page: any, index: number) => {
      const properties = page.properties
      
      // Color gradients for experiences
      const gradients = [
        'from-pink-400 to-rose-400',
        'from-purple-400 to-fuchsia-400',
        'from-teal-400 to-emerald-400',
      ]
      const gradientIndex = index % gradients.length
      
      // Extract achievements from multi-line text
      const achievementsText = extractText(properties.成就?.rich_text) || extractText(properties.Achievements?.rich_text) || ''
      const achievements = achievementsText.split('\n').filter(line => line.trim() !== '')
      
      return {
        company: extractText(properties.公司?.rich_text) || extractText(properties.Company?.rich_text) || '公司名称',
        position: extractText(properties.职位?.rich_text) || extractText(properties.Position?.rich_text) || '职位',
        period: extractText(properties.时间段?.rich_text) || extractText(properties.Period?.rich_text) || '时间段',
        location: extractText(properties.地点?.rich_text) || extractText(properties.Location?.rich_text) || '地点',
        description: extractText(properties.描述?.rich_text) || extractText(properties.Description?.rich_text) || '',
        achievements: achievements,
        color: gradients[gradientIndex] || 'from-pink-400 to-rose-400',
      }
    })

    return experiences
  } catch (error) {
    console.error('Error fetching experiences from Notion:', error)
    // Fallback to default data
    return [
      {
        company: '科技公司',
        position: '数据科学家',
        period: '2023年6月 - 至今',
        location: '北京',
        description: '负责公司核心业务的数据分析与机器学习模型开发，驱动数据化运营决策。',
        achievements: [
          '主导推荐算法优化，将点击率提升了35%',
          '搭建了自动化特征工程流水线，模型开发效率提升50%',
          '构建了实时数据监控看板，支撑日均千万级数据处理',
        ],
        color: 'from-pink-400 to-rose-400',
      },
      {
        company: '互联网公司',
        position: 'AI算法工程师',
        period: '2022年1月 - 2023年5月',
        location: '上海',
        description: '参与NLP与CV方向的核心算法研发，推动AI技术在业务场景中的落地。',
        achievements: [
          '开发了文本分类模型，准确率达到95%以上',
          '实现了图像缺陷检测系统，替代人工质检效率提升10倍',
          '优化了模型推理速度，延迟降低60%',
        ],
        color: 'from-purple-400 to-fuchsia-400',
      },
      {
        company: '数据服务公司',
        position: '数据分析实习生',
        period: '2021年7月 - 2021年12月',
        location: '杭州',
        description: '参与数据清洗、特征工程和可视化报告等基础数据工作。',
        achievements: [
          '完成了多个数据清洗和ETL项目',
          '学习了SQL和Python数据分析的最佳实践',
          '参与了A/B测试方案设计和效果评估',
        ],
        color: 'from-teal-400 to-emerald-400',
      },
    ]
  }
}

// Fetch all data at once (for server-side rendering)
export async function fetchAllData() {
  const [siteConfig, skills, projects, experiences] = await Promise.all([
    fetchSiteConfig(),
    fetchSkillsData(),
    fetchProjectsData(),
    fetchExperiencesData(),
  ])

  return {
    siteConfig,
    skills,
    projects,
    experiences,
  }
}