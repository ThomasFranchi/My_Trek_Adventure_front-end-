import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Client from "../components/Clients";
import { UserConnect } from "../App";

function ClientsView() {
  //const [isConnected, setIsConnected] = useState(false);
  const [clientsList, setClientsList] = useState([])
  const [errorMsg, setErrorMsg] = useState ("");
  const {userLog} = useContext(UserConnect);

  useEffect(() => {displayClientsList()}, [])

  async function displayClientsList()
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
    const response = await fetch('http://localhost:3001/clients/',options);
    const data = await response.json()
    console.log(data);
    if (!data) 
    {
      setClientsList([]);
      setErrorMsg("Aucun résultat trouvé");
    }

    if (Array.isArray(data)) 
    {
      setClientsList(data);
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
        <div id = "parcoursList">
          <p>Liste des clients</p>
            {errorMsg}
            {clientsList.map((client) => (
              <Client 
                key = {client.slug}
                picture = {client.profilePicture} 
                firstName = {client.firstName} 
                lastName = {client.lastName} 
                mail = {client.mail}
                password = {client.password} 
                slug = {client.slug}
                />        
            ))}
        </div>
        <Footer />
        </>
      )}
    </div>
  );
}

export default ClientsView;
