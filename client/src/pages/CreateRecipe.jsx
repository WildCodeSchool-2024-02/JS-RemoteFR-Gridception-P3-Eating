import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function IngredientModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSave = () => {
    onSave({ name, calories, quantity });
    setName("");
    setCalories("");
    setQuantity("");
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">
            Ajouter un nouvel ingrédient
          </h2>
          <div className="mb-4">
            <label
              htmlFor="ingredientName"
              className="block text-xl font-semibold text-gray-700"
            >
              Nom
            </label>
            <input
              id="ingredientName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ingredientCalories"
              className="block text-xl font-semibold text-gray-700"
            >
              Calories
            </label>
            <input
              id="ingredientCalories"
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    )
  );
}

IngredientModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default function CreateRecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [quantities, setQuantities] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    time: "",
    ingredients: [],
    steps: "",
    image: "",
  });
  const [formError, setFormError] = useState(null);
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const recipesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/recipes`
        );
        const ingredientsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ingredients`
        );
        const quantitiesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quantities`
        );

        if (
          !recipesResponse.ok ||
          !ingredientsResponse.ok ||
          !quantitiesResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const recipesData = await recipesResponse.json();
        const ingredientsData = await ingredientsResponse.json();
        const quantitiesData = await quantitiesResponse.json();

        setRecipes(recipesData);
        setIngredients(ingredientsData);

        const quantitiesMap = {};
        quantitiesData.forEach((quantity) => {
          quantitiesMap[quantity.ingredient_name] = quantity.quantity;
        });
        setQuantities(quantitiesMap);
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
    const selectedIngredients = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      ingredients: selectedIngredients,
    });
  };

  const addNewIngredient = (newIngredientObj) => {
    if (newIngredientObj.name.trim() !== "") {
      const existingIngredient = ingredients.find(
        (ingredient) =>
          ingredient.name.toLowerCase() ===
          newIngredientObj.name.trim().toLowerCase()
      );

      if (!existingIngredient) {
        const newIngredientWithId = { id: Date.now(), ...newIngredientObj };
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          newIngredientWithId,
        ]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ingredients: [...prevFormData.ingredients, newIngredientWithId.name],
        }));
        setSelectedIngredientsList((prevList) => [
          ...prevList,
          newIngredientWithId.name,
        ]);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ingredients: [...prevFormData.ingredients, existingIngredient.name],
        }));
        if (!selectedIngredientsList.includes(existingIngredient.name)) {
          setSelectedIngredientsList((prevList) => [
            ...prevList,
            existingIngredient.name,
          ]);
        }
      }

      setIsModalOpen(false);
    }
  };

  const handleRemoveSelectedIngredient = (ingredientName) => {
    const updatedIngredients = formData.ingredients.filter(
      (ingredient) => ingredient !== ingredientName
    );
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });

    setSelectedIngredientsList((prevList) =>
      prevList.filter((item) => item !== ingredientName)
    );
  };

  const handleDoubleClickIngredient = (ingredientName) => {
    if (!selectedIngredientsList.includes(ingredientName)) {
      setSelectedIngredientsList((prevList) => [...prevList, ingredientName]);
    }
  };

  const handleQuantityChange = (e, ingredientName) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: {
        ...prevFormData.quantity,
        [ingredientName]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.category ||
      !formData.time ||
      !formData.ingredients.length
    ) {
      setFormError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setFormError(null);

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/recipes`;
      const method = "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // eslint-disable-next-line no-alert
        alert("Recette créée avec succès!");
        setFormData({
          title: "",
          description: "",
          category: "",
          time: "",
          ingredients: [],
          steps: "",
          image: "",
        });
        setSelectedIngredientsList([]);
      } else {
        const errorData = await response.json();
        console.error("Erreur:", errorData);
        setFormError(
          "Échec de l'enregistrement de la recette. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      setFormError(
        "Échec de l'enregistrement de la recette. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">
        Création d'une nouvelle recette
      </h1>
      {formError && <p className="text-red-600">{formError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {recipes.length > 0 && (
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.category_name}>
                  {recipe.category_name}
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
            value={formData.time}
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
                      onDoubleClick={() =>
                        handleDoubleClickIngredient(ingredient.name)
                      }
                      className="h-7 flex justify-between items-center space-x-2"
                    >
                      <p>{ingredient.name}</p>
                      <p>({ingredient.calories || "N/A"} kcal / unit)</p>
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
          </label>
          <div className="mt-2 h-[10rem] border border-gray-300 rounded-xl text-sm p-1 overflow-y-auto">
            {selectedIngredientsList.length === 0 ? (
              <p>Aucun ingrédient sélectionné pour le moment.</p>
            ) : (
              <ul className="divide-y divide-gray-200 w-full">
                {selectedIngredientsList.map((ingredient) => (
                  <li key={ingredient.id} className="flex py-1">
                    <div className="flex w-full items-center justify-between">
                      <div className="w-[30%]">{ingredient}</div>
                      <span className="w-20">
                        {ingredient.calories} kcal/unit
                      </span>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <label
                            htmlFor={`quantity_${ingredient}`}
                            className="ml-4 mr-2"
                          >
                            Quantité:
                          </label>
                          <input
                            type="number"
                            id={`quantity_${ingredient}`}
                            name={`quantity_${ingredient}`}
                            value={
                              formData.quantity && formData.quantity[ingredient]
                                ? formData.quantity[ingredient]
                                : ""
                            }
                            onChange={(e) =>
                              handleQuantityChange(e, ingredient)
                            }
                            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm w-20 mr-1"
                          />
                          <span>gr</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-red-600 ml-2"
                        onClick={() =>
                          handleRemoveSelectedIngredient(ingredient)
                        }
                      >
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
          >
            Créer la recette
          </button>
        </div>
      </form>
      <IngredientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addNewIngredient}
      />
    </div>
  );
}
