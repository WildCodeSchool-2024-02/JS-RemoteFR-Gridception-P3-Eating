import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ModalEditRecipeConfirm from "../components/ModalEditRecipeConfirm";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const dataDuLoader = useLoaderData();
  const [categoriesData, ingredientsData, recipeData] = dataDuLoader;

  const [categories] = useState(categoriesData);
  /* eslint-disable no-unused-vars */
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [formData, setFormData] = useState({
    title: recipeData.title || "",
    description: recipeData.descriptionText || "",
    category: recipeData.category_name || "",
    time: recipeData.time || "",
    ingredients:
      recipeData.ingredients.map((ingredient) => ({
        name: ingredient.ingredient_name,
        quantity: ingredient.quantity,
        calories: ingredient.calories,
      })) || [],
    steps: (recipeData.steps || "").replace(/___/g, "\n"),
    image: recipeData.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedIngredients = prevFormData.ingredients.map(
        (ingredient, i) => {
          if (i === index) {
            return { ...ingredient, [field]: value };
          }
          return ingredient;
        }
      );

      return {
        ...prevFormData,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const newRecipe = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/recipes/${id}`,
        formData
      );

      navigate(`/recettes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonDelete = (name) => {
    console.info(`delete ingredient ${name}`);

    // axios.delete(la bonne route => permet d'avoir l'id de la recette, {body => envoyer le nom ou l'id de l'ingredient)

    // pas de refresh de la page

    setFormData((prevFormData) => {
      const updatedIngredients = prevFormData.ingredients.filter(
        (ingredient) => ingredient.name !== name
      );

      return {
        ...prevFormData,
        ingredients: updatedIngredients,
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Édition de la recette</h1>
      {formData && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Titre
            </label>
            <input
              id="title"
              type="text"
              name="title"
              defaultValue={formData.title}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={formData.description}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full h-[8rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Catégorie
            </label>
            {categories.length > 0 && (
              <select
                id="category"
                name="category"
                defaultValue={formData.category}
                onChange={(e) => handleChange(e)}
                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Temps de préparation
            </label>
            <input
              id="time"
              type="text"
              name="time"
              defaultValue={formData.time}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="steps"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Étapes
            </label>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full h-[15rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Ajoutez une photo
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.image}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="selectedIngredients"
              className="block text-xl font-semibold text-gray-700 mt-8 pb-2"
            >
              <p className="mb-4">Ingrédients sélectionnés</p>

              {/* {formData.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <input
                    id={`ingredient-name-${index}`}
                    type="text"
                    name={`ingredient-name-${index}`}
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                  />

                  <input
                    id={`ingredient-quantity-${index}`}
                    type="text"
                    name={`ingredient-quantity-${index}`}
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                  />

                  <input
                    id={`ingredient-calories-${index}`}
                    type="text"
                    name={`ingredient-calories-${index}`}
                    value={ingredient.calories}
                    onChange={(e) =>
                      handleIngredientChange(index, "calories", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                  />
                </div>
              ))} */}

              {formData.ingredients.map((ingredient) => (
                <div key={ingredient.name}>
                  <span>{ingredient.name}</span>
                  <span>{ingredient.quantity}</span>
                  <span>{ingredient.calories}</span>

                  <button
                    type="button"
                    onClick={() => handleButtonDelete(ingredient.name)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      )}

      <ModalEditRecipeConfirm
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
