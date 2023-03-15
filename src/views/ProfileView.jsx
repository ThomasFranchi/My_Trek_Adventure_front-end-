import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import PopupAlert from "../components/organisms/PopupAlert";
import GuideDate from "../components/GuideDate";
import { UserConnect } from "../App";

function ProfileView() {
  
  const [userProfile, setUserProfile] = useState({});
  const [treksList, setTreksList] = useState ([])
  const [deleteAlert, setDeleteAlert] = useState(false);
  const {userLog, disconnect} = useContext(UserConnect);

  let params = useParams();
  useEffect(() => {displayProfile()}, [])
  const navigate = useNavigate();

  async function displayProfile()
  {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    const response = await fetch(`http://localhost:3001/login/userinfos`, options);
    const data = await response.json();
    if (!data) 
    {
      setUserProfile({});
    }
    setUserProfile(data);
    displayMyTreks(data.slug);
  }

  async function displayMyTreks(slug)
  {
    console.log(slug);
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    const response = await fetch(`http://localhost:3001/treks/list/:` + new URLSearchParams ({slug: slug}), options);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setTreksList([]);
    }
    setTreksList(data);
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
      disconnect();
    }
  }

  return (
    <div>
      <Topbar />
      <h1>Page de {userProfile.firstName} {userProfile.lastName}</h1>
      <div id="postGuide">
        <div><p> ICI LA PHOTO </p></div>
        <div className="content">
          <div className="guideInfos">
            <p><span className="guideInfo">Nom :</span> {userProfile.firstName} </p>
            <p><span className="guideInfo">Prénom :</span> {userProfile.lastName} </p>
            <p><span className="guideInfo">Mail :</span> {userProfile.mail} </p>
            <p><span className="guideInfo">Prénom :</span> {userProfile.lastName} </p>
            <p><span className="guideInfo">Années d'expériences :</span> {userProfile.experienceYears} </p>
            <p><span className="guideInfo">Etat :</span> {userProfile.state} </p>  
            <div className="guideInfos">
              <p><span className="userInfo">Description :</span> {userProfile.description}</p>
            </div>
          </div>
        </div>  
      </div>
      {treksList.map((trek) => (
      <GuideDate 
      trekName = {trek.trekName}
      parcoursID = {trek.parcoursID}
      trekDate = {trek.beginDate}
      trekBookings = {trek.bookings}
      state = {trek.trekState}
      />
      ))}
      {deleteAlert &&(
        <PopupAlert type = "votre profil" cancel = {() => cancelDelete()} confirm = {() => confirmDelete()} /> 
      )}
      <div>
      <Footer />
      </div>
    </div>
  );
}

export default ProfileView;