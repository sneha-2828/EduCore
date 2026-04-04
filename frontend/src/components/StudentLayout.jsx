import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300 overflow-hidden">
      {/* Sidebar stays always */}
      <Sidebar isOpen={true} />

      {/* Right side */}
      <div className="flex flex-col flex-1 relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

