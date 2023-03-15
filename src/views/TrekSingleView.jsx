import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Booking from "../components/Booking";

import Button from "../components/atoms/Button";

function SingleTrekView() {
  const [trek, setTrek] = useState({})
  const [trekBookings, setTrekBookings] = useState([])
  const [guide, setGuide] = useState ([]);
  const [parcours, setParcours] = useState ([]);

  let params = useParams();
  const navigate = useNavigate();
  useEffect(() => {displayTrek()}, [])

  async function displayTrek()
  {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    const response = await fetch(`http://localhost:3001/treks/${params.slug}`, options);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setTrek({});
    }
    else 
    {
      setTrek(data);
      getParcoursAndGuideFromIds(data.parcoursID, data.guideID);
      setTrekBookings(data.bookings);
    }
  }

  async function getParcoursAndGuideFromIds(trekID, guideID)
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
    const parcoursResponse = await fetch("http://localhost:3001/parcours/get/:" + new URLSearchParams ({id: trekID}), options);
    const parcoursData = await parcoursResponse.json();
    if (!parcoursData) 
    {
      setParcours("");
    }
    setParcours(parcoursData);

    const guideResponse = await fetch(`http://localhost:3001/guides/get/:` + new URLSearchParams ({id: guideID}), options);
    const guideData = await guideResponse.json();
    console.log(guideData);
    if (!guideData) 
    {
      setGuide("");
    }
    setGuide(guideData);
  }

  function backToTreksList()
  {
    navigate("/treks");
  }

  return (
    <div>
      <Topbar />
      <h1>Page du trek</h1>
      <div id="post">
        <div className="content">
          <div className="gameInfos">
            <p><span className="userInfo">Animé par </span> {guide.firstName} {guide.lastName}</p>
            <p><span className="userInfo">Date de début :</span> {trek.beginDate} </p>
            <p><span className="userInfo">Date de fin :</span> {trek.endDate}</p>
            <p><span className="userInfo">Places minimum :</span> {trek.minPlaces} places</p>
            <p><span className="userInfo">Places maximium :</span> {trek.maxPlaces} places</p>
          </div>
          <div className="gameInfos">
            <p>Réservations</p>
            {trekBookings.map((booking) => (
              <Booking 
                userID = {booking.userID} 
                date = {booking.bookingDate} 
                status = {booking.state}
                />        
            ))}
          </div>
        </div> 
      </div>  
      <Button onClick = {() => backToTreksList()}>Retour aux treks</Button>
      <div>
      <Footer />
      </div>
    </div>
  );
}

export default SingleTrekView;
