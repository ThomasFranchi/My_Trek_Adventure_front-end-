import { useState, useEffect } from "react";

function Booking ({userID, date, status}) 
{
  const [errorMsg, setErrorMsg] = useState ("");
  const [user, setUser] = useState ([]);

  useEffect(() => {getUserFromId()}, [])

  async function getUserFromId()
  {
    let token = localStorage.getItem("token");

    const options = 
    {
        method: 'GET',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token         
        }
    };
    const response = await fetch("http://localhost:3001/clients/get/:" + new URLSearchParams ({id: userID}), options);
    const data = await response.json();
    if (!data) 
    {
      setUser("");
      setErrorMsg("");
    }
    setUser(data);
    setErrorMsg("");
  }

  return (
    <div id="post">
      <div className="gameInfos">
        <p><span className="userInfo">Client </span> {user.firstName} {user.lastName}</p>
        <p><span className="userInfo">Date de la réservation </span> {date}</p>
        <p><span className="userInfo">Statut :</span> {status} </p>
      </div>
    </div> 
  );
}

export default Booking;