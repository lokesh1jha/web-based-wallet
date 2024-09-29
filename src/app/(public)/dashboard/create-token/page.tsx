'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload } from 'lucide-react'

export default function CreateTokenPage() {
  const [totalFees, setTotalFees] = useState(0.1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("event.currentTarget", event.currentTarget)

    // Implement token creation logic here
    console.log('Token creation submitted')
  }

  const handleAuthorityToggle = (checked: boolean) => {
    setTotalFees((prev) => checked ? prev + 0.1 : prev - 0.1)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl mt-8 bg-white">
        <CardHeader className="mb-8">
          <CardTitle className="text-2xl">Create Your Token</CardTitle>
          <CardDescription>Fill in the details to create your Solana token</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tokenName">Name</Label>
                <Input id="tokenName" placeholder="Put the name of your Token" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tokenSymbol">Symbol</Label>
                <Input id="tokenSymbol" placeholder="Put the symbol of your Token" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="decimals">Decimals</Label>
                <Input id="decimals" type="number" placeholder="6" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="supply">Supply</Label>
                <Input id="supply" type="number" placeholder="1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image</Label>
                <div
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Token preview" className="w-full h-full object-contain" />
                  ) : (
                    <Button variant="ghost" className="flex flex-col items-center">
                      <Upload className="w-8 h-8 mb-2" />
                      Upload Image
                    </Button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-xs text-gray-500">Most meme coins use a squared 1000x1000 logo</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Put the description of your Token" className="h-32" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Revoke Authorities</h3>
              <p className="text-sm text-gray-500 mb-4">Solana Tokens have 3 authorities: Freeze Authority, Mint Authority and Update Authority. Revoke them to attract more investors.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeUpdate">Revoke Update (Immutable)</Label>
                  <Switch id="revokeUpdate" onCheckedChange={handleAuthorityToggle} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeFreeze">Revoke Freeze</Label>
                  <Switch id="revokeFreeze" onCheckedChange={handleAuthorityToggle} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeMint">Revoke Mint</Label>
                  <Switch id="revokeMint" onCheckedChange={handleAuthorityToggle} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-4">
            <div className="text-sm">Total Fees: {totalFees.toFixed(2)} SOL</div>
            <Button type="submit">Create Token</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}