import debug from "debug";
const log = debug("react-test:");

import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom } from "jotai";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

// ---------- Atom Definition
const countAtom = atom(0);
const employeesAtom = atom([
  { name: "samplePerson", age: 27, job: "Engineer" },
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
  //everything we put here is required (so put optional if required)
  name: z.string().trim(),
  age: z.number().int(),
  job: z.enum(employeeRoles),
});

type Employee = z.infer<typeof EmployeeSchema>;

const JotaiPage = () => {
  const [count, setCount] = useAtom(countAtom);
  const [employees, setEmployees] = useAtom(employeesAtom);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Employee>({ resolver: zodResolver(EmployeeSchema) });

  const onSubmit: SubmitHandler<Employee> = (data) => {
    const cleanedZod = EmployeeSchema.safeParse(data);
    log(data);
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
          <details key={employee.name}>
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
            <input type="text" {...register("name")} />
            {errors.name && <p role="alert">{errors.name.message}</p>}
          </label>

          <label>
            Employee Age
            <input type="number" {...register("age")} />
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
          </label>
          <input type="submit" disabled={isSubmitting} />
        </form>
      </article>
    </>
  );
};

export default JotaiPage;
