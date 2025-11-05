const ProfileHeader = ({ user }) => {
  const { firstName, lastName, emailId, age, gender, photoUrl, about } = user;

  return (
    <div className="card bg-base-300 shadow-xl p-6 flex items-center gap-6">
      <img
        src={photoUrl}
        className="w-28 h-28 rounded-full object-cover border"
        alt="user-image"
      />

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-600">{emailId}</p>
        <p className="text-gray-500 text-sm">
          {age} • {gender}
        </p>
        <p className="text-gray-500 text-sm">{about}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
