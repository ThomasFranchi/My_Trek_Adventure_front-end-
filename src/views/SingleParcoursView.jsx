import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import emptyStar from "../pictures/ico_emptyStar.png";
import fullStar from "../pictures/ico_fullStar.png";


function SingleParcoursView() {
  const [parcours, setParcours] = useState({})
  let params = useParams();
  useEffect(() => {displayParcours()}, [])

  let difficultyLevel;
  async function displayParcours()
  {
    const response = await fetch(`http://localhost:3001/parcours/${params.slug}`);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setParcours({});
    }
    setParcours(data);
  }

  async function setDifficulty (difficulty)
  {
    switch (difficulty)
    {
      case 1:
        difficultyLevel = "Facile";
        break;
      case 2:
        difficultyLevel = "Moyen";
        break;
      case 3:
        difficultyLevel = "Difficile";
        break;
    }
    return difficultyLevel;
  }

  setDifficulty(parcours.difficulty);

  return (
    <div>
      <Topbar />
      <h1>Page du parcours {parcours.name}</h1>
      <div id="post">
        <div>
          <img className = "parcoursImage" src = {parcours.picture} alt = "Photos du parcours"></img>
        </div>
        <div className="content">
            <div className="gameInfos">
              <p><span className="userInfo">Nom :</span> {parcours.name} </p>
              <p><span className="userInfo">Durée :</span> {parcours.duration} jours</p>
              <p><span className="userInfo">Prix :</span> {parcours.price} €</p>
              {parcours.difficulty === 1 && (
                <p><span className="userInfo">Difficulté :</span> <img src = {fullStar} alt = "Etoile Pleine" /><img src = {emptyStar} alt = "Etoile Vide"/> <img src = {emptyStar} alt = "Etoile Vide"/> ({difficultyLevel})</p>
              )}
              {parcours.difficulty === 2 && (
                <p><span className="userInfo">Difficulté :</span> <img src = {fullStar} alt = "Etoile Pleine" /><img src = {fullStar} alt = "Etoile Pleine"/> <img src = {emptyStar} alt = "Etoile Vide"/> ({difficultyLevel})</p>
              )}
              {parcours.difficulty === 3 && (
                <p><span className="userInfo">Difficulté :</span> <img src = {fullStar} alt = "Etoile Pleine" /><img src = {fullStar} alt = "Etoile Pleine"/> <img src = {fullStar} alt = "Etoile Pleine"/> ({difficultyLevel})</p>
              )}
            </div>
            <div className="gameInfos">
              <p><span className="userInfo">Description :</span> {parcours.description}</p>
            </div>
        </div>  
      </div>
      <Footer />
    </div>
  );
}

export default SingleParcoursView;
