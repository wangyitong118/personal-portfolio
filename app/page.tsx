import HomeClient from '@/components/HomeClient'
import { getSiteData } from '@/data/site-data-dynamic'

export default async function Home() {
  const siteData = await getSiteData()
  
  return (
    <HomeClient 
      siteConfig={siteData.siteConfig}
      heroData={siteData.heroData}
      skillsData={siteData.skillsData}
      projectsData={siteData.projectsData}
      experiencesData={siteData.experiencesData}
      educationData={siteData.educationData}
      certificationsData={siteData.certificationsData}
      ctaData={siteData.ctaData}
      navigationData={siteData.navigationData}
    />
  )
}