import { useNavigate } from "react-router-dom";
import Button from "./atoms/Button";

function Clients (
    {firstName,
    lastName,
    mail, 
    password, 
    slug}
    ) 
{
  const navigate = useNavigate();

  function goToClientPage ()
  {
    console.log(slug);
    navigate('/clients/'+slug);
  }

  return (
    <div id="postClient">
      <div className="content">
          <div className="clientInfos">
            <p><span className="clientInfo">Nom :</span> {firstName} </p>
            <p><span className="clientInfo">Prénom :</span> {lastName} </p>
            <p><span className="clientInfo">Mail :</span> {mail} </p>
          </div>
          <div className="gameInfos">
            <Button onClick = {goToClientPage}>Voir le Client</Button>
          </div>
      </div>  
    </div> 
  );
}

export default Clients;