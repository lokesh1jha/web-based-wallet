'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // Implement wallet connection logic here
    setIsConnected(true)
  }

  return (
    <Button onClick={handleConnect} disabled={isConnected}>
      {isConnected ? 'Connected' : 'Connect Wallet'}
    </Button>
  )
}