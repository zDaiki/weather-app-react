function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="text-center text-red-300 mb-4">
      {message}
    </div>
  );
}

export default ErrorMessage;