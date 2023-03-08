import { useState } from "react";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
function TreksView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <Topbar />
      <p>Page des treks</p>
      <Footer />
    </div>
  );
}

export default TreksView;
