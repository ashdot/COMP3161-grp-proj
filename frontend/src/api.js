const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://127.0.0.1:5000";
const REQUEST_TIMEOUT_MS = 15000;

async function apiRequest(path, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });

    const contentType = res.headers.get("content-type") || "";
    let data = null;

    if (res.status !== 204) {
      data = contentType.includes("application/json")
        ? await res.json()
        : { error: (await res.text()) || res.statusText || "Request failed" };
    }

    return {
      ok: res.ok,
      status: res.status,
      data,
      error: data?.error || (!res.ok ? res.statusText || "Request failed" : null),
    };
  } catch (err) {
    const timedOut = err?.name === "AbortError";
    return {
      ok: false,
      status: 0,
      data: null,
      error: timedOut
        ? "Request timed out. Check that the backend is running."
        : `Cannot reach the backend at ${BASE_URL}.`,
    };
  } finally {
    window.clearTimeout(timeout);
  }
}

async function readJson(path, options = {}, fallback = "Request failed") {
  const result = await apiRequest(path, options);
  if (!result.ok) throw new Error(result.error || fallback);
  return result.data;
}

async function resultJson(path, options = {}) {
  const result = await apiRequest(path, options);
  if (result.data && typeof result.data === "object" && !Array.isArray(result.data)) {
    return { status: result.status, ...result.data };
  }
  return {
    status: result.status,
    data: result.data,
    error: result.error,
  };
}

async function writeJsonOrThrow(path, options = {}, fallback = "Request failed") {
  const result = await resultJson(path, options);
  if (result.status < 200 || result.status >= 300) {
    throw new Error(result.error || fallback);
  }
  return result;
}

export function getStoredUser() {
  const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    logout();
    return null;
  }
}

export function getStoredPassword() {
  return localStorage.getItem("password") || sessionStorage.getItem("password");
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("password");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("password");
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

export async function loginUser(email, password) {
  return resultJson("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(adminEmail, adminPassword, userData) {
  return resultJson("/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${adminEmail}:${adminPassword}`)}`,
    },
    body: JSON.stringify({
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      accessLvl: userData.accessLvl,
    }),
  });
}

export async function getUsers() {
  return readJson("/users");
}

export async function getCourses() {
  return readJson("/courses");
}

export async function createCourse(data) {
  return resultJson("/courses", {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(courseCode) {
  return resultJson(`/courses/${courseCode}`, {
    method: "DELETE",
    headers: basicAuthHeader(),
  });
}

export async function assignLecturer(courseCode, lecturerID) {
  return resultJson(`/courses/${courseCode}/lecturer`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify({ lecturerID }),
  });
}

export async function enrollStudent(courseCode, userID) {
  return resultJson(`/courses/${courseCode}/enrollments`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ userID }),
  });
}

export async function getStudentCourses(userID) {
  return readJson(
    `/students/${userID}/courses`,
    { headers: basicAuthHeader() },
    "Failed to fetch student courses"
  );
}

export async function getLecturerCourses(userID) {
  return readJson(
    `/lecturers/${userID}/courses`,
    { headers: basicAuthHeader() },
    "Failed to fetch lecturer courses"
  );
}

export async function getCourseMembers(courseCode) {
  return readJson(`/courses/${courseCode}/members`, { headers: basicAuthHeader() });
}

export async function getCourseContent(courseCode) {
  return readJson(`/courses/${courseCode}/content`, { headers: basicAuthHeader() });
}

export async function createSection(courseCode, secName) {
  return resultJson(`/courses/${courseCode}/sections`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ secName }),
  });
}

export async function createSectionItem(secID, data) {
  return resultJson(`/sections/${secID}/items`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
}

export async function getStudentGrades(userID) {
  return readJson(`/students/${userID}/grades`, { headers: basicAuthHeader() });
}

export async function getStudentCourseGrade(userID, courseCode) {
  return readJson(`/students/${userID}/${courseCode}/grades`, { headers: basicAuthHeader() });
}

export async function gradeSubmission(subID, grade) {
  return resultJson(`/submissions/${subID}/grade`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify({ grade }),
  });
}

export async function submitAssignment(secItemID, subText) {
  return resultJson(`/assignments/${secItemID}/submissions`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ subText }),
  });
}

export async function getAssignmentSubmissions(secItemID) {
  return readJson(`/assignments/${secItemID}/submissions`, { headers: basicAuthHeader() });
}

export async function getCourseCalendarEvents(courseCode) {
  return readJson(`/courses/${courseCode}/calendar-events`, { headers: basicAuthHeader() });
}

export async function getStudentCalendarEvents(userID) {
  return readJson(`/students/${userID}/calendar-events`, { headers: basicAuthHeader() });
}

export async function createCalendarEvent(courseCode, data) {
  return resultJson(`/courses/${courseCode}/calendar-events`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
}

export async function getCourseForums(courseCode) {
  return readJson(`/courses/${courseCode}/forums`, { headers: basicAuthHeader() });
}

export async function createForum(courseCode, dfname) {
  return resultJson(`/courses/${courseCode}/forums`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ dfname }),
  });
}

export async function getForumThreads(dfID) {
  return readJson(`/forums/${dfID}/threads`, { headers: basicAuthHeader() });
}

export async function getThread(dtID) {
  return readJson(`/threads/${dtID}`, { headers: basicAuthHeader() });
}

export async function createThread(dfID, topic, threadbody) {
  return writeJsonOrThrow(
    `/forums/${dfID}/threads`,
    {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ topic: topic || null, threadbody }),
    },
    "Failed to create thread"
  );
}

export async function replyToThread(dtID, threadbody) {
  return writeJsonOrThrow(
    `/threads/${dtID}/replies`,
    {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ threadbody, topic: null }),
    },
    "Failed to post reply"
  );
}

export async function reportCourses50() {
  return readJson("/reports/courses-50");
}

export async function reportStudents5plus() {
  return readJson("/reports/students-5plus");
}

export async function reportLecturers3() {
  return readJson("/reports/lecturers-3");
}

export async function reportMostEnrolled() {
  return readJson("/reports/most-enrolled");
}

export async function reportTopStudents() {
  return readJson("/reports/top-students-by-average");
}
