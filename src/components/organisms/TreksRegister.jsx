import Button from "../atoms/Button";
import Input from "../atoms/Input";
const { useState } = require("react");

function TreksRegister() {
  const [newTreck, setNewTreck] = useState({
    beginDate: "",
    endDate: "",
    minPlaces: "",
    maxPlaces: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    setNewTreck({ ...newTreck, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(newTreck);

    const token = localStorage.getItem("token");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + token,
      },
      body: JSON.stringify(newTreck),
    };

    // Post data to DB on /login routes
    const result = await fetch("http://127.0.0.1:3001/treks/add", options);
    // Response from DB on /login routes
    const data = await result.json();

    if (!data.success) {
      setSuccessMessage(null);
      setErrorMessage(data.message);
      return;
    }

    setSuccessMessage(data.message);
    setErrorMessage(null);
    setNewTreck({
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
      value: newTreck.beginDate,
      required: "{true}",
      type: "date",
    },
    {
        name: "endDate",
        label: "date d'arrivée",
        value: newTreck.endDate,
        required: "{true}",
        type: "date",
    },
    {
        name: "minPlaces",
        label: "min (place)",
        value: newTreck.minPlaces,
        required: "{true}",
        type: "number",
    },
    {
        name: "maxPlaces",
        label: "max (place)",
        value: newTreck.maxPlaces,
        required: "{true}",
        type: "number",
    },
];

return (
    <div>
      <h3>Ajouter un nouveau Trek </h3>
      <form onSubmit={handleSubmit}>
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
