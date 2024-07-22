import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";

import ble from "../assets/images/ble.png";
import welcome from "../assets/images/welcome.png";

import "../styles/register.css";

export default function Register() {
  const [formDatas, setFormDatas] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatas({
      ...formDatas,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        formDatas
      );

      console.info(response.data);

      const newUser = {
        email: formDatas.email,
        firstname: formDatas.firstname,
        lastname: formDatas.lastname,
        username: formDatas.username,
        id: response.data.insertId,
        role: "user",
      };

      login(newUser);

      navigate(`/utilisateur/${response.data.insertId}`);
    } catch (error) {
      console.error("Error during registration:", error);
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
                Si vous possédez déjà un compte merci de vous{" "}
                <span className="button-connect"> connecter ! </span>
              </p>
              <div className="form-group form-outline bg-white rounded-lg">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formDatas.firstname}
                  onChange={(e) => handleChange(e)}
                  placeholder="Prénom"
                />
              </div>

              <div className="form-group form-outline bg-white rounded-lg">
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

              <div className="form-group form-outline bg-white rounded-lg font-Annie">
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

              <div className="form-group form-outline bg-white rounded-lg font-Annie">
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

              <div className="form-group form-outline bg-white rounded-lg">
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

              <button type="submit" className="connexion-button">
                S'inscrire
              </button>
            </div>
          </div>
        </section>
      </form>
      <img src={ble} alt="ble" className="ble" />
    </div>
  );
}
