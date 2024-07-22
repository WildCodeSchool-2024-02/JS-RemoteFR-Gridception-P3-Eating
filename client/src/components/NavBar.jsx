import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Logo from "../assets/images/logo.png";

export default function NavBar() {
  const { auth, logout } = useAuth();

  return (
    <nav className="h-28 uppercase">
      <div className=" flex">
        <Link to="/" className="pl-10">
          <img
            className="h-[100px] w-[120px] pt-2"
            src={Logo}
            alt="logo_site"
          />
        </Link>

        <ul className="w-screen flex flex-end justify-center space-x-6 ml-[20%] text-s font-bold flex-row items-center z-20">
          <li className="green">
            <Link to="/">Accueil</Link>
          </li>

          <li>
            <Link to="/recettes">Recettes</Link>
          </li>

          <li>
            <Link to="/étapes"> Comment ça marche ? </Link>
          </li>

          {auth ? (
            <>
              <li>
                <Link to={`/utilisateur/${auth.username}`}>Profil</Link>
              </li>

              <li>
                <Link to="/utilisateur/recettes/creation">
                  Création de recette
                </Link>
              </li>

              {auth.role === "admin" && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}

              <li>
                <button type="button" className="uppercase" onClick={logout}>
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="bg-green-800 p-3 rounded-xl text-white">
                <Link to="/se-connecter"> Se connecter </Link>
              </li>

              <li className="border border-green-800 p-3 rounded-xl">
                <Link to="/s-enregistrer"> S'enregister </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
