import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code2, X, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const NAV_LINKS = [
  { label: "Home", hash: "#intro" },
  { label: "About", hash: "#about" },
  { label: "Projects", hash: "#projects" },
  { label: "Contact", hash: "#contact" }
];

export default function Header() {
    const [activeSection, setActiveSection] = useState("#intro");
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const sections = NAV_LINKS.map(link =>
            document.querySelector(link.hash)
        ).filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 720) {
                setOpen(false);
            }
        }

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="header">
            <Link to="/" className="logo" onClick={() => {
                setActiveSection("#intro"); 
                document.querySelector("#intro").scrollIntoView()
            }}>
                <Code2 size={24} strokeWidth={2} className="logo-icon"/>
            </Link>
            <nav className={`nav ${open ? "open" : ""}`}>
                {NAV_LINKS.map((link) => (
                    <a key={link.hash} href={link.hash} onClick={() => {setActiveSection(link.hash); setOpen(false);}} className={activeSection === link.hash ? "active" : ""}>
                        {link.label}
                    </a>
                ))}
            </nav>

            <div className="header-actions">
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                >
                    {theme === "dark" ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                </button>
                <button
                    className="nav-toggle"
                    onClick={() => setOpen(prev => !prev)}
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
                </div>
        </header>
    )
}