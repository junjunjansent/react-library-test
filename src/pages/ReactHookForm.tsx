import debug from "debug";
const log = debug("react-test:");

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z
  .object({
    //everything we put here is required (so put optional if required)
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    name: z.string().optional(),
    gender: z.string().optional(),
    age: z.number().optional(),
    birthday: z.date().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], //connect message to multiple inputs,
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const GENDERS = ["F", "M", "X"];

interface Inputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  gender?: (typeof GENDERS)[number];
  age?: number;
  birthday?: Date;
}

const ReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const cleanedData = signUpSchema.safeParse(data);
    log({ ...data, username: data.username.toLowerCase().trim() });
    log(cleanedData);
    reset();
  };

  log(watch("username")); // watch input value by passing the name of it

  return (
    <>
      <h2> React Hook Form with Zod Schema Resolver</h2>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>
          Username
          <input
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
          Email
          <input type="email" {...register("email")} />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </label>
        <label>
          Password
          <input
            type="password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must be min 3 characters long",
              },
            })}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </label>
        <label>
          Confirm Your Password
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value) => value === getValues("password"),
            })}
          />
          {errors.confirmPassword && (
            <p role="alert">{errors.confirmPassword.message}</p>
          )}
        </label>
        <label>
          Name
          <input defaultValue="name" {...register("name")} />
          {errors.name && <p role="alert">{errors.name.message}</p>}
        </label>
        <select defaultValue={""} {...register("gender")}>
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <label>
          Age
          <input
            type="number"
            defaultValue={0}
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && <p role="alert">{errors.age.message}</p>}
        </label>
        <input type="submit" disabled={isSubmitting} />
      </form>
    </>
  );
};

export default ReactHookFormPage;
