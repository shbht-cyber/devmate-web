import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addUser } from "../../utils/userSlice";
import { API_BASE_URL } from "../../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data.data));
      return navigate("/user/feed");
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong");
      console.error("Error: ", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-4">
        <div className="flex flex-col md:flex-row h-full rounded-2xl overflow-hidden">
          {/* Input form */}
          <div className="w-full md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
            <form
              className="w-full max-w-sm space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <h2 className="text-xl font-bold text-center">Login</h2>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={emailId}
                  placeholder="Enter your email id"
                  className="input input-bordered"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  className="input input-bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>

              <div className="text-center">
                <Link to={"/signup"} className="link link-info">
                  New user? Register here
                </Link>
              </div>
            </form>
          </div>

          {/* helper section */}
          <div className="w-full flex items-center justify-center">
            <img
              src="/auth-helper-image.png"
              className="w-full h-full object-cover"
              alt="auth-helper-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
