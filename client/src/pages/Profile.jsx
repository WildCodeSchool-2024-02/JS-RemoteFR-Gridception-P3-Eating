// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { auth } = useAuth();

  // const [editUserId, setEditUserId] = useState(null);
  // const [editUserData, setEditUserData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // const handleEditClick = () => {
  //   setEditUserId(user.id);
  //   setEditUserData({
  //     firstname: auth.firstname,
  //     lastname: auth.lastname,
  //     username: auth.username,
  //     email: auth.email,
  //     password: auth.password,
  //   });
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleEditSubmit = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(editUserData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update user");
  //     }

  //     setEditUserId(null);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     setEditUserId(null);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to delete user");
  //     }
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <div>
      <div className="w-full max-w-lg mx-auto my-12 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Je souhaite modifier mes informations
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="firstname"
            >
              Prénom
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              name="firstname"
              type="text"
              defaultValue={auth.firstname}
            // value={editUserData.firstname}
            // onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="lastname"
            >
              Nom
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              name="lastname"
              type="text"
              defaultValue={auth.lastname}
            // value={editUserData.lastname}
            // onChange={handleInputChange}
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              Pseudo
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              name="username"
              type="text"
              defaultValue={auth.userName}
            // value={editUserData.username}
            // onChange={handleInputChange}
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              name="email"
              type="email"
              defaultValue={auth.email}
            // value={editUserData.email}
            // onChange={handleInputChange}
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              name="password"
              type="password"
            // value={editUserData.password}
            // onChange={handleInputChange}
            />
          </div>

        </div>
        <button
          type="button"
          className="bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        // onClick={handleEditClick}
        >
          Modifier mes informations
        </button>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="text-red-600 hover:text-red-400 focus:outline-none"
        // onClick={handleDelete}
        >
          Supprimer mon profil
        </button>
      </div>
    </div>
  );
}
