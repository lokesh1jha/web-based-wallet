'use client'

import { useState } from 'react'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMint, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from '@solana/spl-token'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from '@/components/hooks/use-toast'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { toast as notify } from "sonner";
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import CustomUploadDropzone from '@/components/CustomUploadDropzone'



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
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    tokenName: '',
    tokenSymbol: '',
    supply: '',
    decimals: '',
    image: '',
    description: ''
  })

  const toggleEdit = async () => {
    setIsEditing((current) => !current)
    setImagePreview(null)
  }

  const { connection } = useConnection();
  const wallet = useWallet();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

        // Validate required fields
    const newErrors = {
      tokenName: tokenName ? '' : 'Token Name is required',
      tokenSymbol: tokenSymbol ? '' : 'Token Symbol is required',
      supply: supply > 0 ? '' : 'Supply is required',
      decimals: decimals >= 0 ? '' : 'Decimals is required',
      image: imagePreview ? '' : 'Image is required',
      description: description ? '' : 'Description is required',
    }
    setErrors(newErrors)

    const missingFields = Object.values(newErrors).filter(error => error !== '');

    if (missingFields.length > 0) {
      toast({
        title: `Please fill in all required fields`,
        description: `Missing fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    notify.promise(
      createToken()
        .then((_item: any) => {
          console.log("Token created successfully");
        })
        .catch((error: any) => {
          console.log(error);
        }),
      {
        loading: `Creating Token ...`,
        success: `Congratulations! Token created successfully`,
        error: "Failed to create token. Please try again.",
      }
    );
  }


  async function createToken() {
    if (!wallet || !wallet.publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet",
      })
      throw new Error('Wallet not connected');
    }
    const mintKeypair = Keypair.generate();
    const metadata = {
        mint: mintKeypair.publicKey,
        name: tokenName,
        symbol: tokenSymbol,
        uri: imagePreview || 'https://cdn.100xdevs.com/metadata.json',
        additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
        createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mintKeypair.publicKey,
            metadata: mintKeypair.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: wallet.publicKey,
            updateAuthority: wallet.publicKey,
        }),
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);

    await wallet.sendTransaction(transaction, connection);

    console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
    const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
    );

    console.log(associatedToken.toBase58());

    const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            associatedToken,
            wallet.publicKey,
            mintKeypair.publicKey,
            TOKEN_2022_PROGRAM_ID,
        ),
    );

    await wallet.sendTransaction(transaction2, connection);

    const transaction3 = new Transaction().add(
        createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_2022_PROGRAM_ID)
    );

    await wallet.sendTransaction(transaction3, connection);

    console.log("Minted!")
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
                <div className='flex items-center justify-between'>
                  <Label htmlFor="image">Image</Label>
                  <div>
                    {!isEditing && imagePreview && (
                    <>
                      <Pencil className="lg:h-4 lg:w-4 w-3 h-3" onClick={toggleEdit} />
                    </>
                  )}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-32 cursor-pointer mt-10">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Token preview"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <CustomUploadDropzone
                      isUploading={isLoading}
                      onClientUploadComplete={(res: any) => {
                        setIsLoading(false)
                        setImagePreview(res[0].url)
                        toast({
                          title: 'Image uploaded',
                          description: 'Your image has been uploaded successfully.',
                          variant: "default"
                        })
                      }}
                      onUploadError={(error: Error) => {
                        setIsLoading(false)
                        console.error(error)
                        toast({
                          title: 'Error uploading image',
                          description: error.message,
                          variant: "destructive"
                        })
                      }}
                    />
                  )}
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