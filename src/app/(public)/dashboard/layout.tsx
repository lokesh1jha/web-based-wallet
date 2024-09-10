import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Sidebar from '@/components/Sidebar'
import ConnectWalletButton from '@/components/ConnectWalletButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sniff Dashboard',
  description: 'Manage your crypto assets and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="bg-gray-800 shadow-md">
                <div className="container flex items-center justify-between h-16 px-4">
                  <h1 className="text-2xl font-bold">Sniff Dashboard</h1>
                  <ConnectWalletButton />
                </div>
              </header>
              <main className="flex-1 overflow-y-auto py-8 px-4 bg-gray-900">
                <div className="container max-w-4xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}