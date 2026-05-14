import '../style/components/Hero.css';
import backgroundImage from '../img/background.jpg';

function Hero() {
    return (
        <section className="hero">

            {/* Pannello di monitoraggio con immagine di sfondo */}
            <div 
                className="hero-visual" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="hero-visual-overlay"></div>
                <div className="hero-screen">
                    <div className="terminal-line">[SYS_STATUS: ONLINE]</div>
                    <div className="terminal-line">[NETWORK: SOLANA_MAINNET]</div>
                    <div className="terminal-line">[CORE_LOAD: OPTIMAL]</div>
                </div>
            </div>
            <div className="hero-content">

                <span className="hero-role">
                    Fullstack & Solidity Developer
                </span>

                <h1 className="hero-title">
                    Building systems, smart contracts and interactive experiences.
                </h1>

                <p className="hero-description">
                    Focused on Web3 infrastructure, simulations,
                    frontend engineering and low-level development.
                </p>

            </div>

        </section>
    );
}

export default Hero;