import { useState } from "react";
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
  const [formData, setFormData] = useState(recipesData);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const categoriesResponse = await fetch(
  //         `${import.meta.env.VITE_API_URL}/api/categories`
  //       );
  //       const ingredientsResponse = await fetch(
  //         `${import.meta.env.VITE_API_URL}/api/ingredients`
  //       );
  //       const recipeResponse = await fetch(
  //         `${import.meta.env.VITE_API_URL}/api/recipes/${id}`
  //       );

  //       if (
  //         !categoriesResponse.ok ||
  //         !ingredientsResponse.ok ||
  //         !recipeResponse.ok
  //       ) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const categoriesData = await categoriesResponse.json();
  //       const ingredientsData = await ingredientsResponse.json();
  //       const recipeData = await recipeResponse.json();

  //       setCategories(categoriesData);
  //       setIngredients(ingredientsData);
  //       setFormData({
  //         title: recipeData.title,
  //         description: recipeData.description,
  //         category: recipeData.category_name,
  //         time: recipeData.time,
  //         ingredients: recipeData.ingredients,
  //         steps: recipeData.steps,
  //         image: recipeData.image,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, [id]);

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

  // const handleQuantityChange = (Id, quantity) => {
  //   const newIngredients = ingredients.map((ingredient) =>
  //     ingredient.id === Id ? { ...ingredient, quantity } : ingredient
  //   );

  //   setFormData({ ...formData, ingredients: newIngredients });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      await formData.ingredients.forEach((ingredient) => {
        axios.put(
          `${import.meta.env.VITE_API_URL}/api/quantities/${ingredient.id}`,
          {
            ...ingredient,
            recipe_id: id,
          }
        );
      });

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
                        className="h-7 flex justify-between items-center space-x-2"
                      >
                        {ingredient.name} - ({ingredient.calories || "N/A"} kcal
                        / unit)
                      </option>
                    ))}
                  </select>
                )}
              </ul>
            </div>
            <label
              htmlFor="selectedIngredients"
              className="block text-xl font-semibold text-gray-700 mt-6 pb-2"
            >
              Ingrédients sélectionnés
              <p>
                {/* {formData.ingredients.map((ingredient) => (
                  <span key={ingredient.id}>
                    {ingredient.name}
                    <input
                      type="text"
                      min="0"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleQuantityChange(ingredient.id, e.target.value)
                      }
                    />
                  </span>
                ))} */}
              </p>
            </label>
            <div className="mt-2 flex items-center">
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
              onClick={handleSubmit}
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
