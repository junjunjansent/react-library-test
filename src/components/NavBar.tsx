import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/axious">Axios Page</NavLink>
      <NavLink to="/Jotai">Jotai Page</NavLink>
      <NavLink to="/react-hook-form">ReactHookForm Page</NavLink>
      <NavLink to="/zod">Zod Page</NavLink>
    </nav>
  );
};

export default NavBar;
