import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

function PopupAlert ({type, cancel, confirm}) 
{
  const navigate = useNavigate();

  return (
    <div id="postClient">
      <div className="clientInfos">
        <p className="clientInfo">Voulez-vous vraiment supprimer {type} ?</p>
      </div>
      <Button onClick = {confirm}>Supprimer</Button>
      <Button onClick = {cancel}>Annuler</Button>
    </div>  
  );
}

export default PopupAlert;