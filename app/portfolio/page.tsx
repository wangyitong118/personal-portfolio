import { getProjectsData } from '@/data/site-data-dynamic'
import { PortfolioClient } from './PortfolioClient'

export const metadata = {
  title: '作品集 - 王一彤',
  description: '我的完整项目作品集，展示数据科学与AI领域的实战经验与技术能力',
}

export default async function PortfolioPage() {
  const projectsData = await getProjectsData()
  
  return <PortfolioClient projectsData={projectsData} />
}