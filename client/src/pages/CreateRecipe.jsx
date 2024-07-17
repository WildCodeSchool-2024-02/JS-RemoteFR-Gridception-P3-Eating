import { useState, useEffect } from "react";
import axios from "axios";
import ModalRecipeCreation from "../components/ModalRecipeCreation";
import Popup from "../components/Popup";
import "../styles/popup.css";

export default function CreateRecipePage() {
  const [showPopup, setShowPopup] = useState(false);

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    time: "",
    ingredients: [],
    steps: "",
    image: "",
  });

  // const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        const ingredientsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ingredients`
        );

        if (!categoriesResponse.ok || !ingredientsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesResponse.json();
        const ingredientsData = await ingredientsResponse.json();

        setCategories(categoriesData);
        setIngredients(ingredientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (e) => {
    const updateIngredients = formData.ingredients;

    const [selectedIngredient] = ingredients.filter(
      (ingredient) => ingredient.name === e.target.value
    );

    updateIngredients.push({ ...selectedIngredient, quantity: "" });

    setFormData({
      ...formData,
      ingredients: updateIngredients,
    });
  };

  const handleQuantityChange = (id, quantity) => {
    const newIngredients = formData.ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, quantity } : ingredient
    );

    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(false);

    const newFormData = formData;

    const [currentCategory] = categories.filter(
      (category) => category.name === formData.category
    );

    newFormData.categoryId = currentCategory.id;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/recipes`,
        newFormData
      );

      await formData.ingredients.forEach((ingredient) => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/quantities`, {
          ...ingredient,
          recipe_id: data.recipe,
        });
      });
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

      const currentIngredients = ingredients;

      currentIngredients.push(data);

      setIngredients(currentIngredients);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePopup = () => {
    if (
      formData.title !== "" &&
      formData.description !== "" &&
      formData.category !== "" &&
      formData.time !== "" &&
      formData.ingredients !== "" &&
      formData.steps !== "" &&
      formData.image !== ""
    ) {
      setShowPopup(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">
        Création d'une nouvelle recette
      </h1>
      <form className="space-y-4">
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
            value={formData.title}
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
            value={formData.description}
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
              value={formData.category}
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
        <div className="flex gap-2 pt-6 pb-4">
          <label
            htmlFor="time"
            className="block text-xl font-semibold text-gray-700"
          >
            Temps de préparation (en min)
          </label>
          <input
            id="time"
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="block w-20 h-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
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
          <div className="flex items-center">
            <ul className="divide-y divide-gray-200 w-full ">
              {ingredients.length > 0 && (
                <select
                  id="ingredients"
                  name="ingredients"
                  multiple
                  value={formData.ingredients}
                  onChange={handleIngredientChange}
                  className=" mt-1 block w-full h-[10rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm mr-2"
                  required
                >
                  {ingredients.map((ingredient) => (
                    <option
                      key={ingredient.id}
                      value={ingredient.name}
                      className="h-7 flex justify-between items-center space-x-2"
                    >
                      {ingredient.name} - ({ingredient.calories || "N/A"} kcal /
                      unit)
                    </option>
                  ))}
                </select>
              )}
            </ul>
          </div>
          <label
            htmlFor="selectedIngredients"
            className="block text-xl font-semibold text-gray-700 mt-8 pb-2"
          >
            <p className="mb-4">Ingrédients sélectionnés</p>
            <p>
              {formData.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex space-x-4 space-y-2 items-end w-full">
                  <span className="w-20">{ingredient.name}</span>

                  <div className="flex gap-2">
                    <span className="text-s ">Quantité: </span>
                    <input
                      type="text"
                      min="0"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleQuantityChange(ingredient.id, e.target.value)
                      }
                      className="bg-gray-200 rounded-lg ml-3 w-20 text-center"
                    />
                    <span>gr/ ml/ cs/ cc</span>
                  </div>


                </div>

              ))}
            </p>
          </label>
          <div className="mt-4 flex items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            >
              Ajouter un ingrédient
            </button>
          </div>
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
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            onClick={togglePopup}
          >
            Créer la recette
          </button>
        </div>
      </form>
      <ModalRecipeCreation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(ingredientInfo) => handleSaveNewIngredient(ingredientInfo)}
      />

      {showPopup && (
        <div className="popupContainer">
          <Popup />
          <button className="closePopup" type="submit" onClick={handleSubmit}>
            Confirmer
          </button>
        </div>
      )}
    </div>

  );
}
