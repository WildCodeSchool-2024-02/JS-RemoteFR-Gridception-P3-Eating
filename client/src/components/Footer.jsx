import logoGithub from "../assets/images/logoGithub.png";
import "../styles/footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <p>Made by @Eating NAM NAM</p>
      <a
        href="https://github.com/WildCodeSchool-2024-02/JS-RemoteFR-Gridception-P3-Eating/blob/main/README.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="github-img mt-2" src={logoGithub} alt="GitHub logo" />
      </a>
    </div>
  );
}
