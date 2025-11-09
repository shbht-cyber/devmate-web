import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { setLoading } from "./utils/appSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(data.data));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      dispatch(setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default AuthProvider;
