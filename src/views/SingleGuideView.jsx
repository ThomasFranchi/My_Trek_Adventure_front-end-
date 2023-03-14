import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Button from "../components/atoms/Button";
import PopupAlert from "../components/organisms/PopupAlert";

function SingleGuideView() {
  const [guide, setGuide] = useState({})
  const [deleteAlert, setDeleteAlert] = useState(false);

  let params = useParams();
  useEffect(() => {displayGuide()}, [])
  const navigate = useNavigate();

  async function displayGuide()
  {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    const response = await fetch(`http://localhost:3001/guides/${params.slug}`, options);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setGuide({});
    }
    setGuide(data);
  }

  function backToGuidesList()
  {
    navigate("/guides");
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
    const response = await fetch(`http://localhost:3001/guides/delete/`, options);
    const data = await response.json();
    if (data.status === "200") 
    {
      setAlertState(false);
      backToGuidesList();
    }
  }

  return (
    <div>
      <Topbar />
      <h1>Page de {guide.firstName} {guide.lastName}</h1>
      <div id="postGuide">
        <div><p> ICI LA PHOTO </p></div>
        <div className="content">
            <div className="guideInfos">
              <p><span className="guideInfo">Nom :</span> {guide.firstName} </p>
              <p><span className="guideInfo">Prénom :</span> {guide.lastName} </p>
              <p><span className="guideInfo">Mail :</span> {guide.mail} </p>
              <p><span className="guideInfo">Prénom :</span> {guide.lastName} </p>
              <p><span className="guideInfo">Années d'expériences :</span> {guide.experienceYears} </p>
              <p><span className="guideInfo">Etat :</span> {guide.state} </p>  
              <div className="guideInfos">
              <p><span className="userInfo">Description :</span> {guide.description}</p>
            </div>
            </div>
        </div>  
      </div>
      {deleteAlert &&(
        <PopupAlert type = "ce profil d'utilisateur" cancel = {() => cancelDelete()} confirm = {() => confirmDelete()} /> 
      )}
      <Button onClick = {() => backToGuidesList()}>Retour aux guides</Button>
      <Footer />
    </div>
  );
}

export default SingleGuideView;