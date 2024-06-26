import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function NavBar() {
  return (
    <nav className="h-28">
      <div className=" flex">
        <img className="h-28 pl-20 pt-2" src={Logo} alt="logo_site" />
        <ul className="w-screen flex flex-end justify-center space-x-20 ml-[20%] text-lg font-bold flex-row items-center ">
          <li className="green">
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/RecipesPage">Recettes</Link>
          </li>
          <li>
            <Link to="/CommentCaMarche"> Comment ça marche ? </Link>
          </li>
          <li className="border border-green-500 p-3 rounded-xl">
            <Link to="/RegisterPage"> S'enregister </Link>
          </li>
          <li className="bg-green-500 p-3 rounded-xl">
            <Link to="/Login"> Se connecter </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
