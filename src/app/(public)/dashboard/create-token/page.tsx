'use client'

import { useState, useRef } from 'react'
import { Connection, Keypair, Transaction } from '@solana/web3.js'
import { createMint } from '@solana/spl-token'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { UploadDropzone } from '@/lib/uplodathing'
import CustomUploadDropzone from '@/components/CustomUploadDropzone'
import { toast } from 'sonner'



export default function CreateTokenPage() {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [decimals, setDecimals] = useState(6)
  const [supply, setSupply] = useState(1)
  const [description, setDescription] = useState('')
  const [totalFees, setTotalFees] = useState(0.1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [revokeUpdate, setRevokeUpdate] = useState(false)
  const [revokeFreeze, setRevokeFreeze] = useState(false)
  const [revokeMint, setRevokeMint] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const connection = new Connection("https://api.devnet.solana.com")
    const payer = Keypair.generate() // Or connect via wallet
    const mintAuthority = payer.publicKey
    const freezeAuthority = revokeFreeze ? null : payer.publicKey // Conditional freeze authority

    try {
      const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        decimals
      )

      console.log("Mint Address:", mint.toBase58())

      const formData = {
        tokenName,
        tokenSymbol,
        decimals,
        supply,
        description,
        totalFees,
        revokeUpdate,
        revokeFreeze,
        revokeMint,
        imagePreview, // Store uploaded image URL here
      }

      console.log("Form Data Submitted:", formData)
    } catch (error) {
      console.error("Token creation failed:", error)
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
                <Input 
                  id="tokenName" 
                  placeholder="Token Name" 
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tokenSymbol">Symbol</Label>
                <Input 
                  id="tokenSymbol" 
                  placeholder="Token Symbol" 
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="decimals">Decimals</Label>
                <Input 
                  id="decimals" 
                  type="number" 
                  placeholder="6"
                  value={decimals}
                  onChange={(e) => setDecimals(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="supply">Supply</Label>
                <Input 
                  id="supply" 
                  type="number" 
                  placeholder="1"
                  value={supply}
                  onChange={(e) => setSupply(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center justify-center w-full h-32 cursor-pointer mt-10">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Token preview" className="w-full h-full object-contain" />
                  ) : (
                    <CustomUploadDropzone
                    isUploading={isLoading}
                    ready={!isLoading}
                    onClientUploadComplete={(res: any) => {
                      setIsLoading(false)
                      setImagePreview(res[0].url)
                      toast.success("Upload Completed")
                    }}
                    onUploadProgress={() => setIsLoading(true)}
                    onUploadError={(error: Error) => {
                      setIsLoading(false)
                      console.error(error)
                      toast.error(`ERROR! ${error.message}`)
                    }}
                    />
                    
                  )}
                  {/* <input
                    type="file"
                    ref={fileInputRef}
                    className=" opacity-0"
                    accept="image/*"
                  /> */}
                </div>
                <p className="text-xs text-gray-500">Most meme coins use a squared 1000x1000 logo</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Token Description" 
                  className="h-32" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Revoke Authorities</h3>
              <p className="text-sm text-gray-500 mb-4">Solana Tokens have 3 authorities: Freeze Authority, Mint Authority, and Update Authority. Revoke them to attract more investors.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeUpdate">Revoke Update (Immutable)</Label>
                  <Switch 
                    id="revokeUpdate" 
                    onCheckedChange={() => setRevokeUpdate(prev => !prev)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeFreeze">Revoke Freeze</Label>
                  <Switch 
                    id="revokeFreeze" 
                    onCheckedChange={() => setRevokeFreeze(prev => !prev)} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeMint">Revoke Mint</Label>
                  <Switch 
                    id="revokeMint" 
                    onCheckedChange={() => setRevokeMint(prev => !prev)} 
                  />
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
