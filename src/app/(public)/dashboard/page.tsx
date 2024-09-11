import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Wallet, Rocket, Repeat } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to Sniff Dashboard</h1>
      <p className="text-xl text-muted-foreground">
        Manage your crypto assets, create tokens, and swap currencies all in one place.
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-6 w-6" />
              Wallet Management
            </CardTitle>
            <CardDescription>View and manage your crypto assets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Keep track of your balances and transaction history across multiple cryptocurrencies.</p>
            <Button asChild className="w-full sm:w-auto group">
              <Link href="/dashboard/wallet">
                Go to Wallet 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Rocket className="mr-2 h-6 w-6" />
              Token Creation
            </CardTitle>
            <CardDescription>Launch your own cryptocurrency</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create and deploy your custom token on the Solana blockchain with ease.</p>
            <Button asChild variant="secondary" className="w-full sm:w-auto group">
              <Link href="/dashboard/create-token">
                Create Token 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Repeat className="mr-2 h-6 w-6" />
              Token Swap
            </CardTitle>
            <CardDescription>Exchange cryptocurrencies effortlessly</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Swap between different tokens quickly and securely using our integrated exchange.</p>
            <Button asChild variant="outline" className="w-full sm:w-auto group">
              <Link href="/dashboard/swap">
                Swap Tokens 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Connect your Solana wallet using the button in the top right corner</li>
          <li>Explore your wallet balance and transaction history in the Wallet section</li>
          <li>Create your own token in the Create Token section</li>
          <li>Swap between different tokens in the Swap section</li>
        </ol>
      </div>
    </div>
  )
}