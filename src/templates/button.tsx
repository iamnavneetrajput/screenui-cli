import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;