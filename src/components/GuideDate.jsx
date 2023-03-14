import { useState, useEffect } from "react";

function GuideDate ({trekName, trekDate, trekBookings, state}) 
{
  const [errorMsg, setErrorMsg] = useState ("");

  return (
    <div id="post">
      <div className="gameInfos">
        <p>{trekName}</p>
        <p><span className="userInfo">Date de départ :</span> {trekDate}</p>
        <p><span className="userInfo">Statut :</span> {state} </p>
        {trekBookings.length === 0 && (
          <p>Aucune réservation pour ce trek</p>
        )}
      </div>
      {}
    </div> 
  );
}

export default GuideDate;