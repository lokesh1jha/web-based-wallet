'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Coins, Wallet, Rocket, Repeat, Lock, Globe, Code, Moon, Sun, Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const [theme, setTheme] = useState('light')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <header className="container mx-auto px-4 py-4 md:py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/sniff_logo.png" alt="Sniff Logo" width={40} height={40} />
            <h2 className="ml-2 text-lg font-semibold tracking-tight">
              Sniff 
            </h2>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Features</Link>
            <Link href="#products" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Products</Link>
            <Link href="#roadmap" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Roadmap</Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Contact</Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="mt-4 space-y-2 md:hidden">
            <Link href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Features</Link>
            <Link href="#products" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Products</Link>
            <Link href="#roadmap" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Roadmap</Link>
            <Link href="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Contact</Link>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Your Gateway to the Web3 Ecosystem
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Sniff Web3 offers a comprehensive suite of tools for managing digital assets, launching tokens, and participating in the decentralized economy.
              </p>
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <Image
                src="/solana_dev.jpg?height=400&width=600"
                alt="Sniff Web3 Platform"
                width={600}
                height={400}
                className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </section>

        <section id="features" className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Sniff Web3?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-blue-500" />}
              title="Uncompromising Security"
              description="Your assets are protected with state-of-the-art encryption and multi-factor authentication."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Lightning-Fast Transactions"
              description="Execute trades and transfers with unparalleled speed and efficiency across multiple chains."
            />
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-green-500" />}
              title="Multi-Chain Support"
              description="Seamlessly manage assets across various blockchain networks from a single interface."
            />
          </div>
        </section>

        <section id="products" className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Products</h2>
          <div className="space-y-16">
            <ProductCard
              icon={<Wallet className="h-10 w-10 text-blue-500" />}
              title="Web3 Wallet"
              description="Secure, intuitive, and powerful cryptocurrency management"
              features={[
                "Multi-currency support for all major cryptocurrencies",
                "Hardware wallet integration for enhanced security",
                "DApp browser for seamless interaction with decentralized applications",
                "Real-time market data and portfolio tracking"
              ]}
              ctaText="Create Wallet"
              ctaLink="/dashboard/wallet"
              imageUrl="/wallet.jpg?height=300&width=400"
              isReversed={false}
            />
            <ProductCard
              icon={<Rocket className="h-10 w-10 text-purple-500" />}
              title="Token Launchpad"
              description="Create and launch your own token with just a few clicks"
              features={[
                "User-friendly interface for token creation",
                "Customizable tokenomics and distribution models",
                "Automated smart contract generation and deployment",
                "Built-in marketing and community-building tools"
              ]}
              ctaText="Launch Your Token"
              ctaLink="/dashboard/create-token"
              imageUrl="/launch_token.jpg?height=300&width=400"
              isReversed={true}
            />
            <ProductCard
              icon={<Repeat className="h-10 w-10 text-green-500" />}
              title="Coin Swap Platform"
              description="Fast, secure, and low-fee token swaps"
              features={[
                "Access to a wide range of tokens across multiple chains",
                "Competitive rates with minimal slippage",
                "Advanced trading features including limit orders and liquidity pools",
                "Real-time price charts and market analysis tools"
              ]}
              ctaText="Start Swapping"
              ctaLink="/dashboard/swap"
              imageUrl="/coin_swap.webp?height=300&width=400"
              isReversed={false}
            />
          </div>
        </section>

        <section id="roadmap" className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Roadmap: Coming Soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoadmapCard
              icon={<Lock className="h-10 w-10 text-purple-500" />}
              title="Decentralized Identity"
              description="Secure and portable digital identity solution for the Web3 ecosystem."
            />
            <RoadmapCard
              icon={<Globe className="h-10 w-10 text-indigo-500" />}
              title="Cross-Chain Bridge"
              description="Seamlessly transfer assets between different blockchain networks."
            />
            <RoadmapCard
              icon={<Code className="h-10 w-10 text-cyan-500" />}
              title="Smart Contract Auditing"
              description="Automated security checks for your smart contracts."
            />
            <RoadmapCard
              icon={<Rocket className="h-10 w-10 text-pink-500" />}
              title="NFT Marketplace"
              description="Create, buy, and sell unique digital assets with ease."
            />
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Dive into Web3?</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of users already benefiting from the Sniff Web3 ecosystem.
            </p>
            <Button asChild size="lg">
              <Link href="/sign-up">
                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Web3 Wallet</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Token Launchpad</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Coin Swap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Documentation</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">API Reference</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Whitepaper</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Press Kit</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-300">&copy; 2023 Sniff Web3 Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isReversed: boolean;
}

function ProductCard({ icon, title, description, features, ctaText, ctaLink, imageUrl, isReversed }: ProductCardProps) {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
      <div className="w-full md:w-1/2">
        <Image 
          src={imageUrl} 
          alt={title} 
          width={400} 
          height={300} 
          className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <div className="w-full md:w-1/2">
        <Card className="transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <div className="mb-4">{icon}</div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button asChild>
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RoadmapCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}