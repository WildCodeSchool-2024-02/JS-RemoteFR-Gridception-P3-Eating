import "../styles/footer.css";
import logoGithub from "../assets/images/logoGithub.png";

export default function Footer() {
  return (
    <div className="footer-green">
      <p>Made by @Eating NAM NAM</p>

      <a
        href="https://github.com/WildCodeSchool-2024-02/JS-RemoteFR-Gridception-P3-Eating/blob/main/README.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="github-img" src={logoGithub} alt="GitHub logo" />
      </a>
    </div>
  );
}
