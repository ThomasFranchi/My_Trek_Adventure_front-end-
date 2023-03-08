import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import ParcoursRegister from "../components/organisms/ParcoursRegister";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Parcours from "../components/Parcours";

import { UserConnect } from "../App";

function ParcoursView() {
  const [parcoursList, setParcourslist] = useState([])
  const [errorMsg, setErrorMsg] = useState ("");
  const {userLog} = useContext(UserConnect);
  const navigate = useNavigate();
  
  useEffect(() => {displayParcoursList()}, [])

  async function displayParcoursList()
    {
      const response = await fetch('http://localhost:3001/parcours/');
      const data = await response.json()
      console.log(data);
      if (!data) 
      {
        setParcourslist([]);
        setErrorMsg("Aucun résultat trouvé");
      }

      if (Array.isArray(data)) 
      {
        setParcourslist(data);
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
        <ParcoursRegister/>
        <div id = "parcoursList">
          <p>Liste des parcours</p>
            {errorMsg}
            {parcoursList.map((parcours, index) => (
              <Parcours 
                key = {index}
                picture = {parcours.picture} 
                name = {parcours.name} 
                duration = {parcours.duration} 
                description = {parcours.description}
                price = {parcours.price} 
                difficulty = {parcours.difficulty}
                slug = {parcours.slug}
                />        
            ))}
        </div>
        <Footer />
        </>
      )}
    </div>
  );
}

export default ParcoursView;
