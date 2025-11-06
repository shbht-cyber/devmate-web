import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../../utils/requestsSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const handleReviewRequest = async (status, requestId) => {
    const url = API_BASE_URL + `/request/review/${status}/${requestId}`;
    try {
      await axios.post(url, {}, { withCredentials: true });

      dispatch(removeRequests(requestId));
    } catch (err) {
      console.err("Error: " + err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        API_BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );

      dispatch(addRequests(data?.data));
    } catch (err) {
      console.err("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold ">No requests found</h2>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 mb-20">
      <h1 className="text-xl font-bold">Requests</h1>
      <ul className="list w-[70%] ">
        {requests.map((item, index) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            item.fromUserId;
          return (
            <div className="flex items-center rounded-full m-2 bg-base-300 shadow-2xl">
              <div
                key={index}
                className="flex p-2 gap-5 m-2 items-center w-[80%]"
              >
                <img
                  className="w-20 h-20 rounded-full object-cover border"
                  src={photoUrl}
                />

                <div className="text-left flex flex-col justify-center">
                  <h1 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h1>

                  {age && (
                    <h3 className="text-md uppercase opacity-60">{age}</h3>
                  )}

                  {gender && (
                    <h3 className="text-md uppercase opacity-60">{gender}</h3>
                  )}

                  <p className="list-col-wrap text-xs">{about}</p>
                </div>
              </div>

              <div className="flex">
                <div
                  onClick={() => handleReviewRequest("accepted", item._id)}
                  className="bg-green-500 w-25 h-[30px] flex justify-center items-center rounded-full m-5 cursor-pointer"
                >
                  <p className="font-bold">Accept</p>
                </div>
                <div
                  onClick={() => handleReviewRequest("rejected", item._id)}
                  className="bg-red-500 w-25 h-[30px] flex justify-center items-center rounded-full m-5 cursor-pointer"
                >
                  <p className="font-bold">Reject</p>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
