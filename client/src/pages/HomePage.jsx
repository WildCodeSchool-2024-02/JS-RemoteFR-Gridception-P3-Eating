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
    <section className="w-screen h-screen uppercase">
      <div className="h-[60%] ml-[10%] mr-[10%] flex">
        <img
          src="../src/assets/images/plat.png"
          alt="plat1"
          className="absolute w-[450px] top-[15%] left-[12%] z-20"
        />
        <div className="absolute bg-green-800 w-[20%] h-[65%] left-[15%] top-0 text-green-800">
          x
        </div>
        <div className="flex flex-row absolute right-[16%] mt-6 items-center h-[50%] w-[40%]">
          <h1 className="z-20 text-[2.5rem] font-bold ">
            Découvrez le goût authentique du partage avec nos plats sains et
            savoureux
          </h1>
          <div className="z-20">
            <Link to="/privé/recettes/creation" className="cursor-pointer">
              <button
                type="button"
                className="bg-orange-400 text-white text-[15px] uppercase w-[10rem] absolute bottom-16 right-28 rounded-xl p-5 font-semibold "
              >
                Créez votre recette
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-screen h-[50%] flex-wrap justify-center mt-8 pl-20">
        <div>
          <swiper-container
            centered-slides="true"
            slides-per-view={slides}
            loop="true"
          >
            {recipes &&
              recipes.map((recipe) => (
                <swiper-slide key={recipe.id}>
                  <div className="h-[31rem] w-[28rem] relative">
                    <Link key={recipe.id} to={`/recettes/${recipe.id}`}>
                      <img
                        className="h-[220px] w-[220px] rounded-3xl absolute z-20 object-cover"
                        src={recipe.image}
                        alt={recipe.title}
                      />
                    </Link>
                    <div className="absolute top-[15%] left-16 flex flex-col items-center justify-center space-y-4 p-4 w-fit h-[75%] bg-green-800 rounded-3xl text-center shadow-2xl">
                      <div className="absolute top-4 left-[40%] h-[60px] w-[15rem] justify-center space-x-8 flex">
                        <div className="flex flex-col w-[5rem] h-full items-center">
                          <img
                            src="../src/assets/images/vege.png"
                            alt="vege"
                            className="h-[40px] w-[40px]"
                          />
                          <p className="font-semibold text-lg pt-1 text-white">
                            {recipe.category_name}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <img
                            src="../src/assets/images/clock.png"
                            alt="clock"
                            className="h-[40px] w-[40px]"
                          />
                          <p className="font-semibold text-lg pt-1 text-white">
                            {recipe.time} min
                          </p>
                        </div>
                      </div>
                      <h2 className="w-[80%] font-bold text-2xl pt-28 text-white">
                        {recipe.title}
                      </h2>
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
