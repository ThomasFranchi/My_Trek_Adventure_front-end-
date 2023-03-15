import Button from "../atoms/Button";
import Input from "../atoms/Input";
import "../../styles/styleParcoursRegister.css";
const { useState } = require("react");

function ParcoursRegister() {
  const [newParcour, setNewParcour] = useState({
    name: "",
    duration: "",
    description: "",
    price: "",
    parcoursPicture: "",
    difficulty: 0,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    setNewParcour({ ...newParcour, [e.target.name]: e.target.value });
  }

  // Submit input to DB to create a new Game
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(newParcour);

    const formData = new FormData(e.target);

    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        Authorization: "bearer " + token,
      },
      body: formData,
    };

    // Post data to DB on /login routes
    const result = await fetch("http://127.0.0.1:3001/parcours/add", options);
    // Response from DB on /login routes
    const data = await result.json();

    if (!data.success) {
      setSuccessMessage(null);
      setErrorMessage(data.message);
      return;
    }

    setSuccessMessage(data.message);
    setErrorMessage(null);
    setNewParcour({
      name: "",
      duration: "",
      description: "",
      price: "",
      parcoursPicture: "",
      difficulty: 1,
    });
  }

  const itemsArray = [
    {
      name: "parcoursPicture",
      type: "file",
      label: "Photo du parcours",
      value: newParcour.parcoursPicture,
      required: true
    },
    {
      name: "name",
      label: "Nom du parcours",
      value: newParcour.name,
      required: true
    },
    {
      name: "duration",
      label: "Durée (en jours)",
      value: newParcour.duration,
      required: true,
      type: "number",
      min: 0
    },
    {
      name: "price",
      label: "Prix",
      value: newParcour.price,
      required: true,
      type: "number",
      min: 0
    },
    {
      name: "difficulty",
      label: "Difficulté",
      value: newParcour.difficulty,
      type: "number",
      min: 1,
      max: 3
    },
    {
      name: "description",
      label: "Description",
      value: newParcour.description,
      required: true
    }
  ];

  return (
    <div className="parcoursregistercontainer">
      <h3>Ajouter un nouveau parcours </h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {itemsArray.map((item) => (
            <Input
              name={item.name}
              label={item.label}
              value={item.value}
              required={item.required}
              type={item.type}
              onChange={handleChange}
              min={item.min}
              max={item.max}
            />
          ))}

          <label>Difficulté</label>
          <select
            name="difficulty"
            value={newParcour.difficulty}
            required="{true}"
            onChange={handleChange}
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
          </select>
        </div>

        <Button> Enregistrer</Button>
        {errorMessage !== null && <p>{errorMessage}</p>}
        {successMessage !== null && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default ParcoursRegister;
