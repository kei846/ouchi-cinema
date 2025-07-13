
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
}) => {
  const baseStyle = 'px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  };
  const disabledStyle = 'opacity-50 cursor-not-allowed';

  const style = `
    ${baseStyle}
    ${variantStyles[variant]}
    ${disabled ? disabledStyle : ''}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={style.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
