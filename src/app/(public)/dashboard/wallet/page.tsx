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
import { toast } from '@/components/hooks/use-toast'
import { get } from "http"
import { getSolanaBalance, sendSolTransaction, SOLANA_SYMBOL } from "@/utils/tokens/solana"
import { getEthereumBalance, sendEthereumTransaction } from "@/utils/tokens/etherum"


interface Wallet {
  name?: string
  symbol: string
  publicKey: string
  privateKey: string
  balance?: string
}

interface Account {
  name: string
  wallets: Wallet[]
}

const Wallet = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [createNew, setCreateNew] = useState(false)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const storedAccounts = localStorage.getItem("accounts")
      console.log("storedAccounts", storedAccounts)
      if (storedAccounts) {
        const parsedAccounts: Account[] = JSON.parse(storedAccounts)
        console.log("parsedAccounts", parsedAccounts, parsedAccounts.length, "oth: ", parsedAccounts[0])
        setAccounts(parsedAccounts)
        if (parsedAccounts.length === 0) {
          setCreateNew(true)
        }
        // fetch solana anf eth public key with symbol macth and fecth the balance
        const updatedBalance = await fetchBalance(parsedAccounts[0])

        setSelectedAccount(updatedBalance)
      }
    } catch (error) {
      console.error("Error fetching accounts:", error)
      setError("Failed to fetch accounts")
    }
    finally {
      setIsLoading(false)
    }
  }

  const fetchBalance = async (account: Account): Promise<Account> => {
    try {
      console.log("fetchBalance", account)
      const updatedWallets = await Promise.all(
        account?.wallets?.map(async (wallet) => {
          let balance = "0";

          if (wallet.symbol === "SOL") {
            balance = await getSolanaBalance(wallet.publicKey);
          } else if (wallet.symbol === "ETH") {
            balance = await getEthereumBalance(wallet.publicKey);
          }

          return {
            ...wallet,
            balance, // Update the balance
          };
        })
      );

      return {
        ...account,
        wallets: updatedWallets, // Return the account with updated wallets
      };
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  };

  const handleCreateNew = () => {
    setCreateNew(true)
  }

  const handleAccountChange = (accountName: string) => {
    const account = accounts.find(acc => acc.name === accountName)
    if (account) {
      setSelectedAccount(account)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The address has been copied to your clipboard.",
    })
  }

  const handleSend = async (symbol: string) => {
    toast({
      title: `Send ${symbol}`,
      description: "This would open a dialog to send tokens.",
    });

    if (!selectedAccount || !amount || !receiverAddress || !symbol) return;

    const amountToSend = parseFloat(amount);
    const currentBalance = parseFloat(selectedAccount.wallets.find(wallet => wallet.symbol === symbol)?.balance || "0");

    if (amountToSend > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to complete this transaction.",
        variant: "destructive",
      });
      return;
    }

    let response;
    const privateKey = selectedAccount.wallets.find(wallet => wallet.symbol === symbol)?.privateKey;
    if (!privateKey) {
      toast({
        title: "Error",
        description: "Private key not found.",
        variant: "destructive",
      });
      return;
    }
    if (symbol === SOLANA_SYMBOL) {
      response = await sendSolTransaction(
        privateKey,
        receiverAddress,
        amountToSend
      );
    } else if (symbol === "ETH") {
      response = await sendEthereumTransaction(
        privateKey,
        receiverAddress,
        "" + amountToSend
      );
    }

    if (response && response.status === 200) {
      toast({
        title: "Transaction Successful",
        description: `${amount} ${symbol} sent to ${receiverAddress}`,
      });

      // Update balances
      const updatedWallets = selectedAccount.wallets.map(wallet => {
        if (wallet.symbol === symbol) {
          const updatedBalance = (parseFloat(wallet?.balance ?? "0") - amountToSend).toFixed(4);
          return { ...wallet, balance: updatedBalance };
        }
        return wallet;
      });

      setSelectedAccount({ ...selectedAccount, wallets: updatedWallets });
      setAccounts(prevAccounts =>
        prevAccounts.map(account =>
          account.name === selectedAccount.name ? { ...account, wallets: updatedWallets } : account
        )
      );

      setIsDialogOpen(false);
      setAmount("");
      setReceiverAddress("");
    }
  };

  const handleCreateAnotherWallet = async () => {
    const newAccount = await createNewWallet(); // Await the promise
    setAccounts(prevAccounts => {
      const updatedAccounts = [...prevAccounts, newAccount];
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      return updatedAccounts;
    });
  
    // Set the newly created account as the selected account
    handleAccountChange(newAccount.name); // Ensure this updates the selected account
  
    toast({
      title: "New Wallet Created",
      description: "A new wallet has been created.",
    });
  };
  

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
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sniff Wallet</CardTitle>
          <CardDescription>Manage your crypto accounts</CardDescription>

        </CardHeader>
        {accounts.length > 0 ? (
          <CardContent className="space-y-4">
            <Select onValueChange={handleAccountChange} defaultValue={selectedAccount?.name}>
              <SelectTrigger>
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.name} value={account.name}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedAccount && selectedAccount.wallets.map((wallet) => (
              <div>
                <Card key={wallet.publicKey} className="p-4 hover:bg-accent transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{wallet.symbol}</span>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(wallet.publicKey)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{wallet.publicKey}</div>
                  <div className="flex justify-between items-center">
                    <span>Balance: {wallet.balance} {wallet.symbol}</span>
                    <Button variant="default" size="sm" onClick={() => handleSend(wallet.symbol)}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </Card>
                <Button onClick={handleCreateAnotherWallet} variant="outline" className="w-full">Create New Account</Button>
              </div>
            ))}
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <div className="text-center space-y-6">
              <div>No accounts available. Please create a new account.</div>
              <Button onClick={handleCreateNew} className="w-full">Create Wallet</Button>
            </div>
          </CardContent>
        )}
      </Card>
      {createNew &&
        <div className="w-full max-w-md mx-auto mt-8">
          <NewWallet />
        </div>}
    </>
  )
}

export default Wallet