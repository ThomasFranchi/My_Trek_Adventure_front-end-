import Button from "../atoms/Button";
import Input from "../atoms/Input";
const { useState } = require("react");

function GuideRegister() {
  const [newGuide, setNewGuide] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
    description: "",
    experienceYears: 0,
    guidePicture: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    setNewGuide({ ...newGuide, [e.target.name]: e.target.value });
  }

  // Submit input to DB to create a new Game
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(newGuide);

    // const {
    //   firstName,
    //   lastName,
    //   mail,
    //   password,
    //   description,
    //   experienceYears,
    //   profilePicture,

    // } = newGuide;

    // Fetch options

    const token = localStorage.getItem("token");


    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(newGuide),
    };

    // Post data to DB on /login routes
    const result = await fetch("http://127.0.0.1:3001/register/guide", options);
    // Response from DB on /login routes
    const data = await result.json();

    if (!data.success) {
      setSuccessMessage(null);
      setErrorMessage(data.message);
      return;
    }

    setSuccessMessage(data.message);
    setErrorMessage(null);
    setNewGuide({
      firstName: "",
      lastName: "",
      mail: "",
      password: "",
      description: "",
      experienceYears: 0,
      guidePicture: "",
    });
  }

  const itemsArray = [
    {
      name: "guidePicture",
      type: "file",
      label: "Photo de profil",
      value: newGuide.guidePicture,
      required: "{true}",
      accept:"image/jpeg,image/png, image/jpg",
    },
    {
      name: "firstName",
      label: "Prénom",
      value: newGuide.firstName,
      required: "{true}",
    },
    {
      name: "lastName",
      label: "Nom",
      value: newGuide.lastName,
      required: "{true}",
    },
    {
      name: "mail",
      label: "Email",
      value: newGuide.mail,
      required: "{true}",
      type: "email",
    },
    {
      name: "password",
      label: "Mot de passe",
      value: newGuide.password,
      required: "{true}",
      type: "password",
    },
    {
      name: "experienceYears",
      label: "Année(s) d'expériences",
      value: newGuide.experienceYears,
      required: "{true}",
      type: "number",
    },
    {
      name: "description",
      label: "Description",
      value: newGuide.description,
      required: "{true}",
    },
  ];

  return (
    <div>
      <h3>Ajouter un nouveau guide </h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <Button> Enregistrer</Button>
        {errorMessage !== null && <p>Erreur: {errorMessage}</p>}
        {successMessage !== null && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default GuideRegister;
