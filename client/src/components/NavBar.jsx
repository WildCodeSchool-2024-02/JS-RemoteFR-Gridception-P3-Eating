import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function NavBar() {
  return (
    <nav className="h-28 uppercase">
      <div className=" flex">
        <img className="h-28 pl-20 pt-2" src={Logo} alt="logo_site" />
        <ul className="w-screen flex flex-end justify-center space-x-12 ml-[20%] text-s font-bold flex-row items-center">
          <li className="green">
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/recettes">Recettes</Link>
          </li>
          <li>
            <Link to="/étapes"> Comment ça marche ? </Link>
          </li>
          <li className="border border-green-800 p-3 rounded-xl">
            <Link to="/s-enregistrer"> S'enregister </Link>
          </li>
          <li className="bg-green-800 p-3 rounded-xl text-white">
            <Link to="/se-connecter"> Se connecter </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
