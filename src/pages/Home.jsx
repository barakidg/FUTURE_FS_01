import { useState, useMemo } from 'react';
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
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SKILL_ICONS } from '../data/skillsIcon';
import data from '../data/portfolio-data.json'
import ContactForm from '../components/ContactForm'

const EASE = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true, margin: "-80px" };

const StaggerGroup = ({ children, className, variants, ...rest }) => (
    <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        {...rest}
    >
        {children}
    </motion.div>
);

const SectionHeader = ({ tagline, title, groupVariants, itemVariants, lineVariants }) => (
    <StaggerGroup className="section-header" variants={groupVariants}>
        <motion.span className="section-tagline" variants={itemVariants}>{tagline}</motion.span>
        <motion.h2 className="section-title" variants={itemVariants}>{title}</motion.h2>
        <motion.div className="title-underline" style={{ transformOrigin: 'left' }} variants={lineVariants} />
    </StaggerGroup>
);

const Home = () => {
    const ICONS = { github: FaGithub, linkedin: FaLinkedin};

    const personalInfo = data.profile;
    const skills = data.skills;
    const contact = data.contact;
    const projects = data.projects;
    const experiences = data.experience;

    const [activeTab, setActiveTab] = useState('about');

    const reduceMotion = useReducedMotion();

    const anim = useMemo(() => {
        const rise = reduceMotion ? 0 : 26;
        const riseSm = reduceMotion ? 0 : 14;
        const shift = reduceMotion ? 0 : 36;

        const fadeUp = {
            hidden: { opacity: 0, y: rise },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
        };

        const fadeUpSm = {
            hidden: { opacity: 0, y: riseSm },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }
        };

        const staggerHero = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
        const staggerHeader = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
        const staggerProjects = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
        const staggerContact = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

        const fadeInSide = (fromX, delay = 0) => ({
            hidden: { opacity: 0, x: reduceMotion ? 0 : fromX },
            show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay } }
        });

        const drawLine = {
            hidden: { scaleX: 0, opacity: 0 },
            show: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: EASE } }
        };

        const drawSpine = {
            hidden: { scaleY: 0 },
            show: { opacity: 1, scaleY: 1, transition: { duration: 0.7, ease: EASE } }
        };

        const tabPanel = {
            hidden: { opacity: 0, x: shift },
            show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: EASE, staggerChildren: 0.06, delayChildren: 0.08 }
            },
            exit: { opacity: 0, x: reduceMotion ? 0 : -shift, transition: { duration: 0.22, ease: EASE } }
        };

        return {
            fadeUp, fadeUpSm,
            staggerHero, staggerHeader, staggerProjects, staggerContact,
            fadeInSide, drawLine, drawSpine, tabPanel
        };
    }, [reduceMotion]);

    return (
        <div className="home">
            <section id="intro">
                <div className="intro-background-glow"></div>
                <motion.div 
                    className="intro-content"
                    variants={anim.staggerHero}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div className="status-badge" variants={anim.fadeUp}>
                        <span className="pulse-dot"></span>
                        {contact?.availability}
                    </motion.div>
                    <motion.h1 className="intro-title" variants={anim.fadeUp}>
                        Hi, I'm <span className="gradient-text">{personalInfo?.name}</span>
                    </motion.h1>
                    <motion.h2 className="intro-subtitle" variants={anim.fadeUp}>{personalInfo?.role}</motion.h2>
                    <motion.p className="intro-description" variants={anim.fadeUp}>{personalInfo?.tagline}</motion.p>
                    <motion.div className="intro-buttons" variants={anim.fadeUp}>
                        <a href="#projects">
                        View Work <FolderGit2 size={18} />
                        </a>
                        <a href="#contact">
                        Let's Connect <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="intro-interactive-card"
                    variants={anim.fadeInSide(60, 0.35)}
                    initial="hidden"
                    animate="show"
                >
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
                </motion.div>
            </section>
            
            <section id="about">
                <SectionHeader
                    tagline="Background"
                    title="Expertise & Journey"
                    groupVariants={anim.staggerHeader}
                    itemVariants={anim.fadeUp}
                    lineVariants={anim.drawLine}
                />

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
                    <motion.div className="tabs-content" layout="position">
                        <AnimatePresence mode="wait">
                            {activeTab === 'about' && (
                                <motion.div
                                    key="about-tab"
                                    variants={anim.tabPanel}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className="about-layout"
                                >
                                    <motion.div className="about-card-left" variants={anim.fadeUpSm}>
                                        <div className="detail-paragraphs">
                                            {personalInfo?.detail?.join(" ")}
                                        </div>
                                        <blockquote className="about-goal-blockquote">
                                            <span className="quote-mark">“</span>
                                            {personalInfo?.goal}
                                        </blockquote>
                                    </motion.div>
                                    <motion.div className="about-card-right" variants={anim.fadeUpSm}>
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
                                    </motion.div>
                                </motion.div>
                            )}

                        {activeTab === 'skills' && (
                            <motion.div
                                key="skills-tab"
                                variants={anim.tabPanel}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="skills-grid"
                            >
                                {Object.entries(skills).length > 0 ? (
                                    Object.entries(skills).map(([category, items]) => (
                                    <motion.div key={category} className="skill-row" variants={anim.fadeUpSm}>
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
                                    </motion.div>
                                    ))
                                ) : (
                                    <p>No skills to display.</p>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'experience' && (
                            <motion.div
                                key="experience-tab"
                                variants={anim.tabPanel}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="timeline-wrapper"
                            >
                                <motion.div
                                    className="timeline-line"
                                    style={{ transformOrigin: 'top' }}
                                    variants={anim.drawSpine}
                                ></motion.div>
                                {Object.entries(experiences).length > 0 ? (
                                    Object.entries(experiences).map(([id, exp]) => (
                                        <motion.div key={id} className="timeline-item" variants={anim.fadeUpSm}>
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
                                        </motion.div>
                                    ))
                                ) : (
                                    <p className="fallback-text">No experience to display.</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <section id="projects">
                <SectionHeader
                    tagline="Showcase"
                    title="Selected Projects"
                    groupVariants={anim.staggerHeader}
                    itemVariants={anim.fadeUp}
                    lineVariants={anim.drawLine}
                />

                    <StaggerGroup className="projects-grid" variants={anim.staggerProjects}>
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <motion.div key={index} variants={anim.fadeUp} className="project-card">
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
                                </motion.div>
                            ))
                        ) : (
                            <p className="fallback-text">
                                No projects found.
                            </p>
                        )}
                    </StaggerGroup>
            </section>

            <section id="contact">
                <SectionHeader
                    tagline="Get In Touch"
                    title="Let's Connect"
                    groupVariants={anim.staggerHeader}
                    itemVariants={anim.fadeUp}
                    lineVariants={anim.drawLine}
                />
                <StaggerGroup className="contact-grid" variants={anim.staggerContact}>
                            <motion.div className="contact-info-row" variants={anim.fadeUp}>
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
                            </motion.div>
                        <motion.div variants={anim.fadeUp}>
                            <ContactForm />
                        </motion.div>
                </StaggerGroup>
            </section>
        </div>
    )
}

export default Home;