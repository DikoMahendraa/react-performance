import React, { memo } from "react";

const ProfileCard = (profile) => {
  return (
    <>
      <img
        className="rounded-full border-2 border-gray-500"
        src={profile?.avatar}
        height={100}
        width={100}
        alt="profile-avatar"
      />

      <h2 className="text-2xl font-semibold mb-4">Welcome, {profile?.name}!</h2>
      <p className="text-gray-700">Email: {profile?.email}</p>
      <p className="text-gray-700">Role: {profile?.role}</p>
    </>
  );
};

export default memo(ProfileCard);
