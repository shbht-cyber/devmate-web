import UserCard from "../feed/UserCard";

const ProfileHeader = ({ form }) => {
  const { firstName, lastName, emailId, age, gender, photoUrl, about } = form;

  return (
    <div className="card bg-base-100 shadow-xl p-6 flex items-center gap-6">
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

      <button
        className="btn btn-primary"
        // onClick={handleUpdateDetails}
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        View your profile card
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
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
