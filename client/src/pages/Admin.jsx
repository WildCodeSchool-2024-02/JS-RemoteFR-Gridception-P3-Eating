import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Admin() {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md -mt-40">
        <div className="px-6 py-8">
          <div className="flex flex-col gap-4">
            <Link to={`/utilisateur/${auth.id}`} className="admin-link">
              <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-200 w-full transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                </svg>
                <p className="text-lg font-medium text-gray-800">
                  Mes informations
                </p>
              </div>
            </Link>

            <Link to="/admin/utilisateurs/gestion" className="admin-link">
              <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-200  w-full transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                </svg>
                <p className="text-lg font-medium text-gray-800">
                  Gestion des utilisateurs
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="mt-6 bg-green-800 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
