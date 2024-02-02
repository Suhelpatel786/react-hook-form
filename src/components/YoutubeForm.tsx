import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type formValues = {
  username: string;
  email: string;
  chanelname: string;
  social: {
    twitter: string;
    instagram: string;
  };
};

let renderCount = 0;

const YoutubeForm = () => {
  const form = useForm<formValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "batman",
        email: data.email,
        chanelname: "",
        social: {
          twitter: "",
          instagram: "",
        },
      };
    },
  });

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
            validate: {
              notAllowedEmail: (fieldValue: string) => {
                const restrictedEmails = ["admin@gmail.com", "abc@gmail.com"];
                if (restrictedEmails.includes(fieldValue)) {
                  return "Please Enter a diffrent Email !!";
                }

                return true;
              },
              blackListedDomain: (fieldValue: string) => {
                if (fieldValue.endsWith("baddomain.com")) {
                  return "This Domain is not Supported !!";
                }
                return true;
              },
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

        <label htmlFor="twitter">Twitter</label>
        <input
          placeholder="Twitter account"
          type="text"
          {...register("social.twitter")}
          id="twitter"
        />

        <label htmlFor="instagram">Facebook</label>
        <input
          placeholder="instagram account"
          type="text"
          {...register("social.instagram")}
          id="instagram"
        />

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
