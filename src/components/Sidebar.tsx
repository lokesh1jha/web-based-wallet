'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wallet, Rocket, Repeat, Home, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
    { href: '/dashboard/create-token', icon: Rocket, label: 'Create Token' },
    { href: '/dashboard/swap', icon: Repeat, label: 'Swap' },
  ]

  return (
    <div className="pb-12 w-64 bg-secondary">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Sniff Dashboard
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary-foreground/10",
                  "hover:bg-secondary-foreground/5"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}