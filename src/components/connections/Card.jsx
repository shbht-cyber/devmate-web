const Card = ({ user, status, _id, handleAction }) => {
  const { firstName, lastName, gender, age, about, photoUrl } = user;

  const ringColor =
    gender === "female"
      ? "ring-pink-500"
      : gender === "male"
      ? "ring-blue-500"
      : "ring-purple-500";

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 mb-2">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Avatar */}
        <div className="avatar">
          <div
            className={`w-20 h-20 rounded-full ring-offset-base-100 ring-2 ring-offset-2 ${ringColor}`}
          >
            <img src={photoUrl} alt="user" />
          </div>
        </div>

        {/* USER INFORMATION */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold capitalize">
            {firstName} {lastName}
          </h2>

          <p className="text-sm opacity-70 capitalize">
            {gender} • {age} years
          </p>

          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{about}</p>
        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {status === "connected" ? (
            <button className="btn btn-success btn-sm w-full sm:w-auto">
              Connected
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline btn-sm w-full sm:w-auto"
                onClick={() => handleAction("rejected", _id)}
              >
                Reject
              </button>

              <button
                className="btn btn-primary btn-sm w-full sm:w-auto"
                onClick={() => handleAction("accepted", _id)}
              >
                Accept
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
