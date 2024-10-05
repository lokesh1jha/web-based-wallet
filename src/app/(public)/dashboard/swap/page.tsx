'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SwapPage() {
  const[fromToken, setFromToken]= useState<number>()
  const[fromTokenSymbol, setFromTokenSymbol]= useState<string>("btc")
  const[toToken, setToToken]=useState<number>()
  const[toTokenSymbol, setToTokenSymbol]= useState<string>("eth")

  useEffect(() => {
    if(fromToken)
      setToToken((12.5 as number) * fromToken)
  }, [fromToken])
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Implement token swap logic here
    console.log('Token swap submitted')
    console.log({
      fromToken,
      fromTokenSymbol,
      toToken,
      toTokenSymbol
    })
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
              <div className="flex gap-1">
                <Input className="w-4/6" value={fromToken} onChange={(event)=>setFromToken(Number(event.target.value) )} id="fromToken" placeholder="You send" />
                <Select onValueChange={(value) => setFromTokenSymbol(value)}>
                  <SelectTrigger className="w-2/6">
                    <SelectValue placeholder={fromTokenSymbol?.toUpperCase()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="bnb">BNB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="toToken">To</Label>
              <div className="flex gap-1">
                <Input className="w-4/6" name="toToken" value={toToken} disabled id="toToken" placeholder="You get" />
                <Select onValueChange={(value) => setToTokenSymbol(value)}>
                  <SelectTrigger className="w-2/6">
                    <SelectValue placeholder={toTokenSymbol?.toUpperCase()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="bnb">BNB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
