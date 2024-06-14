import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { register } from "swiper/element-bundle";
import recipes from "../datas/recipes.json";

register();

function HomePage() {
  const [slides, setSlides] = useState(0);
  const [recipe, setRecipe] = useState([]);

  const setSlidesPerview = () => {
    // eslint-disable-next-line no-nested-ternary
    setSlides(window.innerWidth < 640 ? 1 : window.innerWidth >= 640 ? 3 : 0);
  };

  useEffect(() => {
    setSlidesPerview();
    setRecipe(recipes.recipes);
    window.addEventListener("resize", setSlidesPerview);

    return () => {
      window.removeEventListener("resize", setSlidesPerview);
    };
  }, []);

  return (
    <section className="w-screen h-screen">
      <div className="md:flex md:absolute items-center right-[33%]">
        <input
          className="rounded-xl h-11 w-[26vw] bg-zinc-100 border border-neutral-400 text-center "
          type="text"
          placeholder="Rechercher une recette"
        />
      </div>
      <div className="h-[60%] ml-[10%] mr-[10%] flex">
        <img
          src="../src/assets/images/plat.png"
          alt="plat1"
          className="absolute w-[450px] top-[15%] left-[13%] z-20"
        />
        <div className="absolute bg-green-600 w-[20%] h-[65%] left-[15%] top-0 text-green-600">
          x
        </div>
        <div className="flex absolute right-[20%] items-center h-[50%] w-[30%]">
          <p className="z-20 text-[3rem] font-bold ">
            Découvrez le goût authentique du partage avec nos plats sains et
            savoureux
          </p>
        </div>
      </div>
      <div className="w-screen h-[40%] flex-wrap justify-center mt-8 pl-[10%]">
        <div className="">
          <swiper-container
            centered-slides="true"
            slides-per-view={slides}
            loop="true"
          >
            {recipe.map((data) => (
              <swiper-slide key={data.id}>
                <div className="h-[30rem] w-[30rem] space-x-4">
                  <Link key={data.id} to={`/Recettes/${data.id}`}>
                    <img
                      className="h-[200px] w-[250px] rounded-3xl absolute z-20 object-cover"
                      src={data.img}
                      alt={data.name}
                    />
                  </Link>
                  <div className="absolute top-[25%] left-24 flex flex-col items-center justify-center space-y-4 p-4 text-justify w-[20rem] h-[20rem] bg-green-600 rounded-3xl text-center ">
                    <div>
                      <img
                        src={data.img2}
                        alt={data.img2}
                        className="absolute right-[36%] top-[7%] h-[40px]"
                      />
                      <img
                        src={data.img3}
                        alt={data.img3}
                        className="absolute right-[20%] h-[40px] top-[7%]"
                      />
                    </div>

                    <h2 className="w-[80%] font-bold text-xl pt-12">
                      {data.name}
                    </h2>
                    <p className="line-clamp-3">{data.description}</p>
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
