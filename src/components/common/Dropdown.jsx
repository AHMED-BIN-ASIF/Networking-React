import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "../../css/Dropdown.css";

// Topology data array
const topologyLinks = [
  { path: "/topology-1", name: "Topology 1" },
  { path: "/topology-2", name: "Topology 2" },
  { path: "/topology-3", name: "Topology 3" },
  { path: "/topology-4", name: "Topology 4" },
  { path: "/topology-5", name: "Topology 5" },
  { path: "/topology-6", name: "Topology 6" },
  { path: "/topology-7", name: "Topology 7" },
];

// Framer Motion variants for the dropdown menu animation
const dropdownVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if click is outside the dropdown container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine the selected topology based on the current route
  const selectedTopology = topologyLinks.find(
    (link) => link.path === location.pathname
  );
  const selectedName = selectedTopology ? selectedTopology.name : "Select Topology";

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedName} <ChevronDown size={16} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="dropdown-menu"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {topologyLinks.map((topology, index) => (
              <li key={index}>
                <NavLink
                  to={topology.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setIsOpen(false)}
                >
                  {topology.name}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
