// // import Sidebar from "./sidebar";
// // import CalendarPage from "./calendarpage";
// // import StudentMainScreen from "./StudentMainscreen"

// // import Event from "./Event"

// // export default function StudentDashboard() {
// //   return (
// //     <div >
// //         <Sidebar></Sidebar>
// //         <StudentMainScreen></StudentMainScreen>
// //         <CalendarPage></CalendarPage>
// //         <Event></Event>

// //     </div>
// //   );
// // }

// // import StudentMainScreen from "./StudentMainscreen";

// // export default function StudentDashboard() {
// //   return <StudentMainScreen />;
// // }

// // 3am
// import React, { useState, useEffect } from "react";
// import { LayoutGrid, List, Calendar as CalIcon, ChevronDown, ChevronRight,
//   FileText, Presentation, Link2, FileEdit, File, ArrowLeft,
//   User, GraduationCap, CheckCircle, Clock, Search, Layers } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Separator } from "@/components/ui/separator";
// import Sidebar from "./Sidebar";
// import ForumSection from "./Forumsection";
// import SettingsPage from "./SettingsPage";
// import {
//   getStoredUser, getStudentCourses, getStudentCalendarEvents,
//   getCourseContent, getCourseMembers, getStudentCourseGrade,
//   getCourses, submitAssignment, getStudentGrades
// } from "@/api";

// const itemIcons = {
//   file: <File size={15} className="text-slate-500" />,
//   slide: <Presentation size={15} className="text-indigo-500" />,
//   link: <Link2 size={15} className="text-sky-500" />,
//   assignment: <FileEdit size={15} className="text-orange-500" />,
// };

// // ── Course Detail ─────────────────────────────────────────────────────────────
// function CourseDetail({ course, onBack }) {
//   const user = getStoredUser();
//   const [tab, setTab] = useState("Course");
//   const [content, setContent] = useState([]);
//   const [openSecs, setOpenSecs] = useState([]);
//   const [loadingContent, setLoadingContent] = useState(true);
//   const [members, setMembers] = useState([]);
//   const [loadingMembers, setLoadingMembers] = useState(false);
//   const [grade, setGrade] = useState(null);
//   const [loadingGrade, setLoadingGrade] = useState(false);
//   const [subText, setSubText] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [subMsg, setSubMsg] = useState(null);

//   useEffect(() => {
//     getCourseContent(course.courseCode).then(d => {
//       setContent(d); setOpenSecs(d.map(s => s.secID)); setLoadingContent(false);
//     }).catch(() => setLoadingContent(false));
//   }, [course.courseCode]);

//   useEffect(() => {
//     if (tab !== "Participants") return;
//     setLoadingMembers(true);
//     getCourseMembers(course.courseCode).then(d => { setMembers(d); setLoadingMembers(false); }).catch(() => setLoadingMembers(false));
//   }, [tab]);

//   useEffect(() => {
//     if (tab !== "Grades" || !user) return;
//     setLoadingGrade(true);
//     getStudentCourseGrade(user.userID, course.courseCode).then(d => {
//       setGrade(d?.[0]?.grade ?? null); setLoadingGrade(false);
//     }).catch(() => setLoadingGrade(false));
//   }, [tab]);

//   const toggleSec = id => setOpenSecs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

//   const handleSubmit = async (secItemID) => {
//     if (!subText.trim()) return;
//     setSubmitting(true);
//     const r = await submitAssignment(secItemID, subText);
//     setSubMsg(r.status === 201 ? "Submitted!" : r.error || "Error");
//     setSubmitting(false);
//     setTimeout(() => setSubMsg(null), 3000);
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <div>
//         <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-indigo-600 mb-2">
//           <ArrowLeft size={14} /> Back
//         </Button>
//         <h1 className="text-[22px] font-extrabold text-slate-900">{course.courseCode}: {course.courseName}</h1>
//         <div className="mt-3 flex gap-2 flex-wrap">
//           {["Course","Participants","Grades","Forum"].map(t => (
//             <button key={t} onClick={() => setTab(t)}
//               className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-colors ${tab===t ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700"}`}>
//               {t}
//             </button>
//           ))}
//         </div>
//       </div>

//       {tab === "Course" && (
//         loadingContent ? <div className="flex flex-col gap-3">{[1,2].map(i=><Skeleton key={i} className="h-12 w-full rounded-xl"/>)}</div> :
//         content.length === 0 ? <p className="text-sm italic text-slate-400">No content yet.</p> :
//         <div className="flex flex-col gap-3">
//           {content.map(sec => {
//             const open = openSecs.includes(sec.secID);
//             return (
//               <div key={sec.secID} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
//                 <button onClick={() => toggleSec(sec.secID)}
//                   className="flex w-full items-center gap-2 px-4 py-3 text-left text-[14px] font-bold text-slate-800 hover:bg-slate-50">
//                   {open ? <ChevronDown size={16}/> : <ChevronRight size={16}/>} {sec.secName}
//                 </button>
//                 {open && <>
//                   <Separator />
//                   {sec.items.length === 0
//                     ? <p className="px-4 py-3 text-[12px] italic text-slate-400">No items.</p>
//                     : sec.items.map((item, i) => (
//                       <React.Fragment key={item.secItemID}>
//                         {i > 0 && <Separator />}
//                         <div className="flex flex-col px-4 py-3 gap-2">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
//                                 {itemIcons[item.itemtype] || <FileText size={15}/>}
//                               </div>
//                               <div>
//                                 <p className="text-[13px] font-semibold text-slate-800">{item.title}</p>
//                                 {item.secBody && <p className="text-[11px] text-slate-400">{item.secBody}</p>}
//                               </div>
//                             </div>
//                             {item.dueDate && <Badge variant="destructive" className="text-[10px]">Due: {item.dueDate}</Badge>}
//                           </div>
//                           {item.itemtype === "assignment" && (
//                             <div className="flex gap-2 mt-1 pl-10">
//                               <Input placeholder="Your submission text..." value={subText}
//                                 onChange={e => setSubText(e.target.value)} className="h-8 text-[12px] flex-1"/>
//                               <Button size="sm" className="h-8 text-[11px] bg-indigo-600 hover:bg-indigo-700"
//                                 disabled={submitting} onClick={() => handleSubmit(item.secItemID)}>
//                                 Submit
//                               </Button>
//                             </div>
//                           )}
//                         </div>
//                       </React.Fragment>
//                     ))
//                   }
//                 </>}
//               </div>
//             );
//           })}
//           {subMsg && <p className="text-[12px] text-emerald-600 font-semibold">{subMsg}</p>}
//         </div>
//       )}

//       {tab === "Participants" && (
//         loadingMembers ? <Skeleton className="h-32 w-full rounded-xl"/> :
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center justify-between">
//             <h2 className="text-[15px] font-extrabold text-slate-900">Class Roster</h2>
//             <span className="text-[12px] text-slate-400">{members.length} members</span>
//           </div>
//           <div className="rounded-xl border border-slate-200 overflow-hidden">
//             {members.map((p, i) => {
//               const isL = p.memberRole?.toLowerCase() === "lecturer";
//               return <React.Fragment key={p.userID}>
//                 {i > 0 && <Separator />}
//                 <div className="flex items-center justify-between px-4 py-3 bg-white">
//                   <div className="flex items-center gap-3">
//                     <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isL?"bg-slate-100":"bg-indigo-100"}`}>
//                       {isL ? <GraduationCap size={15} className="text-slate-500"/> : <User size={15} className="text-indigo-500"/>}
//                     </div>
//                     <div>
//                       <p className="text-[13px] font-bold text-slate-800">{p.fname} {p.lname}</p>
//                       <p className="text-[11px] text-slate-400">{p.email}</p>
//                     </div>
//                   </div>
//                   <Badge variant={isL?"secondary":"outline"} className="text-[10px] capitalize">{p.memberRole}</Badge>
//                 </div>
//               </React.Fragment>;
//             })}
//           </div>
//         </div>
//       )}

//       {tab === "Grades" && (
//         loadingGrade ? <Skeleton className="h-16 w-full rounded-xl"/> :
//         <div className="flex flex-col gap-2">
//           <h2 className="text-[15px] font-extrabold text-slate-900">Course Grade</h2>
//           <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${grade!==null?"bg-emerald-50":"bg-amber-50"}`}>
//                 {grade!==null ? <CheckCircle size={18} className="text-emerald-500"/> : <Clock size={18} className="text-amber-500"/>}
//               </div>
//               <div>
//                 <p className="text-[13px] font-bold text-slate-800">Final Course Grade</p>
//                 <p className="text-[11px] text-slate-400">{course.courseCode}</p>
//               </div>
//             </div>
//             {grade !== null
//               ? <span className="text-[20px] font-extrabold text-emerald-600">{grade}%</span>
//               : <Badge variant="outline" className="text-amber-600 border-amber-300">Pending</Badge>}
//           </div>
//         </div>
//       )}

//       {tab === "Forum" && <ForumSection courseCode={course.courseCode}/>}
//     </div>
//   );
// }

// // ── Main Student Dashboard ────────────────────────────────────────────────────
// export default function StudentDashboard() {
//   const [activeTab, setActiveTab] = useState("My Courses");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [isGrid, setIsGrid] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [loadingEvents, setLoadingEvents] = useState(true);
//   const [allCourses, setAllCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loadingSearch, setLoadingSearch] = useState(true);
//   const [grades, setGrades] = useState([]);
//   const user = getStoredUser();

//   useEffect(() => {
//     if (!user) return;
//     getStudentCourses(user.userID).then(d => { setCourses(Array.isArray(d)?d:[]); setLoadingCourses(false); }).catch(()=>setLoadingCourses(false));
//     getStudentCalendarEvents(user.userID).then(d => { setEvents(Array.isArray(d)?d:[]); setLoadingEvents(false); }).catch(()=>setLoadingEvents(false));
//     getStudentGrades(user.userID).then(d => setGrades(Array.isArray(d)?d:[])).catch(()=>{});
//   }, [user?.userID]);

//   useEffect(() => {
//     if (activeTab !== "Course Search") return;
//     getCourses().then(d => { setAllCourses(Array.isArray(d)?d:[]); setLoadingSearch(false); }).catch(()=>setLoadingSearch(false));
//   }, [activeTab]);

//   const filtered = allCourses.filter(c => {
//     const t = searchTerm.toLowerCase();
//     return c.courseCode.toLowerCase().includes(t) || c.courseName.toLowerCase().includes(t) || c.department.toLowerCase().includes(t);
//   });

//   const renderContent = () => {
//     if (activeTab === "My Courses" && selectedCourse)
//       return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />;

//     switch (activeTab) {
//       case "My Courses":
//         return (
//           <div className="flex flex-col gap-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-[24px] font-extrabold text-slate-900">My Courses</h1>
//                 <p className="text-[13px] text-slate-400 mt-0.5">{courses.length} enrolled</p>
//               </div>
//               <div className="flex gap-1">
//                 <Button variant={isGrid?"secondary":"ghost"} size="icon" className="h-8 w-8" onClick={()=>setIsGrid(true)}><LayoutGrid className="h-4 w-4"/></Button>
//                 <Button variant={!isGrid?"secondary":"ghost"} size="icon" className="h-8 w-8" onClick={()=>setIsGrid(false)}><List className="h-4 w-4"/></Button>
//               </div>
//             </div>
//             {loadingCourses
//               ? <div className="grid grid-cols-2 gap-3">{[1,2,3,4].map(i=><Skeleton key={i} className="h-24 rounded-xl"/>)}</div>
//               : courses.length === 0
//               ? <p className="text-sm italic text-slate-400">Not enrolled in any courses.</p>
//               : <div className={isGrid?"grid grid-cols-1 gap-3 md:grid-cols-2":"flex flex-col gap-3"}>
//                   {courses.map(c => {
//                     const cGrade = grades.find(g => g.courseCode === c.courseCode);
//                     return (
//                       <div key={c.courseCode} onClick={() => setSelectedCourse(c)}
//                         className="flex h-[90px] cursor-pointer items-center overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-px hover:border-slate-300">
//                         <div className="h-full w-[80px] shrink-0 bg-indigo-100 flex items-center justify-center">
//                           <GraduationCap size={24} className="text-indigo-400"/>
//                         </div>
//                         <div className="flex flex-1 flex-col justify-center px-4">
//                           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.courseCode}</span>
//                           <span className="text-[13px] font-bold text-slate-900 leading-tight">{c.courseName}</span>
//                           <span className="text-[10px] text-slate-400">{c.department}</span>
//                         </div>
//                         {cGrade?.grade != null && (
//                           <div className="pr-4 text-right">
//                             <span className="text-[16px] font-extrabold text-emerald-600">{cGrade.grade}%</span>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//             }
//           </div>
//         );

//       case "Calendar":
//         return (
//           <div className="flex flex-col gap-5">
//             <h1 className="text-[24px] font-extrabold text-slate-900">My Calendar</h1>
//             {loadingEvents
//               ? <div className="flex flex-col gap-2">{[1,2,3].map(i=><Skeleton key={i} className="h-14 rounded-xl"/>)}</div>
//               : events.length === 0
//               ? <p className="text-sm italic text-slate-400">No upcoming events.</p>
//               : <div className="flex flex-col gap-2">
//                   {events.map(ev => (
//                     <div key={ev.eventID} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
//                         <CalIcon size={18} className="text-indigo-600"/>
//                       </div>
//                       <div>
//                         <p className="text-[13px] font-bold text-slate-800">{ev.eventTitle}</p>
//                         <p className="text-[11px] text-slate-400">{ev.eventDate}{ev.courseName ? " · " + ev.courseName : ""}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//             }
//           </div>
//         );

//       case "Course Search":
//         return (
//           <div className="flex flex-col gap-5">
//             <h1 className="text-[24px] font-extrabold text-slate-900">Course Directory</h1>
//             <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 max-w-[380px]">
//               <Search size={15} className="text-slate-400 shrink-0"/>
//               <Input placeholder="Search courses..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
//                 className="h-auto border-none p-0 text-[13px] shadow-none focus-visible:ring-0"/>
//             </div>
//             {loadingSearch
//               ? <div className="flex flex-col gap-2">{[1,2,3].map(i=><Skeleton key={i} className="h-20 rounded-xl"/>)}</div>
//               : <div className="flex flex-col gap-2">
//                   {filtered.map(c => (
//                     <div key={c.courseCode} className="flex h-[80px] items-center overflow-hidden rounded-xl border border-slate-100 bg-white">
//                       <div className="h-full w-[70px] shrink-0 bg-slate-100"/>
//                       <div className="flex flex-col justify-center px-4">
//                         <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.courseCode}</span>
//                         <span className="text-[13px] font-bold text-slate-800">{c.courseName}</span>
//                         <div className="flex items-center gap-1 mt-0.5">
//                           <Layers size={10} className="text-slate-300"/>
//                           <span className="text-[10px] text-slate-400">{c.department}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//             }
//           </div>
//         );

//       case "Settings":
//         return <SettingsPage />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar activeTab={activeTab} setActiveTab={t => { setActiveTab(t); setSelectedCourse(null); }} />
//       <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 box-border">{renderContent()}</div>
//       {/* Right sidebar - upcoming events */}
//       <div className="hidden xl:flex w-[280px] shrink-0 flex-col gap-6 border-l border-slate-200 bg-white p-6 box-border">
//         <div>
//           <h3 className="text-[14px] font-extrabold text-slate-800 mb-3">Upcoming Events</h3>
//           {loadingEvents ? <Skeleton className="h-12 w-full rounded-xl"/> :
//             events.length === 0 ? <p className="text-[11px] italic text-slate-400">None.</p> :
//             <div className="flex flex-col gap-2">
//               {events.slice(0,5).map(ev => (
//                 <div key={ev.eventID} className="rounded-lg bg-slate-50 px-3 py-2">
//                   <p className="text-[12px] font-bold text-slate-700">{ev.eventTitle}</p>
//                   <p className="text-[10px] text-slate-400">{ev.eventDate}</p>
//                 </div>
//               ))}
//             </div>
//           }
//         </div>
//         <Separator/>
//         <div>
//           <h3 className="text-[14px] font-extrabold text-slate-800 mb-3">My Grades</h3>
//           {grades.length === 0 ? <p className="text-[11px] italic text-slate-400">No grades yet.</p> :
//             <div className="flex flex-col gap-2">
//               {grades.slice(0,5).map((g,i) => (
//                 <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
//                   <span className="text-[11px] font-semibold text-slate-600">{g.courseCode}</span>
//                   <span className={`text-[12px] font-extrabold ${g.grade!=null?"text-emerald-600":"text-amber-500"}`}>
//                     {g.grade != null ? g.grade+"%" : "—"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           }
//         </div>
//       </div>
//     </div>
//   );
// }

// 11am
import React, { useState, useEffect } from "react";
import {
  LayoutGrid, List, ChevronDown, ChevronRight, ArrowLeft,
  File, Presentation, Link2, FileEdit, User, GraduationCap,
  CheckCircle, Clock, Search, Layers, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Sidebar from "./Sidebar";
import ForumSection from "./Forumsection";
import SettingsPage from "./SettingsPage";
import CalendarPage from "./CalendarPage";
import MiniCalendar from "./MiniCalendar";
import {
  getStoredUser, getStudentCourses, getStudentCalendarEvents,
  getCourseContent, getCourseMembers, getStudentCourseGrade,
  getCourses, submitAssignment, getStudentGrades
} from "@/api";

const itemIcons = {
  file:       <File size={15} className="text-slate-500"/>,
  slide:      <Presentation size={15} className="text-indigo-500"/>,
  link:       <Link2 size={15} className="text-sky-500"/>,
  assignment: <FileEdit size={15} className="text-orange-500"/>,
};

// ── Right sidebar (mini-cal + upcoming events) — used on My Courses & Course Detail ─
function RightSidebar({ events, loadingEvents }) {
  return (
    <div className="hidden xl:flex w-[260px] shrink-0 flex-col gap-5 border-l border-slate-200 bg-white px-5 py-6 box-border">
      {/* Mini calendar */}
      <MiniCalendar events={events}/>

      {/* Upcoming events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-extrabold text-slate-800">Upcoming events</span>
          <button className="text-[11px] font-semibold text-indigo-500 hover:text-indigo-700">See all</button>
        </div>
        {loadingEvents
          ? <div className="flex flex-col gap-2">{[1,2,3].map(i=><Skeleton key={i} className="h-12 rounded-xl"/>)}</div>
          : events.length === 0
          ? <p className="text-[11px] italic text-slate-400">No upcoming events.</p>
          : <div className="flex flex-col gap-2">
              {events.slice(0, 5).map(ev => (
                <div key={ev.eventID} className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2.5">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-slate-500"/>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-slate-800 truncate">{ev.eventTitle}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {ev.eventDate}{ev.courseName ? " | " + ev.courseName : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}

// ── Course Detail ──────────────────────────────────────────────────────────────
function CourseDetail({ course, onBack, events, loadingEvents }) {
  const user = getStoredUser();
  const [tab, setTab]               = useState("Course");
  const [content, setContent]       = useState([]);
  const [openSecs, setOpenSecs]     = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [members, setMembers]       = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [grade, setGrade]           = useState(null);
  const [loadingGrade, setLoadingGrade]   = useState(false);
  const [subTexts, setSubTexts]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [subMsg, setSubMsg]         = useState(null);

  useEffect(() => {
    getCourseContent(course.courseCode).then(d => {
      setContent(d); setOpenSecs(d.map(s => s.secID)); setLoadingContent(false);
    }).catch(() => setLoadingContent(false));
  }, [course.courseCode]);

  useEffect(() => {
    if (tab !== "Participants") return;
    setLoadingMembers(true);
    getCourseMembers(course.courseCode)
      .then(d => { setMembers(d); setLoadingMembers(false); })
      .catch(() => setLoadingMembers(false));
  }, [tab]);

  useEffect(() => {
    if (tab !== "Grades" || !user) return;
    setLoadingGrade(true);
    getStudentCourseGrade(user.userID, course.courseCode)
      .then(d => { setGrade(d?.[0]?.grade ?? null); setLoadingGrade(false); })
      .catch(() => setLoadingGrade(false));
  }, [tab]);

  const toggleSec = id =>
    setOpenSecs(p => p.includes(id) ? p.filter(x => x!==id) : [...p, id]);

  const handleSubmit = async (secItemID) => {
    const txt = subTexts[secItemID] || "";
    if (!txt.trim()) return;
    setSubmitting(true);
    const r = await submitAssignment(secItemID, txt);
    setSubMsg(r.status === 201 ? "Submitted!" : r.error || "Error");
    setSubmitting(false);
    setTimeout(() => setSubMsg(null), 3000);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main column */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-8 box-border">
        {/* Header */}
        <div>
          <h1 className="text-[22px] font-extrabold text-slate-900 mb-3">
            {course.courseCode} : {course.courseName}
          </h1>
          {/* Tabs — pill style matching design */}
          <div className="flex gap-2">
            {["Course","Participants","Grades"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1 text-[12px] font-bold transition-colors
                  ${tab===t ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700 border border-slate-200"}
                `}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── COURSE TAB ── */}
        {tab === "Course" && (
          <div className="flex flex-col gap-3">
            {/* Discussion Forum link row */}
            <button
              onClick={() => setTab("Forum")}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                <GraduationCap size={16} className="text-slate-600"/>
              </div>
              <span className="text-[13px] font-semibold text-slate-700">Discussion Forum</span>
            </button>

            {/* Sections */}
            {loadingContent
              ? <div className="flex flex-col gap-2">{[1,2].map(i=><Skeleton key={i} className="h-10 rounded-xl"/>)}</div>
              : content.length === 0
              ? <p className="text-sm italic text-slate-400">No content yet.</p>
              : content.map(sec => {
                  const open = openSecs.includes(sec.secID);
                  return (
                    <div key={sec.secID} className="flex flex-col">
                      {/* Section toggle */}
                      <button onClick={() => toggleSec(sec.secID)}
                        className="flex items-center gap-2 py-2 text-[13px] font-bold text-slate-800 hover:text-indigo-600 transition-colors text-left">
                        {open ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                        {sec.secName}
                      </button>

                      {/* Section items */}
                      {open && (
                        <div className="flex flex-col gap-1 pl-2">
                          {sec.items.length === 0
                            ? <p className="text-[12px] italic text-slate-400 py-1 pl-2">No items.</p>
                            : sec.items.map(item => (
                              <div key={item.secItemID}
                                className="flex flex-col rounded-lg border border-slate-200 bg-white px-4 py-3 gap-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
                                      {itemIcons[item.itemtype] || <FileEdit size={14}/>}
                                    </div>
                                    <div>
                                      <p className="text-[13px] font-semibold text-slate-800">{item.title}</p>
                                      {item.secBody && <p className="text-[11px] text-slate-400">{item.secBody}</p>}
                                    </div>
                                  </div>
                                  {item.dueDate && (
                                    <Badge variant="destructive" className="text-[10px]">Due: {item.dueDate}</Badge>
                                  )}
                                </div>
                                {item.itemtype === "assignment" && (
                                  <div className="flex gap-2 pl-10">
                                    <Input
                                      placeholder="Your answer..."
                                      value={subTexts[item.secItemID] || ""}
                                      onChange={e => setSubTexts(p => ({...p, [item.secItemID]: e.target.value}))}
                                      className="h-8 text-[12px] flex-1"
                                    />
                                    <Button size="sm" className="h-8 text-[11px] bg-indigo-600 hover:bg-indigo-700"
                                      disabled={submitting} onClick={() => handleSubmit(item.secItemID)}>
                                      Submit
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  );
                })
            }
            {subMsg && <p className="text-[12px] font-semibold text-emerald-600">{subMsg}</p>}
          </div>
        )}

        {/* ── FORUM TAB (inline) ── */}
        {tab === "Forum" && (
          <div className="flex flex-col gap-3">
            <Button variant="ghost" size="sm" onClick={() => setTab("Course")} className="w-fit gap-1 text-indigo-600">
              <ArrowLeft size={13}/> Back to Course
            </Button>
            <ForumSection courseCode={course.courseCode}/>
          </div>
        )}

        {/* ── PARTICIPANTS TAB ── */}
        {tab === "Participants" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-extrabold text-slate-900">Class Roster</h2>
              <span className="text-[12px] text-slate-400">{members.length} members</span>
            </div>
            {loadingMembers ? <Skeleton className="h-32 w-full rounded-xl"/> :
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                {members.map((p, i) => {
                  const isL = p.memberRole?.toLowerCase() === "lecturer";
                  return <React.Fragment key={p.userID}>
                    {i > 0 && <Separator/>}
                    <div className="flex items-center justify-between px-4 py-3 bg-white">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isL?"bg-slate-100":"bg-indigo-100"}`}>
                          {isL ? <GraduationCap size={15} className="text-slate-500"/> : <User size={15} className="text-indigo-500"/>}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-slate-800">{p.fname} {p.lname}</p>
                          <p className="text-[11px] text-slate-400">{p.email}</p>
                        </div>
                      </div>
                      <Badge variant={isL?"secondary":"outline"} className="text-[10px] capitalize">{p.memberRole}</Badge>
                    </div>
                  </React.Fragment>;
                })}
              </div>
            }
          </div>
        )}

        {/* ── GRADES TAB ── */}
        {tab === "Grades" && (
          loadingGrade ? <Skeleton className="h-16 w-full rounded-xl"/> :
          <div className="flex flex-col gap-2">
            <h2 className="text-[15px] font-extrabold text-slate-900">Course Grade</h2>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${grade!==null?"bg-emerald-50":"bg-amber-50"}`}>
                  {grade!==null ? <CheckCircle size={18} className="text-emerald-500"/> : <Clock size={18} className="text-amber-500"/>}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">Final Course Grade</p>
                  <p className="text-[11px] text-slate-400">{course.courseCode}</p>
                </div>
              </div>
              {grade !== null
                ? <span className="text-[20px] font-extrabold text-emerald-600">{grade}%</span>
                : <Badge variant="outline" className="text-amber-600 border-amber-300">Pending</Badge>
              }
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <RightSidebar events={events} loadingEvents={loadingEvents}/>
    </div>
  );
}

// ── Main Student Dashboard ─────────────────────────────────────────────────────
export default function StudentDashboard() {
  const [activeTab, setActiveTab]     = useState("My Courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isGrid, setIsGrid]           = useState(true);
  const [courses, setCourses]         = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [events, setEvents]           = useState([]);
  const [loadingEvents, setLoadingEvents]   = useState(true);
  const [allCourses, setAllCourses]   = useState([]);
  const [searchTerm, setSearchTerm]   = useState("");
  const [loadingSearch, setLoadingSearch]   = useState(false);
  const [grades, setGrades]           = useState([]);

  const user = getStoredUser();

  useEffect(() => {
    if (!user) return;
    getStudentCourses(user.userID)
      .then(d => { setCourses(Array.isArray(d)?d:[]); setLoadingCourses(false); })
      .catch(() => setLoadingCourses(false));
    getStudentCalendarEvents(user.userID)
      .then(d => { setEvents(Array.isArray(d)?d:[]); setLoadingEvents(false); })
      .catch(() => setLoadingEvents(false));
    getStudentGrades(user.userID)
      .then(d => setGrades(Array.isArray(d)?d:[]))
      .catch(() => {});
  }, [user?.userID]);

  useEffect(() => {
    if (activeTab !== "Course Search") return;
    setLoadingSearch(true);
    getCourses()
      .then(d => { setAllCourses(Array.isArray(d)?d:[]); setLoadingSearch(false); })
      .catch(() => setLoadingSearch(false));
  }, [activeTab]);

  const filtered = allCourses.filter(c => {
    const t = searchTerm.toLowerCase();
    return (
      c.courseCode.toLowerCase().includes(t) ||
      c.courseName.toLowerCase().includes(t) ||
      (c.department||"").toLowerCase().includes(t)
    );
  });

  // Course detail page (images 2)
  if ((activeTab === "My Courses") && selectedCourse) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar activeTab={activeTab} setActiveTab={t => { setActiveTab(t); setSelectedCourse(null); }}/>
        <CourseDetail
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          events={events}
          loadingEvents={loadingEvents}
        />
      </div>
    );
  }

  // Calendar full page (image 3 & 4)
  if (activeTab === "Calendar") {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar activeTab={activeTab} setActiveTab={t => { setActiveTab(t); setSelectedCourse(null); }}/>
        <div className="flex flex-1 overflow-hidden">
          <CalendarPage/>
        </div>
      </div>
    );
  }

  // Settings
  if (activeTab === "Settings") {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar activeTab={activeTab} setActiveTab={t => { setActiveTab(t); setSelectedCourse(null); }}/>
        <div className="flex flex-1 p-8"><SettingsPage/></div>
      </div>
    );
  }

  // ── My Courses & Course Search (image 1 layout) ────────────────────────────
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeTab={activeTab} setActiveTab={t => { setActiveTab(t); setSelectedCourse(null); }}/>

      {/* Centre main panel */}
      <div className="flex flex-1 flex-col overflow-y-auto p-8 box-border">

        {activeTab === "My Courses" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-[22px] font-extrabold text-slate-900">My Courses</h1>
                <div className="mt-1 flex gap-5 text-[12px]">
                  <span className="cursor-pointer text-slate-400">All</span>
                  <span className="cursor-pointer font-bold text-indigo-600 border-b-2 border-indigo-600 pb-0.5">In Progress</span>
                  <span className="cursor-pointer text-slate-400">Completed</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant={isGrid?"secondary":"ghost"} size="icon" className="h-7 w-7" onClick={() => setIsGrid(true)}>
                  <LayoutGrid className="h-3.5 w-3.5"/>
                </Button>
                <Button variant={!isGrid?"secondary":"ghost"} size="icon" className="h-7 w-7" onClick={() => setIsGrid(false)}>
                  <List className="h-3.5 w-3.5"/>
                </Button>
              </div>
            </div>

            {/* Course list — matches design: left colour block + course code + name */}
            {loadingCourses
              ? <div className="flex flex-col gap-3">{[1,2,3,4].map(i=><Skeleton key={i} className="h-[72px] rounded-xl"/>)}</div>
              : courses.length === 0
              ? <p className="text-sm italic text-slate-400">Not enrolled in any courses.</p>
              : <div className={isGrid ? "grid grid-cols-1 gap-3 lg:grid-cols-2" : "flex flex-col gap-3"}>
                  {courses.map(c => {
                    const cGrade = grades.find(g => g.courseCode === c.courseCode);
                    return (
                      <div key={c.courseCode} onClick={() => setSelectedCourse(c)}
                        className="flex h-[72px] cursor-pointer items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-px hover:border-slate-300 hover:shadow-md">
                        {/* Left colour strip */}
                        <div className="h-full w-[70px] shrink-0 bg-slate-200"/>
                        <div className="flex flex-1 flex-col justify-center px-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.courseCode}</span>
                          <span className="text-[14px] font-extrabold text-slate-900 leading-tight">{c.courseName}</span>
                        </div>
                        {cGrade?.grade != null && (
                          <div className="pr-4 text-right">
                            <span className="text-[15px] font-extrabold text-emerald-600">{cGrade.grade}%</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
            }
          </>
        )}

        {activeTab === "Course Search" && (
          <>
            <h1 className="text-[22px] font-extrabold text-slate-900 mb-4">Course Directory</h1>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 max-w-[380px] mb-5">
              <Search size={14} className="text-slate-400 shrink-0"/>
              <Input placeholder="Search by code, title, or department..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-auto border-none p-0 text-[13px] shadow-none focus-visible:ring-0"/>
            </div>
            {loadingSearch
              ? <div className="flex flex-col gap-2">{[1,2,3].map(i=><Skeleton key={i} className="h-[72px] rounded-xl"/>)}</div>
              : <div className="flex flex-col gap-2">
                  {filtered.map(c => (
                    <div key={c.courseCode}
                      className="flex h-[72px] items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <div className="h-full w-[70px] shrink-0 bg-slate-200"/>
                      <div className="flex flex-col justify-center px-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.courseCode}</span>
                        <span className="text-[13px] font-extrabold text-slate-900">{c.courseName}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Layers size={10} className="text-slate-300"/>
                          <span className="text-[10px] text-slate-400">{c.department}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </>
        )}
      </div>

      {/* Right sidebar (image 1) */}
      <RightSidebar events={events} loadingEvents={loadingEvents}/>
    </div>
  );
}