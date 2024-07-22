import axios from "axios";

const { VITE_API_URL } = import.meta.env;

const recipesLoader = async () => {
  const response = await fetch(`${VITE_API_URL}/api/recipes`);
  const data = await response.json();
  return data;
};

const OneRecipeLoader = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Error("ID de recette non défini");
  }

  const recipesResponse = await fetch(`${VITE_API_URL}/api/recipes`);
  const quantityResponse = await fetch(
    `${VITE_API_URL}/api/quantities/recipe/${id}`
  );

  const recipesData = await recipesResponse.json();
  const quantityData = await quantityResponse.json();
  return { recipes: recipesData, quantity: quantityData };
};

const editRecipeLoader = async ({ params }) => {
  const categoriesResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categories`
  );
  const ingredientsResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/ingredients`
  );
  const recipeResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/recipes/${params.id}`
  );

  const categoriesToJson = await categoriesResponse.json();
  const ingredientsToJson = await ingredientsResponse.json();
  const recipeToJson = await recipeResponse.json();

  // console.log("categories : ", categoriesToJson);
  // console.log("ingredients : ", ingredientsToJson);
  // console.log("recipes : ", recipeToJson);

  return [categoriesToJson, ingredientsToJson, recipeToJson];
};

const usersLoader = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users/`
  );
  return response.data;
};

export { recipesLoader, OneRecipeLoader, editRecipeLoader, usersLoader };
