import '../style/components/Social.css';
import logoImage from '../img/logo.png';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-system">
            <div className="footer-container">
                
                <div className="footer-brand">
                    <img src={logoImage} alt="System Logo" className="footer-logo-mini" />
                    <div className="footer-brand-info">
                        <span className="footer-brand-name">WEB3SOLNET</span>
                        <span className="footer-brand-tag">Operational Intelligence & Web3 Development</span>
                    </div>
                </div>

                <div className="footer-meta">
                    <div className="meta-item">
                        <span className="meta-label">Environment:</span>
                        <span className="meta-value">Mainnet-Beta</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Status:</span>
                        <span className="meta-value status-online">Operational</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">© {currentYear}</span>
                        <span className="meta-value">All Rights Reserved.</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;