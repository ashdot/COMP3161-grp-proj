// // import React, { useState, useEffect } from 'react';
// // import { MessageSquare, Send, ArrowLeft, MessageCircle, CornerDownRight } from 'lucide-react';

// // const ForumSection = ({ courseCode }) => {
// //   // Navigation State Controllers
// //   const [forums, setForums] = useState([]);
// //   const [selectedForum, setSelectedForum] = useState(null); 
// //   const [threads, setThreads] = useState([]);
  
// //   // 1. NEW STATE: Tracks a specific open thread for viewing/submitting comments
// //   const [selectedThread, setSelectedThread] = useState(null);
// //   const [replies, setReplies] = useState([]);

// //   // App Input Composer States
// //   const [loading, setLoading] = useState(true);
// //   const [newTopic, setNewTopic] = useState('');
// //   const [newBody, setNewBody] = useState('');
// //   const [replyBody, setReplyBody] = useState('');

// //   const getAuthHeaders = () => {
// //     const credentials = btoa('testuser:password123'); 
// //     return {
// //       'Authorization': `Basic ${credentials}`,
// //       'Content-Type': 'application/json'
// //     };
// //   };

// //   // FETCH LEVEL A: GET ALL FORUMS FOR THE COURSE
// //   useEffect(() => {
// //     setLoading(true);
// //     fetch(`http://127.0.0{courseCode}/forums`, { headers: getAuthHeaders() })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Could not load course forums.");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setForums(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setForums([
// //           { dfID: 1, dfname: "General Announcements", courseCode },
// //           { dfID: 2, dfname: "Assignment & Project Q&A", courseCode }
// //         ]);
// //         setLoading(false);
// //       });
// //   }, [courseCode]);

// //   // FETCH LEVEL B: GET ALL THREADS INSIDE A CHOSEN FORUM
// //   const fetchForumThreads = (dfID) => {
// //     setLoading(true);
// //     fetch(`http://127.0.0{dfID}/threads`, { headers: getAuthHeaders() })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Could not load forum threads.");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setThreads(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setThreads([
// //           { dtID: 10, topic: "Welcome!", threadbody: "Please read the guidelines pinned here.", fname: "Dr. Paul", lname: "Campbell", date_created: "2026-05-14", replyCount: 2 },
// //           { dtID: 20, topic: "Vite App Error", threadbody: "Is anyone else getting a postcss ENOENT error on compile?", fname: "Ashley", lname: "Chin", date_created: "2026-05-16", replyCount: 0 }
// //         ]);
// //         setLoading(false);
// //       });
// //   };

// //   // FETCH LEVEL C: FETCH NESTED REPLIES FOR ONE TARGET THREAD
// //   const fetchThreadReplies = (dtID) => {
// //     // Hits your matching GET /threads/{dtID} endpoint route handler parameters matrix
// //     fetch(`http://127.0.0{dtID}`, { headers: getAuthHeaders() })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Could not fetch nested thread comments.");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         // Your endpoint returns a completely serialized post array structure hierarchy tree
// //         setReplies(data.replies || []); 
// //       })
// //       .catch((err) => {
// //         console.warn("Backend offline. Injecting mock comments list data logs.");
// //         // Static backup presentation comments display layer
// //         if (dtID === 10) {
// //           setReplies([
// //             { dtID: 11, parentpostID: 10, fname: "Sarah", lname: "Jenkins", threadbody: "Thanks Professor! Ready for class.", date_created: "2026-05-14" },
// //             { dtID: 12, parentpostID: 10, fname: "John", lname: "Doe", threadbody: "Is the textbook required for week 1?", date_created: "2026-05-15" }
// //           ]);
// //         } else {
// //           setReplies([]);
// //         }
// //       });
// //   };

// //   const handleSelectThread = (thread) => {
// //     setSelectedThread(thread);
// //     fetchThreadReplies(thread.dtID);
// //   };

// //   // ACTION: SUBMIT NEW TOP LEVEL THREAD
// //   const handleCreateThread = (e) => {
// //     e.preventDefault();
// //     if (!newBody.trim()) return;

// //     fetch(`http://127.0.0{selectedForum.dfID}/threads`, {
// //       method: 'POST',
// //       headers: getAuthHeaders(),
// //       body: JSON.stringify({ topic: newTopic || null, threadbody: newBody })
// //     })
// //       .then(() => {
// //         setNewTopic('');
// //         setNewBody('');
// //         fetchForumThreads(selectedForum.dfID);
// //       })
// //       .catch(() => {
// //         const mockNewPost = { dtID: Date.now(), topic: newTopic || "Untitled", threadbody: newBody, fname: "Ashley", lname: "Chin", date_created: "2026-05-16", replyCount: 0 };
// //         setThreads([mockNewPost, ...threads]);
// //         setNewTopic('');
// //         setNewBody('');
// //       });
// //   };

// //   // ACTION: POST A REPLY COMMENT TO AN ACTIVE THREAD (Matches your exact route)
// //   const handleCreateReply = (e) => {
// //     e.preventDefault();
// //     if (!replyBody.trim()) return;

// //     // Hits your exact POST /threads/{dtID}/replies configuration blueprint layout parameters
// //     fetch(`http://127.0.0{selectedThread.dtID}/replies`, {
// //       method: 'POST',
// //       headers: getAuthHeaders(),
// //       body: JSON.stringify({
// //         threadbody: replyBody,
// //         topic: null // Null defaults per schema matching constraints setup rules
// //       })
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to post reply.");
// //         return res.json();
// //       })
// //       .then(() => {
// //         setReplyBody('');
// //         fetchThreadReplies(selectedThread.dtID); // Refreshes comments feed live
// //       })
// //       .catch((err) => {
// //         // Fallback simulation injection if development server is disconnected
// //         const mockNewReply = {
// //           dtID: Date.now(),
// //           parentpostID: selectedThread.dtID,
// //           fname: "Ashley",
// //           lname: "Chin",
// //           threadbody: replyBody,
// //           date_created: "2026-05-16"
// //         };
// //         setReplies([...replies, mockNewReply]);
// //         setReplyBody('');
// //       });
// //   };

// //   if (loading && forums.length === 0) return <p style={{ color: '#64748B' }}>Loading forums...</p>;

// //   return (
// //     <div style={{ fontFamily: "var(--sans)", color: "var(--text-h)" }}>
      
// //       {/* -------------------------------------------------------------
// //           VIEW A: MAIN FORUMS LAYER
// //          ------------------------------------------------------------- */}
// //       {!selectedForum && !selectedThread && (
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
// //           <h2 style={{ fontSize: '16px', fontWeight: '800' }}>Course Boards</h2>
// //           {forums.map((forum) => (
// //             <div
// //               key={forum.dfID}
// //               onClick={() => { setSelectedForum(forum); fetchForumThreads(forum.dfID); }}
// //               style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', cursor: 'pointer' }}
// //             >
// //               <div style={{ width: '40px', height: '40px', backgroundColor: '#E0E7FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                 <MessageSquare size={20} color="#4F46E5" />
// //               </div>
// //               <div style={{ fontWeight: '700', fontSize: '15px' }}>{forum.dfname}</div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* -------------------------------------------------------------
// //           VIEW B: THREAD FEED LAYOUT LIST
// //          ------------------------------------------------------------- */}
// //       {selectedForum && !selectedThread && (
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
// //           <button onClick={() => setSelectedForum(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#4F46E5', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
// //             <ArrowLeft size={16} /> Back to Boards
// //           </button>

// //           <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{selectedForum.dfname}</h2>

// //           {/* New Thread Composer Form */}
// //           <form onSubmit={handleCreateThread} style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
// //             <input type="text" placeholder="Topic Title (Optional)..." value={newTopic} onChange={(e) => setNewTopic(e.target.value)} maxLength={20} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }} />
// //             <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
// //               <input type="text" placeholder="Type your discussion post message details..." value={newBody} onChange={(e) => setNewBody(e.target.value)} maxLength={500} required style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none' }} />
// //               <button type="submit" style={{ backgroundColor: '#4F46E5', border: 'none', borderRadius: '8px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Send size={16} color="#ffffff" /></button>
// //             </div>
// //           </form>

// //           {/* Threads Listing Loop */}
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
// //             {threads.map((thread) => (
// //               <div 
// //                 key={thread.dtID} 
// //                 onClick={() => handleSelectThread(thread)} // Launches focused conversation tree view on block click
// //                 style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}
// //               >
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                   <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
// //                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4F46E5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>{thread.fname[0]}{thread.lname[0]}</div>
// //                     <div>
// //                       <div style={{ fontSize: '13px', fontWeight: '700' }}>{thread.fname} {thread.lname}</div>
// //                       <div style={{ fontSize: '11px', color: '#94A3B8' }}>{thread.date_created}</div>
// //                     </div>
// //                   </div>
// //                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '20px' }}>
// //                     <MessageCircle size={14} /> <span>{thread.replyCount || 0} replies</span>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   {thread.topic && <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '800' }}>{thread.topic}</h4>}
// //                   <p style={{ fontSize: '13px', color: '#334155', margin: 0, textAlign: 'left' }}>{thread.threadbody}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* -------------------------------------------------------------
// //           VIEW C: INDIVIDUAL THREAD FOCUS LAYER WITH NESTED COMMENTS
// //          ------------------------------------------------------------- */}
// //       {selectedThread && (
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
// //           <button onClick={() => setSelectedThread(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#4F46E5', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
// //             <ArrowLeft size={16} /> Back to Thread Feed
// //           </button>

// //           {/* Root Selected Post Canvas Display Card */}
// //           <div style={{ border: '1px solid #CBD5E1', borderRadius: '12px', padding: '16px', backgroundColor: '#F8FAFC' }}>
// //             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
// //               <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1E293B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{selectedThread.fname[0]}{selectedThread.lname[0]}</div>
// //               <div style={{ textAlign: 'left' }}>
// //                 <div style={{ fontSize: '13px', fontWeight: '700' }}>{selectedThread.fname} {selectedThread.lname}</div>
// //                 <div style={{ fontSize: '11px', color: '#64748B' }}>Root Thread Poster | {selectedThread.date_created}</div>
// //               </div>
// //             </div>
// //             {selectedThread.topic && <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 6px 0', textAlign: 'left' }}>{selectedThread.topic}</h3>}
// //             <p style={{ fontSize: '14px', color: '#0F172A', margin: 0, textAlign: 'left', lineHeight: '1.5' }}>{selectedThread.threadbody}</p>
// //           </div>

// //           {/* Nested Replies Stream List */}
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '16px', borderLeft: '2px solid #E2E8F0' }}>
// //             {replies.length === 0 ? (
// //               <p style={{ color: '#94A3B8', fontSize: '13px', fontStyle: 'italic', textAlign: 'left', margin: '8px 0' }}>No replies posted to this topic yet. Be the first to reply below!</p>
// //             ) : (
// //               replies.map((reply) => (
// //                 <div key={reply.dtID} style={{ display: 'flex', gap: '10px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '12px' }}>
// //                   <CornerDownRight size={16} color="#94A3B8" style={{ marginTop: '4px', flexShrink: 0 }} />
// //                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
// //                     <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
// //                       <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#64748B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10px' }}>{reply.fname[0]}{reply.lname[0]}</div>
// //                       <div style={{ fontSize: '12px', fontWeight: '700' }}>{reply.fname} {reply.lname}</div>
// //                       <div style={{ fontSize: '10px', color: '#94A3B8' }}>{reply.date_created}</div>
// //                     </div>
// //                     <p style={{ fontSize: '13px', color: '#334155', margin: 0, textAlign: 'left', lineHeight: '1.4' }}>{reply.threadbody}</p>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           {/* Live Reply Form Composer Input (Connected directly to your POST endpoint) */}
// //           <form onSubmit={handleCreateReply} style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '10px 14px' }}>
// //             <input 
// //               type="text" 
// //               placeholder={`Reply to ${selectedThread.fname}'s discussion thread...`} 
// //               value={replyBody}
// //               onChange={(e) => setReplyBody(e.target.value)}
// //               maxLength={500}
// //               required
// //               style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: '#1A202C' }} 
// //             />
// //             <button type="submit" style={{ backgroundColor: '#4F46E5', border: 'none', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
// //               <Send size={14} color="#ffffff" />
// //             </button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ForumSection;


// import React, { useState, useEffect } from "react";
// import { MessageSquare, Send, ArrowLeft, MessageCircle, CornerDownRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";

// import {
//   getCourseForums,
//   getForumThreads,
//   getThread,
//   createThread,
//   replyToThread,
//   getStoredUser,
// } from "@/api";

// const ForumSection = ({ courseCode }) => {
//   const user = getStoredUser();

//   const [forums, setForums] = useState([]);
//   const [selectedForum, setSelectedForum] = useState(null);
//   const [threads, setThreads] = useState([]);
//   const [selectedThread, setSelectedThread] = useState(null);
//   const [replies, setReplies] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [loadingThreads, setLoadingThreads] = useState(false);

//   const [newTopic, setNewTopic] = useState("");
//   const [newBody, setNewBody] = useState("");
//   const [replyBody, setReplyBody] = useState("");
//   const [posting, setPosting] = useState(false);

//   // Fetch forums for this course
//   useEffect(() => {
//     setLoading(true);
//     getCourseForums(courseCode)
//       .then((data) => { setForums(data); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, [courseCode]);

//   const handleSelectForum = (forum) => {
//     setSelectedForum(forum);
//     setSelectedThread(null);
//     setLoadingThreads(true);
//     getForumThreads(forum.dfID)
//       .then((data) => { setThreads(data); setLoadingThreads(false); })
//       .catch(() => setLoadingThreads(false));
//   };

//   const handleSelectThread = (thread) => {
//     setSelectedThread(thread);
//     getThread(thread.dtID)
//       .then((data) => setReplies(data?.replies || []))
//       .catch(() => setReplies([]));
//   };

//   const handleCreateThread = async (e) => {
//     e.preventDefault();
//     if (!newBody.trim()) return;
//     setPosting(true);
//     try {
//       await createThread(selectedForum.dfID, newTopic, newBody);
//       setNewTopic("");
//       setNewBody("");
//       const data = await getForumThreads(selectedForum.dfID);
//       setThreads(data);
//     } catch {
//       // silently fail — server may reject if not enrolled
//     } finally {
//       setPosting(false);
//     }
//   };

//   const handleCreateReply = async (e) => {
//     e.preventDefault();
//     if (!replyBody.trim()) return;
//     setPosting(true);
//     try {
//       await replyToThread(selectedThread.dtID, replyBody);
//       setReplyBody("");
//       const data = await getThread(selectedThread.dtID);
//       setReplies(data?.replies || []);
//     } catch {
//       // silently fail
//     } finally {
//       setPosting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col gap-3">
//         <Skeleton className="h-16 w-full rounded-xl" />
//         <Skeleton className="h-16 w-full rounded-xl" />
//       </div>
//     );
//   }

//   // ── View A: Forum list ─────────────────────────────────────────────────────
//   if (!selectedForum) {
//     return (
//       <div className="flex flex-col gap-4">
//         <h2 className="text-[15px] font-extrabold text-slate-900">Course Boards</h2>
//         {forums.length === 0 ? (
//           <p className="text-sm italic text-slate-400">No forums available for this course.</p>
//         ) : (
//           forums.map((forum) => (
//             <button
//               key={forum.dfID}
//               onClick={() => handleSelectForum(forum)}
//               className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50"
//             >
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
//                 <MessageSquare size={18} className="text-indigo-600" />
//               </div>
//               <span className="text-[14px] font-bold text-slate-800">{forum.dfname}</span>
//             </button>
//           ))
//         )}
//       </div>
//     );
//   }

//   // ── View B: Thread list ────────────────────────────────────────────────────
//   if (!selectedThread) {
//     return (
//       <div className="flex flex-col gap-5">
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => setSelectedForum(null)}
//           className="w-fit gap-1 text-indigo-600"
//         >
//           <ArrowLeft size={14} /> Back to Boards
//         </Button>

//         <h2 className="text-[18px] font-extrabold text-slate-900">{selectedForum.dfname}</h2>

//         {/* New thread composer */}
//         <form
//           onSubmit={handleCreateThread}
//           className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4"
//         >
//           <Input
//             placeholder="Topic title (optional)..."
//             value={newTopic}
//             onChange={(e) => setNewTopic(e.target.value)}
//             maxLength={20}
//             className="h-9 text-sm"
//           />
//           <div className="flex gap-2">
//             <Input
//               placeholder="Write a discussion post..."
//               value={newBody}
//               onChange={(e) => setNewBody(e.target.value)}
//               maxLength={500}
//               required
//               className="h-9 flex-1 text-sm"
//             />
//             <Button type="submit" size="icon" disabled={posting} className="h-9 w-9 shrink-0 bg-indigo-600 hover:bg-indigo-700">
//               <Send size={14} />
//             </Button>
//           </div>
//         </form>

//         {/* Thread list */}
//         {loadingThreads ? (
//           <div className="flex flex-col gap-3">
//             <Skeleton className="h-20 w-full rounded-xl" />
//             <Skeleton className="h-20 w-full rounded-xl" />
//           </div>
//         ) : threads.length === 0 ? (
//           <p className="text-sm italic text-slate-400">No threads yet. Start the conversation!</p>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {threads.map((thread) => (
//               <button
//                 key={thread.dtID}
//                 onClick={() => handleSelectThread(thread)}
//                 className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-indigo-300 hover:bg-slate-50"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
//                       {thread.fname?.[0]}{thread.lname?.[0]}
//                     </div>
//                     <div>
//                       <p className="text-[13px] font-bold text-slate-800">{thread.fname} {thread.lname}</p>
//                       <p className="text-[10px] text-slate-400">{thread.date_created}</p>
//                     </div>
//                   </div>
//                   <Badge variant="outline" className="flex items-center gap-1 text-[10px] text-slate-500">
//                     <MessageCircle size={11} /> {thread.replyCount || 0}
//                   </Badge>
//                 </div>
//                 {thread.topic && <p className="text-[13px] font-extrabold text-slate-800">{thread.topic}</p>}
//                 <p className="text-[12px] text-slate-600 line-clamp-2">{thread.threadbody}</p>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ── View C: Single thread + replies ────────────────────────────────────────
//   return (
//     <div className="flex flex-col gap-5">
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => setSelectedThread(null)}
//         className="w-fit gap-1 text-indigo-600"
//       >
//         <ArrowLeft size={14} /> Back to Threads
//       </Button>

//       {/* Root post */}
//       <div className="rounded-xl border border-slate-300 bg-slate-50 p-4">
//         <div className="mb-3 flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-white">
//             {selectedThread.fname?.[0]}{selectedThread.lname?.[0]}
//           </div>
//           <div>
//             <p className="text-[13px] font-bold text-slate-800">{selectedThread.fname} {selectedThread.lname}</p>
//             <p className="text-[10px] text-slate-400">{selectedThread.date_created}</p>
//           </div>
//         </div>
//         {selectedThread.topic && (
//           <h3 className="mb-1 text-[15px] font-extrabold text-slate-900">{selectedThread.topic}</h3>
//         )}
//         <p className="text-[13px] leading-relaxed text-slate-700">{selectedThread.threadbody}</p>
//       </div>

//       {/* Replies */}
//       <div className="flex flex-col gap-3 border-l-2 border-slate-200 pl-4">
//         {replies.length === 0 ? (
//           <p className="text-[12px] italic text-slate-400">No replies yet. Be the first!</p>
//         ) : (
//           replies.map((reply) => (
//             <div key={reply.dtID} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3">
//               <CornerDownRight size={14} className="mt-1 shrink-0 text-slate-400" />
//               <div className="flex flex-col gap-1">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-[9px] font-bold text-white">
//                     {reply.fname?.[0]}{reply.lname?.[0]}
//                   </div>
//                   <span className="text-[12px] font-bold text-slate-700">{reply.fname} {reply.lname}</span>
//                   <span className="text-[10px] text-slate-400">{reply.date_created}</span>
//                 </div>
//                 <p className="text-[12px] leading-relaxed text-slate-600">{reply.threadbody}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Reply composer */}
//       <form
//         onSubmit={handleCreateReply}
//         className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2"
//       >
//         <Input
//           placeholder={`Reply to ${selectedThread.fname}...`}
//           value={replyBody}
//           onChange={(e) => setReplyBody(e.target.value)}
//           maxLength={500}
//           required
//           className="h-8 flex-1 border-none text-[13px] shadow-none focus-visible:ring-0"
//         />
//         <Button type="submit" size="icon" disabled={posting} className="h-8 w-8 shrink-0 bg-indigo-600 hover:bg-indigo-700">
//           <Send size={13} />
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default ForumSection;

// 3am
import React, { useState, useEffect } from "react";
import { MessageSquare, Send, ArrowLeft, MessageCircle, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getCourseForums, getForumThreads, getThread, createThread, replyToThread } from "@/api";

export default function ForumSection({ courseCode }) {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newBody, setNewBody] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCourseForums(courseCode).then(d=>{setForums(Array.isArray(d)?d:[]);setLoading(false);}).catch(()=>setLoading(false));
  }, [courseCode]);

  const handleSelectForum = (forum) => {
    setSelectedForum(forum); setSelectedThread(null); setLoadingThreads(true);
    getForumThreads(forum.dfID).then(d=>{setThreads(Array.isArray(d)?d:[]);setLoadingThreads(false);}).catch(()=>setLoadingThreads(false));
  };

  const handleSelectThread = (thread) => {
    setSelectedThread(thread);
    getThread(thread.dtID).then(d=>setReplies(d?.replies||[])).catch(()=>setReplies([]));
  };

  const handleCreateThread = async (e) => {
    e.preventDefault(); if (!newBody.trim()) return;
    setPosting(true);
    try {
      await createThread(selectedForum.dfID, newTopic, newBody);
      setNewTopic(""); setNewBody("");
      const d = await getForumThreads(selectedForum.dfID);
      setThreads(Array.isArray(d)?d:[]);
    } catch {} finally { setPosting(false); }
  };

  const handleCreateReply = async (e) => {
    e.preventDefault(); if (!replyBody.trim()) return;
    setPosting(true);
    try {
      await replyToThread(selectedThread.dtID, replyBody);
      setReplyBody("");
      const d = await getThread(selectedThread.dtID);
      setReplies(d?.replies||[]);
    } catch {} finally { setPosting(false); }
  };

  if (loading) return <div className="flex flex-col gap-2"><Skeleton className="h-16 w-full rounded-xl"/><Skeleton className="h-16 w-full rounded-xl"/></div>;

  // View A — Forum list
  if (!selectedForum) return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[15px] font-extrabold text-slate-900">Course Boards</h2>
      {forums.length===0 ? <p className="text-sm italic text-slate-400">No forums yet.</p> :
        forums.map(f=>(
          <button key={f.dfID} onClick={()=>handleSelectForum(f)}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:bg-indigo-50 transition-all">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
              <MessageSquare size={18} className="text-indigo-600"/>
            </div>
            <span className="text-[14px] font-bold text-slate-800">{f.dfname}</span>
          </button>
        ))
      }
    </div>
  );

  // View B — Thread list
  if (!selectedThread) return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" onClick={()=>setSelectedForum(null)} className="w-fit gap-1 text-indigo-600">
        <ArrowLeft size={14}/> Back to Boards
      </Button>
      <h2 className="text-[18px] font-extrabold text-slate-900">{selectedForum.dfname}</h2>
      <form onSubmit={handleCreateThread} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4">
        <Input placeholder="Topic (optional)" value={newTopic} onChange={e=>setNewTopic(e.target.value)} maxLength={20} className="h-9 text-[13px]"/>
        <div className="flex gap-2">
          <Input placeholder="Write a post..." value={newBody} onChange={e=>setNewBody(e.target.value)} maxLength={500} required className="h-9 flex-1 text-[13px]"/>
          <Button type="submit" size="icon" disabled={posting} className="h-9 w-9 shrink-0 bg-indigo-600 hover:bg-indigo-700"><Send size={14}/></Button>
        </div>
      </form>
      {loadingThreads ? <Skeleton className="h-20 w-full rounded-xl"/> :
        threads.length===0 ? <p className="text-sm italic text-slate-400">No threads yet.</p> :
        <div className="flex flex-col gap-2">
          {threads.map(t=>(
            <button key={t.dtID} onClick={()=>handleSelectThread(t)}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-indigo-300 hover:bg-slate-50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {t.fname?.[0]}{t.lname?.[0]}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">{t.fname} {t.lname}</p>
                    <p className="text-[10px] text-slate-400">{t.date_created}</p>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1 text-[10px] text-slate-500">
                  <MessageCircle size={10}/> {t.replyCount||0}
                </Badge>
              </div>
              {t.topic && <p className="text-[13px] font-extrabold text-slate-800">{t.topic}</p>}
              <p className="text-[12px] text-slate-600 line-clamp-2">{t.threadbody}</p>
            </button>
          ))}
        </div>
      }
    </div>
  );

  // View C — Thread detail + replies
  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" onClick={()=>setSelectedThread(null)} className="w-fit gap-1 text-indigo-600">
        <ArrowLeft size={14}/> Back to Threads
      </Button>
      <div className="rounded-xl border border-slate-300 bg-slate-50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
            {selectedThread.fname?.[0]}{selectedThread.lname?.[0]}
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-800">{selectedThread.fname} {selectedThread.lname}</p>
            <p className="text-[10px] text-slate-400">{selectedThread.date_created}</p>
          </div>
        </div>
        {selectedThread.topic && <h3 className="mb-1 text-[15px] font-extrabold text-slate-900">{selectedThread.topic}</h3>}
        <p className="text-[13px] leading-relaxed text-slate-700">{selectedThread.threadbody}</p>
      </div>
      <div className="flex flex-col gap-2 border-l-2 border-slate-200 pl-4">
        {replies.length===0
          ? <p className="text-[12px] italic text-slate-400">No replies yet.</p>
          : replies.map(r=>(
            <div key={r.dtID} className="flex gap-2 rounded-xl border border-slate-200 bg-white p-3">
              <CornerDownRight size={13} className="mt-1 shrink-0 text-slate-400"/>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-[9px] font-bold text-white">{r.fname?.[0]}{r.lname?.[0]}</div>
                  <span className="text-[12px] font-bold text-slate-700">{r.fname} {r.lname}</span>
                  <span className="text-[10px] text-slate-400">{r.date_created}</span>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-600">{r.threadbody}</p>
              </div>
            </div>
          ))
        }
      </div>
      <form onSubmit={handleCreateReply} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
        <Input placeholder={`Reply to ${selectedThread.fname}...`} value={replyBody} onChange={e=>setReplyBody(e.target.value)}
          maxLength={500} required className="h-8 flex-1 border-none text-[13px] shadow-none focus-visible:ring-0"/>
        <Button type="submit" size="icon" disabled={posting} className="h-8 w-8 shrink-0 bg-indigo-600 hover:bg-indigo-700">
          <Send size={13}/>
        </Button>
      </form>
    </div>
  );
}