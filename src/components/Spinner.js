import loading from './loading.gif.gif'; // Ensure the correct path and filename

const Spinner = () => {
  return (
    <div className="text-center">
      <img
        className="my-3"
        src={loading}
        alt="Loading..."
        style={{ width: "50px", height: "50px" }} // Optional: Adjust size
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite error loop
          e.target.src = "https://via.placeholder.com/50"; // Fallback image
        }}
      />
    </div>
  );
};

export default Spinner;


