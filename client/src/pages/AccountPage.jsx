import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";
import AccountNav from "../components/AccountNav.jsx";
import PlacesPage from "./PlacesPage.jsx";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);

  const { user, setUser, isReady } = useContext(UserContext);

  let { subPage } = useParams();
  // console.log(subPage);

  if (subPage === undefined) {
    subPage = "profile";
  }

  async function handleLogout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!isReady) {
    return <div>Loading...</div>;
  }

  if (isReady && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button className="primary max-w-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {subPage === "places" && <PlacesPage />}
    </div>
  );
}
