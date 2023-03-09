import { useState } from "react";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import TreksRegister from "../components/organisms/TreksRegister";

export default function TreksView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <Topbar />
      <p>Page des treks</p>
      <TreksRegister/>
      <Footer />
    </div>
  );
}