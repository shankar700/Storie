
function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
