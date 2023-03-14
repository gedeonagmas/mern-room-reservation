import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      setIsRedirect(true);
    } catch (e) {
      toast.error("Login failed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  if (isRedirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Log In</button>
          <ToastContainer autoClose={1500} />
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
