import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import graille from "../assets/images/graille.png";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const closeErrorModal = () => setShowErrorModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3310/api/users/login",
        {
          email,
          password,
        }
      );
      console.info(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <div>
        <div className="background">
          <NavBar />
          <form method="post" onSubmit={handleSubmit}>
            <section>
              <div className="card-center">
                <img src={graille} alt="grailleimg" className="img-graille" />
                <div className="card-login">
                  <p className="bienvenue-texte">de retour ?</p>
                  <hr />
                  <p className="login-text">
                    Entrez vos informations de{" "}
                    <span className="connexion-text">connexion</span>
                  </p>
                  <div data-mdb-input-init className="form-group">
                    <input
                      type="email"
                      id="typeEmailX"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div data-mdb-input-init className="form-group">
                    <input
                      type="password"
                      id="typePasswordX"
                      name="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    type="submit"
                    className="connexion-button"
                  >
                    Connexion
                  </button>
                  <p className="login-text">
                    Vous n'avez pas encore de compte ?
                    <Link to="/register">
                      <span className="button-inscrire">S'inscrire</span>
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </form>
        </div>
        <img src="../../src/assets/images/ble.png" alt="ble" className="ble" />
      </div>

      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <button type="button" className="close" onClick={closeErrorModal}>
              &times;
            </button>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}
