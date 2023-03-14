import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import emptyStar from "../pictures/ico_emptyStar.png";
import fullStar from "../pictures/ico_fullStar.png";
import StepsRegister from "../components/organisms/StepRegister";

import Button from "../components/atoms/Button";
import PopupAlert from "../components/organisms/PopupAlert";

function SingleParcoursView() {
  const [parcours, setParcours] = useState({})
  const [deleteAlert, setDeleteAlert] = useState(false);
  let params = useParams();
  const navigate = useNavigate();
  useEffect(() => {displayParcours()}, [])
  
  let difficultyLevel;
  async function displayParcours()
  {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }
    };

    const response = await fetch(`http://localhost:3001/parcours/${params.slug}`, options);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setParcours({});
    }
    setParcours(data);
  }

  function backToParcoursList()
  {
    navigate("/parcours");
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

  function setAlertState (state)
  {
    setDeleteAlert(state);
  }
  
  // Cancel a customer deletion
  function cancelDelete()
  {
    setAlertState(false);
  }

  // Confirm a customer deletion
  async function confirmDelete()
  {
    let token = localStorage.getItem("token");
    const options = 
    {
      method: 'DELETE',
      headers: 
      {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization : "Bearer " + token
      },
      body: JSON.stringify({
          slug: params.slug
      })
    };
    const response = await fetch(`http://localhost:3001/parcours/delete/`, options);
    const data = await response.json();
    console.log(data);
    console.log(data.status);
    if (data.status === "200") 
    {
      setAlertState(false);
      backToParcoursList();
    }
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
      mvp
      <StepsRegister />
      {/*to-do afficher liste d'étapes*/}
      {deleteAlert &&(
        <PopupAlert type = "ce parcours" cancel = {() => cancelDelete()} confirm = {() => confirmDelete()} /> 
      )}
      <Button onClick = {() => backToParcoursList()}>Retour aux parcours</Button>
      <Footer />
    </div>
  );
}

export default SingleParcoursView;