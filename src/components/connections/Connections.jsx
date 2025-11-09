import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../utils/constants";
import { addConnections } from "../../utils/connectionsSlice";
import Card from "./Card";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const { data } = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(data.data));
    } catch (err) {
      console.err(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold ">No connections found</h2>
      </div>
    );

  return (
    <div className="p-4 flex flex-col gap-4  items-center">
      <h1 className="text-2xl font-bold">Connections</h1>

      {connections.map((user) => (
        <Card
          key={user._id}
          user={user}
          status="connected"
          handleConnectionAction={(action) =>
            console.log("user action:", action)
          }
        />
      ))}
    </div>
  );
};

export default Connections;
