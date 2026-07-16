import data from '../data/portfolio-data.json'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <span className="footer-note">
                © {year} {data.profile.name}
            </span>
        </footer>
    )
}