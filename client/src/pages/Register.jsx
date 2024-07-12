import { useState } from "react";
import axios from "axios";
import welcome from "../assets/images/welcome.png";
import "../styles/register.css";
import ble from "../assets/images/ble.png";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          firstname,
          lastname,
          username,
          email,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response);
    }
  };

  return (
    <div className="background">
      <form method="post" onSubmit={handleSubmit}>
        <section>
          <div className="card-center">
            <img src={welcome} className="img-welcome" alt="welcome" />
            <div className="card-register">
              <p className="nouveau-texte">Nouveau ?</p>
              <hr />
              <p className="deja-compte">
                Si vous possédez déjà un compte merci de vous
                <span className="button-connect"> connecter ! </span>
              </p>
              <div data-mdb-input-init className="form-group">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Prénom"
                />
              </div>

              <div data-mdb-input-init className="form-group">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Nom"
                  required
                />
              </div>

              <div data-mdb-input-init className="form-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Pseudo"
                  required
                />
              </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
              </div>

              <button
                data-mdb-button-init
                data-mdb-ripple-init
                type="submit"
                className="connexion-button"
              >
                S'inscrire
              </button>
              {message && <p>{message}</p>}
            </div>
          </div>
        </section>
      </form>
      <img src={ble} alt="ble" className="ble" />
    </div>
  );
}
