import '../style/components/TipSection.css';

function TipSection() {
    return (
        <section className="tip-section" id="support">

            <div className="tip-container">

                <span className="tip-label">
                    Support
                </span>

                <h2 className="tip-title">
                    Buy me the daily breakfast.
                </h2>

                <p className="tip-description">
                    Independent development supported directly by people
                    who enjoy the work.
                </p>

                <div className="tip-actions">

                    <button className="tip-button">
                        Send a tip
                    </button>

                    <span className="tip-wallet">
                        web3solnel.sol.site
                    </span>

                </div>

            </div>

        </section>
    );
}

export default TipSection;