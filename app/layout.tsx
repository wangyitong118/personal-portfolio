import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: '王一彤 - 数据科学家 & AI工程师',
  description: '专业的个人作品集网站，展示数据科学、机器学习和AI领域的技术能力与项目经验。',
  keywords: ['数据科学家', 'AI工程师', '机器学习', '深度学习', '作品集', '个人网站', '求职'],
  authors: [{ name: '王一彤' }],
  openGraph: {
    title: '王一彤 - 数据科学家 & AI工程师',
    description: '专业的个人作品集网站，展示数据科学、机器学习和AI领域的技术能力与项目经验。',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}