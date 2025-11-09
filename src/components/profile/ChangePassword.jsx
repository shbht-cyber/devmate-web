import { useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../../utils/constants";
import Toaster from "../common/Toaster";

const ChangePassword = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState({
    show: false,
    type: "",
    title: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async () => {
    try {
      await axios.patch(API_BASE_URL + "/profile/edit/password", passwordForm, {
        withCredentials: true,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setToast({
        show: true,
        type: "success",
        title: "Password updated successfully!",
      });
    } catch (err) {
      console.log(err);
      setToast({ show: true, type: "error", title: err.response.data.error });
    }
  };

  const renderPasswordInput = (name, label) => {
    return (
      <div>
        <h3 className="text-md font-semibold mb-2">{label}</h3>
        <input
          type="password"
          placeholder={label}
          name={name}
          className="input input-bordered w-full mb-3"
          onChange={handlePasswordChange}
        />
      </div>
    );
  };
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Change Password</h3>

      {renderPasswordInput("currentPassword", "Current Password")}
      {renderPasswordInput("newPassword", "New Password")}
      {renderPasswordInput("confirmPassword", "Confirm Password")}

      <button className="btn btn-primary w-full" onClick={handleUpdatePassword}>
        Update Password
      </button>

      {toast.show && <Toaster toast={toast} setToast={setToast} />}
    </div>
  );
};

export default ChangePassword;
