import {
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export type TipTransferParams = {
    connection: Connection;
    sender: PublicKey;
    receiver: string;
    amountSol: number;
    sendTransaction: (
        transaction: Transaction,
        connection: Connection
    ) => Promise<string>;
};

export async function sendSolTip({
    connection,
    sender,
    receiver,
    amountSol,
    sendTransaction,
}: TipTransferParams): Promise<string> {
    if (!sender) {
        throw new Error("Wallet not connected.");
    }

    if (!receiver) {
        throw new Error("Receiver address is missing.");
    }

    if (!Number.isFinite(amountSol) || amountSol <= 0) {
        throw new Error("Invalid amount.");
    }

    const receiverPublicKey = new PublicKey(receiver);

    const lamports = Math.round(amountSol * LAMPORTS_PER_SOL);

    if (lamports <= 0) {
        throw new Error("Amount too small.");
    }

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: sender,
            toPubkey: receiverPublicKey,
            lamports,
        })
    );

    transaction.feePayer = sender;

    const latestBlockhash = await connection.getLatestBlockhash();

    transaction.recentBlockhash = latestBlockhash.blockhash;

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(
        {
            signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
    );

    return signature;
}