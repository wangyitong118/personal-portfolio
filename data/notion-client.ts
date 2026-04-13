// Notion Internal Integration Client using native fetch
// Supports both ntn_ (internal) and secret_ (standard) tokens

const NOTION_API_BASE = 'https://api.notion.com/v1'

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
  icon?: string
}

interface ProjectData {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  color: string
  icon?: string
}

interface ExperienceData {
  company: string
  position: string
  period: string
  location: string
  description: string
  achievements: string[]
  color: string
  icon?: string
}

async function notionFetch(path: string, options: RequestInit = {}) {
  const apiKey = process.env.NOTION_API_KEY || ''
  
  const response = await fetch(`${NOTION_API_BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

function extractText(richTextArray?: any[]): string {
  if (!richTextArray || !Array.isArray(richTextArray)) return ''
  return richTextArray.map(item => item.plain_text || '').join('')
}

function extractTitle(titleArray?: any[]): string {
  if (!titleArray || !Array.isArray(titleArray)) return ''
  return titleArray.map(item => item.plain_text || '').join('')
}

function extractNumber(numberObj?: any): number {
  if (!numberObj || typeof numberObj.number !== 'number') return 0
  return numberObj.number
}

function extractMultiSelect(multiSelectObj?: any): string[] {
  if (!multiSelectObj || !Array.isArray(multiSelectObj.multi_select)) return []
  return multiSelectObj.multi_select.map((item: any) => item.name)
}

function extractUrl(urlObj?: any): string {
  if (!urlObj || !urlObj.url) return ''
  return urlObj.url
}

function extractIcon(page?: any): string {
  if (!page) return ''
  if (page.icon?.emoji) return page.icon.emoji
  if (page.icon?.type === 'external' && page.icon.external?.url) return page.icon.external.url
  if (page.icon?.type === 'file' && page.icon.file?.url) return page.icon.file.url
  return ''
}

function extractSelect(selectObj?: any): string {
  if (!selectObj || !selectObj.select?.name) return ''
  return selectObj.select.name
}

export async function fetchSiteConfig(): Promise<SiteConfigData> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID || ''
    
    const response = await notionFetch(`/databases/${databaseId}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: '类型',
          select: {
            equals: 'SiteConfig'
          }
        },
        page_size: 1,
      }),
    })

    const page = response.results[0]
    if (!page) throw new Error('No SiteConfig found')

    const props = page.properties

    return {
      name: extractTitle(props.名称?.title) || '王一彤',
      title: extractText(props.标题?.rich_text) || '数据科学家 & AI工程师',
      email: extractText(props.邮箱?.rich_text) || '15141251539@163.com',
      phone: extractText(props.电话?.rich_text) || '15141251539',
      location: extractText(props.地点?.rich_text) || '远程 / 北京 / 上海 / 杭州',
      github: extractUrl(props.GitHub) || 'https://github.com/yourusername',
      linkedin: extractUrl(props.LinkedIn) || 'https://linkedin.com/in/yourusername',
      twitter: extractUrl(props.Twitter) || 'https://twitter.com/yourusername',
    }
  } catch (error) {
    console.error('Error fetching site config from Notion:', error)
    throw error
  }
}

const gradients = [
  'from-pink-400 to-rose-400',
  'from-purple-400 to-fuchsia-400',
  'from-teal-400 to-emerald-400',
  'from-blue-400 to-indigo-400',
]

export async function fetchSkillsData(): Promise<SkillData[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID || ''
    
    const response = await notionFetch(`/databases/${databaseId}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: '类型',
          select: {
            equals: 'Skill'
          }
        },
        sorts: [{ property: '排序', direction: 'ascending' }],
        page_size: 100,
      }),
    })

    return (response.results as NotionPage[]).map((page, index) => {
      const props = page.properties
      return {
        name: extractTitle(props.名称?.title) || '未命名技能',
        description: extractText(props.描述?.rich_text) || '',
        level: extractNumber(props.熟练度) || 0,
        gradient: gradients[index % gradients.length] || 'from-pink-400 to-rose-400',
        icon: extractIcon(page) || props.图标?.select?.name || '💡',
      }
    })
  } catch (error) {
    console.error('Error fetching skills from Notion:', error)
    throw error
  }
}

const colors = ['#f9a8d4', '#c084fc', '#5eead4', '#93c5fd']

export async function fetchProjectsData(): Promise<ProjectData[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID || ''
    
    const response = await notionFetch(`/databases/${databaseId}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: '类型',
          select: {
            equals: 'Project'
          }
        },
        sorts: [{ property: '排序', direction: 'ascending' }],
        page_size: 100,
      }),
    })

    return (response.results as NotionPage[]).map((page, index) => {
      const props = page.properties
      return {
        title: extractTitle(props.名称?.title) || '未命名项目',
        description: extractText(props.描述?.rich_text) || '',
        technologies: extractMultiSelect(props.技术栈) || [],
        githubUrl: extractUrl(props.GitHub) || 'https://github.com/yourusername',
        liveUrl: extractUrl(props.LiveURL) || 'https://demo.vercel.app',
        color: colors[index % colors.length] || '#f9a8d4',
        icon: extractIcon(page) || props.图标?.select?.name || '🚀',
      }
    })
  } catch (error) {
    console.error('Error fetching projects from Notion:', error)
    throw error
  }
}

export async function fetchExperiencesData(): Promise<ExperienceData[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID || ''
    
    const response = await notionFetch(`/databases/${databaseId}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          property: '类型',
          select: {
            equals: 'Experience'
          }
        },
        sorts: [{ property: '排序', direction: 'ascending' }],
        page_size: 100,
      }),
    })

    return (response.results as NotionPage[]).map((page, index) => {
      const props = page.properties
      
      const achievementsText = extractText(props.成就?.rich_text) || ''
      const achievements = achievementsText.split('\n').filter(line => line.trim())

      return {
        company: extractText(props.公司?.rich_text) || '公司名称',
        position: extractText(props.职位?.rich_text) || '职位',
        period: extractText(props.时间段?.rich_text) || '时间段',
        location: extractText(props.地点?.rich_text) || '地点',
        description: extractText(props.描述?.rich_text) || '',
        achievements,
        color: gradients[index % gradients.length] || 'from-pink-400 to-rose-400',
        icon: extractIcon(page) || props.图标?.select?.name || '💼',
      }
    })
  } catch (error) {
    console.error('Error fetching experiences from Notion:', error)
    throw error
  }
}

export async function fetchAllData() {
  const [siteConfig, skills, projects, experiences] = await Promise.all([
    fetchSiteConfig().catch(() => null),
    fetchSkillsData().catch(() => []),
    fetchProjectsData().catch(() => []),
    fetchExperiencesData().catch(() => []),
  ])

  return { siteConfig, skills, projects, experiences }
}
