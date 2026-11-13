import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:underline ${isActive ? "text-white font-bold underline" : "text-gray-300"}`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-primary px-8 py-4 text-gray-100 shadow-md">
      <span className="text-2xl font-bold tracking-wide">HandleHunt</span>
      <ul className="flex list-none items-center gap-6 text-lg">
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/faqs" className={linkClass}>
            FAQs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
