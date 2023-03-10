import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import emptyStar from "../pictures/ico_emptyStar.png";
import fullStar from "../pictures/ico_fullStar.png";

import Button from "./atoms/Button";

function Parcours ({name, beginDate, endDate, parcoursID, guideID, minPlaces, maxPlaces, slug}) 
{
  const [errorMsg, setErrorMsg] = useState ("");
  const [guideName, setGuideName] = useState ([]);
  const [parcoursName, setParcoursName] = useState ([]);
  const navigate = useNavigate();
  let params = useParams();

  useEffect(() => {getParcoursAndGuideFromIds()}, [])

  async function getParcoursAndGuideFromIds()
  {
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const parcoursResponse = await fetch(`http://localhost:3001/parcours/${params.parcoursID}`, options);
    const parcoursData = await parcoursResponse.json();
    console.log(parcoursData);
    if (!parcoursData) 
    {
      setParcoursName("");
    }
    setParcoursName(parcoursData);
    console.log("Parcours " + parcoursName);

    /*const guideResponse = await fetch(`http://localhost:3001/guides/${params.guideID}`, options);
    const guideData = await guideResponse.json();
    console.log(guideData);
    if (!guideData) 
    {
      setGuideName("");
    }
    setGuideName(guideData);
    console.log("Guide " + guideName);*/
  }

  function goToTrekPage ()
  {
    console.log(slug);
    navigate('/treks/'+slug);
  }

  return (
    <div id="post"><div className="content">
          <div className="gameInfos">
            <p><span className="userInfo">Date de début :</span> {beginDate} </p>
            <p><span className="userInfo">Date de fin :</span> {endDate}</p>
            <p><span className="userInfo">Places minimum :</span> {minPlaces} places</p>
            <p><span className="userInfo">Places maximium :</span> {maxPlaces} places</p>
          </div>
          <div className="gameInfos">
            <Button onClick = {goToTrekPage}>Voir le trek</Button>
          </div>
      </div>  
    </div> 
  );
}

export default Parcours;