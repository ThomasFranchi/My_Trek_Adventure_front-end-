import { useNavigate } from "react-router-dom";
import Button from "./atoms/Button";
import "../styles/guide.css";

function Guides({
  firstName,
  lastName,
  mail,
  experienceYears,
  state,
  slug,
  profilePicture,
  description,
}) {
  const navigate = useNavigate();

  function goToGuidesPage() {
    console.log(slug);
    navigate("/guides/" + slug);
  }

  return (
    <div className="postGuides">
        <div className="guideProfil1">
          <img
            className="guideProfilPicture"
            style={{ width: 10 + "%" }}
            src={`http://localhost:3001${profilePicture}`}
            alt="Photo du Guide"
          />
        </div>
        <div className="guideProfil2">
          <p>
            <span className="guideInfo">Prénom Nom : </span> {firstName}{" "}
            {lastName}{" "}
          </p>
          </div>
          <div className="guideProfil3">
          <p>
            <span className="guideInfo">mail : </span> {mail}{" "}
          </p>
          </div>
          <div className="guideProfil4">
          <p>
            <span className="guideInfo">Années d'expériences : </span>{" "}
            {experienceYears}{" "}
          </p>
          </div>
          <div className="guideProfil5">
          <p>
            <span className="guideInfo">Etat : </span> {state}{" "}
          </p>
        </div>
        <div className="buttonLook">
          <Button onClick={goToGuidesPage}>VOIR</Button>
        </div>
      </div>
  );
}

export default Guides;
