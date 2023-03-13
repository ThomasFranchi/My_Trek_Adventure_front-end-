import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

function TreksRegister() {
  const [newTrek, setNewTrek] = useState({
    parcours: "",
    guide: "",
    beginDate: "",
    endDate: "",
    minPlaces: "",
    maxPlaces: "",
  });

  const [parcoursList, setParcoursList] = useState([]);
  const [guidesList, setGuidesList] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {getParcoursAndGuides()}, [])

  function handleChange(e) {
    setNewTrek({ ...newTrek, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  // Get parcours and guides
  async function getParcoursAndGuides ()
  {
    const parcoursResponse = await fetch('http://localhost:3001/parcours');
    const parcoursData = await parcoursResponse.json();
    if (!parcoursData) 
    {
      setParcoursList([]);
    }

    if (Array.isArray(parcoursData)) 
    {
      setParcoursList(parcoursData);
    }

    const guidesResponse = await fetch('http://localhost:3001/guides');
    const guidesData = await guidesResponse.json();
    if (!guidesData) 
    {
      setGuidesList([]);
    }

    if (Array.isArray(guidesData)) 
    {
      setGuidesList(guidesData);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(newTrek);

    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newTrek)
    };

    // Post data to DB on /login routes
    const result = await fetch("http://127.0.0.1:3001/treks/add", options);
    // Response from DB on /login routes
    const data = await result.json();

    if (!data.success) {
      setSuccessMessage(null);
      return;
    }
    setErrorMessage(null);
    setNewTrek({

      beginDate: "",
      endDate: "",
      minPlaces: "",
      maxPlaces: "",
    });
  }

  const itemsArray = [
    {
      name: "beginDate",
      label: "date de départ",
      value: newTrek.beginDate,
      required: "{true}",
      type: "date",
    },
    {
        name: "endDate",
        label: "date d'arrivée",
        value: newTrek.endDate,
        required: "{true}",
        type: "date",
    },
    {
        name: "minPlaces",
        label: "min (place)",
        value: newTrek.minPlaces,
        required: "{true}",
        type: "number",
    },
    {
        name: "maxPlaces",
        label: "max (place)",
        value: newTrek.maxPlaces,
        required: "{true}",
        type: "number",
    },
];

return (
    <div>
      <h3>Ajouter un nouveau Trek </h3>
      <form onSubmit={handleSubmit}>
      <label>Parcours</label>
      <select
        name="parcours"
        value={newTrek.parcours}
        required="{true}"
        onChange={handleChange}
      >
        {parcoursList.map((parcours) => (
          <option value={parcours.slug}> {parcours.name} </option>        
            ))}
      </select>,
      <label>Guide</label>
      <select
        name="guide"
        value={newTrek.guide}
        required="{true}"
        onChange={handleChange}
      >
        {guidesList.map((guide) => (
          <option value={guide.slug}> {`${guide.firstName} ${guide.lastName}`}</option>        
            ))}
      </select>
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
        </div>

        <Button> Enregistrer</Button>
        {errorMessage !== null && <p>{errorMessage}</p>}
        {successMessage !== null && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default TreksRegister;
