import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type formValues = {
  username: string;
  email: string;
  chanelname: string;
};

let renderCount = 0;
const YoutubeForm = () => {
  const form = useForm<formValues>();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  renderCount++;

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted", { data });
  };
  return (
    <div>
      {/* <h1>YouTube Form {renderCount / 2}</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          placeholder="User name"
          type="text"
          id="username"
          {...register("username", {
            required: { value: true, message: "User name is required" },
          })}
        />

        <p className="error">{errors?.username?.message}</p>

        <label htmlFor="email">Email</label>

        <input
          placeholder="Email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email",
            },
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          type="email"
          id="email"
        />

        <p className="error">{errors?.email?.message}</p>

        <label htmlFor="chanelname">Channel Name</label>
        <input
          placeholder="Chanel name"
          type="text"
          {...register("chanelname", {
            required: { value: true, message: "Channel name is required" },
          })}
          id="chanelname"
        />

        <p className="error">{errors?.chanelname?.message}</p>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
