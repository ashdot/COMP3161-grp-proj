// // // const BASE_URL = "http://localhost:5000";

// // // export async function loginUser(email, password) {
// // //   const res = await fetch(`${BASE_URL}/auth/login`, {
// // //     method: "POST",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify({ email, password }),
// // //   });
// // //   return res.json();
// // // }

// // // export async function getCourses() {
// // //   const res = await fetch(`${BASE_URL}/courses`);
// // //   return res.json();
// // // }


// // // export async function getStudentCourses(adminEmail, adminPassword, userID) {
// // //   const credentials = btoa(`${adminEmail}:${adminPassword}`);
// // //   const res = await fetch(`${BASE_URL}/students/${userID}/courses`, {
// // //     headers: { Authorization: `Basic ${credentials}` },
// // //   });
// // //   return res.json();
// // // }


// // const BASE_URL = "http://localhost:5000";

// // export async function loginUser(email, password) {
// //   const res = await fetch(`${BASE_URL}/auth/login`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ email, password }),
// //   });
// //   return res.json();
// // }

// // export async function getCourses() {
// //   const res = await fetch(`${BASE_URL}/courses`);
// //   return res.json();
// // }

// // export async function getStudentCourses(adminEmail, adminPassword, userID) {
// //   const credentials = btoa(`${adminEmail}:${adminPassword}`);
// //   const res = await fetch(`${BASE_URL}/students/${userID}/courses`, {
// //     headers: { Authorization: `Basic ${credentials}` },
// //   });
// //   return res.json();
// // }

// // /**
// //  * Register a new user.
// //  * Your Flask /users/register route requires Basic Auth from an admin account.
// //  * It accepts: fname, lname, email, accessLvl
// //  *
// //  * @param {string} adminEmail    - the admin's email (for Basic Auth)
// //  * @param {string} adminPassword - the admin's password (for Basic Auth)
// //  * @param {object} userData      - { fname, lname, email, accessLvl }
// //  */
// // export async function registerUser(adminEmail, adminPassword, userData) {
// //   const credentials = btoa(`${adminEmail}:${adminPassword}`);

// //   const res = await fetch(`${BASE_URL}/users/register`, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Basic ${credentials}`,
// //     },
// //     body: JSON.stringify({
// //       fname: userData.fname,
// //       lname: userData.lname,
// //       email: userData.email,
// //       accessLvl: userData.accessLvl,
// //     }),
// //   });

// //   const data = await res.json();

// //   // Attach the HTTP status so the component can react to errors
// //   return { status: res.status, ...data };
// // }



// const BASE_URL = "http://localhost:5000";

// // ─── Auth helpers ────────────────────────────────────────────────────────────

// export function getStoredUser() {
//   const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
//   return raw ? JSON.parse(raw) : null;
// }

// export function getStoredPassword() {
//   return localStorage.getItem("password") || sessionStorage.getItem("password");
// }

// function basicAuthHeader() {
//   const user = getStoredUser();
//   const password = getStoredPassword();
//   if (!user || !password) return {};
//   const credentials = btoa(`${user.email}:${password}`);
//   return { Authorization: `Basic ${credentials}` };
// }

// function jsonHeaders() {
//   return { "Content-Type": "application/json", ...basicAuthHeader() };
// }

// // ─── Auth ─────────────────────────────────────────────────────────────────

// export async function loginUser(email, password) {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return { status: res.status, ...(await res.json()) };
// }

// export async function registerUser(adminEmail, adminPassword, userData) {
//   const credentials = btoa(`${adminEmail}:${adminPassword}`);
//   const res = await fetch(`${BASE_URL}/users/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Authorization: `Basic ${credentials}` },
//     body: JSON.stringify({
//       fname: userData.fname,
//       lname: userData.lname,
//       email: userData.email,
//       accessLvl: userData.accessLvl,
//     }),
//   });
//   return { status: res.status, ...(await res.json()) };
// }

// // ─── Courses ──────────────────────────────────────────────────────────────

// export async function getCourses() {
//   const res = await fetch(`${BASE_URL}/courses`);
//   return res.json();
// }

// export async function getStudentCourses(userID) {
//   const res = await fetch(`${BASE_URL}/students/${userID}/courses`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch student courses");
//   return res.json();
// }

// export async function getLecturerCourses(userID) {
//   const res = await fetch(`${BASE_URL}/lecturers/${userID}/courses`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch lecturer courses");
//   return res.json();
// }

// // ─── Course content ────────────────────────────────────────────────────────

// export async function getCourseContent(courseCode) {
//   const res = await fetch(`${BASE_URL}/courses/${courseCode}/content`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch course content");
//   return res.json();
// }

// export async function getCourseMembers(courseCode) {
//   const res = await fetch(`${BASE_URL}/courses/${courseCode}/members`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch course members");
//   return res.json();
// }

// // ─── Grades ───────────────────────────────────────────────────────────────

// export async function getStudentCourseGrade(userID, courseCode) {
//   const res = await fetch(`${BASE_URL}/students/${userID}/${courseCode}/grades`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch grade");
//   return res.json();
// }

// // ─── Calendar ─────────────────────────────────────────────────────────────

// export async function getStudentCalendarEvents(userID) {
//   const res = await fetch(`${BASE_URL}/students/${userID}/calendar-events`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch calendar events");
//   return res.json();
// }

// // ─── Forums ───────────────────────────────────────────────────────────────

// export async function getCourseForums(courseCode) {
//   const res = await fetch(`${BASE_URL}/courses/${courseCode}/forums`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch forums");
//   return res.json();
// }

// export async function getForumThreads(dfID) {
//   const res = await fetch(`${BASE_URL}/forums/${dfID}/threads`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch threads");
//   return res.json();
// }

// export async function getThread(dtID) {
//   const res = await fetch(`${BASE_URL}/threads/${dtID}`, { headers: basicAuthHeader() });
//   if (!res.ok) throw new Error("Failed to fetch thread");
//   return res.json();
// }

// export async function createThread(dfID, topic, threadbody) {
//   const res = await fetch(`${BASE_URL}/forums/${dfID}/threads`, {
//     method: "POST",
//     headers: jsonHeaders(),
//     body: JSON.stringify({ topic: topic || null, threadbody }),
//   });
//   if (!res.ok) throw new Error("Failed to create thread");
//   return res.json();
// }

// export async function replyToThread(dtID, threadbody) {
//   const res = await fetch(`${BASE_URL}/threads/${dtID}/replies`, {
//     method: "POST",
//     headers: jsonHeaders(),
//     body: JSON.stringify({ threadbody, topic: null }),
//   });
//   if (!res.ok) throw new Error("Failed to post reply");
//   return res.json();
// }

// 3am
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

// ─── Session helpers ──────────────────────────────────────────────────────────
export function getStoredUser() {
  const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
export function getStoredPassword() {
  return localStorage.getItem("password") || sessionStorage.getItem("password");
}
export function logout() {
  localStorage.removeItem("user"); localStorage.removeItem("password");
  sessionStorage.removeItem("user"); sessionStorage.removeItem("password");
}
function basicAuthHeader() {
  const user = getStoredUser();
  const pw = getStoredPassword();
  if (!user || !pw) return {};
  return { Authorization: `Basic ${btoa(`${user.email}:${pw}`)}` };
}
function jsonHeaders() {
  return { "Content-Type": "application/json", ...basicAuthHeader() };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function registerUser(adminEmail, adminPassword, userData) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${btoa(`${adminEmail}:${adminPassword}`)}` },
    body: JSON.stringify({ fname: userData.fname, lname: userData.lname, email: userData.email, accessLvl: userData.accessLvl }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
}

// ─── Courses ──────────────────────────────────────────────────────────────────
export async function getCourses() {
  const res = await fetch(`${BASE_URL}/courses`);
  return res.json();
}
export async function createCourse(data) {
  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify(data),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function deleteCourse(courseCode) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}`, {
    method: "DELETE", headers: basicAuthHeader(),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function assignLecturer(courseCode, lecturerID) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/lecturer`, {
    method: "PUT", headers: jsonHeaders(), body: JSON.stringify({ lecturerID }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function enrollStudent(courseCode, userID) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/enrollments`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ userID }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function getStudentCourses(userID) {
  const res = await fetch(`${BASE_URL}/students/${userID}/courses`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed to fetch student courses");
  return res.json();
}
export async function getLecturerCourses(userID) {
  const res = await fetch(`${BASE_URL}/lecturers/${userID}/courses`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed to fetch lecturer courses");
  return res.json();
}
export async function getCourseMembers(courseCode) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/members`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

// ─── Sections & Content ───────────────────────────────────────────────────────
export async function getCourseContent(courseCode) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/content`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function createSection(courseCode, secName) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/sections`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ secName }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function createSectionItem(secID, data) {
  const res = await fetch(`${BASE_URL}/sections/${secID}/items`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify(data),
  });
  return { status: res.status, ...(await res.json()) };
}

// ─── Grades ───────────────────────────────────────────────────────────────────
export async function getStudentGrades(userID) {
  const res = await fetch(`${BASE_URL}/students/${userID}/grades`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function getStudentCourseGrade(userID, courseCode) {
  const res = await fetch(`${BASE_URL}/students/${userID}/${courseCode}/grades`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function gradeSubmission(subID, grade) {
  const res = await fetch(`${BASE_URL}/submissions/${subID}/grade`, {
    method: "PUT", headers: jsonHeaders(), body: JSON.stringify({ grade }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function submitAssignment(secItemID, subText) {
  const res = await fetch(`${BASE_URL}/assignments/${secItemID}/submissions`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ subText }),
  });
  return { status: res.status, ...(await res.json()) };
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
export async function getCourseCalendarEvents(courseCode) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/calendar-events`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function getStudentCalendarEvents(userID) {
  const res = await fetch(`${BASE_URL}/students/${userID}/calendar-events`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function createCalendarEvent(courseCode, data) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/calendar-events`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify(data),
  });
  return { status: res.status, ...(await res.json()) };
}

// ─── Forums ───────────────────────────────────────────────────────────────────
export async function getCourseForums(courseCode) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/forums`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function createForum(courseCode, dfname) {
  const res = await fetch(`${BASE_URL}/courses/${courseCode}/forums`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ dfname }),
  });
  return { status: res.status, ...(await res.json()) };
}
export async function getForumThreads(dfID) {
  const res = await fetch(`${BASE_URL}/forums/${dfID}/threads`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function getThread(dtID) {
  const res = await fetch(`${BASE_URL}/threads/${dtID}`, { headers: basicAuthHeader() });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function createThread(dfID, topic, threadbody) {
  const res = await fetch(`${BASE_URL}/forums/${dfID}/threads`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ topic: topic || null, threadbody }),
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function replyToThread(dtID, threadbody) {
  const res = await fetch(`${BASE_URL}/threads/${dtID}/replies`, {
    method: "POST", headers: jsonHeaders(), body: JSON.stringify({ threadbody, topic: null }),
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

// ─── Reports ──────────────────────────────────────────────────────────────────
export async function reportCourses50() {
  const res = await fetch(`${BASE_URL}/reports/courses-50`);
  return res.json();
}
export async function reportStudents5plus() {
  const res = await fetch(`${BASE_URL}/reports/students-5plus`);
  return res.json();
}
export async function reportLecturers3() {
  const res = await fetch(`${BASE_URL}/reports/lecturers-3`);
  return res.json();
}
export async function reportMostEnrolled() {
  const res = await fetch(`${BASE_URL}/reports/most-enrolled`);
  return res.json();
}
export async function reportTopStudents() {
  const res = await fetch(`${BASE_URL}/reports/top-students-by-average`);
  return res.json();
}
