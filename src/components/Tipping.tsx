import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { sendSolTip } from '../wallet/tipsTransfer'; // Assicurati che il percorso sia corretto

type TippingProps = {
    onCancel: () => void; // Funzione per tornare alla visualizzazione iniziale
};

/**
 * Componente per il Modulo di Contribuzione Finanziaria
 */
function Tipping({ onCancel }: TippingProps) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();
    
    const [contributionAmount, setContributionAmount] = useState<string>('');
    const [operationLoading, setOperationLoading] = useState<boolean>(false);
    const [operationStatus, setOperationStatus] = useState<string>('');
    const [showReceiverAddress, setShowReceiverAddress] = useState<boolean>(false);

    // Indirizzo di ricezione predefinito
    const recipientAddress: string = "2tFjkHazUHaHsGD6jDPS4rwYqFbL8fJfTLweBMCAj9cX";

    /**
     * Esegue la transazione di contribuzione
     */
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

            // Invio della transazione
            const signature = await sendSolTip({
                connection,
                sender: publicKey,
                receiver: recipientAddress,
                amountSol: parsedAmount,
                sendTransaction,
            });

            // Gestione del successo
            setOperationStatus(`Contribution confirmed. TX ID: ${signature.slice(0, 10)}...`);
            setContributionAmount('');
        } catch (error: any) {
            console.error(error);
            // Gestione dell'errore
            setOperationStatus(`Operation Failure. Error: ${error.message || "Unknown execution error."}`);
        } finally {
            setOperationLoading(false);
        }
    };

    return (
        <div className="contribution-module">
            <h3 className="module-title">Contribution Module</h3>
            
            {/* Controllo autenticazione wallet */}
            {!connected ? (
                <div className="authentication-panel">
                    <p>Authentication Required for Transaction Execution.</p>
                    <WalletMultiButton />
                </div>
            ) : (
                <>
                    {/* Input quantità contribuzione */}
                    <div className="form-group">
                        <label htmlFor="contribution-amount">Contribution Value (SOL):</label>
                        <input 
                            id="contribution-amount"
                            className="form-input"
                            type="number" 
                            step="0.1"
                            min="0"
                            placeholder="Specify amount, e.g., 0.5"
                            value={contributionAmount}
                            onChange={(e) => setContributionAmount(e.target.value)}
                            disabled={operationLoading}
                        />
                    </div>

                    {/* Verifica indirizzo ricevente */}
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

                    {/* Visualizzazione stato operazione */}
                    {operationStatus && (
                        <div className={`status-display ${operationLoading ? 'loading' : ''}`}>
                            <p className="status-text">{operationStatus}</p>
                        </div>
                    )}

                    {/* Pannello azioni */}
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

            {/* Pulsante per annullare l'operazione */}
            <button className="action-button secondary-action cancel-action" onClick={onCancel} disabled={operationLoading}>
                Cancel Operation
            </button>
        </div>
    );
}

export default Tipping;