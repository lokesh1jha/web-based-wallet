import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import { toast } from "./hooks/use-toast"; 
import { toast as notify} from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; 
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

type Account = {
  address: string;
  balance: string;
};

interface SendTokensProps {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

export const SendTokens: React.FC<SendTokensProps> = ({ accounts, setAccounts }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleSend = async () => {
    if (!selectedAccount || !amount || !receiverAddress || !wallet.publicKey) {
      toast({
        title: "Invalid Input",
        description: "Please provide valid input and ensure wallet is connected.",
        variant: "destructive",
      });
      return;
    }

    const amountToSend = parseFloat(amount);
    const currentBalance = parseFloat(selectedAccount.balance);

    if (isNaN(amountToSend) || amountToSend <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    if (amountToSend > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough SOL to complete this transaction.",
        variant: "destructive",
      });
      return;
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(receiverAddress),
        lamports: amountToSend * LAMPORTS_PER_SOL,
      })
    );

    notify.promise(
      wallet.sendTransaction(transaction, connection).then(() => {
        const newBalance = (currentBalance - amountToSend).toFixed(4);
        setSelectedAccount({ ...selectedAccount, balance: newBalance });
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account.address === selectedAccount.address
              ? { ...account, balance: newBalance }
              : account
          )
        );
        setIsDialogOpen(false);
        setAmount("");
        setReceiverAddress("");
      }),
      {
        loading: `Sending ${amount} SOL to ${receiverAddress}...`,
        success: `${amount} SOL sent successfully to ${receiverAddress}.`,
        error: "Transaction failed. Please try again.",
      }
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Send SOL</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send SOL</DialogTitle>
          <DialogDescription>
            Enter the receiver's address and the amount to send.
          </DialogDescription>
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSend}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
