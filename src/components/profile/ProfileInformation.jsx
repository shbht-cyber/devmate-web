import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const ProfileInformation = ({ form, setForm }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    const skill = prompt("Enter skill:");
    if (skill.trim() !== "") {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
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

      //TODO: add success toast here
    } catch (err) {
      //TODO: add error toast here
      console.log(err);
    }
  };

  return (
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
        <button className="btn btn-primary w-1/2" onClick={handleUpdateDetails}>
          Save Details
        </button>
      </div>
    </div>
  );
};

export default ProfileInformation;
