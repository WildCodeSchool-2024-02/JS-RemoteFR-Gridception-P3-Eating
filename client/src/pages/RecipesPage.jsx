import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

import "../styles/recipes_page.css";

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
          placeholder="RECHERCHER UNE RECETTE"
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
              <div className="time-category-recepies">
                <div className="category-recipes">
                  <img
                    src="../src/assets/images/vege.png"
                    alt="catégorie de la recette"
                  />
                  <h3>{recipe.category_name}</h3>
                </div>
                <div className="time-recipes">
                  <img
                    src="../src/assets/images/clock.png"
                    alt="temps de préparation"
                  />
                  <h3>{recipe.time} min</h3>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default RecipesPage;
