import { Check, X } from "lucide-react";

const PasswordStrengthMeter = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "red";
    if (strength === 1) return "orange";
    if (strength === 2) return "yellow";
    if (strength === 3) return "lightyellow";
    return "green";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="password-strength-container">
      <div className="strength-text-container">
        <span className="strength-label">Password strength</span>
        <span className="strength-status">{getStrengthText(strength)}</span>
      </div>

      <div className="strength-meter">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`strength-meter-bar ${
              index < strength ? getColor(strength) : "gray"
            }`}
          />
        ))}
      </div>

      <div className="password-criteria-container">
        {criteria.map((item) => (
          <div key={item.label} className="password-criteria-item">
            {item.met ? (
              <Check className="check-icon" />
            ) : (
              <X className="x-icon" />
            )}
            <span className={item.met ? "text-green" : "text-gray"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
