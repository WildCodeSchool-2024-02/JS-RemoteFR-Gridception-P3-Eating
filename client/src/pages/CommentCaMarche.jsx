import { Link } from "react-router-dom";
import "../styles/ccm.css";
import deco1 from "../assets/images/deco1.png";
import deco2 from "../assets/images/deco2.png";
import deco3 from "../assets/images/deco3.png";
import deco4 from "../assets/images/deco4.png";
import ble from "../assets/images/ble.png";

function CommentCaMarche() {
  return (
    <>
      <h1 className="pageTitle">Comment ça marche</h1>
      <div className="Content">
        <section className="column1">
          <div className="one">
            <h2>UNE RECETTE</h2>
            <p>Je trouve la recette de mes rêves</p>
            <img className="img1" src={deco1} alt="deco1" />
          </div>
          <div className="two">
            <h2>UN CLIC</h2>
            <p>Je me connecte avec mon compte</p>
            <img className="img2" src={deco2} alt="deco2" />
          </div>
        </section>

        <section className="column2">
          <div className="three">
            <h2>SELECTIONNE</h2>
            <p>Je sélectionne la recette de mon choix</p>
            <img className="img3" src={deco3} alt="deco3" />
          </div>
          <div className="four">
            <h2>CUISINE</h2>
            <p>Je cuisine ce que j'ai choisi</p>
            <img className="img4" src={deco4} alt="deco4" />
          </div>
        </section>
      </div>
      <div className="containerButton">
        <Link className="button" to="/RecipePage">
          Recettes
        </Link>
      </div>
      <img className="ble" src={ble} alt="ble" />
    </>
  );
}
export default CommentCaMarche;
