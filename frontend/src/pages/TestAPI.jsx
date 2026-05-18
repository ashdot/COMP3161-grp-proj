import { useEffect, useState } from "react";
import { getCourses, loginUser } from "@/api";

export default function TestAPI() {
  const [courses, setCourses] = useState([]);
  const [loginResult, setLoginResult] = useState(null);
  const [error, setError] = useState(null);

  // Test GET /courses on load
  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(() => setError("Could not reach Flask. Is it running?"));
  }, []);

  // Test POST /auth/login with a button
  async function handleLogin() {
    const result = await loginUser("admin@example.com", "yourpassword");
    setLoginResult(result);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>API Test Page</h1>

      <h2>GET /courses</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length === 0 ? (
        <p>No courses loaded (or still loading...)</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c.courseCode}>
              <strong>{c.courseCode}</strong> — {c.courseName} ({c.department})
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>POST /auth/login</h2>
      <button onClick={handleLogin}>Test Login</button>
      {loginResult && (
        <pre style={{ background: "#f0f0f0", padding: "1rem", marginTop: "1rem" }}>
          {JSON.stringify(loginResult, null, 2)}
        </pre>
      )}
    </div>
  );
}