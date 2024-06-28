import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

import "../styles/RecipesPage.css";

function RecipesPage() {
  const dataRecipes = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="recipes-page">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher une recette"
          onChange={handleSearchTerm}
        />
      </div>

      <div className="recipes-container">
        {dataRecipes
          .filter((recipe) =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((recipe) => (
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
