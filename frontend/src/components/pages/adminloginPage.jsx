import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../Input";
import { useAuthadmin } from "../store/authadmin";
import { toast } from "react-hot-toast";

const adminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthadmin();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="center-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-container"
      >
        <div className="login-box">
          <h2 className="login-header">Admin Login</h2>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error-message">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="login-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="loader" /> : "Login"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default adminLogin;
