import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | null
}

const Input: React.FC<Props> = ({ label, error = null, className = '', ...rest }) => {
  return (
    <label className="block mb-4">
      {label && <div className="mb-2 text-sm font-medium text-text-primary">{label}</div>}
      <input
        className={`w-full px-3 py-2 border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...rest}
      />
      {error && <div className="text-sm text-error mt-1">{error}</div>}
    </label>
  )
}

export default Input
















































