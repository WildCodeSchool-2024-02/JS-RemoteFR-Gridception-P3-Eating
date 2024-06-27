import { useLoaderData, Link } from "react-router-dom";

import "../styles/RecipesPage.css";

function RecipesPage() {
  const dataRecipes = useLoaderData();

  return (
    <section className="recipes-page">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher une recette"
        />
      </div>

      <div className="recipes-container">
        {dataRecipes.map((recipe) => (
          <div className="card-recipes" key={recipe.id}>
            <Link key={recipe.id} to={`/RecipePage/${recipe.id}`}>
              <img
                className="image-slider-recipies"
                src={recipe.image}
                alt={recipe.title}
              />
            </Link>
            <h2>{recipe.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipesPage;
