import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../Input";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast"; // Import toast

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      // Display success toast on successful login
      toast.success("Login successful!");
    } catch (err) {
      // Optional: Display error toast in case of login failure
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
          <h2 className="login-header">Welcome Back</h2>

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

            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>

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

        <div className="signup-container">
          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
