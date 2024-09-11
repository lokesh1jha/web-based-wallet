'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Upload, Twitter, MessageCircle, Globe } from 'lucide-react'

export default function CreateTokenPage() {
  const [addSocialLinks, setAddSocialLinks] = useState(false)
  const [totalFees, setTotalFees] = useState(0.1)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Implement token creation logic here
    console.log('Token creation submitted')
  }

  const handleAuthorityToggle = (authority: string) => {
    setTotalFees(prev => prev + 0.1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 mt-8">SOLANA TOKEN MAKER</h1>
      <Card className="w-full max-w-3xl bg-gray-800 text-white">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Token</CardTitle>
            <CardDescription>Fill in the details to create your Solana token</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tokenName" className="text-sm font-medium">Name</Label>
                <Input id="tokenName" placeholder="Put the name of your Token" className="bg-gray-700 text-white" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tokenSymbol" className="text-sm font-medium">Symbol</Label>
                <Input id="tokenSymbol" placeholder="Put the symbol of your Token" className="bg-gray-700 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="decimals" className="text-sm font-medium">Decimals</Label>
                <Input id="decimals" type="number" placeholder="6" className="bg-gray-700 text-white" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="supply" className="text-sm font-medium">Supply</Label>
                <Input id="supply" type="number" placeholder="1" className="bg-gray-700 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image" className="text-sm font-medium">Image</Label>
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-gray-600 bg-gray-700">
                  <Button variant="ghost" className="flex flex-col items-center text-white">
                    <Upload className="w-8 h-8 mb-2" />
                    Upload Image
                  </Button>
                </div>
                <p className="text-xs text-gray-400">Most meme coins use a squared 1000x1000 logo</p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea id="description" placeholder="Put the description of your Token" className="h-32 bg-gray-700 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="addSocialLinks" checked={addSocialLinks} onCheckedChange={setAddSocialLinks} />
              <Label htmlFor="addSocialLinks" className="text-sm font-medium">Add Social Links</Label>
            </div>
            {addSocialLinks && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="website" placeholder="Put your website" className="pl-10 bg-gray-700 text-white" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="twitter" className="text-sm font-medium">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="twitter" placeholder="Put your twitter" className="pl-10 bg-gray-700 text-white" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="telegram" className="text-sm font-medium">Telegram</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="telegram" placeholder="Put your telegram" className="pl-10 bg-gray-700 text-white" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="discord" className="text-sm font-medium">Discord</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="discord" placeholder="Put your discord" className="pl-10 bg-gray-700 text-white" />
                  </div>
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold mb-2">Revoke Authorities</h3>
              <p className="text-sm text-gray-400 mb-4">Solana Tokens have 3 authorities: Freeze Authority, Mint Authority and Update Authority. Revoke them to attract more investors.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeUpdate" className="text-sm font-medium">Revoke Update (Immutable)</Label>
                  <Switch id="revokeUpdate" onCheckedChange={() => handleAuthorityToggle('update')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeFreeze" className="text-sm font-medium">Revoke Freeze</Label>
                  <Switch id="revokeFreeze" onCheckedChange={() => handleAuthorityToggle('freeze')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revokeMint" className="text-sm font-medium">Revoke Mint</Label>
                  <Switch id="revokeMint" onCheckedChange={() => handleAuthorityToggle('mint')} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm">Total Fees: {totalFees.toFixed(2)} SOL</div>
            <Button type="submit" className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
              Create Token
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-8 w-full max-w-3xl">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Are you going to Create a Liquidity Pool?</CardTitle>
            <CardDescription>
              If you want to create a liquidity pool you will need to Revoke Freeze Authority of the Token.
              You can also Revoke the Mint Authority to get the people reliability.
              You can do both here, each one costs 0.1 SOL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Connect your wallet please." className="bg-gray-700 text-white" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full text-white border-white hover:bg-gray-700">Revoke Freeze Authority</Button>
              <Button variant="outline" className="w-full text-white border-white hover:bg-gray-700">Revoke Mint Authority</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 w-full max-w-3xl">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl">How to use Solana Token Creator</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Connect your Solana wallet</li>
              <li>Write the name you want for your Token</li>
              <li>Indicate the symbol (max 8 characters)</li>
              <li>Select the decimals quantity (0 for Whitelist Token, 6 for utility token)</li>
              <li>Write the description you want for your SPL Token</li>
              <li>Upload the image for your token (PNG)</li>
              <li>Put the Supply of your Token</li>
              <li>Click on create, accept the transaction and wait until your token is ready</li>
            </ol>
            <p className="mt-4 text-sm text-gray-400">
              The cost of creating the Token is 0.1 SOL, it includes all fees needed for the SPL Token Creation.
              The creation process will start and will take some seconds. After that you will receive the total supply of the token in the wallet you chose.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 w-full max-w-3xl mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1" className="border-b border-gray-700">
            <AccordionTrigger className="text-white hover:no-underline hover:text-teal-500">What is Solana Token Creator?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Solana Token Creator is a tool that allows you to easily create your own Solana SPL Token without any coding knowledge. It provides a user-friendly interface to set up your token's properties and launch it on the Solana blockchain.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2" className="border-b border-gray-700">
            <AccordionTrigger className="text-white hover:no-underline hover:text-teal-500">Is it Safe to use Solana Token Creator here?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, our Solana Token Creator is designed with security in mind. We do not store your private keys or have access to your funds. All transactions are processed directly through your connected wallet.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3" className="border-b border-gray-700">
            <AccordionTrigger className="text-white hover:no-underline hover:text-teal-500">How much time will Solana Token Creator Take?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              The time of your Token Creation depends on the TPS Status of Solana. It usually takes just a few seconds so do not worry, your token will be ready really soon!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4" className="border-b border-gray-700">
            <AccordionTrigger className="text-white hover:no-underline hover:text-teal-500">How much does the Solana Token Creator Cost?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              The base cost for creating a token is 0.1 SOL, which includes all fees needed for the SPL Token Creation. Additional features like revoking authorities may incur extra costs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5" className="border-b border-gray-700">
            <AccordionTrigger className="text-white hover:no-underline hover:text-teal-500">Which wallet can I use?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              You can use any Solana-compatible wallet such as Phantom, Solflare, or Sollet. Make sure your wallet is connected to the Solana network before creating your token.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}