'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateTokenPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Implement token creation logic here
    console.log('Token creation submitted')
  }

  return (
    <div className="flex items-center justify-center"> 
    <Card className="w-96 mt-8"> 
      <CardHeader>
        <CardTitle>Launch Token</CardTitle>
        <CardDescription>Create your own token</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tokenName">Token Name</Label>
              <Input id="tokenName" placeholder="Enter token name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tokenSymbol">Token Symbol</Label>
              <Input id="tokenSymbol" placeholder="Enter token symbol" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="totalSupply">Total Supply</Label>
              <Input id="totalSupply" type="number" placeholder="Enter total supply" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Launch Token</Button>
        </CardFooter>
      </form>
    </Card>
    </div>
  )
}