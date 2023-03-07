import { useState } from "react";
import ParcoursRegister from "../components/organisms/ParcoursRegister";

function ParcoursView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <ParcoursRegister/>
    </div>
  );
}

export default ParcoursView;
