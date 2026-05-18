// import React, { useState, useEffect } from 'react';
// import Course from './Coursepage.jsx';
// import Sidebar from './Sidebar.jsx';        
// import CalendarPage from './Calendarpage.jsx'; 
// import Event from './Event.jsx';              
// import CourseDetailPage from './Coursedetailpage.jsx'; 
// import CourseSearchPage from './Coursesearchpage.jsx';

// const Dashboard = () => {
//   // Master app routing states
//   const [activeTab, setActiveTab] = useState('My Courses');
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   // 1. FIXED: State hooks must reside at the absolute top of the component function!
//   const [isGridView, setIsGridView] = useState(true); 

//   // Dynamic state hooks for your live backend timeline data parameters
//   const [eventsList, setEventsList] = useState([]);
//   const [loadingEvents, setLoadingEvents] = useState(true);

//   // Simulation Target parameters matching your COMP3161 requirements matrix
//   const currentUserID = 620148392; 

//   const coursesList = [
//     { id: 101, code: "CS101", name: "Introduction to React" },
//     { id: 102, code: "UI204", name: "User Interface Design Fundamentals" },
//     { id: 103, code: "WD102", name: "Advanced CSS & Flexbox Layouts" },
//     { id: 104, code: "JS301", name: "Asynchronous JavaScript & APIs" }
//   ];

//   // ========================================================
//   // ASYNC EVENTS FETCHER CONNECTED TO FLASK VIEW ROUTE
//   // ========================================================
//   useEffect(() => {
//     setLoadingEvents(true);
//     const credentials = btoa('testuser:password123');

//     fetch(`http://127.0.0{currentUserID}/calendar-events`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Basic ${credentials}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Could not download student event streams.");
//         return res.json();
//       })
//       .then((data) => {
//         setEventsList(data); 
//         setLoadingEvents(false);
//       })
//       .catch((err) => {
//         console.warn("Backend pipeline offline. Injecting fallback mock calendar logs.");
//         setEventsList([
//           { eventID: 1, eventTitle: "React Live Workshop", eventDate: "2026-05-18", courseName: "Introduction to React" },
//           { eventID: 2, eventTitle: "UI Portfolio Milestone Review", eventDate: "2026-05-20", courseName: "User Interface Design Fundamentals" },
//           { eventID: 3, eventTitle: "Flexbox Hackathon Deadline", eventDate: "2026-05-25", courseName: "Advanced CSS Layouts" }
//         ]);
//         setLoadingEvents(false);
//       });
//   }, [currentUserID]);

//   // ========================================================
//   // ROUTER CONTROLLER FOR THE CENTRAL PANEL VIEW
//   // ========================================================
//   const renderMainContent = () => {
//     if (activeTab === 'My Courses' && selectedCourse) {
//       return (
//         <CourseDetailPage 
//           course={selectedCourse} 
//           onBack={() => setSelectedCourse(null)} 
//         />
//       );
//     }

//     switch (activeTab.toLowerCase().trim()) {
//       case 'my courses':
//         return (
//           <>
//             {/* Header Container Section */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
//               <div>
//                 <h1 style={{ fontSize: '25px', color: '#1A202C', fontWeight: '800', marginBottom: '8px' }}>
//                   My Courses
//                 </h1>
//                 {/* Sub Navigation Row Links */}
//                 <div style={{ display: 'flex', gap: '20px', alignItems: 'center', cursor: 'pointer' }}>
//                   <span style={{ color: '#64748B' }}>All</span>
//                   <span style={{ color: '#4F46E5', fontWeight: 'bold' }}>In Progress</span>
//                   <span style={{ color: '#64748B' }}>Completed</span>
//                 </div>
//               </div>

//               {/* ========================================================
//                   GRID/LIST TOGGLE CONTROLS (Tied to state hooks)
//                  ======================================================== */}
//               <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//                 <button 
//                   onClick={() => setIsGridView(true)}
//                   style={{
//                     padding: '6px 12px',
//                     backgroundColor: isGridView ? '#EEF2F6' : 'transparent',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: 'bold',
//                     color: isGridView ? '#4F46E5' : '#94A3B8',
//                     transition: 'all 0.15s ease'
//                   }}
//                 >
//                   田
//                 </button>
//                 <button 
//                   onClick={() => setIsGridView(false)}
//                   style={{
//                     padding: '6px 12px',
//                     backgroundColor: !isGridView ? '#EEF2F6' : 'transparent',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: 'bold',
//                     color: !isGridView ? '#4F46E5' : '#94A3B8',
//                     transition: 'all 0.15s ease'
//                   }}
//                 >
//                   ☰
//                 </button>
//               </div>
//             </div>

//             {/* ========================================================
//                 FLEXIBLE DYNAMIC GRID CANVAS CONTAINER
//                ======================================================== */}
//             <div 
//               style={{ 
//                 display: isGridView ? 'grid' : 'flex',
//                 gridTemplateColumns: isGridView ? 'repeat(auto-fill, minmax(340px, 1fr))' : 'none',
//                 flexDirection: isGridView ? 'row' : 'column', 
//                 gap: '16px' 
//               }}
//             >
//               {coursesList.map((course) => (
//                 <Course 
//                   key={course.id} 
//                   CourseCode={course.code} 
//                   CourseName={course.name} 
//                   onSelect={() => setSelectedCourse({ CourseCode: course.code, CourseName: course.name })} 
//                 />
//               ))}
//             </div>
//           </>
//         );

//       case 'calendar':
//         return <CalendarPage />;

//       case 'course search':
//         return <CourseSearchPage />;

//       default:
//         return (
//           <div style={{ padding: '24px', color: '#EF4444', textAlign: 'center' }}>
//             <h3>View Interface Context Routing Error</h3>
//             <p style={{ color: '#64748B', fontSize: '13px', marginTop: '6px' }}>
//               Active text token inside registry is: <strong>"{activeTab}"</strong>
//             </p>
//           </div>
//         );
//     }
//   };

//   // ========================================================
//   // RENDER MASTER SCREEN CANVAS WRAPPER (Restored and fixed)
//   // ========================================================
//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'Arial, sans-serif' }}>
      
//       {/* Left Sidebar Ribbon */}
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Center Adaptive Workstation Dashboard */}
//       <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
//         {renderMainContent()} 
//       </div>
      
//       {/* Right Sidebar Timeline Menu Deck */}
//       <div style={{ width: '320px', padding: '32px', backgroundColor: '#ffffff', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '32px', boxSizing: 'border-box' }}>
        
//         <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', minHeight: '220px' }}>
//           <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>Calendar</h3>
//           <div style={{ color: '#94A3B8', fontSize: '13px', marginTop: '40px', fontStyle: 'italic' }}>[Dynamic Calendar Grid Module Placeholder]</div>
//         </div>

//         <div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//             <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Upcoming events</h3>
//           </div>
          
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//             {loadingEvents ? (
//               <div style={{ color: '#64748B', fontStyle: 'italic', fontSize: '13px' }}>🔄 Checking event logs...</div>
//             ) : (
//               eventsList.map((ev) => (
//                 <Event 
//                   key={ev.eventID} 
//                   EventTitle={ev.eventTitle} 
//                   EventDate={`${ev.eventDate} | ${ev.courseName || 'General Announcement'}`} 
//                 />
//               ))
//             )}
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;


// latest 
import React, { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import Sidebar from "./Sidebar";
import CalendarPage from "./CalendarPage";
import CourseDetailPage from "./Coursedetailpage";
import CourseSearchPage from "./Coursesearchpage";
import Event from "./Event";

import { getStoredUser, getStudentCourses, getStudentCalendarEvents } from "@/api";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("My Courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [eventsList, setEventsList] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const user = getStoredUser();

  // Fetch the student's enrolled courses from the real API
  useEffect(() => {
    if (!user) return;
    setLoadingCourses(true);
    getStudentCourses(user.userID)
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setLoadingCourses(false);
      })
      .catch(() => {
        setCourses([]);
        setLoadingCourses(false);
      });
  }, [user?.userID]);

  // Fetch the student's calendar events from the real API
  useEffect(() => {
    if (!user) return;
    setLoadingEvents(true);
    getStudentCalendarEvents(user.userID)
      .then((data) => {
        setEventsList(Array.isArray(data) ? data : []);
        setLoadingEvents(false);
      })
      .catch(() => {
        setEventsList([]);
        setLoadingEvents(false);
      });
  }, [user?.userID]);

  const renderMainContent = () => {
    if (activeTab === "My Courses" && selectedCourse) {
      return (
        <CourseDetailPage
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
        />
      );
    }

    switch (activeTab.toLowerCase().trim()) {
      case "my courses":
        return (
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[25px] font-extrabold text-slate-900">My Courses</h1>
                <div className="mt-1 flex gap-5 text-sm">
                  <span className="cursor-pointer font-bold text-indigo-600">In Progress</span>
                  <span className="cursor-pointer text-slate-400">All</span>
                  <span className="cursor-pointer text-slate-400">Completed</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={isGridView ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setIsGridView(true)}
                  className="h-8 w-8"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={!isGridView ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setIsGridView(false)}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Course grid/list */}
            {loadingCourses ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-[100px] w-full rounded-lg" />
                ))}
              </div>
            ) : courses.length === 0 ? (
              <p className="text-sm text-slate-400 italic">You are not enrolled in any courses yet.</p>
            ) : (
              <div
                className={
                  isGridView
                    ? "grid grid-cols-1 gap-4 md:grid-cols-2"
                    : "flex flex-col gap-3"
                }
              >
                {courses.map((course) => (
                  <div
                    key={course.courseCode}
                    onClick={() =>
                      setSelectedCourse({
                        CourseCode: course.courseCode,
                        CourseName: course.courseName,
                      })
                    }
                    className="flex h-[100px] cursor-pointer items-center overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50"
                  >
                    {/* Color block */}
                    <div className="h-full w-[85px] shrink-0 bg-indigo-100" />
                    <div className="flex flex-col justify-center px-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        {course.courseCode}
                      </span>
                      <span className="text-[14px] font-bold text-slate-900">
                        {course.courseName}
                      </span>
                      <Badge variant="outline" className="mt-1 w-fit text-[10px] text-slate-500">
                        {course.department}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "calendar":
        return <CalendarPage />;

      case "course search":
        return <CourseSearchPage />;

      default:
        return (
          <div className="text-center text-sm text-red-400">
            Unknown tab: <strong>{activeTab}</strong>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-6 p-8 box-border">
        {renderMainContent()}
      </div>

      {/* Right sidebar */}
      <div className="flex w-[300px] shrink-0 flex-col gap-8 border-l border-slate-200 bg-white p-8 box-border">
        {/* Mini calendar placeholder */}
        <div className="rounded-xl border border-slate-200 p-5 min-h-[200px]">
          <h3 className="mb-2 text-[15px] font-bold text-slate-800">Calendar</h3>
          <p className="text-[12px] italic text-slate-400 mt-8">Calendar widget coming soon.</p>
        </div>

        {/* Upcoming events */}
        <div>
          <h3 className="mb-4 text-[15px] font-extrabold text-slate-800">Upcoming Events</h3>
          <div className="flex flex-col gap-3">
            {loadingEvents ? (
              <>
                <Skeleton className="h-14 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
              </>
            ) : eventsList.length === 0 ? (
              <p className="text-[12px] italic text-slate-400">No upcoming events.</p>
            ) : (
              eventsList.slice(0, 5).map((ev) => (
                <Event
                  key={ev.eventID}
                  EventTitle={ev.eventTitle}
                  EventDate={`${ev.eventDate}${ev.courseName ? " · " + ev.courseName : ""}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;