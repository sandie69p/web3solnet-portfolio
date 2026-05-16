import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { sendSolTip } from '../wallet/tipsTransfer';

import solIcon from '../img/sol.svg';
import usdcIcon from '../img/usdc.svg';

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
    
    const [solPriceUsd, setSolPriceUsd] = useState<number | null>(null);
    const [usdcValue, setUsdcValue] = useState<string>('0.00');

    // Il tuo indirizzo personale fisso
    const recipientAddress: string = "2tFjkHazUHaHsGD6jDPS4rwYqFbL8fJfTLweBMCAj9cX";

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
                console.error("Unable to fetch SOL/USDC price feed:", error);
            }
        };

        fetchSolPrice();
        const interval = setInterval(fetchSolPrice, 60000);
        return () => clearInterval(interval);
    }, []);

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
            setOperationStatus("Please connect your wallet first.");
            return;
        }

        const parsedAmount = parseFloat(contributionAmount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setOperationStatus("Please enter a valid amount of SOL.");
            return;
        }

        try {
            setOperationLoading(true);
            setOperationStatus("Sending transaction...");

            const signature = await sendSolTip({
                connection,
                sender: publicKey,
                receiver: recipientAddress,
                amountSol: parsedAmount,
                sendTransaction,
            });

            setOperationStatus(`Thank you! Transaction confirmed. ID: ${signature.slice(0, 10)}...`);
            setContributionAmount('');
        } catch (error: any) {
            console.error(error);
            // Linguaggio ammorbidito per il fallimento
            setOperationStatus("Transaction canceled or failed.");
        } finally {
            setOperationLoading(false);
        }
    };

    return (
        <div className="contribution-module">
            <h3 className="module-title">Send a Tip</h3>
            
            {!connected ? (
                <div className="authentication-panel">
                    {/* Testo più standard e accogliente */}
                    <p style={{ marginBottom: '16px', color: 'var(--gotham-text-muted)' }}>
                        Connect your wallet to support my work.
                    </p>
                    <WalletMultiButton />
                </div>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="contribution-amount">Amount (SOL):</label>
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
                            <div className="currency-badge">
                                <img src={solIcon} alt="SOL" className="currency-icon" />
                                <span className="input-unit-label">SOL</span>
                            </div>
                        </div>
                        
                        <div className="conversion-analytics-line">
                            <span className="analytics-label">Est. Value:</span>
                            <div className="conversion-value-wrapper">
                                <img src={usdcIcon} alt="USDC" className="currency-icon-small" />
                                <span className="analytics-value">{usdcValue} USDC</span>
                            </div>
                        </div>
                    </div>

                    {/* Sezione Indirizzo con nota di trasparenza */}
                    <div className="form-group" style={{ marginTop: '8px' }}>
                        <p className="info-label" style={{ marginBottom: '4px' }}>Recipient Wallet</p>
                        <span className="address-note" style={{ fontSize: '0.75rem', color: 'var(--gotham-text-muted)', display: 'block', marginBottom: '8px' }}>
                            This is my personal donation address. Feel free to verify it before sending.
                        </span>
                        
                        {showReceiverAddress ? (
                            <div className="address-display-wrapper">
                                <span className="address-display">{recipientAddress}</span>
                            </div>
                        ) : (
                            <button 
                                className="action-button secondary-action" 
                                onClick={() => setShowReceiverAddress(true)}
                                disabled={operationLoading}
                                style={{ padding: '10px 20px', fontSize: '0.75rem' }}
                            >
                                Show Address
                            </button>
                        )}
                    </div>

                    {operationStatus && (
                        <div className={`status-display ${operationLoading ? 'loading-pulse' : ''}`}>
                            <div className="status-header">
                                <span className="status-dot"></span>
                                <span className="status-label">Status Log</span>
                            </div>
                            <p className="status-text">{operationStatus}</p>
                        </div>
                    )}

                    <div className="action-panel">
                        <button 
                            className="action-button primary-action" 
                            onClick={executeContribution}
                            disabled={operationLoading}
                        >
                            {operationLoading ? "Sending..." : "Confirm Tip"}
                        </button>
                    </div>
                </>
            )}

            <button className="action-button secondary-action cancel-action" onClick={onCancel} disabled={operationLoading}>
                Back
            </button>
        </div>
    );
}

export default Tipping;