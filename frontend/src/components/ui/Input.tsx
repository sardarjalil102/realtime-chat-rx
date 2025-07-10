import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  disabled?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  error = '',
  size = 'md',
  variant = 'default',
  className = '',
  onKeyPress
}) => {
  const baseClasses = 'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'border border-gray-300 focus:border-blue-400 focus:ring-blue-400 bg-white',
    outline: 'border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-400 bg-white',
    filled: 'border border-gray-300 focus:border-blue-400 focus:ring-blue-400 bg-gray-50'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl'
  };

  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-400' : '';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={classes}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export { Input };
export default Input; 