import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const Profile = ({ profileData }) => {
  const [form, setForm] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //TODO: add skill text input
  const addSkill = () => {
    const skill = prompt("Enter skill:");
    if (skill.trim() !== "") {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  // Call API for update profile details
  const handleUpdateDetails = async () => {
    try {
      await axios.patch(API_BASE_URL + "/profile/edit", form, {
        withCredentials: true,
      });

      //TODO: add success toast here
    } catch (err) {
      //TODO: add error toast here
      console.log(err);
    }
  };

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
      {/* --- HEADER CARD --- */}
      <div className="card bg-base-100 shadow-xl p-6 flex items-center gap-6">
        <img
          src={form.photoUrl || "https://via.placeholder.com/100"}
          className="w-28 h-28 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-bold">
            {form.firstName} {form.lastName}
          </h2>
          <p className="text-gray-600">{form.email}</p>
          <p className="text-gray-500 text-sm">
            {form.age} • {form.gender}
          </p>
        </div>
      </div>

      {/* --- PERSONAL INFORMATION FORM --- */}
      <div className="card bg-base-100 shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-full"
            value={form.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-full"
            value={form.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered col-span-2"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="input input-bordered"
            value={form.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            className="select select-bordered"
            value={form.gender}
            onChange={handleChange}
          >
            <option disabled>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <textarea
            name="about"
            placeholder="About yourself"
            className="textarea textarea-bordered col-span-2"
            value={form.about}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* --- SKILLS SECTION --- */}
        <h3 className="text-lg font-semibold mt-6">Skills</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {form.skills.map((skill, index) => (
            <div key={index} className="badge badge-primary p-3 text-white">
              {skill}
            </div>
          ))}

          <button className="btn btn-outline btn-sm" onClick={addSkill}>
            + Add
          </button>
        </div>

        {/* --- BUTTONS FOR APIS --- */}
        <div className="flex gap-4 mt-6">
          <button
            className="btn btn-primary w-1/2"
            onClick={handleUpdateDetails}
          >
            Save Details
          </button>
        </div>
      </div>

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
