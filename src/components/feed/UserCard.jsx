import React from "react";

const UserCard = ({ user, isPreview }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full h-72 overflow-hidden rounded-lg">
        <img
          src={photoUrl}
          alt="user-photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && <p>{gender}</p>}
        {age && <p>{age}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button disabled={isPreview} className="btn btn-primary">
            Ignore
          </button>
          <button disabled={isPreview} className="btn btn-secondary">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
