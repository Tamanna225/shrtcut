import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND;

const CustomURL: React.FC = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortCode, setShortCode] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [useCustomCode, setUseCustomCode] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGenerateUrl = async () => {
        setLoading(true);
        try {
            const requestBody = useCustomCode ? { longUrl, shortCode } : { longUrl };
            const endpoint = useCustomCode
                ? `${API_BASE_URL}/api/custom/shorten`
                : `${API_BASE_URL}/api/random/shorten`;
            const response = await axios.post(endpoint, requestBody);
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            console.error("Error generating short URL", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="p-6 bg-black shadow-lg rounded-lg max-w-md w-full border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-200">URL Shortener</h2>
                <label className="block mb-2">
                    <span className="text-gray-200 mb-4">Long URL:</span>
                    <input
                        type="text"
                        className="w-full p-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                </label>
                {useCustomCode && (
                    <label className="block mb-2">
                        <span className="text-gray-200">Custom Short Code:</span>
                        <input
                            type="text"
                            className="w-full p-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={shortCode}
                            onChange={(e) => setShortCode(e.target.value)}
                        />
                    </label>
                )}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={useCustomCode}
                        onChange={() => setUseCustomCode(!useCustomCode)}
                        className="mr-2"
                    />
                    <span className="text-gray-400">Use Custom Short Code</span>
                </div>
                <button
                    onClick={handleGenerateUrl}
                    className={`bg-blue-600 text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 transition-opacity duration-200 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Short URL"}
                </button>
                {shortUrl && (
                    <div className="mt-4 p-2 bg-gray-900 border border-gray-700 rounded text-center">
                        <strong className="text-gray-300">Short URL:</strong>{" "}
                        <a
                            href={shortUrl}
                            className="text-blue-400 hover:text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {shortUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomURL;
