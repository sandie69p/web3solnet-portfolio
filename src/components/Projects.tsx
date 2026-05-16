import '../style/components/Projects.css';

const PROJECTS_DATA = [
    {
        id: 1,
        title: "Municipal Reporting System",
        description: "An operational decentralized reporting platform designed for municipal infrastructure monitoring, auditing, and automated status deployment.",
        languages: ["C99", "Python", "Makefile"],
        githubUrl: "https://github.com/sandie69p/Progetto-PSD-2025-2026---Traccia-3", 
        difficulty: "ADVANCED"
    },

    {
        id: 2,
        title: "Glassmorphism Tracker",
        description: "A sleek, real-time crypto price tracker built with Node.js/Binance API, Chart.js, and a modern Glassmorphism UI. Features include dynamic interval selection (1h to 1w), segmented price line/fill (green/red) based on the starting value, and distinct branding colors for BTC, ETH, and SOL. Perfect blend of style and technical data visualization.",
        languages: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/sandie69p/Glassmorphism_Tracker",
        difficulty: "EASY"
    }
];

function Projects() {
    return (
        <section className="projects-section" id="projects">
            <div className="section-container">
                <div className="section-header">
                    <span className="section-label">Repository</span>
                    <h2 className="section-title">Operational Deployments & Projects.</h2>
                </div>

                <div className="projects-container-single">
                    {PROJECTS_DATA.map((project) => (
                        <div className="project-card" key={project.id}>
                            <div className="project-card-header">
                                <h3 className="project-card-title">{project.title}</h3>
                                <span className={`difficulty-badge ${project.difficulty.toLowerCase()}`}>
                                    {project.difficulty}
                                </span>
                            </div>

                            <p className="project-card-description">
                                {project.description}
                            </p>

                            <div className="project-meta-row">
                                <div className="tech-stack-container">
                                    {project.languages.map((lang, idx) => (
                                        <span key={idx} className="tech-badge">
                                            {lang}
                                        </span>
                                    ))}
                                </div>

                                <a 
                                    href={project.githubUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="project-git-link"
                                >
                                    [SRC_CODE]
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;