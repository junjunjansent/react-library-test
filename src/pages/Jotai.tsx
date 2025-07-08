import debug from "debug";
const log = debug("react-test:");

import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ---------- Atom Definition
const countAtom = atom(0);
const employeesAtom = atomWithStorage("employees", [
  { id: "1", name: "samplePerson", age: 27, job: "Engineer" },
]);

const employeeRoles = [
  "unassigned",
  "Engineer",
  "HR",
  "CEO",
  "CFO",
  "Dog",
] as const;
const EmployeeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).trim(),
  age: z.number().int(),
  job: z.enum(employeeRoles),
});
const EmployeeFormSchema = EmployeeSchema.omit({ id: true });

type EmployeeWithId = z.infer<typeof EmployeeSchema>;
type EmployeeForm = Omit<EmployeeWithId, "id">;

const JotaiPage = () => {
  const [count, setCount] = useAtom(countAtom);
  const [employees, setEmployees] = useAtom(employeesAtom);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmployeeForm>({ resolver: zodResolver(EmployeeFormSchema) });

  const onSubmit: SubmitHandler<EmployeeForm> = (data) => {
    const dataWithId = { ...data, id: uuidv4() };
    const cleanedZod = EmployeeSchema.safeParse(dataWithId);

    if (!cleanedZod.success) {
      log(cleanedZod.error);
      log(cleanedZod);
    } else {
      setEmployees([...employees, cleanedZod.data]);
      reset();
    }
  };

  return (
    <>
      <h1>JotaiPage</h1>

      <article>
        <h3>Counter Section</h3>
        <p>{count}</p>
        <button onClick={() => setCount((prev: number) => prev + 1)}>+</button>
        <button onClick={() => setCount((prev: number) => prev - 1)}>-</button>
      </article>

      <article>
        <h3>Employee Addition Section</h3>

        {employees.map((employee) => (
          <details key={employee.id}>
            <summary>{employee.name}</summary>
            <ul>
              <li>{employee.age}</li>
              <li>{employee.job}</li>
            </ul>
          </details>
        ))}
        <h5>Add Employee</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Employee Name
            <input type="text" {...register("name", { required: true })} />
            {errors.name && <p role="alert">{errors.name.message}</p>}
          </label>

          <label>
            Employee Age
            <input
              required
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && <p role="alert">{errors.age.message}</p>}
          </label>

          <label>
            Employee Role
            <select {...register("job")}>
              {employeeRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.job && <p role="alert">{errors.job.message}</p>}
          </label>
          <input type="submit" disabled={isSubmitting} />
        </form>
      </article>
    </>
  );
};

export default JotaiPage;
