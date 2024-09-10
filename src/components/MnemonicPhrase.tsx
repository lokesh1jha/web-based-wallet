'use client'

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon, CopyIcon, CheckIcon } from "lucide-react"

interface MnemonicPhraseProps {
  mnemonicPhrase: string
  onNext: () => void
}

const MnemonicPhrase: React.FC<MnemonicPhraseProps> = ({ mnemonicPhrase, onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const toggleReveal = () => setIsRevealed(!isRevealed)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicPhrase)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleConfirmation = (checked: boolean) => {
    setIsConfirmed(checked)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Secret Recovery Phrase</CardTitle>
        <CardDescription>
          Write down this recovery phrase and keep it in a safe place. It will be needed to retrieve your wallet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertDescription>
            Never share your recovery phrase with anyone. Store it securely offline.
          </AlertDescription>
        </Alert>
        <div className="relative">
          <div
            className={`grid grid-cols-3 gap-2 p-4 bg-muted rounded-md ${
              !isRevealed ? "filter blur-sm" : ""
            }`}
          >
            {mnemonicPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-background rounded border"
              >
                <span className="text-muted-foreground">{index + 1}.</span>
                <span className="font-medium">{word}</span>
              </div>
            ))}
          </div>
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button onClick={toggleReveal} variant="secondary">
                <EyeIcon className="mr-2 h-4 w-4" />
                Reveal Recovery Phrase
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button onClick={toggleReveal} variant="outline" size="sm">
            {isRevealed ? (
              <>
                <EyeOffIcon className="mr-2 h-4 w-4" /> Hide Phrase
              </>
            ) : (
              <>
                <EyeIcon className="mr-2 h-4 w-4" /> Show Phrase
              </>
            )}
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="sm" disabled={!isRevealed}>
            {isCopied ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" /> Copied!
              </>
            ) : (
              <>
                <CopyIcon className="mr-2 h-4 w-4" /> Copy to Clipboard
              </>
            )}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" onCheckedChange={handleConfirmation} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have securely stored my recovery phrase
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext} className="w-full" disabled={!isConfirmed}>
          I've Saved My Recovery Phrase
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MnemonicPhrase