import { useState } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function ClientsView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <Topbar />
      <Footer />
    </div>
  );
}

export default ClientsView;
