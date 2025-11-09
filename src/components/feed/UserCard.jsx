import axios from "axios";
import { useDispatch } from "react-redux";

import { API_BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "../../utils/feedSlice";

const UserCard = ({ user, isPreview }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status) => {
    try {
      const url = API_BASE_URL + `/request/send/${status}/${_id}`;
      await axios.post(url, {}, { withCredentials: true });

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.err("Error: " + err.message);
    }
  };

  return (
    <div className="card w-[400px] bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden">
      {/* Image Section */}
      <figure
        className={`h-[300px] w-full overflow-hidden bg-${
          gender === "female" ? "pink" : "blue"
        }-200`}
      >
        <img
          src={photoUrl}
          alt="user-photo"
          className="h-full w-full object-cover object-center"
        />
      </figure>

      {/* Content Section */}
      <div className="p-5 text-center">
        <h2 className="text-xl font-semibold tracking-wide">
          {firstName + " " + lastName}
        </h2>

        <div className="mt-2 text-sm text-gray-600 space-y-5">
          {gender && (
            <p className="uppercase">
              {gender} - {age}y
            </p>
          )}

          {about && <p className="line-clamp-5 px-2 text-gray-500">{about}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-5">
          <button
            disabled={isPreview}
            className="btn btn-outline w-28"
            onClick={() => handleSendRequest("ignored")}
          >
            Ignore
          </button>

          <button
            disabled={isPreview}
            className="btn btn-primary w-28"
            onClick={() => handleSendRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
