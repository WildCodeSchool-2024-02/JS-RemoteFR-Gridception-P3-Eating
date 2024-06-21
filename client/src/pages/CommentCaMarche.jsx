import { Link } from "react-router-dom";
import "../styles/comment_ca_marche.css";
import deco1 from "../assets/images/deco1.png";
import deco2 from "../assets/images/deco2.png";
import deco3 from "../assets/images/deco3.png";
import deco4 from "../assets/images/deco4.png";
import flecheGauche from "../assets/images/flecheGauche.png";
import flecheDroite from "../assets/images/flecheDroite.png";
import flecheMilieu from "../assets/images/flecheMilieu.png";
import ble from "../assets/images/ble.png";

function CommentCaMarche() {
  return (
    <>
      <h1 className="page-title-ccm">Comment ça marche</h1>
      <img
        className="fleche-gauche-ccm"
        src={flecheGauche}
        alt="flecheGauche"
      />
      <div className="content-ccm">
        <section className="column1-ccm">
          <div className="one-ccm">
            <h2>UNE RECETTE</h2>
            <p>Je trouve la recette de mes rêves</p>
            <img className="img1-ccm" src={deco1} alt="deco1" />
          </div>
          <div className="two-ccm">
            <h2>UN CLIC</h2>
            <p>Je me connecte avec mon compte</p>
            <img className="img2-ccm" src={deco2} alt="deco2" />
          </div>
          <img
            className="fleche-milieu-ccm"
            src={flecheMilieu}
            alt="fleche-milieu"
          />
        </section>

        <section className="column2-ccm">
          <div className="three-ccm">
            <h2>SELECTIONNE</h2>
            <p>Je sélectionne la recette de mon choix</p>
            <img className="img3-ccm" src={deco3} alt="deco3" />
          </div>
          <div className="four-ccm">
            <h2>CUISINE</h2>
            <p>Je cuisine ce que j'ai choisi</p>
            <img className="img4-ccm" src={deco4} alt="deco4" />
          </div>
          <img
            className="fleche-droite-ccm"
            src={flecheDroite}
            alt="flecheDroite"
          />
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
