import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import UserCard from "./UserCard";

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
  return (
    feed && (
      <div className="flex justify-center my-[10%]">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
