import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../../utils/connectionsSlice";

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

  if (connections?.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 mb-20">
      <h1 className="text-xl font-bold">Connections</h1>
      <ul className="list w-[70%] ">
        {connections.map((item, index) => {
          return (
            <div className="flex justify-between items-center  rounded-full m-2 bg-base-300 shadow-2xl">
              <div
                key={index}
                className="flex p-2 gap-5 m-2 items-center w-[80%]"
              >
                <img
                  className="w-20 h-20 rounded-full object-cover border"
                  src={item.photoUrl}
                />

                <div className="text-left flex flex-col justify-center">
                  <h1 className="font-bold text-xl">
                    {item.firstName + " " + item.lastName}
                  </h1>

                  {item.age && (
                    <h3 className="text-md uppercase opacity-60">{item.age}</h3>
                  )}

                  {item.gender && (
                    <h3 className="text-md uppercase opacity-60">
                      {item.gender}
                    </h3>
                  )}

                  <p className="list-col-wrap text-xs">{item.about}</p>
                </div>
              </div>

              <div className="bg-green-500 w-25 h-[30px] flex justify-center items-center rounded-full m-5">
                <p className="font-bold">Connected</p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
