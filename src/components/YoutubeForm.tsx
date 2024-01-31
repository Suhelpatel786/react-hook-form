import React from "react";

const YoutubeForm = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          placeholder="User name"
          type="text"
          name="username"
          id="username"
        />

        <label htmlFor="email">Email</label>
        <input placeholder="Email" type="email" name="email" id="email" />

        <label htmlFor="chanelname">Channel Name</label>
        <input
          placeholder="Chanel name"
          type="text"
          name="chanelname"
          id="chanelname"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
