import { useState } from 'react'
import { z } from 'zod'
import './App.css'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^[a-zA-Z0-9]+$/, 'Password must contain only alphanumeric characters')
})

type LoginFormData = z.infer<typeof loginSchema>

function App() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    setErrors({})
    
    const result = loginSchema.safeParse(formData)
    
    if (!result.success) {
      const fieldErrors: Partial<LoginFormData> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData
        if (field && typeof field === 'string') {
          fieldErrors[field] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    
    alert(`Login successful! Username: ${result.data.username}`)
    setFormData({ username: '', password: '' })
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter username"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <small className="password-hint">
              Password must be at least 8 characters and contain only letters and numbers
            </small>
          </div>
          
          <button type="submit" className="login-button">
            Login here
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
