'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SwapPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Implement token swap logic here
    console.log('Token swap submitted')
  }

  return (
    <div className="flex items-center justify-center"> 
    <Card className="w-96 mt-8"> 
      <CardHeader className="mb-8">
        <CardTitle>Swap</CardTitle>
        <CardDescription>Swap tokens</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fromToken">From</Label>
              <Input id="fromToken" placeholder="Enter amount" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="toToken">To</Label>
              <Input id="toToken" placeholder="Enter amount" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit">Swap Tokens</Button>
        </CardFooter>
      </form>
    </Card>
   </div>
  )
}