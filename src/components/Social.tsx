import '../style/components/Social.css';

function Social() {
    return (
        <section className="social-section">
            <div className="social-container">
                <span className="social-label">
                    Connect
                </span>

                <div className="social-links">
                    <a href="https://github.com/sandie69p" target="_blank" rel="noreferrer">
                        GitHub
                    </a>

                    <a href="https://www.linkedin.com/in/tuo-username" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>

                    <a href="https://x.com/tuo-username" target="_blank" rel="noreferrer">
                        X / Twitter
                    </a>

                    <a href="mailto:salvatore.pisu04@gmail.com">
                        Email
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Social;