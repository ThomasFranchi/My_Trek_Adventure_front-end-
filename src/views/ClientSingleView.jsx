import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

import Button from "../components/atoms/Button";
import PopupAlert from "../components/organisms/PopupAlert";

function SingleClientView() {
  const [client, setClient] = useState({})
  const [deleteAlert, setDeleteAlert] = useState(false);

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {displayClient()}, [])
  
  let image;
  async function displayClient()
  {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      }
    };
    const response = await fetch(`http://localhost:3001/clients/${params.slug}`, options);
    const data = await response.json();
    if (!data) 
    {
      setClient({});
    }
    setClient(data);
    console.log(data.clientPicture);
  }

  function backToClientsList()
  {
    navigate("/clients");
  }

  function setImageLink(profilePicture)
  {
    image = "http://localhost:3001"+ profilePicture;
    console.log(image);
    //return image;
  }

  function updateClient ()
  {
    
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
    const response = await fetch(`http://localhost:3001/clients/delete/`, options);
    const data = await response.json();
    if (data.status === "200") 
    {
      setAlertState(false);
      backToClientsList();
    }
  }

  setImageLink(client.clientPicture);

  return (
    <div>
      <Topbar />
      <h1>Page de {client.firstName} {client.lastName}</h1>
      <div id="postClient">
        <div><p> ICI LA PHOTO </p></div>
        <img style = {{width: 10+'%'}} src={image} alt = "Photo de profil de l'utilisateur"/>
        <div className="content">
            <div className="clientInfos">
              <p><span className="clientInfo">Nom Prénom :</span> {client.firstName} {client.lastName}</p>
              <p><span className="clientInfo">Mail :</span> {client.mail} </p>
              <p><span className="clientInfo">Mot de passe :</span> {client.password} </p>
              <div className="clientInfos">
                <Button onClick = {null}>Modifier le profil</Button>
                <Button onClick = {() => setAlertState(true)}>Supprimer le profil</Button>
              </div>
            </div>
        </div>  
      </div>
      {deleteAlert &&(
        <PopupAlert type = "ce profil d'utilisateur" cancel = {() => cancelDelete()} confirm = {() => confirmDelete()} /> 
      )}
      <Button onClick = {() => backToClientsList()}>Retour aux clients</Button>
      <Footer />
    </div>
  );
}

export default SingleClientView;