import { useState, useEffect } from 'react';
import './Styles/SubscriptionForm.css';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Email Validation Function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Automatically clear message after 5 seconds
  useEffect(() => {
    if (message) {
      console.log("Current message:", message);
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Prevent re-submission while already submitting
    if (isSubmitting) return;

    console.log("Submitting with email:", email);

    // Reset messages
    setMessage('');

    // Validate email before submission
    if (!validateEmail(email)) {
      setIsValid(false);
      setMessage(' Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setIsValid(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe.');
      }

      setMessage(' Thank you for subscribing!');
      setEmail(''); // Clear input after success
    } catch (error) {
      console.error("Error:", error);
      setMessage(' An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); //Enable re-submission after completion
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <label htmlFor="email" className="form-label">
        Subscribe to our newsletter
      </label>

      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`form-input ${isValid ? '' : 'input-error'}`}
        aria-invalid={!isValid}
        required
      />

      <button 
        type="submit" 
        disabled={isSubmitting || !email} 
        className="subscribe-btn"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>

      {/* Keep message visible longer */}
      {message && (
        <p className={`subscription-message ${isValid ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default SubscriptionForm;
