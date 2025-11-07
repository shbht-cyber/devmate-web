import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { useDispatch } from "react-redux";

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
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full h-72 overflow-hidden rounded-lg">
        <img
          src={photoUrl}
          alt="user-photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && <p>{gender}</p>}
        {age && <p>{age}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button
            disabled={isPreview}
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored")}
          >
            Ignore
          </button>
          <button
            disabled={isPreview}
            className="btn btn-secondary"
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
