import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "./atoms/Input";
import Button from "./atoms/Button";
import PopupAlert from "./organisms/PopupAlert";

function ParcoursStep ({parcoursSlug, stepSlug, name, picture, latitude, longitude, description}) 
{
  const [newStep, setNewStep] = useState({stepPicture: "", name: "", latitude: "", longitude: "", description: ""});
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState (false); // For the task to edit
  const navigate = useNavigate();

  function handleChange(e) {
    setNewStep({ ...setNewStep, [e.target.name]: e.target.value });
  }

  function backToParcoursList()
  {
    navigate("/parcours");
  }

  const itemsArray = [
    {
      name: "stepPicture",
      type: "file",
      label: "Photo de l'étape",
      value: newStep.stepPicture,
      accept:"image/jpeg,image/png, image/jpg",
    },
    {
      name: "name",
      label: "Nom de l'étape",
      value: newStep.name,
    },
    {
      name: "latitude",
      label: "Latitude",
      value: newStep.latitude,
      type: "number",
      min: 0,
      step: "any"
    },
    {
      name: "longitude",
      label: "Longitude",
      value: newStep.longitude,
      type: "number",
      min: 0,
      step: "any"
    },
    {
      name: "description",
      label: "Description de l'étape",
      value: newStep.description,     
    }
  ];

  function setAlertState (state)
  {
    setDeleteAlert(state);
  }

  // Update a guide
  async function updateStep(e)
  {
    e.preventDefault();
    const stepData = new FormData(e.target);
    stepData.append("stepSlug", stepSlug);
    console.log(stepData);

    let token = localStorage.getItem("token");
    const options = 
    {
      method: 'PUT',
      headers: 
      {
        Authorization : "Bearer " + token
      },
      body: stepData
    };
    const response = await fetch(`http://localhost:3001/parcours/updatestep/`, options);
    const data = await response.json();
    console.log(data.status);
    if (data.status === 200) 
    {
      setEditMode(!editMode);
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
          slug: parcoursSlug
      })
    };
    const response = await fetch(`http://localhost:3001/parcours/deletestep/`, options);
    const data = await response.json();
    console.log(data);
    console.log(data.status);
    if (data.status === "200") 
    {
      setAlertState(false);
      backToParcoursList();
    }
  }
      
  return (
    <div id="post">
      {editMode && (
        <form onSubmit={updateStep} encType="multipart/form-data">
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
            <Button onClick = {() => setEditMode(!editMode)}>Anuuler les changements</Button>
          </div>
        </form>  
      )}
      {!editMode && (
        <>
          <img className = "parcoursImage" src = {`http://localhost:3001${picture}`} alt = "Photo de l'étape" />
          <div className="content">
            <div className="gameInfos">
              <p><span className="userInfo">Nom :</span> {name} </p>
              <p><span className="userInfo">Latitude :</span> {latitude}°</p>
              <p><span className="userInfo">Longitude :</span> {longitude}°</p>
            </div>
            <div className="gameInfos">
              <p><span className="userInfo">Description :</span> {description}</p>
            </div>
            <div className="gameInfos">
              <Button onClick = {() => setEditMode(!editMode)}>Editer l'étape</Button>
              <Button onClick = {() => setAlertState(true)}>Supprmer l'étape</Button>
            </div>
            {deleteAlert &&(
              <PopupAlert type = "cette étape" cancel = {() => cancelDelete()} confirm = {() => confirmDelete()} /> 
            )}
          </div>
        </>
      )}
    </div> 
  );
}

export default ParcoursStep;