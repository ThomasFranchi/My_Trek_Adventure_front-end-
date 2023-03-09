import { useState } from "react";
import AdminRegister from "../components/organisms/AdminRegister";

function AdminsView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <AdminRegister/>
    </div>
  );
}

export default AdminsView;
