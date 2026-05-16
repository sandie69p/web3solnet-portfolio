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
                    <div className="terminal-line">[aviability: always]</div>
                    <div className="terminal-line">[Related to: solana_mainnet]</div>
                </div>
            </div>
            <div className="hero-content">

                <span className="hero-role">
                    Fullstack & Solidity Developer
                </span>

                <h1 className="hero-title">
                    Salvatore Pisu
                </h1>

                <p className="hero-description">
                    Focused on Web3 infrastructure, simulations,
                    frontend engineering and low-level development.
                </p>

                <p>{/** Inserisco linguaggi miei piu' usati */}</p>



            </div>

        </section>
    );
}

export default Hero;