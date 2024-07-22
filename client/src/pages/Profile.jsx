import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { auth, login } = useAuth();
  const [formData, setFormData] = useState({
    firstname: auth.firstname || "",
    lastname: auth.lastname || "",
    username: auth.username || "",
    email: auth.email || "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();

      login(data.user);

      navigate(`/utilisateur/${auth.id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="h-screen">
      <div className="w-full max-w-lg mx-auto my-12 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Mon profil eating
        </h1>
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <p className="border border-gray-400 rounded-lg p-1 w-20 text-center">
              Prénom:{" "}
            </p>
            <p className="p-1">{auth.firstname}</p>
          </div>
          <div className="flex gap-4">
            <p className="border border-gray-400 rounded-lg p-1 w-20 text-center">
              Nom:{" "}
            </p>
            <p className="p-1">{auth.lastname}</p>
          </div>
          <div className="flex gap-4">
            <p className="border border-gray-400 rounded-lg p-1 w-20 text-center">
              Pseudo:{" "}
            </p>
            <p className="p-1">{auth.username}</p>
          </div>
          <div className="flex gap-4">
            <p className="border border-gray-400 rounded-lg p-1 w-20 text-center">
              Email:{" "}
            </p>
            <p className="p-1">{auth.email}</p>
          </div>
        </div>

        <button
          type="button"
          className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={toggleModal}
        >
          Modifier mes informations
        </button>
      </div>
      <div className="text-center mb-10">
        <button
          type="button"
          className="text-white bg-gray-400 p-3 rounded-md hover:text-black focus:outline-none"
        >
          Supprimer mon profil
        </button>
        <img
          src="../../src/assets/images/ble.png"
          alt="ble"
          className="fixed right-0 bottom-0"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Modifier mes informations
            </h2>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstname"
                >
                  Prénom
                </label>

                <input
                  className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Nom
                </label>

                <input
                  className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Pseudo
                </label>

                <input
                  className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full px-3 mb-6 mt-4">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={toggleModal}
              >
                Annuler
              </button>

              <button
                type="button"
                className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
