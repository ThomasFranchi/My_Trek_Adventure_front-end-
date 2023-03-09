import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import GuideRegister from "../components/organisms/GuideRegister";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function SingleGuideView() {
  const [guide, setGuide] = useState({})

  let params = useParams();
  useEffect(() => {displayGuide()}, [])

  async function displayGuide()
  {
    const response = await fetch(`http://localhost:3001/guides/${params.slug}`);
    const data = await response.json();
    console.log(data);
    if (!data) 
    {
      setGuide({});
    }
    setGuide(data);
  }

  return (
    <div>
      <Topbar />
      <h1>Page de {guide.firstName} {guide.lastName}</h1>
      <div id="postGuide">
        <div><p> ICI LA PHOTO </p></div>
        <div className="content">
            <div className="guideInfos">
              <p><span className="guideInfo">Nom :</span> {guide.firstName} </p>
              <p><span className="guideInfo">Prénom :</span> {guide.lastName} </p>
              <p><span className="guideInfo">Mail :</span> {guide.mail} </p>
              <p><span className="guideInfo">Prénom :</span> {guide.lastName} </p>
              <p><span className="guideInfo">Années d'expériences :</span> {guide.experienceYears} </p>
              <p><span className="guideInfo">Etat :</span> {guide.state} </p>  
              <div className="guideInfos">
              <p><span className="userInfo">Description :</span> {guide.description}</p>
            </div>
            </div>
        </div>  
      </div>
      <Footer />
    </div>
  );
}

export default SingleGuideView;