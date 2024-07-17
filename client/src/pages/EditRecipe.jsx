import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ModalRecipeCreation from "../components/ModalRecipeCreation";
import ModalEditRecipeConfirm from "../components/ModalEditRecipeConfirm";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const dataDuLoader = useLoaderData();
  const [categoriesData, ingredientsData, recipesData] = dataDuLoader;

  const [categories] = useState(categoriesData);
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [formData, setFormData] = useState(
    recipesData || {
      title: "",
      description: "",
      category: "",
      time: "",
      ingredients: [],
      steps: "",
      image: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (e) => {
    const updateIngredients = formData.ingredients || [];

    const [selectedIngredient] = ingredients.filter(
      (ingredient) => ingredient.name === e.target.value
    );

    updateIngredients.push({ ...selectedIngredient, quantity: "" });

    setFormData({
      ...formData,
      ingredients: updateIngredients,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    const newFormData = { ...formData };

    const [currentCategory] = categories.filter(
      (category) => category.name === formData.category
    );

    newFormData.categoryId = currentCategory.id;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/recipes/${id}`,
        newFormData
      );

      // await Promise.all(
      //   (formData.ingredients || []).map((ingredient) => {
      //     return axios.put(
      //       `${import.meta.env.VITE_API_URL}/api/quantities/${ingredient.id}`,
      //       {
      //         ...ingredient,
      //         recipe_id: id,
      //       }
      //     );
      //   })
      // );


      setIsConfirmModalOpen(false);

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
              defaultValue={formData.description}
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
                defaultValue={formData.category}
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
            <div className="flex items-center">
              <ul className="divide-y divide-gray-200 w-full">
                {ingredients.length > 0 && (
                  <select
                    id="ingredients"
                    name="ingredients"
                    multiple
                    value={ingredients.map((ingredient) => ingredient.name)}
                    onChange={handleIngredientChange}
                    className=" mt-1 block w-full h-[10rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm mr-2"
                    required
                  >
                    {ingredients.map((ingredient) => (
                      <option
                        key={ingredient.id}
                        value={ingredient.name}
                        className="py-2"
                      >
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                )}
                {(formData.ingredients || []).map((ingredient) => (
                  <li key={ingredient.id} className="py-4 flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {ingredient.name}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              >
                Ajouter un ingrédient
              </button>
            </div>
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
      <ModalEditRecipeConfirm
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
