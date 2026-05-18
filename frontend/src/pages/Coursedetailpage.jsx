// import React, { useState, useEffect } from 'react';
// import ForumSection from './Forumsection.jsx';
// import { 
//   FileText, 
//   Presentation, 
//   Link2, 
//   FileEdit, 
//   File, 
//   MessageSquare, 
//   ArrowLeft,
//   User,
//   GraduationCap,
//   CheckCircle,
//   Clock,
//   ChevronDown,   // Imported for expanded state
//   ChevronRight   // Imported for collapsed state
// } from 'lucide-react';

// const CourseDetailPage = ({ course, onBack }) => {
//   const [activeSubTab, setActiveSubTab] = useState('Course'); 
//   const [courseContent, setCourseContent] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1. STATE FOR TRACKING COLLAPSIBLE DROP DOWN SECTIONS
//   // Storing an array of open secIDs allows multiple sections to be open at once
//   const [openSections, setOpenSections] = useState([1]); // Default section 1 to open on mount

//   // 2. STATE FOR MEMBERS
//   const [members, setMembers] = useState([]);
//   const [loadingMembers, setLoadingMembers] = useState(false);

//   // Mock list of class participants as final backup fallback boundary
//   const participantsList = [
//     { id: 200109432, name: "Dr. Paul Campbell", role: "Lecturer", email: "paul.campbell@studex.edu", isMe: false },
//     { id: 620148392, name: "Ashley Chin", role: "Student", email: "ashley.chin@studex.com", isMe: true },
//     { id: 620098431, name: "John Doe", role: "Student", email: "john.doe@studex.com", isMe: false },
//     { id: 620155943, name: "Sarah Jenkins", role: "Student", email: "sarah.j@studex.com", isMe: false }
//   ];

//   // Mock array for gradebook overview
//   const gradesList = [
//     { id: 1, name: "Milestone Assignment 1: Dashboard UI", category: "Assignments", score: 92, maxScore: 100, weight: "15%", status: "Graded" },
//     { id: 2, name: "Week 2 Lab: Flexbox Alignment Grid", category: "Labs", score: 100, maxScore: 100, weight: "5%", status: "Graded" },
//     { id: 3, name: "Midterm Programming Project", category: "Projects", score: null, maxScore: 100, weight: "30%", status: "Pending" }
//   ];

//   // ========================================================
//   // ACCORDION DROPDOWN TOGGLE ENGINE
//   // ========================================================
//   const toggleSection = (secID) => {
//     if (openSections.includes(secID)) {
//       // If already open, filter it out to collapse it
//       setOpenSections(openSections.filter(id => id !== secID));
//     } else {
//       // If closed, append it to the tracking array to expand it
//       setOpenSections([...openSections, secID]);
//     }
//   };

//   // FETCH COURSE SYLLABUS CONTENT MAP
//   useEffect(() => {
//     const credentials = btoa('testuser:password123');
//     setLoading(true);
    
//     fetch(`http://127.0.0{course.CourseCode}/content`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Basic ${credentials}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Server error.");
//         return res.json();
//       })
//       .then((data) => {
//         setCourseContent(data);
//         // Automatically open all valid returned sections by default
//         setOpenSections(data.map(sec => sec.secID));
//         setLoading(false);
//       })
//       .catch((err) => {
//         // Fallback default structure layout
//         setCourseContent([
//           {
//             secID: 1,
//             secName: "Introduction & Logistics",
//             items: [
//               { secItemID: 501, title: "Course Syllabus & Assessment Guidelines", secBody: "Read through grading criteria.", itemtype: "file", dueDate: null },
//               { secItemID: 502, title: "Lecture 1: Layout Fundamentals", secBody: "Introduction to user interface design architectures.", itemtype: "slide", dueDate: null }
//             ]
//           },
//           {
//             secID: 2,
//             secName: "Week 1: Dynamic Flexbox Containers",
//             items: [
//               { secItemID: 503, title: "MDN Flexbox Guide Documentation", secBody: "External reference resource link.", itemtype: "link", dueDate: null },
//               { secItemID: 504, title: "Milestone Assignment 1: Dashboard UI", secBody: "Recreate the layout grid template.", itemtype: "assignment", dueDate: "2026-05-25" }
//             ]
//           }
//         ]);
//         setLoading(false);
//       });
//   }, [course.CourseCode]);

//   // FETCH FUNCTION FOR ROSTER MEMBERS
//   const fetchCourseMembers = () => {
//     setLoadingMembers(true);
//     const credentials = btoa('testuser:password123');

//     fetch(`http://127.0.0{course.CourseCode}/members`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Basic ${credentials}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Could not fetch course roster data.");
//         return res.json();
//       })
//       .then((data) => {
//         setMembers(data);
//         setLoadingMembers(false);
//       })
//       .catch((err) => {
//         console.warn("Backend offline. Loading fallback members list.");
//         setMembers([
//           { userID: 200109432, fname: "Dr. Paul", lname: "Campbell", memberRole: "lecturer", email: "paul.campbell@studex.edu" },
//           { userID: 620148392, fname: "Ashley", lname: "Chin", memberRole: "student", email: "ashley.chin@studex.com" },
//           { userID: 620098431, fname: "John", lname: "Doe", memberRole: "student", email: "john.doe@studex.com" }
//         ]);
//         setLoadingMembers(false);
//       });
//   };

//   useEffect(() => {
//     if (activeSubTab === 'Participants') {
//       fetchCourseMembers();
//     }
//   }, [activeSubTab, course.CourseCode]);

//     // 1. ADD STATE FOR DYNAMIC BACKEND GRADINGS
//   const [courseGrade, setCourseGrade] = useState(null);
//   const [loadingGrades, setLoadingGrades] = useState(false);

//   // Replace with your dynamic logged-in session userID variable later
//   const currentStudentID = 620148392; 

//   // 2. CREATE FETCH ENGINE FOR TARGET COURSE MARK
//   const fetchStudentCourseGrade = () => {
//     setLoadingGrades(true);
//     const credentials = btoa('testuser:password123'); // Basic Auth validation

//     fetch(`http://127.0.0{currentStudentID}/${course.CourseCode}/grades`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Basic ${credentials}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load gradebook overview matrix.");
//         return res.json();
//       })
//       .then((data) => {
//         // Your endpoint returns a list array of dictionaries: [{"grade": 92}] or [{"grade": null}]
//         if (data && data.length > 0) {
//           setCourseGrade(data[0].grade); 
//         } else {
//           setCourseGrade(null);
//         }
//         setLoadingGrades(false);
//       })
//       .catch((err) => {
//         console.warn("Backend offline. Injecting fallback mock course grade registry.");
//         setCourseGrade(94); // Fallback mock score so you can see your design
//         setLoadingGrades(false);
//       });
//   };

//   // 3. TRIGGER AUTOMATIC RE-FETCH WHEN USER SELECTS THE GRADES VIEW PILL
//   useEffect(() => {
//     if (activeSubTab === 'Grades') {
//       fetchStudentCourseGrade();
//     }
//   }, [activeSubTab, course.CourseCode]);


//   const getItemIcon = (type) => {
//     const iconSize = 18;
//     switch (type) {
//       case 'file':       return <FileText size={iconSize} color="#3B82F6" />;
//       case 'slide':      return <Presentation size={iconSize} color="#10B981" />;
//       case 'link':       return <Link2 size={iconSize} color="#F59E0B" />;
//       case 'assignment': return <FileEdit size={iconSize} color="#EF4444" />;
//       default:           return <File size={iconSize} color="#64748B" />;
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeSubTab) {
//       case 'Course':
//         if (loading) return <div style={{ color: '#64748B', fontStyle: 'italic' }}>🔄 Querying database content...</div>;
        
//         return (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
//             {/* Discussion Forums Banner Row */}
//             <div 
//               onClick={() => setActiveSubTab('Forum')} 
//               style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.15s ease' }}
//               onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4F46E5'}
//               onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
//             >
//               <div style={{ width: '32px', height: '32px', backgroundColor: '#E0E7FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <MessageSquare size={18} color="#4F46E5" />
//               </div>
//               <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1A202C' }}>Discussion Forums</span>
//             </div>

//             {/* Dynamic Content Sections Loop */}
//             {courseContent.map((section) => {
//               // Check if this specific section loop is currently expanded
//               const isSectionOpen = openSections.includes(section.secID);

//               return (
//                 <div key={section.secID} style={{ display: 'flex', flexDirection: 'column' }}>
//                   {/* Dynamic Clickable Header Row */}
//                   <h3 
//                     onClick={() => toggleSection(section.secID)} // Toggles state array on click boundary
//                     style={{ 
//                       fontSize: '15px', 
//                       fontWeight: '700', 
//                       margin: '0 0 12px 0', 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       gap: '8px', 
//                       color: '#1E293B',
//                       cursor: 'pointer',
//                       userSelect: 'none',
//                       width: 'fit-content'
//                     }}
//                   >
//                     {/* Render crisp dynamic direction arrow vectors based on status */}
//                     {isSectionOpen ? <ChevronDown size={18} color="#64748B" /> : <ChevronRight size={18} color="#64748B" />} 
//                     <span>{section.secName}</span>
//                   </h3>
                  
//                   {/* Smooth Collapsible Content Blocks Wrapper */}
//                   {isSectionOpen && (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#E2E8F0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
//                       {section.items.length === 0 ? (
//                         <div style={{ backgroundColor: '#ffffff', padding: '16px', color: '#94A3B8', fontSize: '13px', fontStyle: 'italic' }}>
//                           No files, links, or assignments uploaded to this section yet.
//                         </div>
//                       ) : (
//                         section.items.map((item) => (
//                           <div key={item.secItemID} style={{ backgroundColor: '#ffffff', minHeight: '60px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{getItemIcon(item.itemtype)}</div>
//                               <div style={{ textAlign: 'left' }}>
//                                 <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A202C' }}>{item.title}</div>
//                                 {item.secBody && <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{item.secBody}</div>}
//                               </div>
//                             </div>
//                             {item.dueDate && <span style={{ fontSize: '11px', backgroundColor: '#FEE2E2', color: '#EF4444', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>Due: {item.dueDate}</span>}
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         );

//       case 'Forum':
//         return <ForumSection courseCode={course.CourseCode} />;

//       case 'Participants':
//         if (loadingMembers) return <div style={{ color: '#64748B', fontStyle: 'italic' }}>🔄 Querying class roster...</div>;
//         return (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1A202C', margin: 0 }}>Enrolled Class Roster</h2>
//               <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{members.length} Total Users</span>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#E2E8F0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
//               {members.map((person) => {
//                 const isLecturer = person.memberRole?.toLowerCase() === 'lecturer';
//                 return (
//                   <div key={person.userID} style={{ backgroundColor: '#ffffff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                       <div style={{ width: '36px', height: '36px', backgroundColor: isLecturer ? '#EEF2F6' : '#E0E7FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         {isLecturer ? <GraduationCap size={18} color="#475569" /> : <User size={18} color="#4F46E5" />}
//                       </div>
//                       <div style={{ textAlign: 'left' }}>
//                         <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A202C' }}>{person.fname} {person.lname}</div>
//                         <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{person.email}</div>
//                       </div>
//                     </div>
//                     <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>ID: {person.userID}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );

//             case 'Grades':
//         if (loadingGrades) {
//           return <div style={{ color: '#64748B', fontStyle: 'italic', fontSize: '14px' }}> Answering grade records directory...</div>;
//         }

//         // Check if a grade was returned from the database query row
//         const isGraded = courseGrade !== null && courseGrade !== undefined;

//         return (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1A202C', margin: 0 }}>Course Performance Summary</h2>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#E2E8F0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
//               <div style={{ backgroundColor: '#ffffff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                   {/* Dynamic Color Indicators and Icons from Lucide */}
//                   <div style={{ width: '36px', height: '36px', backgroundColor: isGraded ? '#D1FAE5' : '#FEF3C7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     {isGraded ? <CheckCircle size={18} color="#059669" /> : <Clock size={18} color="#D97706" />}
//                   </div>
//                   <div style={{ textAlign: 'left' }}>
//                     <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A202C' }}>Final Course Assessment Grade</div>
//                     <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', display: 'flex', gap: '12px' }}>
//                       <span>Course: {course.CourseCode}</span>
//                       <span>Weight: 100% of Total</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Dynamic Score Panel Layout */}
//                 <div style={{ textAlign: 'right' }}>
//                   {isGraded ? (
//                     <div style={{ fontSize: '18px', fontWeight: '800', color: '#059669' }}>
//                       {courseGrade}% <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 'normal' }}>/ 100%</span>
//                     </div>
//                   ) : (
//                     <div style={{ fontSize: '13px', fontWeight: '600', color: '#D97706', backgroundColor: '#FEF3C7', padding: '4px 8px', borderRadius: '6px' }}>
//                       Pending Finalization
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );


//       default:
//         return <div>Subpage selection layout error.</div>;
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Arial, sans-serif' }}>
//       {/* Header controls layout */}
//       <div>
//         <button 
//           onClick={onBack} 
//           style={{ marginBottom: '12px', cursor: 'pointer', background: 'none', border: 'none', color: '#4F46E5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
//         >
//           <ArrowLeft size={16} /> Back to My Courses
//         </button>
        
//         <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1A202C', margin: '0 0 16px 0' }}>
//           {course.CourseCode} : {course.CourseName}
//         </h1>

//         <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
//           {['Course', 'Participants', 'Grades', 'Forum'].map((tab) => {
//             const isSelected = activeSubTab === tab;
//             return (
//               <span
//                 key={tab}
//                 onClick={() => setActiveSubTab(tab)}
//                 style={{ backgroundColor: isSelected ? '#4F46E5' : 'transparent', color: isSelected ? '#ffffff' : '#64748B', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.15s ease' }}
//               >
//                 {tab}
//               </span>
//             );
//           })}
//         </div>
//       </div>

//       <div>
//         {renderTabContent()}
//       </div>

//     </div>
//   );
// };

// export default CourseDetailPage;

// latest

import React, { useState, useEffect } from "react";
import {
  FileText, Presentation, Link2, FileEdit, File,
  MessageSquare, ArrowLeft, User, GraduationCap,
  CheckCircle, Clock, ChevronDown, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import ForumSection from "./Forumsection";
import { getStoredUser, getCourseContent, getCourseMembers, getStudentCourseGrade } from "@/api";

const itemIcons = {
  file: <File size={16} className="text-slate-500" />,
  slide: <Presentation size={16} className="text-indigo-500" />,
  link: <Link2 size={16} className="text-sky-500" />,
  assignment: <FileEdit size={16} className="text-orange-500" />,
};

const CourseDetailPage = ({ course, onBack }) => {
  const user = getStoredUser();

  const [activeSubTab, setActiveSubTab] = useState("Course");
  const [courseContent, setCourseContent] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [openSections, setOpenSections] = useState([]);

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  const [courseGrade, setCourseGrade] = useState(null);
  const [loadingGrades, setLoadingGrades] = useState(false);

  const toggleSection = (secID) => {
    setOpenSections((prev) =>
      prev.includes(secID) ? prev.filter((id) => id !== secID) : [...prev, secID]
    );
  };

  // Fetch course content
  useEffect(() => {
    setLoadingContent(true);
    getCourseContent(course.CourseCode)
      .then((data) => {
        setCourseContent(data);
        setOpenSections(data.map((s) => s.secID));
        setLoadingContent(false);
      })
      .catch(() => setLoadingContent(false));
  }, [course.CourseCode]);

  // Fetch members when tab selected
  useEffect(() => {
    if (activeSubTab !== "Participants") return;
    setLoadingMembers(true);
    getCourseMembers(course.CourseCode)
      .then((data) => { setMembers(data); setLoadingMembers(false); })
      .catch(() => setLoadingMembers(false));
  }, [activeSubTab, course.CourseCode]);

  // Fetch grade when tab selected
  useEffect(() => {
    if (activeSubTab !== "Grades" || !user) return;
    setLoadingGrades(true);
    getStudentCourseGrade(user.userID, course.CourseCode)
      .then((data) => {
        setCourseGrade(data?.[0]?.grade ?? null);
        setLoadingGrades(false);
      })
      .catch(() => setLoadingGrades(false));
  }, [activeSubTab, course.CourseCode]);

  const renderTabContent = () => {
    switch (activeSubTab) {
      case "Course":
        if (loadingContent) {
          return (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          );
        }
        if (courseContent.length === 0) {
          return <p className="text-sm italic text-slate-400">No content available for this course yet.</p>;
        }
        return (
          <div className="flex flex-col gap-4">
            {courseContent.map((section) => {
              const isOpen = openSections.includes(section.secID);
              return (
                <div key={section.secID} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.secID)}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-[14px] font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {isOpen ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                    {section.secName}
                  </button>

                  {isOpen && (
                    <>
                      <Separator />
                      {section.items.length === 0 ? (
                        <p className="px-4 py-3 text-[13px] italic text-slate-400">No items in this section yet.</p>
                      ) : (
                        section.items.map((item, idx) => (
                          <React.Fragment key={item.secItemID}>
                            {idx > 0 && <Separator />}
                            <div className="flex items-center justify-between px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
                                  {itemIcons[item.itemtype] || <FileText size={16} />}
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold text-slate-800">{item.title}</p>
                                  {item.secBody && <p className="text-[11px] text-slate-400">{item.secBody}</p>}
                                </div>
                              </div>
                              {item.dueDate && (
                                <Badge variant="destructive" className="text-[10px]">
                                  Due: {item.dueDate}
                                </Badge>
                              )}
                            </div>
                          </React.Fragment>
                        ))
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        );

      case "Forum":
        return <ForumSection courseCode={course.CourseCode} />;

      case "Participants":
        if (loadingMembers) {
          return (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
            </div>
          );
        }
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-extrabold text-slate-900">Class Roster</h2>
              <span className="text-[12px] text-slate-400">{members.length} members</span>
            </div>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              {members.map((person, idx) => {
                const isLecturer = person.memberRole?.toLowerCase() === "lecturer";
                return (
                  <React.Fragment key={person.userID}>
                    {idx > 0 && <Separator />}
                    <div className="flex items-center justify-between px-4 py-3 bg-white">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${isLecturer ? "bg-slate-100" : "bg-indigo-100"}`}>
                          {isLecturer
                            ? <GraduationCap size={16} className="text-slate-500" />
                            : <User size={16} className="text-indigo-500" />}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-slate-800">{person.fname} {person.lname}</p>
                          <p className="text-[11px] text-slate-400">{person.email}</p>
                        </div>
                      </div>
                      <Badge variant={isLecturer ? "secondary" : "outline"} className="text-[10px] capitalize">
                        {person.memberRole}
                      </Badge>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );

      case "Grades":
        if (loadingGrades) {
          return <Skeleton className="h-20 w-full rounded-xl" />;
        }
        const isGraded = courseGrade !== null && courseGrade !== undefined;
        return (
          <div className="flex flex-col gap-3">
            <h2 className="text-[15px] font-extrabold text-slate-900">Course Grade</h2>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isGraded ? "bg-emerald-50" : "bg-amber-50"}`}>
                  {isGraded
                    ? <CheckCircle size={18} className="text-emerald-500" />
                    : <Clock size={18} className="text-amber-500" />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">Final Course Grade</p>
                  <p className="text-[11px] text-slate-400">{course.CourseCode} · Weight: 100%</p>
                </div>
              </div>
              {isGraded ? (
                <span className="text-[20px] font-extrabold text-emerald-600">
                  {courseGrade}%
                </span>
              ) : (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                  Pending
                </Badge>
              )}
            </div>
          </div>
        );

      default:
        return <div className="text-sm text-red-400">Tab error.</div>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-2 gap-1 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={14} /> Back to My Courses
        </Button>
        <h1 className="text-[22px] font-extrabold text-slate-900">
          {course.CourseCode}: {course.CourseName}
        </h1>

        {/* Sub-tabs */}
        <div className="mt-3 flex gap-2">
          {["Course", "Participants", "Grades", "Forum"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-colors ${
                activeSubTab === tab
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default CourseDetailPage;