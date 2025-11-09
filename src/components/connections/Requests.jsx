import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "../../utils/constants";
import { addRequests, removeRequests } from "../../utils/requestsSlice";
import Card from "./Card";

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
    <div className="p-4 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Requests</h1>

      {requests.map((item, index) => {
        return (
          <Card
            key={index}
            user={item.fromUserId}
            status="pending"
            _id={item._id}
            handleAction={handleReviewRequest}
          />
        );
      })}
    </div>
  );
};

export default Requests;
