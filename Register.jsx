import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { RiLoaderFill } from "react-icons/ri";
import { useAuth } from "../AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, rememberUser, toggleRememberUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, repeatPassword } = formData;

    if (!email || !password || !firstName || !lastName || !repeatPassword) {
      setError("Please fill in all fields");
      return;
    } else if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: "28rem" }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              className="form-control"
              value={formData.repeatPassword}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, repeatPassword: e.target.value }))
              }
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="persist"
              checked={rememberUser}
              onChange={toggleRememberUser}
            />
            <label className="form-check-label" htmlFor="persist">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <RiLoaderFill className="me-2 spinner-border spinner-border-sm" />
                Loading
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {error && (
          <p className="text-danger text-center mt-3">{error}</p>
        )}
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
