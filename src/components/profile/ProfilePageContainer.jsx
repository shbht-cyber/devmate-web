import { useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileInformation from "./ProfileINformation";
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

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <ProfileHeader form={form} />

      <ProfileInformation form={form} setForm={setForm} />

      <ChangePassword />
    </div>
  );
};

export default ProfilePageContainer;
