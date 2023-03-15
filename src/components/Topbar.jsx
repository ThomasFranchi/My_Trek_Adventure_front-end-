import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import icoHome from "../pictures/ico_home.png"
import icoParcours from "../pictures/ico_parcours.png"
import icoTrek from "../pictures/ico_treks.png"
import icoGuide from "../pictures/ico_guides.png"
import icoClient from "../pictures/ico_clients.png"
import logo from "../pictures/logo.png"
import '../styles/styleTopbar.css';

import { UserConnect } from "../App";

export default function Topbar() 
{
  /* State variables */
  const navigate=useNavigate();
  const {userLog, disconnect} = useContext(UserConnect);

  function goToProfile()
  {
    navigate("/my-profile");
  }

  function logout()
  {
    disconnect();
    navigate("/");
  }

  return (
    <div id="topbar">
      <div className="topbar-line">
        <img className="logo" src={logo} alt="Logo Site"></img>   
        <nav className="topbar-line">
          {!userLog && ( <div className="linkDiv">
            <Link className="link" to="/"><img className="sideIcon" src={icoHome} alt="Icone de l'Accueil"></img> Accueil</Link>
          </div>)}
          <div className="linkDiv">
            <Link className="link" to="/parcours/"><img className="sideIcon" src={icoParcours} alt="Icone des parcours"></img> Parcours</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/treks/"><img className="sideIcon" src={icoTrek} alt="Icone des treks"></img> Treks</Link>
          </div>
          <div className="linkDiv">
            <Link className="link" to="/guides/"><img className="sideIcon" src={icoGuide} alt="Icone des guides"></img> Guides</Link>
          </div>
          {userLog.role !== "guide" && (
            <div className="linkDiv">
              <Link className="link" to="/clients/"><img className="sideIcon" src={icoClient} alt="Icone des clients"></img> Clients</Link>
            </div>
          )}
          <div>
            <button onClick={logout} className="buttondeco">Deconnexion</button>
            {userLog.role === "guide" && ( <button onClick={goToProfile}>Mon profil</button> )}
            </div>
        </nav>
      </div>   
    </div>
  );
}