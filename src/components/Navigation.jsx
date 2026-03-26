import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        👖 하의
      </NavLink>
      <NavLink to="/upper" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        👕 상의
      </NavLink>
      <NavLink to="/reverse" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        🔄 역변환
      </NavLink>
    </nav>
  );
}

export default Navigation;
