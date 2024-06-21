import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { register } from "swiper/element-bundle";

register();

function HomePage() {

  console.info(useLoaderData());
  const dataRecipes = useLoaderData();

  const [slides, setSlides] = useState(1);
  const [recipes, setRecipes] = useState([]);

  const setSlidesPerview = () => {
    if (window.innerWidth < 640) {
      setSlides(1);
    } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      setSlides(3);
    } else {
      setSlides(3);
    }
  };

  useEffect(() => {
    setRecipes(dataRecipes);
    setSlidesPerview();
    window.addEventListener("resize", setSlidesPerview);

    return () => {
      window.removeEventListener("resize", setSlidesPerview);
    };

  }, [dataRecipes]);

  return (
    <section className="w-screen h-screen">
      <div className="md:flex md:absolute items-center right-[32%]">
        <input
          className="rounded-xl h-11 w-[29vw] bg-zinc-100 border border-neutral-400 text-center"
          type="text"
          placeholder="Rechercher une recette"
        />
      </div>
      <div className="h-[60%] ml-[10%] mr-[10%] flex">
        <img
          src="../src/assets/images/plat.png"
          alt="plat1"
          className="absolute w-[450px] top-[15%] left-[12%] z-20"
        />
        <div className="absolute bg-green-600 w-[20%] h-[65%] left-[15%] top-0 text-green-600">
          x
        </div>
        <div className="flex flex-row absolute right-[20%] mt-6 items-center h-[50%] w-[30%]">
          <p className="z-20 text-[3rem] font-bold [text-shadow:_0_4px_2px_rgb(0_0_0_/_40%)]">
            Découvrez le goût authentique du partage avec nos plats sains et savoureux
          </p>
          <button type="button" className="bg-green-600 w-28 absolute bottom-14 right-28 rounded-xl p-2 font-semibold text-white cursor-pointer">
            <p> Créez votre recette</p>
          </button>
        </div>
      </div>
      <div className="w-screen h-[50%] flex-wrap justify-center mt-8 ml-20">
        <div>
          <swiper-container
            centered-slides="true"
            slides-per-view={slides}
            loop="true"
          >
            {recipes.map((recipe) => (
              <swiper-slide key={recipe.id}>
                <div className="h-[30rem] w-[28rem]">
                  <Link key={recipe.id} to={`/RecipePage/${recipe.id}`}>
                    <img
                      className="h-[220px] w-[220px] rounded-3xl absolute z-20 object-cover"
                      src={recipe.image}
                      alt={recipe.title}
                    />
                  </Link>
                  <div className="absolute top-[15%] left-16 flex flex-col items-center justify-center space-y-4 p-4 w-[20rem] h-[22rem] bg-green-600 rounded-3xl text-center">
                    <div className="absolute top-4 right-[2%] h-[60px] w-[10rem] justify-center space-x-8 flex">
                      <div className="flex flex-col">
                        <img
                          src="../src/assets/images/vege.png"
                          alt="vege"
                          className="h-[40px] w-[40px]"
                        />
                        <p>{recipe.category_id.name}</p>
                      </div>
                      <div className="flex flex-col">
                        <img
                          src="../src/assets/images/clock.png"
                          alt="clock"
                          className="h-[40px] w-[40px]"
                        />
                        <p className="font-semibold">{recipe.time} min</p>
                      </div>
                    </div>
                    <h2 className="w-[80%] font-bold text-xl pt-28">
                      {recipe.title}
                    </h2>
                    <p className="line-clamp-3 text-black">{recipe.descriptionText}</p>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
