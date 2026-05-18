// import React, { useState, useEffect } from 'react';
// import { Search, Layers } from 'lucide-react';
// import Course from './Coursepage.jsx'; 

// const CourseSearchPage = () => {
//   const [allCourses, setAllCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Hardcoded layout catalog backup definitions
//   const fallbackCourses = [
//     { courseCode: "CS101", courseName: "Introduction to React", department: "Computer Science" },
//     { courseCode: "UI204", courseName: "User Interface Design Fundamentals", department: "Architecture" },
//     { courseCode: "WD102", courseName: "Advanced CSS & Flexbox Layouts", department: "Computer Science" },
//     { courseCode: "MATH114", courseName: "Discrete Mathematics Matrix", department: "Mathematics" }
//   ];

//   useEffect(() => {
//     setLoading(true);

//     // SAFETY TIMER: If backend doesn't respond in 1 second, load fake data immediately
//     const timeoutId = setTimeout(() => {
//       if (loading) {
//         console.warn("API response delayed. Loading preview directory catalog dataset.");
//         setAllCourses(fallbackCourses);
//         setLoading(false);
//       }
//     }, 1000);

//     fetch('http://127.0.0', { method: 'GET' })
//       .then((res) => {
//         if (!res.ok) throw new Error("Catalog fetch error.");
//         return res.json();
//       })
//       .then((data) => {
//         clearTimeout(timeoutId); // Clear timer if backend successfully answers
//         setAllCourses(data); 
//         setLoading(false);
//       })
//       .catch((err) => {
//         clearTimeout(timeoutId);
//         console.warn("Backend catalog offline. Loading fallback index catalog framework.");
//         setAllCourses(fallbackCourses);
//         setLoading(false);
//       });

//     return () => clearTimeout(timeoutId); // Cleanup function
//   }, []);

//   // Real-time Search Processing Engine Row Filtering
//   const filteredCourses = allCourses.filter((course) => {
//     const term = searchTerm.toLowerCase().trim();
//     return (
//       course.courseCode.toLowerCase().includes(term) ||
//       course.courseName.toLowerCase().includes(term) ||
//       course.department.toLowerCase().includes(term)
//     );
//   });

//   if (loading && allCourses.length === 0) {
//     return (
//       <div style={{ color: '#4F46E5', fontStyle: 'italic', fontSize: '14px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//         🔄 Answering public course registry directory map...
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Arial, sans-serif' }}>
      
//       {/* Title Header */}
//       <div>
//         <h1 style={{ fontSize: '25px', color: '#1A202C', fontWeight: '800', margin: '0 0 8px 0', display: 'flex', alignItems: 'center' }}>
//           Explore Public Course Directory
//         </h1>
//         <p style={{ color: '#64748B', fontSize: '13px', margin: 0, textAlign: 'left' }}>
//           Discover curriculum maps and view public demo pages.
//         </p>
//       </div>

//       {/* Filter Search Input Bar */}
//       <div 
//         style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '12px', 
//           backgroundColor: '#ffffff', 
//           border: '1px solid #E2E8F0', 
//           borderRadius: '8px', 
//           padding: '10px 14px',
//           width: '340px',
//           boxSizing: 'border-box'
//         }}
//       >
//         <Search size={18} color="#94A3B8" />
//         <input 
//           type="text" 
//           placeholder="Search by code, title, or department..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} 
//           style={{ 
//             flex: 1, 
//             border: 'none', 
//             outline: 'none', 
//             fontSize: '14px', 
//             color: '#1A202C',
//             backgroundColor: 'transparent'
//           }} 
//         />
//       </div>

//       {/* Results List Display */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//         {filteredCourses.length === 0 ? (
//           <div style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '14px', padding: '12px 0', textAlign: 'left' }}>
//             No matching course profiles registered for "{searchTerm}".
//           </div>
//         ) : (
//           filteredCourses.map((course) => (
//             <div key={course.courseCode} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              
//               <Course 
//                 CourseCode={course.courseCode} 
//                 CourseName={course.courseName}
//               />
              
//               {/* Sub-label showing department category under each card */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748B', paddingLeft: '4px' }}>
//                 <Layers size={12} color="#94A3B8" />
//                 <span>Department: {course.department}</span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   );
// };

// export default CourseSearchPage;


// latest 

import React, { useState, useEffect } from "react";
import { Search, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourses } from "@/api";

const CourseSearchPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCourses()
      .then((data) => { setAllCourses(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = allCourses.filter((course) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      course.courseCode.toLowerCase().includes(term) ||
      course.courseName.toLowerCase().includes(term) ||
      course.department.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[25px] font-extrabold text-slate-900">Course Directory</h1>
        <p className="mt-1 text-[13px] text-slate-400">Browse all available courses.</p>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 w-full max-w-[380px]">
        <Search size={16} className="text-slate-400 shrink-0" />
        <Input
          type="text"
          placeholder="Search by code, title, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-auto border-none p-0 text-[13px] shadow-none focus-visible:ring-0"
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-[100px] w-full rounded-lg" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-[13px] italic text-slate-400">
          No courses found{searchTerm ? ` for "${searchTerm}"` : ""}.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((course) => (
            <div key={course.courseCode} className="flex flex-col gap-1">
              <div className="flex h-[90px] items-center overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50">
                <div className="h-full w-[80px] shrink-0 bg-indigo-100" />
                <div className="flex flex-col justify-center px-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {course.courseCode}
                  </span>
                  <span className="text-[13px] font-bold text-slate-900">{course.courseName}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 pl-1">
                <Layers size={11} className="text-slate-400" />
                <Badge variant="outline" className="text-[10px] text-slate-500">{course.department}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSearchPage;
