// import { useState } from "react";
//  import { useEffect } from "react";

import { useLoaderData, Link } from "react-router-dom";

import "../style/RecipesPage.css";

// import required modules

function RecipesPage() {
  console.info(useLoaderData());
  const dataRecipes = useLoaderData();
  // const [slides, setSlides] = useState(0);
  //   const [recipes, setRecipes] = useState([]);

  // const setSlidesPerview = () => {
  //   // eslint-disable-next-line no-nested-ternary
  //   setSlides(window.innerWidth < 640 ? 1 : window.innerWidth >= 640 ? 3 : 0);
  // };

  // useEffect(() => {
  //   setSlidesPerview();
  //   setRecipes(dataRecipes);
  //   window.addEventListener("resize", setSlidesPerview);

  //   return () => {
  //     window.removeEventListener("resize", setSlidesPerview);
  //   };
  // }, []);

  return (
    <section className="recipes-page">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher une recette"
        />
      </div>

      <swiper-container
        pagination="true"
        pagination-clickable="true"
        grid-rows="3"
        space-between="30"
        centered-slides="true"
        // slides-per-view={slides}
        loop="true"
      >
        {dataRecipes.map((recipe) => (
          <swiper-slide key={recipe.id}>
            <Link key={recipe.id} to={`/RecipePage/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
            </Link>
            <h2>{recipe.title}</h2>
          </swiper-slide>
        ))}
      </swiper-container>
    </section>
  );
}

export default RecipesPage;
