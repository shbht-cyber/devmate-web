import { useEffect, useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

const ProfilePageContainer = ({ profileData }) => {
  const [form, setForm] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    emailId: profileData.emailId,
    age: profileData.age,
    gender: profileData.gender,
    about: profileData.about,
    skills: profileData.skills || [],
    photoUrl: profileData.photoUrl,
  });

  useEffect(() => {
    setForm(profileData);
  }, [profileData]);

  return (
    <div className="min-h-screen bg-base-300 p-6 pb-5">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <ProfileHeader form={form} />
          <ChangePassword />
        </div>

        <div>
          <ProfileInfo form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
