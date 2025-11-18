import { useSearchParams } from "react-router-dom";

function Rides() {
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const passengers = searchParams.get("passengers");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Rides</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Search Criteria:</h2>
        <p><strong>From:</strong> {from || "N/A"}</p>
        <p><strong>To:</strong> {to || "N/A"}</p>
        <p><strong>Date:</strong> {date || "N/A"}</p>
        <p><strong>Passengers:</strong> {passengers || "N/A"}</p>
      </div>

      <div className="text-center text-gray-500 text-lg">
        <p>Ride results will be displayed here.</p>
        <p> (This is a placeholder for now)</p>
      </div>
    </div>
  );
}export default Rides;
