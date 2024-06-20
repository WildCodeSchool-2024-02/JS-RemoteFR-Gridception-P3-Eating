import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";

function RecipePage() {
  const { recipes, quantity: initialQuantity } = useLoaderData();
  const { id } = useParams();
  const [prep, setPrep] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [quantity, setQuantity] = useState(initialQuantity);
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
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-2">{prep.title}</h1>
          <h2 className="text-xl font-semibold mb-4">Ingrédients</h2>
          <ul>
            {quantity &&
              quantity.map((ingredient) => (
                <li key={ingredient.recipe_id}>
                  {ingredient.recipe_id}
                  {ingredient.quantity} {ingredient.name}
                </li>
              ))}
          </ul>
          <p className="text-gray-700 mb-4">{prep.descriptionText}</p>
        </div>
      </div>
    </section>
  );
}

export default RecipePage;
