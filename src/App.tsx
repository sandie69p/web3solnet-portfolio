import { useState } from "react"
import { ethers } from "ethers"
import MainABI from "./abi/Main.json";
import NFT from './components/NFT'
import './style/App.css'

function App() {
  

  return (
    <>
      <main>
        <div>
          <NFT />
        </div>
      </main>
    </>
  )
}

export default App
