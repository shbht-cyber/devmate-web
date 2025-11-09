import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserCard from "./UserCard";
import { addFeed } from "../../utils/feedSlice";
import { API_BASE_URL } from "../../utils/constants";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const { data } = await axios.get(API_BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(data.data));
    } catch (err) {
      console.error("Error: " + err.message);
    }
  };

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feed) return null;

  if (feed.length === 0)
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold ">
          No Users found, please try after sometime!
        </h2>
      </div>
    );

  return (
    <div className="flex justify-center items-center my-5 p-5">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
