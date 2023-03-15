import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import PopupAlert from "../components/organisms/PopupAlert";
import "../styles/styleForm.css";

function SingleGuideView() {
  const [guide, setGuide] = useState({});
  const [newGuide, setNewGuide] = useState({
    firstName: "", lastName: "", mail: "", password: "", description: "", experienceYears: 0,
    guidePicture: "", state: ""
  });

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState(false); // For the task to edit

  let params = useParams();
  useEffect(() => { displayGuide() }, [])
  const navigate = useNavigate();

  function handleChange(e) {
    setNewGuide({ ...newGuide, [e.target.name]: e.target.value });
  }

  const itemsArray = [
    {
      name: "guidePicture",
      type: "file",
      label: "Photo de profil",
      value: newGuide.guidePicture,
      accept: "image/jpeg,image/png, image/jpg",
    },
    {
      name: "firstName",
      label: "Prénom",
      value: newGuide.firstName,
    },
    {
      name: "lastName",
      label: "Nom",
      value: newGuide.lastName,
    },
    {
      name: "mail",
      label: "Email",
      value: newGuide.mail,
      type: "email",
    },
    {
      name: "password",
      label: "Mot de passe",
      value: newGuide.password,
      type: "password",
    },
    {
      name: "experienceYears",
      label: "Année(s) d'expériences",
      value: newGuide.experienceYears,
      type: "number",
    },
    {
      name: "description",
      label: "Description",
      value: newGuide.description,
    },
    {
      name: "state",
      label: "Etat",
      value: newGuide.state,
    },
  ];

  async function displayGuide() {
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };

    const response = await fetch(`http://localhost:3001/guides/${params.slug}`, options);
    const data = await response.json();
    console.log(data);
    if (!data) {
      setGuide({});
    }
    setGuide(data);
    console.log(data.guidePicture);
  }

  function backToGuidesList() {
    navigate("/guides");
  }

  function setAlertState(state) {
    setDeleteAlert(state);
  }

  // Update a guide
  async function updateGuide(e) {
    e.preventDefault();
    const guideData = new FormData(e.target);

    guideData.append("slug", guide.slug);

    let token = localStorage.getItem("token");
    const options =
    {
      method: 'PUT',
      headers:
      {
        Authorization: "Bearer " + token
      },
      body: guideData
    };
    const response = await fetch(`http://localhost:3001/guides/update/`, options);
    const data = await response.json();
    console.log(data.status);
    if (data.status === 200) {
      setEditMode(!editMode);
      navigate('/guides/' + guide.slug);
    }
  }

  // Cancel a customer deletion
  function cancelDelete() {
    setAlertState(false);
  }

  // Confirm a customer deletion
  async function confirmDelete() {
    let token = localStorage.getItem("token");
    const options =
    {
      method: 'DELETE',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        slug: params.slug
      })
    };
    const response = await fetch(`http://localhost:3001/guides/delete/`, options);
    const data = await response.json();
    if (data.status === "200") {
      setAlertState(false);
      backToGuidesList();
    }
  }

  return (
    <div>
      <Topbar />
      <div>
        {deleteAlert && (
          <PopupAlert type="ce profil d'utilisateur" cancel={() => cancelDelete()} confirm={() => confirmDelete()} />
        )}
          {editMode && (
            <div className="parcoursregistercontainer">
              <form onSubmit={updateGuide} encType="multipart/form-data">
                {itemsArray.map((item) => (
                  <Input
                    name={item.name}
                    label={item.label}
                    value={item.value}
                    required={item.required}
                    type={item.type}
                    onChange={handleChange}
                  />
                ))}
                <div className="buttonContainer">
                  <Button>VALIDER</Button>
                  <Button onClick={() => setEditMode(!editMode)}>ANNULER</Button>
                </div>
              </form>
            </div>
          )}
          {!editMode && (
            <div>
              <h1>Page de {guide.firstName} {guide.lastName}</h1>
              <img style={{ width: 10 + '%' }} src={`http://localhost:3001${guide.guidePicture}`} alt="Photo de profil du guide" />
              <div className="guideInfos">
                <p><span className="guideInfo">Nom :</span> {guide.firstName} </p>
                <p><span className="guideInfo">Prénom :</span> {guide.lastName} </p>
                <p><span className="guideInfo">Mail :</span> {guide.mail} </p>
                <p><span className="guideInfo">Années d'expériences :</span> {guide.experienceYears} </p>
                <p><span className="guideInfo">Etat :</span> {guide.state} </p>
                <div className="guideInfos">
                  <p><span className="userInfo">Description :</span> {guide.description}</p>
                </div>
                <div className="clientInfos">
                  <Button onClick={() => setEditMode(!editMode)}>Modifier le profil</Button>
                  <Button onClick={() => setAlertState(true)}>Supprimer le profil</Button>
                </div>
              </div>
              <Button onClick={() => backToGuidesList()}>Retour aux guides</Button>
            </div>
          )}
        </div>
        <div>
          <Footer ClassName="footer" />
        </div>
      </div>
  );
}

export default SingleGuideView;