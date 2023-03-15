import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import emptyStar from "../pictures/ico_emptyStar.png";
import fullStar from "../pictures/ico_fullStar.png";

import Button from "./atoms/Button";

function Parcours ({trekName, name, beginDate, endDate, parcoursID, guideID, minPlaces, maxPlaces, slug}) 
{
  const [errorMsg, setErrorMsg] = useState ("");
  const [guide, setGuide] = useState ([]);
  const [parcours, setParcours] = useState ([]);
  const navigate = useNavigate();
  let params = useParams();

  useEffect(() => {getParcoursAndGuideFromIds()}, [])

  async function getParcoursAndGuideFromIds()
  {
    let token = localStorage.getItem("token");

    const options = 
    {
        method: 'GET',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token         
        }
    };
    const parcoursResponse = await fetch(`http://localhost:3001/parcours/get/${parcoursID}`, options);
    const parcoursData = await parcoursResponse.json();
    if (!parcoursData) 
    {
      setParcours("");
    }
    setParcours(parcoursData);

    const guideResponse = await fetch(`http://localhost:3001/guides/get/${guideID}`, options);
    const guideData = await guideResponse.json();
    console.log(guideData);
    if (!guideData) 
    {
      setGuide("");
    }
    setGuide(guideData);
  }

  function goToTrekPage ()
  {
    console.log(slug);
    navigate('/treks/'+slug);
  }

  return (
    <div id="post"><div className="content">
      <div className="gameInfos">
        <p>{trekName}</p>
          <p><span className="userInfo">Sur le parcours </span> {parcours.name}</p>
          <p><span className="userInfo">Animé par </span> {guide.firstName} {guide.lastName}</p>
        </div>
        <div className="gameInfos">
          <Button onClick = {goToTrekPage}>Voir le trek</Button>
        </div>
      </div>  
    </div> 
  );
}

export default Parcours;