
function Button({ children, type = "button", bgColor, className = "", ...props }) {
  return (
    <button
      type={type}
      className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${className} ${bgColor} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
