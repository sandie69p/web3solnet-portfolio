import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { sendSolTip } from '../wallet/tipsTransfer';

type TippingProps = {
    onCancel: () => void;
};

function Tipping({ onCancel }: TippingProps) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();
    
    const [contributionAmount, setContributionAmount] = useState<string>('');
    const [operationLoading, setOperationLoading] = useState<boolean>(false);
    const [operationStatus, setOperationStatus] = useState<string>('');
    const [showReceiverAddress, setShowReceiverAddress] = useState<boolean>(false);
    
    // Stati per la conversione SOL -> USDC
    const [solPriceUsd, setSolPriceUsd] = useState<number | null>(null);
    const [usdcValue, setUsdcValue] = useState<string>('0.00');

    const recipientAddress: string = "2tFjkHazUHaHsGD6jDPS4rwYqFbL8fJfTLweBMCAj9cX";

    // Recupera il prezzo di SOL in tempo reale all'avvio del modulo
    useEffect(() => {
        const fetchSolPrice = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
                );
                const data = await response.json();
                if (data && data.solana && data.solana.usd) {
                    setSolPriceUsd(data.solana.usd);
                }
            } catch (error) {
                console.error("Impossibile recuperare il feed dei prezzi SOL/USDC:", error);
            }
        };

        fetchSolPrice();
        // Aggiorna il prezzo ogni 60 secondi
        const interval = setInterval(fetchSolPrice, 60000);
        return () => clearInterval(interval);
    }, []);

    // Calcola la conversione appena cambia l'ammontare inserito o il prezzo di mercato
    useEffect(() => {
        const parsed = parseFloat(contributionAmount);
        if (!isNaN(parsed) && parsed > 0 && solPriceUsd) {
            setUsdcValue((parsed * solPriceUsd).toFixed(2));
        } else {
            setUsdcValue('0.00');
        }
    }, [contributionAmount, solPriceUsd]);

    const executeContribution = async () => {
        if (!connected || !publicKey) {
            setOperationStatus("Authentication Required. Connect wallet.");
            return;
        }

        const parsedAmount = parseFloat(contributionAmount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setOperationStatus("Invalid amount specified. Recalculate contribution.");
            return;
        }

        try {
            setOperationLoading(true);
            setOperationStatus("Transaction execution in progress...");

            const signature = await sendSolTip({
                connection,
                sender: publicKey,
                receiver: recipientAddress,
                amountSol: parsedAmount,
                sendTransaction,
            });

            setOperationStatus(`Contribution confirmed. TX ID: ${signature.slice(0, 10)}...`);
            setContributionAmount('');
        } catch (error: any) {
            console.error(error);
            setOperationStatus(`Operation Failure. Error: ${error.message || "Unknown execution error."}`);
        } finally {
            setOperationLoading(false);
        }
    };

    return (
        <div className="contribution-module">
            <h3 className="module-title">Contribution Module</h3>
            
            {!connected ? (
                <div className="authentication-panel">
                    <p>Authentication Required for Transaction Execution.</p>
                    <WalletMultiButton />
                </div>
            ) : (
                <>
                    {/* Input quantità con modulo di conversione */}
                    <div className="form-group">
                        <label htmlFor="contribution-amount">Contribution Value (SOL):</label>
                        <div className="input-container-gotham">
                            <input 
                                id="contribution-amount"
                                className="form-input hide-spinners"
                                type="number" 
                                step="0.1"
                                min="0"
                                placeholder="0.00"
                                value={contributionAmount}
                                onChange={(e) => setContributionAmount(e.target.value)}
                                disabled={operationLoading}
                            />
                            <span className="input-unit-label">SOL</span>
                        </div>
                        
                        {/* Riga di conversione analitica in USDC */}
                        <div className="conversion-analytics-line">
                            <span className="analytics-label">Est. Value:</span>
                            <span className="analytics-value">~ {usdcValue} USDC</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <p className="info-label">Recipient Address Verification</p>
                        {showReceiverAddress ? (
                            <span className="info-value address-display">{recipientAddress}</span>
                        ) : (
                            <button 
                                className="action-button secondary-action" 
                                onClick={() => setShowReceiverAddress(true)}
                                disabled={operationLoading}
                            >
                                Verify Recipient Address
                            </button>
                        )}
                    </div>

                    {operationStatus && (
                        <div className={`status-display ${operationLoading ? 'loading' : ''}`}>
                            <p className="status-text">{operationStatus}</p>
                        </div>
                    )}

                    <div className="action-panel">
                        <button 
                            className="action-button primary-action" 
                            onClick={executeContribution}
                            disabled={operationLoading}
                        >
                            {operationLoading ? "Executing Transaction..." : "Confirm and Execute Contribution"}
                        </button>
                    </div>
                </>
            )}

            <button className="action-button secondary-action cancel-action" onClick={onCancel} disabled={operationLoading}>
                Cancel Operation
            </button>
        </div>
    );
}

export default Tipping;