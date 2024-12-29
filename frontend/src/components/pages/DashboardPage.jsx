import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="dashboard-container"
    >
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-content">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="card-title">Profile Information</h3>
          <p className="card-text">Name: {user.name}</p>
          <p className="card-text">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="card-title">Account Activity</h3>
          <p className="card-text">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="card-text">
            <span className="font-bold">Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="logout-button-container"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
