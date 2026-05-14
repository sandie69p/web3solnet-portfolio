import '../style/components/Social.css';

function Social() {
    return (
        <section className="social-section">
            <div className="social-container">
                <span className="social-label">
                    Connect
                </span>

                <div className="social-links">
                    <a href="https://github.com/tuo-username" target="_blank" rel="noreferrer">
                        GitHub
                    </a>

                    <a href="https://www.linkedin.com/in/tuo-username" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>

                    <a href="https://x.com/tuo-username" target="_blank" rel="noreferrer">
                        X / Twitter
                    </a>

                    <a href="mailto:tua-email@example.com">
                        Email
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Social;