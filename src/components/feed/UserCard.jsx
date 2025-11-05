import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  const defaultMaleUserIcon =
    "https://thumbs.dreamstime.com/b/vector-user-icon-7337510.jpg";
  const defaultFemaleUserIcon =
    "https://thumbs.dreamstime.com/b/user-icon-9233164.jpg";

  const userIcon = photoUrl
    ? photoUrl
    : gender == "female"
    ? defaultFemaleUserIcon
    : defaultMaleUserIcon;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={userIcon} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && <p>{gender}</p>}
        {age && <p>{age}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
