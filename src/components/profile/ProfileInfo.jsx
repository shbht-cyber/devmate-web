import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import SkillsSection from "./SkillsSection";
import { useState } from "react";
import Toaster from "../common/Toaster";

const ProfileInfo = ({ form, setForm }) => {
  const dispatch = useDispatch();

  const [toast, setToast] = useState({
    show: false,
    type: "",
    title: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateDetails = async () => {
    // eslint-disable-next-line no-unused-vars
    const { emailId, ...payloadData } = form;
    try {
      const { data } = await axios.patch(
        API_BASE_URL + "/profile/edit",
        payloadData,
        {
          withCredentials: true,
        }
      );

      if (data.data) {
        dispatch(addUser(data?.data));
      }
      setToast({
        show: true,
        type: "success",
        title: "Profile updated successfully!",
      });
    } catch (err) {
      console.log(err);
      setToast({ show: true, type: "error", title: err.response.data.error });
    }
  };

  const renderInput = (type, name, placeholder) => {
    return (
      <div>
        <h3 className="text-md font-semibold mb-2">{placeholder}</h3>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="input input-bordered w-full"
          value={form[name]}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 h-full">
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>

      <div className="grid grid-cols-2 gap-4">
        {renderInput("text", "firstName", "First Name")}
        {renderInput("text", "lastName", "Last Name")}
        {renderInput("number", "age", "Age")}
        {renderInput("text", "photoUrl", "Photo Url")}

        <div>
          <h3 className="text-xl font-semibold mb-2">Gender</h3>
          <select
            name="gender"
            className="select select-bordered w-full"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <textarea
            name="about"
            placeholder="About yourself"
            className="textarea textarea-bordered col-span-4 w-full"
            value={form.about}
            onChange={handleChange}
          />
        </div>
      </div>

      <SkillsSection form={form} setForm={setForm} />

      <div className="flex gap-4 mt-6">
        <button
          className="btn btn-primary w-full"
          onClick={handleUpdateDetails}
        >
          Save Details
        </button>
      </div>

      {toast.show && <Toaster toast={toast} setToast={setToast} />}
    </div>
  );
};

export default ProfileInfo;
