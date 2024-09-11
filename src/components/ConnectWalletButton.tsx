'use client'

import { buttonVariants } from "@/components/ui/button"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export default function ConnectWalletButton() {
  const [balance, setBalance] = useState<number | null>(null)
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  useEffect(() => {
    if (publicKey) {
      const getBalance = async () => {
        const newBalance = await connection.getBalance(publicKey)
        setBalance(newBalance / LAMPORTS_PER_SOL)
      }

      getBalance()
      const intervalId = setInterval(getBalance, 10000)

      return () => clearInterval(intervalId)
    } else {
      setBalance(null)
    }
  }, [publicKey, connection])

  return (
    <WalletMultiButton
      className={buttonVariants({ size: "sm" })}
      style={{ 
        height: "36px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      {balance !== null ? `${balance.toFixed(2)} SOL` : "Connect Wallet"}
    </WalletMultiButton>
  )
}