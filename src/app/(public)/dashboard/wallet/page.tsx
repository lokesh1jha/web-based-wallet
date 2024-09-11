"use client"

import React, { useEffect, useState } from "react"
import NewWallet from "@/components/NewWallet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Copy, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/hooks/use-toast"
import { createNewWallet } from "@/utils/accounts"

interface Account {
  address: string
  balance: string
}

const Wallet: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [createNew, setCreateNew] = useState(false)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const storedAccounts = localStorage.getItem("accounts")
      if (storedAccounts) {
        const parsedAccounts: Account[] = JSON.parse(storedAccounts)
        setAccounts(parsedAccounts)
        if (parsedAccounts.length > 0) {
          setSelectedAccount(parsedAccounts[0])
          await fetchBalance(parsedAccounts[0].address)
        }
      }
    } catch (err) {
      console.error("Error fetching accounts:", err)
      setError("Failed to load accounts. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBalance = async (address: string) => {
    // Implement actual balance fetching logic here
    // For now, we'll just use a mock balance
    const mockBalance = (Math.random() * 10).toFixed(4)
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.address === address ? { ...account, balance: mockBalance } : account
      )
    )
    if (selectedAccount && selectedAccount.address === address) {
      setSelectedAccount(prev => prev ? { ...prev, balance: mockBalance } : null)
    }
  }

  const handleCreateNew = () => {
    setCreateNew(true)
  }

  const handleCreateAnotherWallet = async () => {
    try {
      const newAccount = createNewWallet()
      toast({
        title: "New Wallet Created",
        description: `A new wallet with address ${newAccount.address.slice(0, 6)}...${newAccount.address.slice(-4)} has been created and selected.`,
      })
      return
      const updatedAccounts = [...accounts, newAccount]
      // setAccounts(updatedAccounts)
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts))
      // setSelectedAccount(newAccount)
      await fetchBalance(newAccount.address)
      toast({
        title: "New Wallet Created",
        description: `A new wallet with address ${newAccount.address.slice(0, 6)}...${newAccount.address.slice(-4)} has been created and selected.`,
      })
    } catch (err) {
      console.error("Error creating new wallet:", err)
      toast({
        title: "Error",
        description: "Failed to create a new wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSelectAccount = async (address: string) => {
    const account = accounts.find(acc => acc.address === address)
    if (account) {
      setSelectedAccount(account)
      await fetchBalance(address)
    }
  }

  const copyAddress = () => {
    if (selectedAccount) {
      navigator.clipboard.writeText(selectedAccount.address)
      toast({
        title: "Address Copied",
        description: "The wallet address has been copied to your clipboard.",
      })
    }
  }

  const handleSend = () => {
    if (!selectedAccount || !amount || !receiverAddress) return

    const amountToSend = parseFloat(amount)
    const currentBalance = parseFloat(selectedAccount.balance)

    if (amountToSend > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough SOL to complete this transaction.",
        variant: "destructive",
      })
      return
    }

    // Implement actual sending logic here
    // For now, we'll just show a success message
    toast({
      title: "Transaction Successful",
      description: `${amount} SOL sent to ${receiverAddress}`,
    })

    setIsDialogOpen(false)
    setAmount("")
    setReceiverAddress("")
    // Update the balance after sending
    const newBalance = (currentBalance - amountToSend).toFixed(4)
    setSelectedAccount({ ...selectedAccount, balance: newBalance })
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.address === selectedAccount.address ? { ...account, balance: newBalance } : account
      )
    )
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Manage your crypto accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length > 0 ? (
            <div className="space-y-4">
              <Select onValueChange={handleSelectAccount} value={selectedAccount?.address}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a wallet" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.address} value={account.address}>
                      {account.address.slice(0, 6)}...{account.address.slice(-4)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedAccount && (
                <div className="p-4 border rounded-lg">
                  <div className="font-medium flex justify-between items-center">
                    <span>Address: {selectedAccount.address.slice(0, 6)}...{selectedAccount.address.slice(-4)}</span>
                    <Button variant="ghost" size="icon" onClick={copyAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>Balance: {selectedAccount.balance} SOL</div>
                </div>
              )}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send SOL
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send SOL</DialogTitle>
                    <DialogDescription>Enter the receiver's address and the amount to send.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="receiver" className="text-right">
                        To
                      </Label>
                      <Input
                        id="receiver"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="col-span-3"
                        type="number"
                        step="0.0001"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSend}>Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button onClick={handleCreateAnotherWallet} variant="outline" className="w-full">Create Another Wallet</Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div>No accounts available. Please create a new account.</div>
              <Button onClick={handleCreateNew} className="w-full">Create Wallet</Button>
            </div>
          )}
        </CardContent>
      </Card>
      {/* {createNew && <NewWallet onWalletCreated={handleCreateAnotherWallet} />} */}
    </>
  )
}

export default Wallet