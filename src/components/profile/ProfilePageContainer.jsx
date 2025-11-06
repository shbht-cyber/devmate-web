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
    <div className="min-h-screen bg-base-300 p-6 pb-20">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* LEFT SECTION */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Profile Header */}
          <ProfileHeader form={form} />

          {/* Change Password */}
          <ChangePassword />
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-2">
          <ProfileInformation form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
