import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

import { UserConnect } from "../App";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import TreksRegister from "../components/organisms/TreksRegister";
import Trek from "../components/Trek";

export default function TreksView() {
  const [treksList, setTreksList] = useState([]);
  const [errorMsg, setErrorMsg] = useState ("");
  //const [isConnected, setIsConnected] = useState(false);
  const {userLog} = useContext(UserConnect);

  useEffect(() => {displayTreksList()}, [])

  async function displayTreksList()
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
    const response = await fetch('http://localhost:3001/treks', options);
    const data = await response.json();
    if (!data) 
    {
      setTreksList([]);
      setErrorMsg("Aucun résultat trouvé");
    }

    if (Array.isArray(data)) 
    {
      setTreksList(data);
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
        {userLog.role !== "guide" && (<TreksRegister/>)}
        <div id = "treksList">
          <p>Liste des dates</p>
            {errorMsg}
            {treksList.map((trek) => (
              <Trek 
                key = {trek.slug}
                beginDate = {trek.beginDate} 
                endDate = {trek.endDate} 
                parcours = {trek.parcoursID} 
                guide = {trek.guideID}
                minPlaces = {trek.minPlaces} 
                maxPlaces = {trek.maxPlaces}
                slug = {trek.slug}
                />        
            ))}
        </div>
        <Footer />
        </>
      )}
    </div>
  );
}