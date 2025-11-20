import { Link } from "react-router-dom";

const SignupForm = ({ form, setForm, setPhoto, handleSignup, error }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderInput = (label, type, name, placeholder) => {
    return (
      <div className="">
        <label className="label">{label}</label>

        <input
          name={name}
          type={type}
          value={form[name]}
          placeholder={placeholder}
          className="input input-bordered"
          onChange={handleChange}
        />
      </div>
    );
  };
  return (
    <div className="w-full md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
      <form
        className="w-full max-w-sm space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        {renderInput("Firstname", "text", "firstName", "Enter your first name")}

        {renderInput("Lastname", "text", "lastName", "Enter your last name")}

        {renderInput("Email", "email", "emailId", "Enter your email id")}

        {renderInput("Password", "password", "password", "Enter password")}

        <div className="flex gap-4 justify-center items-center">
          <div className="w-1/2">
            {renderInput("Age", "number", "age", "Enter age")}
          </div>

          <div className="w-1/2">
            <label className="label">Gender</label>
            <select
              name="gender"
              className="select select-bordered"
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
        </div>

        <div>
          <label className="label">Profile Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>

        <div className="text-center">
          <Link to={"/login"} className="link link-info">
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
