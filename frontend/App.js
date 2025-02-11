import React, { useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
    const [file, setFile] = useState(null);
    const [query, setQuery] = useState("");
    const [sqlQuery, setSqlQuery] = useState("");
    const [explanation, setExplanation] = useState("");
    const [previewData, setPreviewData] = useState(null);
    const [schema, setSchema] = useState([]);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setPreviewData(response.data.preview); // Store preview data
            setSchema(Object.keys(response.data.preview)); // Extract column names
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const generateSQLQuery = async () => {
        if (!previewData) {
            console.error("No preview data available!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/generate-query/", {
                preview: previewData,
                question: query,
            });
            setSqlQuery(response.data.sql_query);
        } catch (error) {
            console.error("Error generating query:", error);
        }
    };

    const explainSQLQuery = async () => {
        try {
            const response = await axios.post("http://localhost:8000/explain-query/", {
                query: sqlQuery,
            });
            setExplanation(response.data.explanation);
        } catch (error) {
            console.error("Error explaining query:", error);
        }
    };

    return (
        <div className="container"> 
            <h1>aSkQL</h1>

            <input type="file" onChange={handleFileUpload} />
            <button onClick={uploadFile}>Upload CSV</button>

            {schema.length > 0 && (
                <>
                    <h3>Schema:</h3>
                    <p>{schema.join(", ")}</p>
                </>
            )}

            {previewData && (
                <>
                    <h3>Preview (Top 5 Records):</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                {schema.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(previewData[schema[0]])?.map((index, rowIdx) => 
                                rowIdx < 5 && (
                                    <tr key={index}>
                                        {schema.map((col) => (
                                            <td key={col}>{previewData[col][index]}</td>
                                        ))}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </>
            )}

            <br />
            <input
                type="text"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={generateSQLQuery}>Generate SQL</button>

            {sqlQuery && (
                <>
                    <h3>Generated SQL Query:</h3>
                    <pre>{sqlQuery}</pre>
                    <button onClick={explainSQLQuery}>Explain Query</button>
                </>
            )}

            {explanation && (
                <>
                    <h3>SQL Query Explanation:</h3>
                    <p>{explanation}</p>
                </>
            )}
            <footer className="footer">
                © aSkQL 2025
            </footer>
        </div>
    );
}

export default App;
