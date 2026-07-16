import { useState } from 'react';
import { 
    ArrowRight, 
    FolderGit2,
    ExternalLink,
    Cpu,
    Briefcase,
    User,
    Mail,
    Phone,
    Sparkles,
    Code,
    Award,
    Calendar
} from 'lucide-react'
import { FaGithub, FaLinkedin} from "react-icons/fa";
import { SKILL_ICONS } from '../data/skillsIcon';
import data from '../data/portfolio-data.json'
import ContactForm from '../components/ContactForm'

const Home = () => {
    const ICONS = { github: FaGithub, linkedin: FaLinkedin};

    const personalInfo = data.profile;
    const skills = data.skills;
    const contact = data.contact;
    const projects = data.projects;
    const experiences = data.experience;

    const [activeTab, setActiveTab] = useState('about');
    return (
        <div className="home">
            <section id="intro">
                <div className="hero-background-glow"></div>
                <div className="intro-content">
                    <div className="status-badge">
                        <span className="pulse-dot"></span>
                        {contact?.availability}
                    </div>
                    <h1 className="intro-title">
                        Hi, I'm <span className="gradient-text">{personalInfo?.name}</span>
                    </h1>
                    <h2 className="intro-subtitle">{personalInfo?.role}</h2>
                    <p className="intro-description">{personalInfo?.tagline}</p>
                    <div className="intro-buttons">
                        <a href="#projects">
                        View Work <FolderGit2 size={18} />
                        </a>
                        <a href="#contact">
                        Let's Connect <ArrowRight size={18} />
                        </a>
                    </div>
                </div>

                <div className="intro-interactive-card">
                    <div className="card-header-accent">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <pre className="code-snippet">
                        <code>
                {`const developer = {
                name: "Bereket",
                role: "Full-Stack Dev",
                stack: ["React", "PHP"],
                passion: "Web solutions"
                };`}
                        </code>
                    </pre>
                </div>
            </section>

            <section id="about">
                <div className="section-header">
                    <span className="section-tagline">Background</span>
                    <h2 className="section-title">Expertise & Journey</h2>
                    <div className="title-underline"></div>
                </div>
                
                <div className="tabs-container">
                    <div className="tabs-list">
                        <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
                            <User size={16} /> About Me
                        </button>
                        <button onClick={() => setActiveTab('experience')} className={activeTab === 'experience' ? 'active' : ''}>
                            <Briefcase size={16} /> Experience
                        </button>

                        <button onClick={() => setActiveTab('skills')} className={activeTab === 'skills' ? 'active' : ''}>
                            <Cpu size={16} /> Tech Stack
                        </button>
                    </div>
                    <div className="tabs-content">

                        {activeTab === 'about' && (
                            <div className="about-layout">
                                
                                <div className="about-card-left">
                                    <div className="detail-paragraphs">
                                        {personalInfo?.detail?.join(" ")}
                                    </div>
                                    <blockquote className="about-goal-blockquote">
                                        <span className="quote-mark">“</span>
                                        {personalInfo?.goal}
                                    </blockquote>
                                </div>
                                <div className="about-card-right">
                                    <h3 className="about-card-title">Interests</h3>
                                    <p className="about-interest">{personalInfo?.interest}</p>
                                    <div className="about-metric-row">
                                        <div className="metric-item">
                                            <Award size={18} />
                                            <span>Goal Oriented</span>
                                        </div>
                                        <div className="metric-item">
                                            <Code size={18} />
                                            <span>Clean Code</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="skills-grid">
                                {Object.entries(skills).length > 0 ? (
                                    Object.entries(skills).map(([category, items]) => (
                                    <div key={category} className="skill-row">
                                        <div className="skill-category-header">
                                            <Code size={18} className="category-icon" />
                                            <h3>{category}</h3>
                                        </div>

                                        <div className="skills-container">
                                            {items.map((item) => {
                                                const Icon = SKILL_ICONS[item];
                                                return (
                                                    <span key={item} className="skill-chip">
                                                    {Icon && <Icon size={14} />}
                                                    {item}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    ))
                                ) : (
                                    <p>No skills to display.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div className="timeline-wrapper">
                                <div className="timeline-line"></div>
                                {Object.entries(experiences).length > 0 ? (
                                    Object.entries(experiences).map(([id, exp], index) => (
                                        <div key={id} className="timeline-item">
                                            <div className="timeline-node-container">
                                                <div className="timeline-node-outer">
                                                    <div className="timeline-node-inner"></div>
                                                </div>
                                            </div>
                                            <div className="timeline-card">
                                                <div className="timeline-card-header">
                                                    <span className="timeline-duration">
                                                        <Calendar size={13} /> {exp.duration}
                                                    </span>
                                                    <h3 className="timeline-role">{exp.title}</h3>
                                                    <span className="timeline-company">@ {exp.company}</span>
                                                </div>
                                                <p className="timeline-desc">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="fallback-text">No experience to display.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id="projects">
                <div className="section-header">
                    <span className="section-tagline">Showcase</span>
                    <h2 className="section-title">Selected Projects</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="projects-grid">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div className="project-card" key={project.id || index}>
                                <div className='project-image-container'>
                                    <img src={project.image} className='project-image'/>
                                </div>
                                <div className="project-body">
                                    <h3 className="project-title">
                                        {project.title}
                                    </h3>

                                    <p className="project-desc">
                                        {project.description}
                                    </p>

                                    <div className="tag-row">
                                        {project.tags?.map((tag) => (
                                            <span key={tag} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <ExternalLink size={15} />
                                                Live
                                            </a>
                                        )}

                                        {project.codeUrl && (
                                            <a
                                                href={project.codeUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FaGithub size={15} />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="fallback-text">
                            No projects found.
                        </p>
                    )}
                </div>
            </section>

            <section id="contact">
                <div className="section-header">
                    <span className="section-tagline">Get In Touch</span>
                    <h2 className="section-title">Let's Connect</h2>
                    <div className="title-underline"></div>
                </div>
                <div className="contact-grid">
                        <div className="contact-info-row">
                            <a href={`mailto:${data.contact.email}`} className="contact-info-item">
                                <div className="icon-wrapper"><Mail size={18} /></div>
                                <span>{data.contact.email}</span>
                            </a>

                            <a href={`tel:${data.contact.phone}`} className="contact-info-item">
                                <div className="icon-wrapper"><Phone size={18} /></div>
                                <span>{data.contact.phone}</span>
                            </a>

                            <div className="socials-row">
                                {data.contact.socials.map((s) => {
                                    const Icon = ICONS[s.icon];
                                    return (
                                        <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    <ContactForm />
                </div>
            </section>
        </div>
    )
}

export default Home;