import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SignupForm from "./SignupForm";
import { addUser } from "../../utils/userSlice";
import { API_BASE_URL } from "../../utils/constants";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "",
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/signup`,
        { ...form },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(data.data));
      return navigate("/profile");
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
          <SignupForm
            form={form}
            setForm={setForm}
            handleSignup={handleSignup}
            error={error}
            setError={setError}
          />

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

export default Signup;
