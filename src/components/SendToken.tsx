"use client";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { toast } from "./hooks/use-toast";
import { toast as notify } from "sonner";
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
  selectedAccount: Account | null;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SendTokens: React.FC<SendTokensProps> = ({
  selectedAccount,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const { connection } = useConnection();

  useEffect(() => {
    fetchPrivateKey();
  }, [selectedAccount]);

  // Fetch the private key of the selected account from localStorage
  const fetchPrivateKey = async () => {
    if (selectedAccount) {
      const accounts = localStorage.getItem(`accounts`);
      if (accounts) {
        const parsedAccounts = JSON.parse(accounts);
        for (const account of parsedAccounts) {
          if (account.address === selectedAccount.address) {
            setPrivateKey(account.privateKey);
          }
        }
      }
    }
  };

  // Transfer SOL tokens
  const transferTokens = async (
    connection: any,
    receiverAddress: string,
    amountToSend: number
  ): Promise<string> => {
    console.log("receiverAddress", receiverAddress);

    if (!privateKey) {
      throw new Error("Sender private key not found");
    }

    console.log("privateKey", privateKey, Buffer.from(privateKey, 'base64'));

    let senderKeypair;

    if (privateKey.includes(",")) {
      // If the private key is comma-separated (Uint8Array), split and convert to Uint8Array
      const privateKeyArray = privateKey.split(",").map((num) => parseInt(num, 10));

      // Ensure the length of the array is 64 bytes
      if (privateKeyArray.length === 64) {
        senderKeypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
      } else {
        throw new Error("Invalid private key length (comma-separated). Must be 64 bytes.");
      }

    } else {
      // If the private key is a base64-encoded string, decode it
      const privateKeyBuffer = Buffer.from(privateKey, 'base64');

      // Ensure the length of the decoded array is 64 bytes
      if (privateKeyBuffer.length === 64) {
        senderKeypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyBuffer));
      } else {
        throw new Error("Invalid private key length (base64). Must be 64 bytes.");
      }
    }

    console.log("Generated Keypair:", senderKeypair);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        //@ts-ignore
        fromPubkey: senderKeypair.publicKey,
        toPubkey: new PublicKey(receiverAddress),
        lamports: amountToSend * LAMPORTS_PER_SOL,
      })
    );

    // Sign and send the transaction
    const signature = await connection.sendTransaction(transaction, [senderKeypair]);
    return signature;
  };

  // Handle sending tokens
  const handleSend = async () => {
    if (!amount || !receiverAddress || !selectedAccount) {
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

    notify.promise(
      transferTokens(connection, receiverAddress, amountToSend)
        .then((_item: any) => {
          setIsDialogOpen(false);
          setAmount("");
          setReceiverAddress("");
        })
        .catch((error: any) => {
          console.log(error);
          toast({
            title: "Transaction Failed",
            description: "Please try again.",
            variant: "destructive",
          });
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
