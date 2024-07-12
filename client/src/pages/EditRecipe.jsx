import { useState, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import ModalRecipeCreation from "../components/ModalRecipeCreation";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataDuLoader = useLoaderData();

  const [categoriesData, ingredientsData, recipesData] = dataDuLoader;

  const [categories] = useState(categoriesData);
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [formData, setFormData] = useState(() => ({
    ...recipesData,
    ingredients: recipesData.ingredients || [],
  }));

  useEffect(() => {
    if (!formData.ingredients) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [],
      }));
    }
  }, [formData.ingredients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;

    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleAddIngredient = (e) => {
    const newIngredient = ingredients.find(
      (ingredient) => ingredient.name === e.target.value
    );
    if (newIngredient) {
      setFormData({
        ...formData,
        ingredients: [
          ...formData.ingredients,
          { ...newIngredient, quantity: "" },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = { ...formData };

    const [currentCategory] = categories.filter(
      (category) => category.name === formData.category
    );

    newFormData.category_id = currentCategory.id;

    try {
      // Mise à jour de la recette
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/recipes/${id}`,
        newFormData
      );

      // Mise à jour des quantités des ingrédients
      await Promise.all(
        formData.ingredients.map(async (ingredient) => {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/quantities/${id}/${ingredient.id}`,
            {
              recipe_id: id,
              ingredient_id: ingredient.id,
              quantity: ingredient.quantity,
            }
          );
        })
      );

      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveNewIngredient = async (ingredientInfo) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ingredients`,
        { ingredientInfo }
      );

      setIngredients((prevIngredients) => [...prevIngredients, data]);
    } catch (error) {
      console.error(error);
    }
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
              onChange={handleChange}
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
              defaultValue={formData.descriptionText}
              onChange={handleChange}
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
                defaultValue={formData.category_name}
                onChange={handleChange}
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
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ingredients"
              className="block text-xl font-semibold text-gray-700 pb-2 mt-6"
            >
              Ingrédients
            </label>
            <select
              id="ingredients"
              name="ingredients"
              onChange={handleAddIngredient}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            >
              <option value="">Sélectionnez un ingrédient</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <ul className="mt-2">
              {formData.ingredients.map((ingredient, index) => (
                <li key={ingredient.id} className="flex items-center space-x-4">
                  <span>{ingredient.name}</span>
                  <input
                    type="text"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                    placeholder="Quantité"
                  />
                </li>
              ))}
            </ul>
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
              defaultValue={formData.steps}
              onChange={handleChange}
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
              defaultValue={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
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
      <ModalRecipeCreation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(ingredientInfo) => handleSaveNewIngredient(ingredientInfo)}
      />
    </div>
  );
}
