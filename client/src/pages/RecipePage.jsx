import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import recipes from "../datas/recipes.json";

function RecipePage() {
  // eslint-disable-next-line no-unused-vars
  const [prep, setPrep] = useState([]);
  const { id } = useParams();
  const data = recipes.recipes;

  useEffect(() => {
    const recipeData = data.find((recipe) => recipe.id === parseInt(id, 10));
    if (recipeData) {
      setPrep(recipeData.prep);
    }
  }, [id, data]);

  const recipeData = data.find((recipe) => recipe.id === parseInt(id, 10));

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            className="w-full rounded-lg"
            src={recipeData.img}
            alt={recipeData.name}
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-2">{recipeData.name}</h1>
          <h2 className="text-xl font-semibold mb-4">
            Ingredients: {recipeData.Ingrédients}
          </h2>
          <p className="text-gray-700 mb-4">{recipeData.description}</p>
        </div>
      </div>
    </section>
  );
}

export default RecipePage;
