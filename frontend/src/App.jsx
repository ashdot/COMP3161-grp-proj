// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import TestAPI from "@/pages/TestAPI";
// import AdminDashboard from "./pages/AdminDashboard";
// import LecturerDashboard from "./pages/LecturerDashboard";
// import StudentDashboard from "./pages/StudentDashboard";

// // Inside your router:


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/test" element={<TestAPI />} />
//          <Route path="/dashboard/admin" element={<AdminDashboard />}/>

//           <Route path="/dashboard/lecturer" element={<LecturerDashboard />}/>

//     <Route path="/dashboard/student" element={<StudentDashboard />}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }


// 3am
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { getStoredUser } from "@/api";

function ProtectedRoute({ children, role }) {
  const user = getStoredUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.accessLvl !== role) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/student" element={
          <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/dashboard/lecturer" element={
          <ProtectedRoute role="lecturer"><LecturerDashboard /></ProtectedRoute>
        } />
        <Route path="/dashboard/admin" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}