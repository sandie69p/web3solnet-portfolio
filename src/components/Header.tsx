import '../style/components/Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                WEB3SOLNET
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
                </ul>
            </nav>
        </header>
    );
}

export default Header;