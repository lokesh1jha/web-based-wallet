'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wallet, Rocket, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === '/wallet' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href="/wallet">
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === '/create-token' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href="/create-token">
                <Rocket className="mr-2 h-4 w-4" />
                Create Token
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === '/swap' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href="/swap">
                <Repeat className="mr-2 h-4 w-4" />
                Swap
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}