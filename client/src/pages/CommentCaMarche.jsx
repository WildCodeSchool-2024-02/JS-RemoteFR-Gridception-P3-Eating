import { Link } from "react-router-dom";
import "../styles/comment_ca_marche.css";
import deco1 from "../assets/images/deco1.png";
import deco2 from "../assets/images/deco2.png";
import deco3 from "../assets/images/deco3.png";
import deco4 from "../assets/images/deco4.png";
import ble from "../assets/images/ble.png";
import oneGreen from "../assets/images/oneGreen.png";
import twoGreen from "../assets/images/twoGreen.png";
import threeGreen from "../assets/images/threeGreen.png";
import fourGreen from "../assets/images/fourGreen.png";

function CommentCaMarche() {
  return (
    <>
      <h1 className="page-title-ccm">Comment ça marche</h1>

      <div className="content-ccm">
        <section className="column1-ccm">
          <div className="one-ccm">
            <img className="one-green-ccm" src={oneGreen} alt="oneGreen" />
            <h2 className="h2-ccm">UNE RECETTE</h2>
            <p className="p-ccm">Je trouve la recette de mes rêves</p>
            <img className="img1-ccm" src={deco1} alt="deco1" />
          </div>
          <div className="two-ccm">
            <img className="two-green-ccm" src={twoGreen} alt="twoGreen" />
            <h2 className="h2-ccm">UN CLIC</h2>
            <p className="p-ccm">Je me connecte avec mon compte</p>
            <img className="img2-ccm" src={deco2} alt="deco2" />
          </div>
        </section>

        <section className="column2-ccm">
          <div className="three-ccm">
            <img
              className="three-green-ccm"
              src={threeGreen}
              alt="threeGreen"
            />
            <h2 className="h2-ccm">SELECTIONNE</h2>
            <p className="p-ccm">Je sélectionne la recette de mon choix</p>
            <img className="img3-ccm" src={deco3} alt="deco3" />
          </div>
          <div className="four-ccm">
            <img className="four-green-ccm" src={fourGreen} alt="fourGreen" />
            <h2 className="h2-ccm">CUISINE</h2>
            <p className="p-ccm">Je cuisine ce que j'ai choisi</p>
            <img className="img4-ccm" src={deco4} alt="deco4" />
          </div>
        </section>
      </div>
      <div className="container-button-ccm">
        <Link className="button-ccm" to="/RecipePage">
          Recettes
        </Link>
      </div>
      <img className="ble-ccm" src={ble} alt="ble" />
    </>
  );
}
export default CommentCaMarche;
