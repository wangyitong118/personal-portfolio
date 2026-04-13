import { fetchAllData } from './notion-client'

// Fallback static data (used when Notion is not configured or fails)
const fallbackSiteConfig = {
  name: '王一彤',
  title: '数据科学家 & AI工程师',
  email: '15141251539@163.com',
  phone: '15141251539',
  location: '远程 / 北京 / 上海 / 杭州',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
}

const fallbackHeroData = {
  badge: '✨ 正在寻找新的机会',
  greeting: '你好，我是',
  description:
    '一名充满热情的**数据科学家 & AI工程师**，专注于**数据驱动决策与智能系统构建**。拥有丰富的 **机器学习、深度学习和数据分析**经验。',
  stats: [
    { value: '3+', label: '年经验' },
    { value: '10+', label: '模型项目' },
    { value: '100%', label: '项目交付率' },
    { value: '持续', label: '学习成长' },
  ],
  scrollText: 'DATA SCIENTIST • AI ENGINEER • ML RESEARCHER •',
}

const fallbackSkillsData = [
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

const fallbackProjectsData = [
  {
    title: '智能推荐系统',
    description:
      '基于协同过滤与深度学习的混合推荐系统，为电商平台提供个性化商品推荐。',
    technologies: ['Python', 'PyTorch', 'Scikit-learn', 'FastAPI'],
    githubUrl: 'https://github.com/yourusername/recommendation-system',
    liveUrl: 'https://recsys-demo.vercel.app',
    color: '#f9a8d4',
  },
  {
    title: 'NLP 文本分类引擎',
    description:
      '基于 Transformer 的多标签文本分类系统，支持情感分析、主题识别等任务。',
    technologies: ['Transformers', 'BERT', 'HuggingFace', 'Docker'],
    githubUrl: 'https://github.com/yourusername/nlp-classifier',
    liveUrl: 'https://nlp-demo.vercel.app',
    color: '#c4b5fd',
  },
  {
    title: '数据可视化平台',
    description:
      '交互式数据分析仪表盘，支持多维度数据探索、实时监控和自动报告生成。',
    technologies: ['Python', 'Plotly', 'Streamlit', 'Pandas'],
    githubUrl: 'https://github.com/yourusername/data-viz-platform',
    liveUrl: 'https://dataviz-demo.vercel.app',
    color: '#99f6e4',
  },
  {
    title: '计算机视觉检测系统',
    description:
      '基于目标检测的工业质检系统，实现产品缺陷自动识别与分类。',
    technologies: ['YOLOv8', 'OpenCV', 'PyTorch', 'Flask'],
    githubUrl: 'https://github.com/yourusername/cv-inspection',
    liveUrl: 'https://cv-demo.vercel.app',
    color: '#fda4af',
  },
]

const fallbackExperiencesData = [
  {
    company: '科技公司',
    position: '数据科学家',
    period: '2023年6月 - 至今',
    location: '北京',
    description:
      '负责公司核心业务的数据分析与机器学习模型开发，驱动数据化运营决策。',
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
    description:
      '参与NLP与CV方向的核心算法研发，推动AI技术在业务场景中的落地。',
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
    description:
      '参与数据清洗、特征工程和可视化报告等基础数据工作。',
    achievements: [
      '完成了多个数据清洗和ETL项目',
      '学习了SQL和Python数据分析的最佳实践',
      '参与了A/B测试方案设计和效果评估',
    ],
    color: 'from-teal-400 to-emerald-400',
  },
]

const fallbackEducationData = [
  {
    school: '某某大学',
    degree: '计算机科学与技术 学士',
    period: '2018年9月 - 2022年6月',
    description: '主修计算机科学，专注于数据科学与软件工程。',
    achievements: [
      'GPA: 3.8/4.0',
      '获得校级优秀毕业生称号',
      '参与多个开源项目贡献',
    ],
  },
]

const fallbackCertificationsData = [
  { name: 'AWS 机器学习专项认证', date: '2023年12月' },
  { name: 'TensorFlow 开发者认证', date: '2023年8月' },
  { name: 'Python 数据分析认证', date: '2023年5月' },
  { name: '深度学习专项课程', date: '2023年3月' },
]

const fallbackCtaData = {
  heading: '准备好开始合作了吗？ 💫',
  description:
    '我正在寻找新的机会，期待与优秀的团队合作。如果你有合适的职位或项目，欢迎随时联系我！',
  stats: [
    { value: '24小时', label: '平均回复时间' },
    { value: '100%', label: '项目完成率' },
    { value: '50+', label: '技术面试通过' },
  ],
  status: '积极寻找新的机会',
  expectedPosition: '数据科学家 / AI工程师 / 机器学习工程师',
}

const fallbackNavigationData = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '/about' },
  { name: '项目', href: '/projects' },
  { name: '博客', href: '/blog' },
  { name: '简历', href: '/resume' },
  { name: '联系', href: '/contact' },
]

// Main function to get data (with Notion fallback)
export async function getSiteData() {
  try {
    // Check if Notion is configured
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.warn('Notion API key or database ID not configured, using fallback data')
      return getFallbackData()
    }

    // Try to fetch from Notion
    const notionData = await fetchAllData()
    
    // Transform Notion data to match our schema
    return {
      siteConfig: notionData.siteConfig || fallbackSiteConfig,
      heroData: fallbackHeroData, // Keep static hero data for now
      skillsData: notionData.skills || fallbackSkillsData,
      projectsData: notionData.projects || fallbackProjectsData,
      experiencesData: notionData.experiences || fallbackExperiencesData,
      educationData: fallbackEducationData,
      certificationsData: fallbackCertificationsData,
      ctaData: fallbackCtaData,
      navigationData: fallbackNavigationData,
    }
  } catch (error) {
    console.error('Error fetching data from Notion, using fallback:', error)
    return getFallbackData()
  }
}

// Fallback data function
function getFallbackData() {
  return {
    siteConfig: fallbackSiteConfig,
    heroData: fallbackHeroData,
    skillsData: fallbackSkillsData,
    projectsData: fallbackProjectsData,
    experiencesData: fallbackExperiencesData,
    educationData: fallbackEducationData,
    certificationsData: fallbackCertificationsData,
    ctaData: fallbackCtaData,
    navigationData: fallbackNavigationData,
  }
}

// Export individual data getters for server components
export async function getSiteConfig() {
  const data = await getSiteData()
  return data.siteConfig
}

export async function getHeroData() {
  const data = await getSiteData()
  return data.heroData
}

export async function getSkillsData() {
  const data = await getSiteData()
  return data.skillsData
}

export async function getProjectsData() {
  const data = await getSiteData()
  return data.projectsData
}

export async function getExperiencesData() {
  const data = await getSiteData()
  return data.experiencesData
}

export async function getEducationData() {
  const data = await getSiteData()
  return data.educationData
}

export async function getCertificationsData() {
  const data = await getSiteData()
  return data.certificationsData
}

export async function getCtaData() {
  const data = await getSiteData()
  return data.ctaData
}

export async function getNavigationData() {
  const data = await getSiteData()
  return data.navigationData
}