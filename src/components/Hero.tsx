import '../style/components/Hero.css';

function Hero() {
    return (
        <section className="hero">

            <div className="hero-visual">
                <div className="hero-screen">
                    {/* image / animation / dashboard */}
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