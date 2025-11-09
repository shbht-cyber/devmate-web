import UserCard from "../feed/UserCard";

const ProfileHeader = ({ form }) => {
  const { firstName, lastName, emailId, age, gender, photoUrl, about } = form;

  return (
    <div className="card bg-base-100 shadow-xl p-6 flex items-center gap-6">
      <div className="avatar">
        <div
          className={`w-28 rounded-full ring-offset-2 ring-3 ring-offset-base-100 ${
            gender === "female" ? "ring-pink-500" : "ring-blue-500"
          }`}
        >
          <img src={photoUrl} alt="user-image" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-600">{emailId}</p>
        <p className="text-gray-500 text-sm uppercase">
          {age} • {gender}
        </p>
        <p className="text-gray-500 text-sm mt-2">{about}</p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("dialog").showModal()}
      >
        Preview your profile card
      </button>

      <dialog id="dialog" className="modal">
        <div className="modal-box flex justify-center p-10">
          <form method="dialog">
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <UserCard user={form} isPreview={true} />
        </div>
      </dialog>
    </div>
  );
};

export default ProfileHeader;
