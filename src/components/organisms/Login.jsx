import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { UserConnect } from "../../App";

function Login() {
  const { setUserLog } = useContext(UserConnect);
  const navigate = useNavigate();

  const [loginRole, setLoginRole] = useState("guide");

  // Set UseState for USER / ERRORMESSAGE / SUCCESSMESSAGE
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = user;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    // Post data to DB on /login routes

    const result = await fetch(`http://127.0.0.1:3001/login/${loginRole}`, options);
    // Response from DB on /login routes
    const data = await result.json();

    // retreive token
    const token = data.token;
    if (data.success) {
      setsuccessMessage(data.message);

      // TODO
      //   navigate("/sessions")
      setUserLog(data.user);
    } else if (!data.success) {
      setErrorMessage(data.message);
    }

    // Stock Token into LocalStorage
    localStorage.setItem("token", token);
  }

  return (
    <div>
      <h3>Se connecter en tant que {loginRole} </h3>
      <form onSubmit={handleSubmit}>
        <Input
          name="mail"
          label="mail"
          onChange={handleChange}
          value={user.mail}
          required={true}
          type= "email"
        />
        <Input
          name="password"
          label="Mot de passe"
          onChange={handleChange}
          value={user.password}
          type="password"
          required={true}
        />
        <div>
            changer vers:
          {loginRole === "guide" ? <Button onClick={ () => setLoginRole("admin")}>Administrateur</Button>
          : 
          <Button onClick={() => setLoginRole("guide")}>Guide</Button> }
          
        </div>
        <Button>Me connecter</Button>

        {/* <button></button> */}
      </form>
      <p>{errorMessage}</p>
      <p>{successMessage}</p>
    </div>
  );
}
export default Login;
