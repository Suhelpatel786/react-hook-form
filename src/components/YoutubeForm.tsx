import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
const YoutubeForm = () => {
  const form = useForm();

  const { register, control } = form;
  renderCount++;
  return (
    <div>
      {/* <h1>YouTube Form {renderCount / 2}</h1> */}
      <form>
        <label htmlFor="username">Username</label>
        <input
          placeholder="User name"
          type="text"
          id="username"
          {...register("username")}
        />

        <label htmlFor="email">Email</label>

        <input
          placeholder="Email"
          {...register("email")}
          type="email"
          id="email"
        />

        <label htmlFor="chanelname">Channel Name</label>
        <input
          placeholder="Chanel name"
          type="text"
          {...register("chanelname")}
          id="chanelname"
        />

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
