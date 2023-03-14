import { useNavigate } from "react-router-dom";
import Button from "./atoms/Button";

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
    <div id="postGuides">
      <img style={{ width: 10 + "%" }} src={`http://localhost:3001${profilePicture}`} alt="Photo du Guide" />
      <div className="content">
        <div className="guideInfos">
          <p>
            <span className="guideInfo">Prénom Nom :</span> {firstName}{" "}
            {lastName}{" "}
          </p>
          <p>
            <span className="guideInfo">mail :</span> {mail}{" "}
          </p>
          <p>
            <span className="guideInfo">Années d'expériences :</span>{" "}
            {experienceYears}{" "}
          </p>
          <p>
            <span className="guideInfo">Etat :</span> {state}{" "}
          </p>
        </div>
        <div className="gameInfos">
          <Button onClick={goToGuidesPage}>Voir le Guide</Button>
        </div>
      </div>
    </div>
  );
}

export default Guides;
