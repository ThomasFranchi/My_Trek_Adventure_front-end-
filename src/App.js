import { lazy, Suspense, createContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";

const Home = lazy(() => import("./views/Home"));
const Error = lazy(() => import("./views/Error"));
const GuidesView = lazy(() => import("./views/GuidesView"));
const AdminsView = lazy(() => import("./views/AdminsView"));
const ParcoursView = lazy(() => import("./views/ParcoursView"));
const TreksView = lazy(()=> import("./views/TreksView"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
    errorElement: <Error />,
  },

  {
    path: "/guide/",
    element: (
      <Suspense>
        <GuidesView />
      </Suspense>
    )
  },
  {
    path: "/administrator/",
    element: (
      <Suspense>
        <AdminsView />
      </Suspense>
    )
  },
  {
    path: "/parcours/",
    element: (
      <Suspense>
        <ParcoursView />
      </Suspense>
    )
  },
  {
    path: "/treks/",
    element: (
      <Suspense>
        <TreksView />
      </Suspense>
    )
  },

]);

export const UserConnect = createContext();

function App() {


  useEffect(() => {
    getUser();
  }, []);

  const [userLog, setUserLog] = useState(null);

  
  async function getUser() {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    };
    const result = await fetch(`http://127.0.0.1:3001/players/me`, options);
    let data = await result.json();
    if (data !== null) {
      setUserLog(data);
    }
  }

  return (
    <div className="App">
      <UserConnect.Provider value={{ userLog, setUserLog, getUser }}>
        <RouterProvider router={router} />
      </UserConnect.Provider>
    </div>
  );
}

export default App;
