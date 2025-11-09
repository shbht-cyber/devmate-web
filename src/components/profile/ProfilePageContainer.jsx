import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-base-200 p-6 pb-20">
      <div className="max-w-6xl mx-auto gap-6 flex flex-col lg:grid lg:grid-cols-3">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6 h-full lg:col-span-1">
          <ProfileHeader form={form} />

          <ChangePassword />
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2 h-full">
          <ProfileInfo form={form} setForm={setForm} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
