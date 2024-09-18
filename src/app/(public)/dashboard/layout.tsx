'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, Rocket, Repeat, Home, LayoutDashboard, AlignJustify, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/create-token', icon: Rocket, label: 'Create Token' },
  { href: '/dashboard/swap', icon: Repeat, label: 'Swap' },
];

function WalletButton() {
  const { connected } = useWallet();

  return connected ? (
    <WalletDisconnectButton className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors text-sm" />
  ) : (
    <WalletMultiButton className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm" />
  );
}

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  useEffect(() => {
    const closeSidebar = () => setIsSidebarOpen(false);
    window.addEventListener('resize', closeSidebar);
    window.addEventListener('orientationchange', closeSidebar);

    return () => {
      window.removeEventListener('resize', closeSidebar);
      window.removeEventListener('orientationchange', closeSidebar);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 90);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress value={progress} className="w-full h-1" />
        </div>
      )}
      <header className="sticky top-0 z-40 w-full border-b border-gray-700 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center">
            <button
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-gray-700 md:hidden"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-menu"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <AlignJustify className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </button>
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-sm sm:text-base md:text-lg">Sniff Dashboard</span>
            </Link>
          </div>
          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-gray-300",
                  pathname === item.href ? "text-purple-400" : "text-gray-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Wallet buttons */}
          <div className="flex items-center">
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <WalletButton />
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </div>
        </div>
      </header>
      <div className="flex">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              id="sidebar-menu"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex h-full flex-col overflow-y-auto border-r border-gray-700 pt-6 shadow-sm">
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
                          pathname === item.href ? "bg-gray-700 text-purple-400" : "text-gray-400",
                          "hover:bg-gray-700 hover:text-white"
                        )}
                        onClick={() => setIsSidebarOpen(false)}
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
            </motion.aside>
          )}
        </AnimatePresence>
        <div className="flex-1">
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-4xl">      
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}