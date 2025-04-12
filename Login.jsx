import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useCart } from '../CartContext'
import { RiLoaderFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, rememberUser, toggleRememberUser } = useAuth()
  const { resetCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return;
    }

    setLoading(true)
    setError('')

    try {
      await login(formData)
      resetCart()
      navigate(location.state?.from || '/')
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="card p-4 shadow-sm mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="text-center h3 mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
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
              setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
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
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <span className="d-flex align-items-center justify-content-center gap-2">
              <RiLoaderFill className="me-2 spinner-border spinner-border-sm" /> Loading
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      <p className="text-center mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
