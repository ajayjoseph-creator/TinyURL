import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Shortener() {
  const [longUrl, setLongUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) return setError("Please enter a URL");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://tinyurl-rp1q.onrender.com/shorten", { longUrl });
      const shortCode = res.data.shortCode;

      setHistory([{ longUrl, shortCode }, ...history]);
      setLongUrl("");
    } catch (err) {
      console.error(err);
      if (err.response) setError(err.response.data.msg || "Error generating short URL");
      else setError(err.message || "Server error");
    } finally {
      setLoading(false);
      toast.success('URL Shortened')
    }
  };

 const handleCopy = (shortCode) => {
  const url = `https://tinyurl-rp1q.onrender.com/r/${shortCode}`;
  navigator.clipboard.writeText(url);
  toast.success("Copied to clipboard!");
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      
  <img 
    src="/URL.png" 
    alt="App Logo" 
    className="w-40 h-40 rounded-full shadow-md"
  />
  
      <div className="bg-black border border-gray-700 shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
        URL Shortener
        </h1>

        <div className="flex w-full mb-4">
          <input
            type="text"
            placeholder="Enter a long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 p-3 border border-gray-600 bg-gray-900 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleShorten}
            className="px-5 py-3 bg-white text-black font-medium rounded-r-lg hover:bg-gray-200 transition"
          >
            {loading ? "Processing..." : "Shorten"}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-center font-medium mb-4">{error}</p>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-3">📜 History</h2>
            <ul className="space-y-3">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-gray-900 border border-gray-700 rounded-lg p-3"
                >
                  <span className="text-gray-300 truncate">{item.longUrl}</span>
                  <div className="flex items-center mt-2 md:mt-0">
                    <a
                      href={`https://tinyurl-rp1q.onrender.com/r/${item.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white underline mr-3 hover:text-gray-300"
                    >
                      {item.shortCode}
                    </a>
                    <button
                      onClick={() => handleCopy(item.shortCode)}
                      className="px-3 py-1 bg-white text-black rounded-lg hover:bg-gray-200 transition"
                    >
                      Copy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
