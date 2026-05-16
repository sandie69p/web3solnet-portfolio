import { useState } from 'react';
import Tipping from './Tipping';
import '../style/components/TipSection.css';

function TipSection() {
    const [contributionStatus, setContributionStatus] = useState<"initial" | "active">("initial");

    return (
        <section className="research-support-section" id="support">
            <div className="section-container">
                {/* Visualizzazione Iniziale */}
                {contributionStatus === "initial" && (
                    <div className="contribution-card initial-card">
                        <div className="section-header">
                            <span className="section-label">Support Me</span>
                            <h2 className="section-title">Support My Research & Development.</h2>
                        </div>
                        
                        {/* Linguaggio ammorbidito e più umano */}
                        <p className="section-description">
                            If you like my open-source tools and projects, feel free to buy me a coffee (or some SOL) to support my ongoing research and technical development!
                        </p>

                        <div className="action-panel">
                            <button 
                                className="action-button primary-action" 
                                onClick={() => setContributionStatus("active")}
                            >
                                Send a Tip
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