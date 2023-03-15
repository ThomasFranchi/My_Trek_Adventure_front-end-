import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import emptyStar from "../pictures/ico_emptyStar.png";
import fullStar from "../pictures/ico_fullStar.png";
import StepsRegister from "../components/organisms/StepRegister";

import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Step from  "../components/Step";
import PopupAlert from "../components/organisms/PopupAlert";

function SingleParcoursView() {
  const [parcours, setParcours] = useState({})
  const [parcoursSteps, setParcoursSteps] = useState([])
  const [newParcours, setNewParcours] = useState({ 
  name: "", duration: "", description: "", price: "", parcoursPicture: "", difficulty: 0});

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState (false); // For the task to edit

  let params = useParams();
  const navigate = useNavigate();
  useEffect(() => {displayParcours()}, [])
  
  let image; 
  let difficultyLevel;

  function handleChange(e) {
    setNewParcours({ ...newParcours, [e.target.name]: e.target.value });
  }

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
    console.log(data.steps);
    if (!data) 
    {
      setParcours({});
    }
    setParcours(data);
    setParcoursSteps(data.steps);
  }

  const itemsArray = [
    {
      name: "parcoursPicture",
      type: "file",
      label: "Photo de parcours",
      value: newParcours.parcoursPicture,
      accept:"image/jpeg,image/png, image/jpg",
    },
    {
      name: "name",
      label: "Nom du parcours",
      value: newParcours.name,
    },
    {
      name: "duration",
      label: "Durée (en jours)",
      value: newParcours.duration,
      type: "number",
    },
    {
      name: "difficulty",
      label: "Difficulté",
      value: newParcours.difficulty,
      type: "number",
      max: 3
    },
    {
      name: "price",
      label: "Prix du parcours",
      value: newParcours.price,
      type: "number",
      min: 0
    },
    {
      name: "description",
      label: "Description du parcours",
      value: newParcours.description,     
    }
  ];

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

  // Update a guide
  async function updateParcours(e)
  {
    e.preventDefault();
    const parcoursData = new FormData(e.target);
    parcoursData.append("slug", parcours.slug);
    console.log(parcoursData);

    let token = localStorage.getItem("token");
    const options = 
    {
      method: 'PUT',
      headers: 
      {
        Authorization : "Bearer " + token
      },
      body: parcoursData
    };
    const response = await fetch(`http://localhost:3001/parcours/update/`, options);
    const data = await response.json();
    console.log(data.status);
    if (data.status === 200) 
    {
      setEditMode(!editMode)
      navigate('/parcours/' + parcours.slug);
    }
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
        <div className="content">
          {editMode && (
            <form onSubmit={updateParcours} encType="multipart/form-data">
              {itemsArray.map((item) => (
                <Input
                name={item.name}
                label={item.label}
                value={item.value}
                required={item.required}
                type={item.type}
                onChange={handleChange}
                />
              ))}
              <div className="clientInfos">
                <Button>Valider</Button>
                <Button onClick = {() => setEditMode(!editMode)}>Annuler les changements</Button>
              </div>
            </form>  
          )}      
          {!editMode && (
            <div>
              <img style = {{width: 10+'%'}} src= {`http://localhost:3001${parcours.parcoursPicture}`} alt = "Photo du parcours"/>
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
              <div className="clientInfos">
              <Button onClick = {() => setEditMode(!editMode)}>Modifier le parcours</Button>
              <Button onClick = {() => setAlertState(true)}>Supprimer le parcours</Button>
            </div>
            <StepsRegister parcoursSlug = {parcours.slug}/>
            <p>Etapes</p>
            {parcoursSteps.map((step) => (
              <Step 
              parcoursSlug = {parcours.slug}
              stepSlug = {step.stepSlug}
              name = {step.stepName}
              picture = {step.stepPicture}
              latitude = {step.stepLatitude}
              longitude = {step.stepLongitude}
              description = {step.stepDescription}
              />
            ))}
            {deleteAlert &&(
              <PopupAlert type = "ce parcours" cancel = {() => cancelDelete()} confirm = {() => confirmDelete()} /> 
            )}
            <Button onClick = {() => backToParcoursList()}>Retour aux parcours</Button>
            </div>
          )}
        </div>
      <div>
      	<Footer />
      </div>
    </div>
  );
}

export default SingleParcoursView;