import { useSelector } from "react-redux";

import ProfilePageContainer from "./ProfilePageContainer";

const ProfilePage = () => {
  const profileData = useSelector((store) => store.user);

  return profileData && <ProfilePageContainer profileData={profileData} />;
};

export default ProfilePage;
