'use client';

import Image from 'next/image';  
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl text-gray-800 mb-5">Welcome to Sniff 🐕 Web Wallet</h1>
        <div>
          <Image
            src='/crypto_wallet.webp'
            alt="Wallet"
            className="max-w-[70%] h-auto mt-5 rounded-lg shadow-md mx-auto"
            width={500}
            height={300}
          />
        </div>
        <div className="mt-5">
          <Link
            className="bg-green-500 text-white py-3 px-6 rounded-md text-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-600"
            href='/create-wallet'
          >
            Create a Wallet 🎟️
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
