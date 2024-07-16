import { useState } from "react";
import axios from "axios";

import welcome from "../assets/images/welcome.png";
import ble from "../assets/images/ble.png";

import "../styles/register.css";

export default function Register() {
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formDatas, setFormDatas] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatas({ ...formDatas, [name]: value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    try {

      setIsSubmitting(true);


      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        formDatas
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response);
    } finally {
      setIsSubmitting(false)
    }
  };


  return (
    <div className="background">
      <form onSubmit={handleSubmit}>
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
              <div className="form-group form-outline">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formDatas.firstname}
                  onChange={(e) => handleChange(e)}
                  placeholder="Prénom"
                />
              </div>

              <div className="form-group form-outline">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formDatas.lastname}
                  onChange={(e) => handleChange(e)}
                  placeholder="Nom"
                  required
                />
              </div>

              <div className="form-group form-outline">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formDatas.username}
                  onChange={(e) => handleChange(e)}
                  placeholder="Pseudo"
                  required
                />
              </div>

              <div className="form-group form-outline">
                <input
                  type="email"
                  id="typeEmailX"
                  name="email"
                  value={formDatas.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group form-outline">
                <input
                  type="password"
                  id="typePasswordX"
                  name="password"
                  value={formDatas.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Mot de passe"
                  required
                />
              </div>

              <button

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
