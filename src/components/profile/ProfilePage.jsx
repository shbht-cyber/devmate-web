import { useSelector } from "react-redux";
import Profile from "./Profile";

const ProfilePage = () => {
  const profileData = useSelector((store) => store.user);

  return profileData && <Profile profileData={profileData} />;
};

export default ProfilePage;
