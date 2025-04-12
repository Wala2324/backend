import React, {useState} from 'react'
import axios from '../api/axios'
import { useAuth } from "./AuthContext";



const ContactForm = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const { user } = useAuth()



    // Valideringsfunktion

    const validateForm =() => {
        const newErrors =  {}
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email.'
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required.'
        }
        return newErrors
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault()


         const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsSubmitting(true)
        setErrors ({})
        setSuccessMessage('')

        
        try {
            const response = await axios.post('/api/messages', formData);

            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('Your message is sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setErrors({ api: 'Error sending message, try again.' });
            }
        } catch (error) {
            setErrors({api: 'Network error.'})
        } finally {
            setIsSubmitting(false)
        }
    }


  return (
    <div className='container mt-5'>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name:</label>
            <input 
            id="name" 
            type='text' 
            value={formData.name} 
            onChange={(e) => setFormData ({...formData, name: e.target.value})} 
            placeholder='Write your name..'
             className={`form-control ${errors.name ? 'is-invalid' : ''}`}
             />
            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
            </div>
            
            <div className='mb-3'> 
            <label htmlFor='email' className='form-label'>Email:</label>
            <input 
            id="email"
            type='email' 
            value={formData.email} 
            onChange={(e) => setFormData ({...formData, email: e.target.value})} 
            placeholder= "Write your email..."
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
            </div>
            
            <div className='mb-3'>    
            <label htmlFor='message' className='form-label'>Message:</label>
            <textarea 
            id="message"
            value={formData.message} 
            onChange={(e) => setFormData ({...formData, message: e.target.value})} 
            placeholder='Write message..' 
            className={`form-control ${errors.mesage? 'is-invalid' : ''}`}
            />
            {errors.message && <div className='invalid-feedback' >{errors.message}</div>}
            </div>
            
            <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
            </button>
            {errors.api && <p className='text-danger mt-3'>{errors.api}</p>}
        </form>

            {successMessage && <p className='text-success mt-3'>{successMessage}</p>}
       
    </div>
  )
}

export default ContactForm