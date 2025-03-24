import { Home, Menu, Network } from "lucide-react"; // Changed 'network' to 'Globe'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom"; // Changed from Link to NavLink
import "../css/Sidebar.css";

const SIDEBAR_ITEMS = [
    { name: "Networking Home", icon: Home, href: "/" },
    { name: "Simple Topology 1", icon: Network, href: "/topology-1" },
    { name: "Simple Topology 2", icon: Network, href: "/topology-2" },
    { name: "Simple Topology 3", icon: Network, href: "/topology-3" },
    { name: "Simple Topology 4", icon: Network, href: "/topology-4" },
    { name: "Simple Topology 5", icon: Network, href: "/topology-5" },
    { name: "Simple Topology 6", icon: Network, href: "/topology-6" },
    { name: "Simple Topology 7", icon: Network, href: "/topology-7" },
  ];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div className="sidebar" animate={{ width: isSidebarOpen ? 226 : 80 }}>
      <div className="sidebar-container">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sidebar-toggle"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item, index) => (
            <NavLink key={item.href} to={item.href} className={({ isActive }) => (isActive ? "active" : "")}>
              <motion.div className="sidebar-item">
                <div className="icon-wraper">
                <item.icon
                  size={22}
                  className="sidebar-icon"
                />
                <AnimatePresence>
                  {!isSidebarOpen && (
                    <motion.span
                      className="sidebar-item-no"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      {index === 0 ? "" : `${index}`}
                    </motion.span>
                  )
                  }
                </AnimatePresence>

                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="sidebar-item-text"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.4 }}
                    >
                      {item.name}
                    </motion.span>
                  )
                  }
                </AnimatePresence>
              </motion.div>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
