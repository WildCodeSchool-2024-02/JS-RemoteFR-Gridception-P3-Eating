import { Link, useLoaderData } from "react-router-dom";

export default function Admin() {
  const user = useLoaderData();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-center mt-4 mb-2">
            {user.firstname} {user.lastname}
          </h1>
          <div className="flex flex-col gap-4">
            <Link to={`/admin/utilisateur/${user.id}`} className="admin-link">
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

            <Link to="/admin/utilisateurgestion" className="admin-link">
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

            <Link to="/admin/activitegestion" className="admin-link">
              <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-200  w-full transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm0-14v7.5c-.623-.26-1.297-.421-2-.475v-5.025h-4.148c-.974 0-1.736-.438-2.039-1.171-.293-.709-.078-1.547.561-2.185 1.3-1.247.105-2.644-1.185-2.644-1.314 0-2.481 1.397-1.184 2.642.641.639.855 1.477.562 2.187-.302.733-1.065 1.171-2.039 1.171h-4.528v4.531999999999999c.627-.485 1.549-1.072 2.744-1.072 1.572 0 3.256 1.499 3.256 3.729 0 2.231-1.684 3.73-3.256 3.73-1.197 0-2.117-.587-2.744-1.072v4.153h7.5c.312.749.763 1.424 1.316 2h-10.816v-6.148c0-.974.438-1.736 1.172-2.039.709-.293 1.547-.078 2.185.561 1.247 1.3 2.643.105 2.643-1.185 0-1.314-1.396-2.481-2.643-1.184-.639.641-1.477.855-2.186.562-.733-.302-1.171-1.065-1.171-2.039v-6.528h6.531999999999999c-.485-.627-1.072-1.549-1.072-2.744 0-1.572 1.499-3.256 3.729-3.256 2.231 0 3.73 1.684 3.73 3.256 0 1.197-.587 2.117-1.072 2.744h6.153z" />
                </svg>
                <p className="text-lg font-medium text-gray-800">
                  Gestion des activités
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="mt-6 bg-red-400 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
