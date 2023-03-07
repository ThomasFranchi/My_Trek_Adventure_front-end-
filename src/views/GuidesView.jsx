import { useState } from "react";
import GuideRegister from "../components/organisms/GuideRegister";

function GuidesView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <GuideRegister/>
    </div>
  );
}

export default GuidesView;
