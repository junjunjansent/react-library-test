import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const GENDERS = ["F", "M", "X"];

interface Inputs {
  username: string;
  email: string;
  password: string;
  name: string;
  gender: (typeof GENDERS)[number];
  age: number;
  birthday: Date;
}

const ReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ ...data, username: data.username.toLowerCase().trim() });
    reset();
  };

  console.log(watch("username")); // watch input value by passing the name of it

  return (
    <>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>
          <input
            defaultValue="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be min 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username must be max 20 characters long",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+$/,
                message:
                  "Username can only contain alhpanumerics, dot, underscore, or dashes",
              },
            })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && <p role="alert">{errors.username.message}</p>}
        </label>
        <label>
          <input type="email" defaultValue="email" {...register("email")} />
        </label>
        <label>
          <input
            type="password"
            defaultValue="password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must be min 3 characters long",
              },
            })}
          />
        </label>
        <label>
          <input defaultValue="name" {...register("name")} />
        </label>
        <select defaultValue={""} {...register("gender")}>
          {GENDERS.map((gender) => (
            <option value={gender}>{gender}</option>
          ))}
        </select>

        <label>
          <input type="number" defaultValue="age" {...register("age")} />
        </label>
        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
        <input type="submit" disabled={isSubmitting} />
      </form>
      <h6>Results</h6>
    </>
  );
};

export default ReactHookFormPage;
