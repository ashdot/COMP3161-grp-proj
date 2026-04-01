"""
VLE Database Population Script
Generates SQL INSERT statements for:
  - 100,000 students (IDs: 620xxxxxx)
  - 200 staff/lecturers (IDs: 200xxxxxx)
  - 10 admins (IDs: 111xxxxxx)
  - 200+ courses
  - CourseMember, Enrol, Teaches
  - DiscussionForum, DiscussionThread
  - CourseSection, SectionItems
  - CourseCalendar, CalendarEvents
  - Submission
Constraints:
  - Each student enrols in 3–6 courses
  - Each course has at least 10 members
  - Each lecturer teaches 1–5 courses
  - No lecturer teaches more than 5 courses
"""

import random
import hashlib
import os
from faker import Faker

fake = Faker()
random.seed(42)
Faker.seed(42)

OUTPUT_FILE = "vle_inserts.sql"

# ─── Counts ───────────────────────────────────────────────────────────────────
NUM_STUDENTS   = 100_000
NUM_LECTURERS  = 200
NUM_ADMINS     = 10
NUM_COURSES    = 210   # slightly over 200 for safety

# ─── ID helpers ───────────────────────────────────────────────────────────────
# Students  → 620_000_000 .. 620_099_999
# Lecturers → 200_000_000 .. 200_000_199
# Admins    → 111_000_000 .. 111_000_009

def student_id(i):  return 620_000_000 + i
def lecturer_id(i): return 200_000_000 + i
def admin_id(i):    return 111_000_000 + i

def hash_pw(plain):
    return hashlib.sha256(plain.encode()).hexdigest()[:60]

# ─── Departments & course-code helpers ────────────────────────────────────────
DEPARTMENTS = [
    "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology",
    "Engineering", "Economics", "Management", "Law", "Medicine",
    "Psychology", "Sociology", "History", "Literature", "Philosophy",
    "Agriculture", "Education", "Nursing", "Architecture", "Accounting",
]

COURSE_PREFIXES = {
    "Computer Science": "COMP", "Mathematics": "MATH", "Physics": "PHYS",
    "Chemistry": "CHEM", "Biology": "BIOL", "Engineering": "ENGR",
    "Economics": "ECON", "Management": "MGMT", "Law": "LAW0",
    "Medicine": "MEDI", "Psychology": "PSYC", "Sociology": "SOCI",
    "History": "HIST", "Literature": "LITE", "Philosophy": "PHIL",
    "Agriculture": "AGRI", "Education": "EDUC", "Nursing": "NURS",
    "Architecture": "ARCH", "Accounting": "ACCT",
}

COURSE_TOPICS = {
    "Computer Science":["Intro to Programming","Data Structures","Algorithms","Operating Systems","Database Systems","Computer Networks","Software Engineering","Artificial Intelligence","Machine Learning","Cybersecurity","Web Development","Mobile Computing","Cloud Computing","Computer Graphics","Theory of Computation"],
    "Mathematics":["Calculus I","Calculus II","Linear Algebra","Discrete Mathematics","Probability & Statistics","Real Analysis","Abstract Algebra","Numerical Methods","Differential Equations","Topology","Number Theory","Graph Theory","Complex Analysis","Mathematical Modelling","Operations Research"],
    "Physics":["Mechanics","Electromagnetism","Thermodynamics","Quantum Physics","Optics","Nuclear Physics","Astrophysics","Condensed Matter","Fluid Dynamics","Acoustics","Relativity","Plasma Physics","Computational Physics","Experimental Methods","Particle Physics"],
    "Chemistry":["General Chemistry","Organic Chemistry","Inorganic Chemistry","Physical Chemistry","Analytical Chemistry","Biochemistry","Polymer Chemistry","Environmental Chemistry","Spectroscopy","Electrochemistry","Medicinal Chemistry","Computational Chemistry","Industrial Chemistry","Nanochemistry","Food Chemistry"],
    "Biology":["Cell Biology","Genetics","Ecology","Evolution","Microbiology","Zoology","Botany","Physiology","Immunology","Molecular Biology","Neuroscience","Marine Biology","Conservation Biology","Developmental Biology","Parasitology"],
    "Engineering":["Engineering Mathematics","Statics","Dynamics","Materials Science","Thermodynamics","Fluid Mechanics","Circuit Analysis","Control Systems","Signal Processing","Structural Analysis","Environmental Engineering","Geotechnical Engineering","Manufacturing Processes","Project Management","Engineering Ethics"],
    "Economics":["Microeconomics","Macroeconomics","Development Economics","International Economics","Public Finance","Econometrics","Labour Economics","Environmental Economics","Health Economics","Monetary Economics","Industrial Organisation","Behavioural Economics","Game Theory","Economic History","Financial Economics"],
    "Management":["Principles of Management","Organisational Behaviour","Marketing Management","Human Resource Management","Strategic Management","Operations Management","Entrepreneurship","Business Ethics","Innovation Management","Supply Chain Management","Project Management","Change Management","Leadership","Corporate Governance","Risk Management"],
    "Law":["Constitutional Law","Contract Law","Criminal Law","Tort Law","Property Law","Administrative Law","International Law","Company Law","Human Rights Law","Family Law","Labour Law","Intellectual Property","Environmental Law","Tax Law","Procedure & Evidence"],
    "Medicine":["Anatomy","Physiology","Biochemistry","Pharmacology","Pathology","Microbiology","Community Health","Clinical Medicine","Surgery","Paediatrics","Obstetrics","Psychiatry","Radiology","Ophthalmology","Forensic Medicine"],
    "Psychology":["Introduction to Psychology","Cognitive Psychology","Social Psychology","Developmental Psychology","Abnormal Psychology","Personality Psychology","Biopsychology","Research Methods","Clinical Psychology","Health Psychology","Forensic Psychology","Educational Psychology","Organisational Psychology","Positive Psychology","Neuropsychology"],
    "Sociology":["Introduction to Sociology","Social Theory","Research Methods","Gender Studies","Race & Ethnicity","Urban Sociology","Rural Sociology","Criminology","Social Policy","Globalisation","Cultural Sociology","Medical Sociology","Political Sociology","Family Sociology","Environmental Sociology"],
    "History":["Ancient History","Medieval History","Modern History","Caribbean History","African History","World Wars","Colonial History","History of Science","Social History","Political History","Economic History","Historiography","Latin American History","Asian History","History of Religion"],
    "Literature":["Introduction to Literature","Poetry Analysis","Prose Fiction","Drama & Theatre","Caribbean Literature","African Literature","Postcolonial Literature","Literary Theory","Creative Writing","Comparative Literature","Children's Literature","Film & Literature","Women's Writing","World Literature","Language & Linguistics"],
    "Philosophy":["Introduction to Philosophy","Logic","Ethics","Political Philosophy","Metaphysics","Epistemology","Philosophy of Mind","Philosophy of Science","Aesthetics","Philosophy of Language","Eastern Philosophy","Applied Ethics","Philosophy of Religion","Continental Philosophy","Analytic Philosophy"],
    "Agriculture":["Crop Science","Animal Science","Soil Science","Agricultural Economics","Agronomy","Horticulture","Pest Management","Agricultural Engineering","Irrigation Management","Food Science","Post-Harvest Technology","Aquaculture","Agroforestry","Agricultural Extension","Sustainable Agriculture"],
    "Education":["Philosophy of Education","Curriculum Development","Educational Psychology","Assessment & Evaluation","Special Education","Early Childhood Education","STEM Education","ICT in Education","Literacy Education","Educational Leadership","Comparative Education","Adult Education","Guidance & Counselling","Sociology of Education","Teaching Practice"],
    "Nursing":["Fundamentals of Nursing","Anatomy for Nurses","Medical-Surgical Nursing","Paediatric Nursing","Maternal & Child Health","Mental Health Nursing","Community Nursing","Pharmacology for Nurses","Critical Care Nursing","Nursing Research","Nursing Ethics","Geriatric Nursing","Oncology Nursing","Emergency Nursing","Nursing Leadership"],
    "Architecture":["Architectural Design","History of Architecture","Building Construction","Structural Systems","Environmental Design","Urban Planning","Landscape Architecture","Architectural Theory","Digital Design","Building Services","Housing Design","Heritage Conservation","Interior Architecture","Professional Practice","Building Information Modelling"],
    "Accounting":["Financial Accounting","Management Accounting","Auditing","Taxation","Cost Accounting","Financial Reporting","Accounting Information Systems","Corporate Finance","Forensic Accounting","Public Sector Accounting","International Accounting","Accounting Theory","Business Law for Accountants","Advanced Auditing","Financial Analysis"],
}

# ─── Writers ──────────────────────────────────────────────────────────────────
lines_buffer = []

def out(line=""):
    lines_buffer.append(line)

def flush_to_file(path, mode="w"):
    with open(path, mode, encoding="utf-8") as f:
        f.write("\n".join(lines_buffer) + "\n")
    lines_buffer.clear()

# ─── 1. USERS ─────────────────────────────────────────────────────────────────
print("Generating UserAccount inserts...")

used_emails = set()

def unique_email(fname, lname, suffix=""):
    base = f"{fname.lower().replace(' ','')}.{lname.lower().replace(' ','')}".replace("'","")
    email = f"{base}{suffix}@vle.uwi.edu"
    return email

out("-- ============================================================")
out("-- UserAccount")
out("-- ============================================================")
out("INSERT INTO UserAccount (userID, fname, lname, email, accessLvl, password) VALUES")

rows = []

# Students
print("  Building student rows...")
for i in range(NUM_STUDENTS):
    uid   = student_id(i)
    fname = fake.first_name().replace("'","")
    lname = fake.last_name().replace("'","")
    email = unique_email(fname, lname)
    counter = 1
    while email in used_emails:
        email = unique_email(fname, lname, str(counter))
        counter += 1
    used_emails.add(email)
    pw = hash_pw(f"Student@{uid}")
    rows.append(f"({uid},'{fname}','{lname}','{email}','student','{pw}')")
    if i % 20000 == 0:
        print(f"    {i}/{NUM_STUDENTS}")

# Lecturers
print("  Building lecturer rows...")
lecturer_ids = []
for i in range(NUM_LECTURERS):
    uid   = lecturer_id(i)
    fname = fake.first_name().replace("'","")
    lname = fake.last_name().replace("'","")
    email = unique_email(fname, lname, f"_lec{i}")
    while email in used_emails:
        email = unique_email(fname, lname, f"_lec{i}x")
    used_emails.add(email)
    pw = hash_pw(f"Lecturer@{uid}")
    rows.append(f"({uid},'{fname}','{lname}','{email}','lecturer','{pw}')")
    lecturer_ids.append(uid)

# Admins
print("  Building admin rows...")
admin_ids = []
for i in range(NUM_ADMINS):
    uid   = admin_id(i)
    fname = fake.first_name().replace("'","")
    lname = fake.last_name().replace("'","")
    email = unique_email(fname, lname, f"_adm{i}")
    while email in used_emails:
        email = unique_email(fname, lname, f"_adm{i}x")
    used_emails.add(email)
    pw = hash_pw(f"Admin@{uid}")
    rows.append(f"({uid},'{fname}','{lname}','{email}','admin','{pw}')")
    admin_ids.append(uid)

# Write in batches of 500 for MySQL compatibility
BATCH = 500
for b in range(0, len(rows), BATCH):
    chunk = rows[b:b+BATCH]
    out("INSERT INTO UserAccount (userID, fname, lname, email, accessLvl, password) VALUES")
    out(",\n".join(chunk) + ";")

flush_to_file(OUTPUT_FILE, "w")
print(f"  UserAccount written ({len(rows)} rows)")

# ─── 2. COURSES ───────────────────────────────────────────────────────────────
print("Generating Course inserts...")

courses = []   # list of (courseCode, courseName, department)
code_counters = {dept: 1 for dept in DEPARTMENTS}

for dept, topics in COURSE_TOPICS.items():
    prefix = COURSE_PREFIXES[dept]
    for topic in topics:
        num = code_counters[dept]
        code = f"{prefix}{num:04d}"   # e.g. COMP0001
        # truncate to 8 chars if needed (shouldn't exceed)
        code = code[:8]
        courses.append((code, topic[:50], dept))
        code_counters[dept] += 1

course_codes = [c[0] for c in courses]
print(f"  Total courses: {len(courses)}")

out("-- ============================================================")
out("-- Course")
out("-- ============================================================")
for b in range(0, len(courses), BATCH):
    chunk = courses[b:b+BATCH]
    out("INSERT INTO Course (courseCode, courseName, department) VALUES")
    out(",\n".join(
        f"('{cc}','{cn.replace(chr(39),chr(96))}','{dept}')" for cc,cn,dept in chunk
    ) + ";")

flush_to_file(OUTPUT_FILE, "a")
print("  Course written")

# ─── 3. TEACHES ───────────────────────────────────────────────────────────────
print("Generating Teaches / CourseMember (lecturer) inserts...")

# Each lecturer teaches 1–5 courses; each course needs at least 1 lecturer
# Strategy: shuffle courses, assign round-robin to lecturers ensuring coverage
random.shuffle(course_codes)

teaches = {}   # lecturerID -> list of courseCodes
course_lecturer_map = {}  # courseCode -> lecturerID (primary)

# First pass: ensure every course has exactly 1 lecturer assigned
shuffled_lec = lecturer_ids[:]
random.shuffle(shuffled_lec)

lec_load = {lid: 0 for lid in lecturer_ids}
teaches   = {lid: [] for lid in lecturer_ids}

lec_cycle = 0
for cc in course_codes:
    # find next lecturer under limit 5
    attempts = 0
    while True:
        lid = shuffled_lec[lec_cycle % len(shuffled_lec)]
        lec_cycle += 1
        if lec_load[lid] < 5:
            teaches[lid].append(cc)
            lec_load[lid] += 1
            course_lecturer_map[cc] = lid
            break
        attempts += 1
        if attempts > len(lecturer_ids) * 2:
            # force assign to lecturer with min load
            lid = min(lec_load, key=lec_load.get)
            if lec_load[lid] < 5:
                teaches[lid].append(cc)
                lec_load[lid] += 1
                course_lecturer_map[cc] = lid
            break

# Second pass: ensure every lecturer has at least 1 course
unassigned_lecs = [lid for lid in lecturer_ids if lec_load[lid] == 0]
extra_pool = [cc for cc in course_codes]  # re-assign from pool
random.shuffle(extra_pool)
pool_idx = 0
for lid in unassigned_lecs:
    cc = extra_pool[pool_idx % len(extra_pool)]
    pool_idx += 1
    if cc not in teaches[lid]:
        teaches[lid].append(cc)
        lec_load[lid] += 1

teaches_rows = []
cm_lec_rows  = []
for lid, ccs in teaches.items():
    for cc in ccs:
        teaches_rows.append(f"({lid},'{cc}')")
        cm_lec_rows.append(f"({lid},'lecturer','{cc}')")

out("-- ============================================================")
out("-- Teaches")
out("-- ============================================================")
for b in range(0, len(teaches_rows), BATCH):
    chunk = teaches_rows[b:b+BATCH]
    out("INSERT INTO Teaches (userID, courseCode) VALUES")
    out(",\n".join(chunk) + ";")

out("-- ============================================================")
out("-- CourseMember (lecturers)")
out("-- ============================================================")
for b in range(0, len(cm_lec_rows), BATCH):
    chunk = cm_lec_rows[b:b+BATCH]
    out("INSERT INTO CourseMember (userID, memberRole, courseCode) VALUES")
    out(",\n".join(chunk) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Teaches rows: {len(teaches_rows)}")

# ─── 4. ENROL + CourseMember (students) ───────────────────────────────────────
print("Generating Enrol + CourseMember (student) inserts...")

# Each student: 3–6 courses (uniform random)
# Guarantee each course has at least 10 student members

# Pre-seed: assign 10 students to each course
course_student_sets = {cc: set() for cc in course_codes}

student_ids_list = [student_id(i) for i in range(NUM_STUDENTS)]

# Seed 10 students per course
seed_ptr = 0
for cc in course_codes:
    while len(course_student_sets[cc]) < 10:
        sid = student_ids_list[seed_ptr % NUM_STUDENTS]
        seed_ptr += 1
        course_student_sets[cc].add(sid)

# Build per-student course list (they may already be seeded into some)
student_course_map = {sid: set() for sid in student_ids_list}

# Load seeded assignments
for cc, sids in course_student_sets.items():
    for sid in sids:
        student_course_map[sid].add(cc)

# Now for every student who has fewer than 3 courses, add more
print("  Assigning courses to students (min 3, max 6)...")
all_cc = course_codes  # already a list

for idx, sid in enumerate(student_ids_list):
    current = student_course_map[sid]
    needed  = random.randint(3, 6) - len(current)
    if needed > 0:
        candidates = [cc for cc in all_cc if cc not in current]
        picks = random.sample(candidates, min(needed, len(candidates)))
        for cc in picks:
            student_course_map[sid].add(cc)
            course_student_sets[cc].add(sid)
    if idx % 25000 == 0:
        print(f"    {idx}/{NUM_STUDENTS}")

# Enforce max 6 (trim if over — shouldn't happen but safeguard)
for sid in student_ids_list:
    if len(student_course_map[sid]) > 6:
        student_course_map[sid] = set(list(student_course_map[sid])[:6])

# Verify minimums
min_members = min(len(v) for v in course_student_sets.values())
max_courses = max(len(v) for v in student_course_map.values())
min_courses = min(len(v) for v in student_course_map.values())
print(f"  Min student members per course: {min_members}")
print(f"  Student course load: {min_courses}–{max_courses}")

# Write ENROL
print("  Writing Enrol rows...")
enrol_rows = []
cm_stu_rows = []
for sid, ccs in student_course_map.items():
    for cc in ccs:
        grade = random.randint(40, 100) if random.random() > 0.15 else "NULL"
        enrol_rows.append(f"({sid},'{cc}',{grade})")
        cm_stu_rows.append(f"({sid},'student','{cc}')")

out("-- ============================================================")
out("-- Enrol")
out("-- ============================================================")
print("  Writing Enrol to file...")
for b in range(0, len(enrol_rows), BATCH):
    chunk = enrol_rows[b:b+BATCH]
    out("INSERT INTO Enrol (userID, courseCode, grade) VALUES")
    out(",\n".join(chunk) + ";")
    if b % 50000 == 0:
        flush_to_file(OUTPUT_FILE, "a")
        print(f"    Enrol flushed up to {b}")

out("-- ============================================================")
out("-- CourseMember (students)")
out("-- ============================================================")
for b in range(0, len(cm_stu_rows), BATCH):
    chunk = cm_stu_rows[b:b+BATCH]
    out("INSERT INTO CourseMember (userID, memberRole, courseCode) VALUES")
    out(",\n".join(chunk) + ";")
    if b % 50000 == 0:
        flush_to_file(OUTPUT_FILE, "a")
        print(f"    CourseMember flushed up to {b}")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Enrol rows: {len(enrol_rows)}, CourseMember student rows: {len(cm_stu_rows)}")

# ─── 5. DISCUSSION FORUMS ─────────────────────────────────────────────────────
print("Generating DiscussionForum inserts...")

# 2 forums per course
forums = []  # (dfID, dfname, courseCode)
df_id = 1
forum_by_course = {}  # courseCode -> [dfID, ...]
for cc in course_codes:
    forum_by_course[cc] = []
    for j in range(2):
        name = f"{'General' if j==0 else 'Assignment'} Discussion"
        forums.append((df_id, name, cc))
        forum_by_course[cc].append(df_id)
        df_id += 1

out("-- ============================================================")
out("-- DiscussionForum")
out("-- ============================================================")
for b in range(0, len(forums), BATCH):
    chunk = forums[b:b+BATCH]
    out("INSERT INTO DiscussionForum (dfID, dfname, courseCode) VALUES")
    out(",\n".join(f"({d},'{n}','{c}')" for d,n,c in chunk) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Forums: {len(forums)}")

# ─── 6. DISCUSSION THREADS ────────────────────────────────────────────────────
print("Generating DiscussionThread inserts...")

THREAD_TOPICS = ["Question","Announcement","Help Needed","Resource","Discussion","Feedback","Exam Prep","Project","Clarification","General"]
dt_id = 1
threads = []

for cc in course_codes:
    df_ids = forum_by_course[cc]
    members = list(course_student_sets[cc]) + [course_lecturer_map[cc]]

    for dfid in df_ids:
        # 3–5 root threads per forum
        root_count = random.randint(3, 5)
        root_ids = []
        for _ in range(root_count):
            uid   = random.choice(members)
            body  = fake.sentence(nb_words=random.randint(8, 30))[:500].replace("'","`")
            topic = random.choice(THREAD_TOPICS)
            date  = fake.date_between(start_date="-2y", end_date="today")
            threads.append((dt_id, dfid, "NULL", uid, body, topic, date))
            root_ids.append(dt_id)
            dt_id += 1

        # 1–3 replies per root thread
        for rid in root_ids:
            for _ in range(random.randint(1, 3)):
                uid  = random.choice(members)
                body = fake.sentence(nb_words=random.randint(5, 20))[:500].replace("'","`")
                date = fake.date_between(start_date="-2y", end_date="today")
                threads.append((dt_id, dfid, rid, uid, body, "NULL", date))
                dt_id += 1

out("-- ============================================================")
out("-- DiscussionThread")
out("-- ============================================================")
for b in range(0, len(threads), BATCH):
    chunk = threads[b:b+BATCH]
    out("INSERT INTO DiscussionThread (dtID, dfID, parentpostID, userID, threadbody, topic, date_created) VALUES")
    out(",\n".join(
        f"({d},{df},{pp},{u},'{body}',{('\"'+t+'\"') if t!='NULL' else 'NULL'},'{date}')"
        for d,df,pp,u,body,t,date in chunk
    ) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Threads: {len(threads)}")

# ─── 7. COURSE SECTIONS ───────────────────────────────────────────────────────
print("Generating CourseSection inserts...")

SECTION_NAMES = ["Week 1 - Introduction","Week 2","Week 3","Week 4","Week 5","Midterm Review","Week 7","Week 8","Week 9","Week 10","Week 11","Week 12 - Final Review","Supplementary Materials","Assignments","Announcements"]

sections = []   # (secID, secname, courseCode)
sec_id   = 1
section_by_course = {}

for cc in course_codes:
    section_by_course[cc] = []
    count = random.randint(5, 10)
    names = random.sample(SECTION_NAMES, count)
    for name in names:
        sections.append((sec_id, name, cc))
        section_by_course[cc].append(sec_id)
        sec_id += 1

out("-- ============================================================")
out("-- CourseSection")
out("-- ============================================================")
for b in range(0, len(sections), BATCH):
    chunk = sections[b:b+BATCH]
    out("INSERT INTO CourseSection (secID, secname, courseCode) VALUES")
    out(",\n".join(f"({s},'{n}','{c}')" for s,n,c in chunk) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Sections: {len(sections)}")

# ─── 8. SECTION ITEMS ─────────────────────────────────────────────────────────
print("Generating SectionItems inserts...")

ITEM_TYPES  = ["assignment","links","files","slides"]
ITEM_TITLES = ["Lecture Notes","Assignment {}","Reading Material","Tutorial Slides","Lab Sheet","Problem Set {}","Quiz {}","Project Guidelines","Reference Links","Supplementary Reading"]

sec_items  = []  # (secItemID, secID, title, secBody, itemtype, dueDate)
sec_item_id = 1
secitem_by_course = {}  # courseCode -> [secItemID] for assignment type

for cc in course_codes:
    secitem_by_course[cc] = []
    for sid in section_by_course[cc]:
        count = random.randint(2, 5)
        for k in range(count):
            itype = random.choice(ITEM_TYPES)
            title = random.choice(ITEM_TITLES).format(k+1)
            body  = fake.sentence(nb_words=15)[:500].replace("'","`")
            due   = fake.date_between(start_date="-1y", end_date="+6m") if itype == "assignment" else "NULL"
            sec_items.append((sec_item_id, sid, title[:50], body, itype, due))
            if itype == "assignment":
                secitem_by_course[cc].append(sec_item_id)
            sec_item_id += 1

out("-- ============================================================")
out("-- SectionItems")
out("-- ============================================================")
for b in range(0, len(sec_items), BATCH):
    chunk = sec_items[b:b+BATCH]
    out("INSERT INTO SectionItems (secItemID, secID, title, secBody, itemtype, dueDate) VALUES")
    out(",\n".join(
        f"({si},{s},'{t}','{b2}','{it}',{('\"'+str(d)+'\"') if d!='NULL' else 'NULL'})"
        for si,s,t,b2,it,d in chunk
    ) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  SectionItems: {len(sec_items)}")

# ─── 9. COURSE CALENDARS ──────────────────────────────────────────────────────
print("Generating CourseCalendar + CalendarEvents inserts...")

calendars = []   # (calID, courseCode)
cal_events = []  # (eventID, calID, eventDate, eventTitle, secItemID)
cal_id   = 1
event_id = 1

EVENT_TITLES = ["Lecture","Tutorial","Lab Session","Office Hours","Quiz","Midterm Exam","Final Exam","Assignment Due","Project Submission","Guest Lecture","Field Trip","Study Group","Review Session","Workshop","Seminar"]

for cc in course_codes:
    calendars.append((cal_id, cc))
    # 8–15 events per calendar
    for _ in range(random.randint(8, 15)):
        date   = fake.date_between(start_date="-1y", end_date="+6m")
        title  = random.choice(EVENT_TITLES)
        # optionally link to a section item
        if secitem_by_course[cc] and random.random() > 0.5:
            siid = random.choice(secitem_by_course[cc])
        else:
            siid = "NULL"
        cal_events.append((event_id, cal_id, date, title, siid))
        event_id += 1
    cal_id += 1

out("-- ============================================================")
out("-- CourseCalendar")
out("-- ============================================================")
for b in range(0, len(calendars), BATCH):
    chunk = calendars[b:b+BATCH]
    out("INSERT INTO CourseCalendar (calenderID, courseCode) VALUES")
    out(",\n".join(f"({c},'{cc}')" for c,cc in chunk) + ";")

out("-- ============================================================")
out("-- CalendarEvents")
out("-- ============================================================")
for b in range(0, len(cal_events), BATCH):
    chunk = cal_events[b:b+BATCH]
    out("INSERT INTO CalendarEvents (eventID, calenderID, eventDate, eventTitle, secItemID) VALUES")
    out(",\n".join(
        f"({e},{c},'{d}','{t}',{si})" for e,c,d,t,si in chunk
    ) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Calendars: {len(calendars)}, Events: {event_id-1}")

# ─── 10. SUBMISSIONS ──────────────────────────────────────────────────────────
print("Generating Submission inserts (sampled — not every student submits every assignment)...")

sub_rows = []
sub_id   = 1

# For efficiency: per course, pick up to 30 students, sample their assignments
for cc in course_codes:
    assignment_items = secitem_by_course[cc]
    if not assignment_items:
        continue
    students_in_course = list(course_student_sets[cc])
    sample_students    = random.sample(students_in_course, min(30, len(students_in_course)))

    for sid in sample_students:
        # student submits 50–100% of assignments
        items_to_submit = random.sample(assignment_items, max(1, int(len(assignment_items) * random.uniform(0.5, 1.0))))
        for siid in items_to_submit:
            text  = fake.sentence(nb_words=20)[:200].replace("'","`")
            date  = fake.date_between(start_date="-1y", end_date="today")
            grade = random.randint(40, 100) if random.random() > 0.1 else "NULL"
            sub_rows.append(f"({sub_id},{sid},{siid},'{text}',NULL,'{date}',{grade})")
            sub_id += 1

out("-- ============================================================")
out("-- Submission")
out("-- ============================================================")
for b in range(0, len(sub_rows), BATCH):
    chunk = sub_rows[b:b+BATCH]
    out("INSERT INTO Submission (subID, userID, secItemID, subText, subContent, submDate, grade) VALUES")
    out(",\n".join(chunk) + ";")

flush_to_file(OUTPUT_FILE, "a")
print(f"  Submissions: {len(sub_rows)}")

# ─── FINAL SUMMARY ────────────────────────────────────────────────────────────
print("\n✅ All inserts generated!")
print(f"   Output: {OUTPUT_FILE}")
import os
size_mb = os.path.getsize(OUTPUT_FILE) / 1024 / 1024
print(f"   File size: {size_mb:.1f} MB")
print(f"\nSummary:")
print(f"  Students:        {NUM_STUDENTS:,}")
print(f"  Lecturers:       {NUM_LECTURERS:,}")
print(f"  Admins:          {NUM_ADMINS:,}")
print(f"  Courses:         {len(courses):,}")
print(f"  Teaches:         {len(teaches_rows):,}")
print(f"  Enrol rows:      {len(enrol_rows):,}")
print(f"  Forums:          {len(forums):,}")
print(f"  Threads:         {len(threads):,}")
print(f"  Sections:        {len(sections):,}")
print(f"  Section Items:   {len(sec_items):,}")
print(f"  Calendar Events: {len(cal_events):,}")
print(f"  Submissions:     {len(sub_rows):,}")
