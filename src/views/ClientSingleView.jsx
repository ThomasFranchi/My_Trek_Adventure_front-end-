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
  
  async function displayClient()
  {
    const response = await fetch(`http://localhost:3001/clients/${params.slug}`);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setClient({});
    }
    setClient(data);
  }

  function backToClientsList()
  {
    navigate("/clients");
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
    const options = 
    {
      method: 'DELETE',
      headers: 
      {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          slug: params.slug
      })
    };
    const response = await fetch(`http://localhost:3001/clients/delete/`, options);
    const data = await response.json();
    console.log(data);
    console.log(data.status);
    if (data.status === "200") 
    {
      setAlertState(false);
      backToClientsList();
    }
  }

  return (
    <div>
      <Topbar />
      <h1>Page de {client.firstName} {client.lastName}</h1>
      <div id="postClient">
        <div><p> ICI LA PHOTO </p></div>
        <img style = {{width: 10+'%'}} src = {client.profilePicture} alt = "Photo de profil de l'utilisateur"/>
        <div className="content">
            <div className="clientInfos">
              <p><span className="clientInfo">Nom :</span> {client.firstName} </p>
              <p><span className="clientInfo">Prénom :</span> {client.lastName} </p>
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