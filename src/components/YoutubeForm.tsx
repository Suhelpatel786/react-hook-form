import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type formValues = {
  username: string;
  email: string;
  chanelname: string;
  social: {
    twitter: string;
    instagram: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
    select: string;
  }[];
  age: number;
  dob: Date;
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
        phoneNumbers: ["", ""],
        phNumbers: [
          {
            number: "",
            select: "",
          },
        ],
        age: 10,
        dob: new Date(),
      };
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors, dirtyFields, touchedFields } = formState;

  renderCount++;

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted", { data });
  };

  //use fields array
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  //to watch multiple value
  // const username = watch("username");

  //to watch multiple values
  // const data = watch(["username", "chanelname"]);

  // to watch all value
  const allData = watch();

  //get values
  const handleGetValues = () => {
    //handle get values
    console.log("Get Values", getValues());
  };

  const handleSetValues = () => {
    // setValue("username", ""); //this will does not effect to the form state

    setValue("username", "", {
      // shouldDirty: true,
      // shouldTouch: true,
      shouldValidate: true,
    });
  };

  // touched and dirty fields records
  console.log({ touchedFields }, { dirtyFields });

  return (
    <div>
      {/* <h1>YouTube Form {renderCount / 2}</h1> */}

      {/*  to watch single value  */}
      {/* <h1>{username}</h1> */}

      {/* ti watch multiple values */}
      {/* <h1>{allData?.email}</h1> */}

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
          {...register("social.twitter", {
            required: {
              value: true,
              message: "Please enter your twitter account",
            },
          })}
          id="twitter"
        />

        <p className="error">{errors?.social?.twitter?.message}</p>

        <label htmlFor="instagram">Instagram</label>
        <input
          placeholder="Phone Numbeer"
          type="text"
          {...register("social.instagram", {
            required: {
              value: true,
              message: "Please enter your instagram account",
            },
          })}
          id="instagram"
        />

        <p className="error">{errors?.social?.instagram?.message}</p>

        <label htmlFor="phonenumber">Phone number 1</label>
        <input
          placeholder="Phone number"
          type="text"
          {...register("phoneNumbers.0", {
            required: {
              value: true,
              message: "Please enter your primary phone number",
            },
          })}
          id="phonenumber"
        />

        <p className="error">{errors?.phoneNumbers?.[0]?.message}</p>

        <label htmlFor="phonenumber1">Phone number 2 </label>
        <input
          placeholder="Phone number"
          type="text"
          {...register("phoneNumbers.1", {
            required: {
              value: true,
              message: "Please enter your secondary phone number",
            },
          })}
          id="phonenumber1"
        />
        <p className="error">{errors?.phoneNumbers?.[1]?.message}</p>

        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`phNumbers.${index}.number` as const)}
              />
              <select {...register(`phNumbers.${index}.select` as const)}>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
              </select>

              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove phone number
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ number: "", select: "" })}
          >
            Add phone number
          </button>
        </div>

        <label htmlFor="age">Age</label>
        <input
          placeholder="Please enter age"
          type="number"
          {...register("age", {
            valueAsNumber: true,
            required: { value: true, message: "Age is required" },
          })}
          id="age"
        />

        <p className="error">{errors?.age?.message}</p>

        <label htmlFor="date">DOB</label>
        <input
          placeholder="Please enter age"
          type="date"
          {...register("dob", {
            valueAsDate: true,
            required: { value: true, message: "Date of birth is required" },
          })}
          id="age"
        />

        <p className="error">{errors?.dob?.message}</p>
        <button type="button" onClick={() => handleGetValues()}>
          Get Values
        </button>

        <button type="button" onClick={() => handleSetValues()}>
          Set Values
        </button>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
