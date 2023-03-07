import { useState } from "react";
import Login from "../components/organisms/Login";

function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <Login />
    </div>
  );
}

export default Home;
