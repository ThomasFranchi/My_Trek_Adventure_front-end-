import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

import ParcoursRegister from "../components/organisms/ParcoursRegister";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Parcours from "../components/Parcours";

import { UserConnect } from "../App";

function ParcoursView() {
  const [parcoursList, setParcoursList] = useState([])
  const [errorMsg, setErrorMsg] = useState ("");
  const {userLog} = useContext(UserConnect);

  console.log(userLog.role)
  
  useEffect(() => {displayParcoursList()}, [])

  async function displayParcoursList()
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
    const response = await fetch('http://localhost:3001/parcours', options);
    const data = await response.json();
    if (!data) 
    {
      setParcoursList([]);
      setErrorMsg("Aucun résultat trouvé");
    }

    if (Array.isArray(data)) 
    {
      setParcoursList(data);
      setErrorMsg("");
    }
  }

  return (
    <div>
      {!userLog && (
        <>
          <p>Vous n'avez pas l'autorisation d'accéder à cette page</p>
          <p><Link to="/">Retour à l'accueil</Link></p>       
        </>
      )}
      {userLog && (
        <>
        <Topbar />
        {userLog.role !== "guide" && (<ParcoursRegister/>)}
        <div id = "parcoursList">
          <p>Liste des parcours</p>
            {errorMsg}
            {parcoursList.map((parcours) => (
              <Parcours 
                key = {parcours.slug}
                parcoursPicture = {parcours.parcoursPicture} 
                name = {parcours.name} 
                duration = {parcours.duration} 
                description = {parcours.description}
                price = {parcours.price} 
                difficulty = {parcours.difficulty}
                slug = {parcours.slug}
                />        
            ))}
        </div>
        <div>
      <Footer />
      </div>
        </>
      )}
    </div>
  );
}

export default ParcoursView;
