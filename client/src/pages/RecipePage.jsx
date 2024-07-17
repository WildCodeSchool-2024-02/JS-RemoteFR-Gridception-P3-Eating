import { useState, useEffect } from "react";
import { Link, useParams, useLoaderData } from "react-router-dom";

function RecipePage() {
  const { recipes, quantity: initialQuantity } = useLoaderData();
  const { id } = useParams();
  const [prep, setPrep] = useState(null);
  const [quantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recipeData = recipes.find((recipe) => recipe.id === parseInt(id, 10));
    if (recipeData) {
      setPrep(recipeData);
    }
    setLoading(false);
  }, [id, recipes]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!prep) {
    return <p>Recette non trouvée</p>;
  }

  return (
    <section className="h-screen bg-white flex flex-col md:flex-row">
      <div className="md:w-2/3 p-4 flex flex-col items-center">
        <h1 className="w-[70%] text-3xl font-bold mb-4 text-center">{prep.title}</h1>
        <div
          className="bg-green-800 rounded-[20%] p-6 mt-12 flex justify-center items-center shadow-lg"
          style={{ width: "500px", height: "500px" }}
        >
          <img
            src={prep.image}
            alt="plat1"
            className="h-[350px] w-[350px] rounded-3xl object-cover"
          />
        </div>
        <div className="flex text-gray-600 mt-4 font-bold">Temps de préparation: {prep.time}min</div>
      </div>

      <div className="md:w-1/3 h-screen overflow-auto mt-[2.5vh] rounded-lg mr-6 ml-6 md:mr-64 md:ml-24 bg-gray-200 shadow-inner flex flex-col p-6">
        <p className="mt-4">{prep.descriptionText}</p>
        <h2 className="flex justify-center text-3xl font-semibold m-12 mb-18">
          Ingrédients
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {quantity &&
            quantity.map((ingredient) => (
              <li key={ingredient.recipe_id}>
                {ingredient.quantity} {ingredient.name}
              </li>
            ))}
        </ul>
        <h2 className="flex justify-center text-3xl font-semibold m-6">
          Etapes de préparation :{" "}
        </h2>
        <ul className="list-disc pl-5 space-y-2">{prep.steps}</ul>

      </div>
      <div className="z-20">
        <Link
          to={`/utilisateur/recettes/edition/${prep.id}`}
          className="cursor-pointer"
        >
          <button
            type="button"
            className="bg-orange-400 text-white text-[15px] uppercase w-[10rem] absolute bottom-16 right-28 rounded-xl p-5 font-semibold "
          >
            Modifier votre recette
          </button>
        </Link>
      </div>
    </section>
  );
}

export default RecipePage;
