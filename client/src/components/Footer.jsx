// import "../styles/footer.css";
import logoGithub from "../assets/images/logoGithub.png";

export default function Footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {/* Your main content goes here */}
      </div>
      <div className="h-[15vh] w-full bg-green-800 flex items-center justify-center text-white">
        <div className="text-center flex flex-col items-center">
          <p>Made by @Eating NAM NAM</p>
          <a
            href="https://github.com/WildCodeSchool-2024-02/JS-RemoteFR-Gridception-P3-Eating/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="github-img mt-2" src={logoGithub} alt="GitHub logo" />
          </a>
        </div>
      </div>
    </div>


  );
}
