import { useState } from 'react';
import Tipping from './Tipping';
import '../style/components/TipSection.css';

/**
 * Componente per la Sezione di Supporto al Progetto
 */
function TipSection() {
    // Stato per gestire la transizione tra le schede
    const [contributionStatus, setContributionStatus] = useState<"initial" | "active">("initial");

    return (
        <section className="research-support-section" id="support">
            <div className="section-container">
                {/* Visualizzazione Iniziale */}
                {contributionStatus === "initial" && (
                    <div className="contribution-card initial-card">
                        <div className="section-header">
                            <span className="section-label">Support</span>
                            <h2 className="section-title">Invest in Research and Development.</h2>
                        </div>
                        
                        <p className="section-description">
                            We accelerate project timelines through independent, direct investment. Your contribution ensures the highest standard of technical development and operational execution.
                        </p>

                        <div className="action-panel">
                            <button 
                                className="action-button primary-action" 
                                onClick={() => setContributionStatus("active")}
                            >
                                Initiate Contribution
                            </button>
                        </div>
                    </div>
                )}

                {/* Visualizzazione Attiva (Tipping) */}
                {contributionStatus === "active" && (
                    <div className="contribution-card active-card transition-fade-in">
                        <Tipping onCancel={() => setContributionStatus("initial")} />
                    </div>
                )}
            </div>
        </section>
    );
}

export default TipSection;