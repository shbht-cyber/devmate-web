import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import ProfileHeader from "./ProfileHeader";
import ProfileInformation from "./ProfileINformation";

const Profile = ({ profileData }) => {
  const [form, setForm] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    emailId: profileData.emailId,
    age: profileData.age,
    gender: profileData.gender,
    about: profileData.about,
    skills: profileData.skills || [],
    photoUrl: profileData.photoUrl,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePassword = async () => {
    try {
      await axios.put(API_BASE_URL + "/profile/edit/password", passwordForm, {
        withCredentials: true,
      });
      //TODO: add success toast here
    } catch (err) {
      console.log(err);
      //TODO: add error toast here
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <ProfileHeader user={form} />

      <ProfileInformation form={form} setForm={setForm} />

      {/* --- CHANGE PASSWORD SECTION --- */}
      <div className="card bg-base-100 shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="input input-bordered"
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered"
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered col-span-2"
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>

        <button
          className="btn btn-secondary mt-6 w-full"
          onClick={handleUpdatePassword}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
