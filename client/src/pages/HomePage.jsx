function HomePage() {
  return (
    <section className="w-screen h-screen">
      <div className="h-[70%] ml-[10%] mr-[10%] flex">
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
      <div>Carousel</div>
    </section>
  );
}

export default HomePage;
