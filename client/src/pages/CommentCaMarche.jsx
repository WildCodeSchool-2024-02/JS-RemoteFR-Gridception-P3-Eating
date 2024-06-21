import { Link } from "react-router-dom";
import "../styles/ccm.css";
import deco1 from "../assets/images/deco1.png";
import deco2 from "../assets/images/deco2.png";
import deco3 from "../assets/images/deco3.png";
import deco4 from "../assets/images/deco4.png";
import flecheGauche from "../assets/images/flecheGauche.png";
import flecheDroite from "../assets/images/flecheDroite.png";
import flecheMilieu from "../assets/images/flecheMilieu.png";
import blé from "../assets/images/blé.png";

function CommentCaMarche() {
  return (
    <>
      <h1 className="pageTitleCcm">Comment ça marche</h1>
      <img className="flecheGaucheCcm" src={flecheGauche} alt="" />
      <div className="ContentCcm">
        <section className="column1Ccm">
          <div className="oneCcm">
            <h2>UNE RECETTE</h2>
            <p>Je trouve la recette de mes rêves</p>
            <img className="img1Ccm" src={deco1} alt="deco1" />
          </div>
          <div className="twoCcm">
            <h2>UN CLIC</h2>
            <p>Je me connecte avec mon compte</p>
            <img className="img2Ccm" src={deco2} alt="deco2" />
          </div>
          <img
            className="flecheMilieuCcm"
            src={flecheMilieu}
            alt="flècheMilieu"
          />
        </section>

        <section className="column2Ccm">
          <div className="threeCcm">
            <h2>SELECTIONNE</h2>
            <p>Je sélectionne la recette de mon choix</p>
            <img className="img3Ccm" src={deco3} alt="deco3" />
          </div>
          <div className="fourCcm">
            <h2>CUISINE</h2>
            <p>Je cuisine ce que j'ai choisi</p>
            <img className="img4Ccm" src={deco4} alt="deco4" />
          </div>
          <img
            className="flecheDroiteCcm"
            src={flecheDroite}
            alt="flecheDroite"
          />
        </section>
      </div>
      <div className="containerButtonCcm">
        <Link className="buttonCcm" to="/RecipePage">
          Recettes
        </Link>
      </div>
      <img className="BleCcm" src={blé} alt="ble" />
    </>
  );
}
export default CommentCaMarche;
