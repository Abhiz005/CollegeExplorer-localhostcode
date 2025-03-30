import { useState } from "react";
import axios from "axios";
import Header from "./1Header";
import PipeAnimation from "./PipeAnimation";
export default function Scraper() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleScan = async () => {
    setLoading(true);
    setData([]);

    try {
      const response = await axios.get("http://localhost:4001/scraper");
      setData(response.data);
      localStorage.setItem("collegeData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="scraper-container">
        <div className="background-animation"></div>

        <button className="scan-button" onClick={handleScan} disabled={loading}>
          {loading ? "Scanning..." : "Scan"}
        </button>

        {loading && <div className="loading-text">Scanning data...</div>}

        {data.length > 0 && (
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>College Name</th>
                  <th>Fee Section</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.name}</td>
                    <td>
                      {entry.pdfLinks
                        ? entry.pdfLinks.map((pdf, idx) => (
                            <div key={idx}>
                              <strong>{pdf.courses.join(", ")}</strong>
                            </div>
                          ))
                        : "No Courses Found"}
                    </td>
                    <td>
                      {entry.pdfLinks
                        ? entry.pdfLinks.map((pdf, idx) => (
                            <div key={idx}>
                              {/* If the college is NM College, show URL instead of PDF */}
                              {entry.name ===
                              "Narsee Monjee College of Commerce and Economics" ? (
                                <a
                                  href={pdf.pdfLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View URL
                                </a>
                              ) : (
                                <a
                                  href={pdf.pdfLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View PDF
                                </a>
                              )}
                            </div>
                          ))
                        : "No Link Available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
