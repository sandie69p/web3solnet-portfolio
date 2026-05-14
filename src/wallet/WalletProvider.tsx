import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react";

import {
    WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

import {
    PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

import {
    clusterApiUrl
} from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

import { useMemo } from "react";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

function SolanaProvider({
    children
}: Props) {

    const network = "https://mainnet.helius-rpc.com/?api-key=f8f41540-d9dd-40a6-b052-9c814ecaf0ba";

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter()
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={network}>

            <WalletProvider
                wallets={wallets}
                autoConnect
            >

                <WalletModalProvider>
                    {children}
                </WalletModalProvider>

            </WalletProvider>

        </ConnectionProvider>
    );
}

export default SolanaProvider;