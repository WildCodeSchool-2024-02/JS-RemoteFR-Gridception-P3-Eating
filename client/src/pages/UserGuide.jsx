import { Link } from "react-router-dom";
import "../styles/user_guide.css";
import deco1 from "../assets/images/deco1.png";
import deco2 from "../assets/images/deco2.png";
import deco3 from "../assets/images/deco3.png";
import deco4 from "../assets/images/deco4.png";
import ble from "../assets/images/ble.png";
import oneGreen from "../assets/images/oneGreen.png";
import twoGreen from "../assets/images/twoGreen.png";
import threeGreen from "../assets/images/threeGreen.png";
import fourGreen from "../assets/images/fourGreen.png";

function UserGuide() {
  return (
    <>
      <h1 className="page-title-userguide">Comment ça marche</h1>

      <div className="content-userguide">
        <section className="column1-userguide">
          <div className="one-userguide">
            <img
              className="one-green-userguide"
              src={oneGreen}
              alt="oneGreen"
            />
            <h2 className="h2-userguide">UNE RECETTE</h2>
            <p className="p-userguide">Je trouve la recette de mes rêves</p>
            <img className="img1-userguide" src={deco1} alt="deco1" />
          </div>
          <div className="three-userguide">
            <img
              className="three-green-userguide"
              src={threeGreen}
              alt="threeGreen"
            />
            <h2 className="h2-userguide">SELECTIONNE</h2>
            <p className="p-userguide">
              Je sélectionne la recette de mon choix
            </p>
            <img className="img3-userguide" src={deco3} alt="deco3" />
          </div>
        </section>

        <section className="column2-userguide">
          <div className="two-userguide">
            <img
              className="two-green-userguide"
              src={twoGreen}
              alt="twoGreen"
            />
            <h2 className="h2-userguide">UN CLIC</h2>
            <p className="p-userguide">Je me connecte avec mon compte</p>
            <img className="img2-userguide" src={deco2} alt="deco2" />
          </div>

          <div className="four-userguide">
            <img
              className="four-green-userguide"
              src={fourGreen}
              alt="fourGreen"
            />
            <h2 className="h2-userguide">CUISINE</h2>
            <p className="p-userguide">Je cuisine ce que j'ai choisi</p>
            <img className="img4-userguide" src={deco4} alt="deco4" />
          </div>
        </section>
      </div>
      <div className="container-button-userguide">
        <Link className="button-userguide" to="/recettes">
          Recettes
        </Link>
      </div>
      <img className="ble-userguide" src={ble} alt="ble" />
    </>
  );
}
export default UserGuide;
