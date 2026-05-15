import '../style/components/Header.css';
import logoImage from '../img/logo.png';

function Header() {
    return (
        <header className="header">
            <div className="header-brand">
                <img 
                    src={logoImage} 
                    alt="Web3Solnet Operational Logo" 
                    className="header-logo-img" 
                />
                <span className="header-logo-text">
                    WEB3SOLNET
                </span>
            </div>

            <nav className="header-nav">
                <ul>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="#contracts">Contracts</a>
                    </li>
                    <li>
                        <a href="#support">Support Me</a>
                    </li>
                    <li>
                        <a href="#whoami">Who Am I?</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;