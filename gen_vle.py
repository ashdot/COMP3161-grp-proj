import random
import hashlib
import os
from faker import Faker

fake = Faker()
random.seed(42)
Faker.seed(42)

OUTPUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vle_inserts.sql")

NUM_STUDENTS  = 100_000
NUM_LECTURERS = 200
NUM_ADMINS    = 5
BATCH         = 1000

def student_id(i):  return 620_000_000 + i
def lecturer_id(i): return 200_000_000 + i
def admin_id(i):    return 111_000_000 + i
def hash_pw(plain): return hashlib.sha256(plain.encode()).hexdigest()[:60]
def esc(s):         return str(s).replace("'", "''")

COURSE_PREFIXES = {
    "Computer Science":"COMP","Mathematics":"MATH","Physics":"PHYS","Chemistry":"CHEM",
    "Biology":"BIOL","Engineering":"ENGR","Economics":"ECON","Management":"MGMT",
    "Law":"LAW0","Medicine":"MEDI","Psychology":"PSYC","Sociology":"SOCI",
    "History":"HIST","Literature":"LITE","Philosophy":"PHIL","Agriculture":"AGRI",
    "Education":"EDUC","Nursing":"NURS","Architecture":"ARCH","Accounting":"ACCT"
}

COURSE_TOPICS = {
    "Computer Science":["Intro to Programming","Data Structures","Algorithms","Operating Systems","Database Systems","Computer Networks","Software Engineering","Artificial Intelligence","Machine Learning","Cybersecurity","Web Development","Mobile Computing","Cloud Computing","Computer Graphics","Theory of Computation"],
    "Mathematics":["Calculus I","Calculus II","Linear Algebra","Discrete Mathematics","Probability and Statistics","Real Analysis","Abstract Algebra","Numerical Methods","Differential Equations","Topology","Number Theory","Graph Theory","Complex Analysis","Mathematical Modelling","Operations Research"],
    "Physics":["Classical Mechanics","Electromagnetism","Thermal Physics","Quantum Physics","Optics","Nuclear Physics","Astrophysics","Condensed Matter","Fluid Dynamics","Acoustics","Relativity Theory","Plasma Physics","Computational Physics","Experimental Methods","Particle Physics"],
    "Chemistry":["General Chemistry","Organic Chemistry","Inorganic Chemistry","Physical Chemistry","Analytical Chemistry","Biological Chemistry","Polymer Chemistry","Environmental Chemistry","Spectroscopy","Electrochemistry","Medicinal Chemistry","Computational Chemistry","Industrial Chemistry","Nanochemistry","Food Chemistry"],
    "Biology":["Cell Biology","Genetics","Ecology","Evolution","General Microbiology","Zoology","Botany","Human Physiology","Immunology","Molecular Biology","Neuroscience","Marine Biology","Conservation Biology","Developmental Biology","Parasitology"],
    "Engineering":["Engineering Mathematics","Statics","Dynamics","Materials Science","Engineering Thermodynamics","Fluid Mechanics","Circuit Analysis","Control Systems","Signal Processing","Structural Analysis","Environmental Engineering","Geotechnical Engineering","Manufacturing Processes","Project Management for Eng","Engineering Ethics"],
    "Economics":["Microeconomics","Macroeconomics","Development Economics","International Economics","Public Finance","Econometrics","Labour Economics","Environmental Economics","Health Economics","Monetary Economics","Industrial Organisation","Behavioural Economics","Game Theory","History of Economics","Financial Economics"],
    "Management":["Principles of Management","Organisational Behaviour","Marketing Management","Human Resource Management","Strategic Management","Operations Management","Entrepreneurship","Business Ethics","Innovation Management","Supply Chain Management","Project Management Adv","Change Management","Leadership","Corporate Governance","Risk Management"],
    "Law":["Constitutional Law","Contract Law","Criminal Law","Tort Law","Property Law","Administrative Law","International Law","Company Law","Human Rights Law","Family Law","Labour Law","Intellectual Property","Environmental Law","Tax Law","Procedure and Evidence"],
    "Medicine":["Human Anatomy","Medical Physiology","Clinical Biochemistry","Pharmacology","General Pathology","Medical Microbiology","Community Health","Clinical Medicine","Surgery","Paediatrics","Obstetrics","Psychiatry","Radiology","Ophthalmology","Forensic Medicine"],
    "Psychology":["Introduction to Psychology","Cognitive Psychology","Social Psychology","Developmental Psychology","Abnormal Psychology","Personality Psychology","Biopsychology","Psychological Research Methods","Clinical Psychology","Health Psychology","Forensic Psychology","Adv Educational Psychology","Organisational Psychology","Positive Psychology","Neuropsychology"],
    "Sociology":["Introduction to Sociology","Social Theory","Sociological Research Methods","Gender Studies","Race and Ethnicity","Urban Sociology","Rural Sociology","Criminology","Social Policy","Globalisation","Cultural Sociology","Medical Sociology","Political Sociology","Family Sociology","Environmental Sociology"],
    "History":["Ancient History","Medieval History","Modern History","Caribbean History","African History","World Wars","Colonial History","History of Science","Social History","Political History","World Economic History","Historiography","Latin American History","Asian History","History of Religion"],
    "Literature":["Introduction to Literature","Poetry Analysis","Prose Fiction","Drama and Theatre","Caribbean Literature","African Literature","Postcolonial Literature","Literary Theory","Creative Writing","Comparative Literature","Childrens Literature","Film and Literature","Womens Writing","World Literature","Language and Linguistics"],
    "Philosophy":["Introduction to Philosophy","Logic","Ethics","Political Philosophy","Metaphysics","Epistemology","Philosophy of Mind","Philosophy of Science","Aesthetics","Philosophy of Language","Eastern Philosophy","Applied Ethics","Philosophy of Religion","Continental Philosophy","Analytic Philosophy"],
    "Agriculture":["Crop Science","Animal Science","Soil Science","Agricultural Economics","Agronomy","Horticulture","Agricultural Pest Management","Agricultural Engineering","Irrigation Management","Food Science","Post Harvest Technology","Aquaculture","Agroforestry","Agricultural Extension","Sustainable Agriculture"],
    "Education":["Philosophy of Education","Curriculum Development","Learning Theory","Assessment and Evaluation","Special Education","Early Childhood Education","STEM Education","ICT in Education","Literacy Education","Educational Leadership","Comparative Education","Adult Education","Guidance and Counselling","Sociology of Education","Teaching Practice"],
    "Nursing":["Fundamentals of Nursing","Anatomy for Nurses","Medical Surgical Nursing","Paediatric Nursing","Maternal and Child Health","Mental Health Nursing","Community Nursing","Pharmacology for Nurses","Critical Care Nursing","Nursing Research","Nursing Ethics","Geriatric Nursing","Oncology Nursing","Emergency Nursing","Nursing Leadership"],
    "Architecture":["Architectural Design","History of Architecture","Building Construction","Structural Systems","Environmental Design","Urban Planning","Landscape Architecture","Architectural Theory","Digital Design","Building Services","Housing Design","Heritage Conservation","Interior Architecture","Professional Practice","Building Information Modelling"],
    "Accounting":["Financial Accounting","Management Accounting","Auditing","Taxation","Cost Accounting","Financial Reporting","Accounting Information Systems","Corporate Finance","Forensic Accounting","Public Sector Accounting","International Accounting","Accounting Theory","Business Law for Accountants","Advanced Auditing","Financial Analysis"],
}

# courseName is VARCHAR(50) — enforce the limit
def trim_name(name, limit=50):
    return name[:limit]

def write_inserts(f, table, cols, value_strings):
    if not value_strings: return
    col_str = ", ".join(cols)
    for b in range(0, len(value_strings), BATCH):
        chunk = value_strings[b : b + BATCH]
        f.write(f"INSERT INTO {table} ({col_str}) VALUES\n")
        f.write(",\n".join(chunk) + ";\n")

# ---------------------------------------------------------------------------
# Build course list
# ---------------------------------------------------------------------------
courses_meta = []   # (code, name, dept)
seen = set()
for dept, topics in COURSE_TOPICS.items():
    prefix = COURSE_PREFIXES[dept]
    for i, topic in enumerate(topics):
        if topic in seen:
            continue
        seen.add(topic)
        code  = f"{prefix}{i+100:04d}"[:8]          # VARCHAR(8)
        name  = trim_name(topic)                     # VARCHAR(50)
        courses_meta.append((code, name, dept))

course_codes = [c[0] for c in courses_meta]
num_courses  = len(course_codes)
print(f"Total courses: {num_courses}")
assert num_courses >= 200, f"Need >=200 courses, got {num_courses}"

# ---------------------------------------------------------------------------
# Assign lecturers to courses (1–5 courses each, every course >= 1 lecturer)
# ---------------------------------------------------------------------------
print("Assigning lecturers to courses...")

lecturer_ids           = [lecturer_id(i) for i in range(NUM_LECTURERS)]
lecturer_course_count  = {lid: 0 for lid in lecturer_ids}
course_lecturer_map    = {cc: [] for cc in course_codes}

shuffled_courses = course_codes[:]
random.shuffle(shuffled_courses)

lec_pool = lecturer_ids[:]
random.shuffle(lec_pool)
lec_idx = 0

# Pass 1: every course gets at least 1 lecturer
for cc in shuffled_courses:
    attempts = 0
    while lecturer_course_count[lec_pool[lec_idx]] >= 5:
        lec_idx = (lec_idx + 1) % NUM_LECTURERS
        attempts += 1
        if attempts > NUM_LECTURERS:
            raise RuntimeError("Not enough lecturer capacity to cover all courses!")
    lid = lec_pool[lec_idx]
    course_lecturer_map[cc].append(lid)
    lecturer_course_count[lid] += 1
    lec_idx = (lec_idx + 1) % NUM_LECTURERS

# Pass 2: every lecturer teaches at least 1 course
for lid in [l for l, c in lecturer_course_count.items() if c == 0]:
    cc = random.choice(course_codes)
    course_lecturer_map[cc].append(lid)
    lecturer_course_count[lid] += 1

# Pass 3: top up lecturers to 2–4 courses for a realistic spread
for lid in lecturer_ids:
    target = random.randint(2, 4)
    attempts = 0
    while lecturer_course_count[lid] < target and attempts < 200:
        cc = random.choice(course_codes)
        if lid not in course_lecturer_map[cc] and lecturer_course_count[lid] < 5:
            course_lecturer_map[cc].append(lid)
            lecturer_course_count[lid] += 1
        attempts += 1

for lid, cnt in lecturer_course_count.items():
    assert 1 <= cnt <= 5, f"Lecturer {lid} teaches {cnt} courses"

# Print distribution for verification
from collections import Counter
dist = Counter(lecturer_course_count.values())
print("Lecturer course load distribution:")
for k in sorted(dist):
    print(f"  {k} course(s): {dist[k]} lecturers")

# ---------------------------------------------------------------------------
# Assign students to courses (3–6 each, every course >= 10 students)
# ---------------------------------------------------------------------------
print("Assigning students to courses...")

student_ids_list   = [student_id(i) for i in range(NUM_STUDENTS)]
course_student_map = {cc: [] for cc in course_codes}
student_course_map = {sid: [] for sid in student_ids_list}

for sid in student_ids_list:
    for cc in random.sample(course_codes, random.randint(3, 6)):
        course_student_map[cc].append(sid)
        student_course_map[sid].append(cc)

for cc in course_codes:
    while len(course_student_map[cc]) < 10:
        candidate = random.choice(student_ids_list)
        if cc not in student_course_map[candidate] and len(student_course_map[candidate]) < 6:
            course_student_map[cc].append(candidate)
            student_course_map[candidate].append(cc)

for sid, courses in student_course_map.items():
    assert 3 <= len(courses) <= 6, f"Student {sid} enrolled in {len(courses)} courses"
for cc, students in course_student_map.items():
    assert len(students) >= 10, f"Course {cc} has only {len(students)} students"

print("All enrollment constraints verified ✅")

# ---------------------------------------------------------------------------
# Pre-compute SectionItem IDs so Submission can reference valid ones
# secItemID is AUTO_INCREMENT starting at 1:
#   2 sections × 2 items = 4 items per course → IDs 1 … num_courses*4
# ---------------------------------------------------------------------------
total_section_items = num_courses * 4   # 2 sections × 2 items per course

# ---------------------------------------------------------------------------
# Write SQL
# ---------------------------------------------------------------------------
with open(OUTPUT_FILE, "w", encoding="utf-8") as OUT:
    OUT.write("SET FOREIGN_KEY_CHECKS = 0;\nSET UNIQUE_CHECKS = 0;\nSET autocommit = 0;\n\n")

    # 1. UserAccount  (students + lecturers + admins)
    print("Writing UserAccount inserts...")
    user_rows = []

    for i in range(NUM_STUDENTS):
        uid = student_id(i)
        fn, ln = esc(fake.first_name()), esc(fake.last_name())
        email = f"{fn.lower()}.{ln.lower()}{i}@vle.uwi.edu"
        user_rows.append(
            f"({uid},'{fn}','{ln}','{email}','student','{hash_pw('pw'+str(uid))}')"
        )

    for i in range(NUM_LECTURERS):
        uid = lecturer_id(i)
        fn, ln = esc(fake.first_name()), esc(fake.last_name())
        email = f"{fn.lower()}.{ln.lower()}_staff{i}@vle.uwi.edu"
        user_rows.append(
            f"({uid},'{fn}','{ln}','{email}','lecturer','{hash_pw('pw'+str(uid))}')"
        )

    for i in range(NUM_ADMINS):
        uid = admin_id(i)
        fn, ln = esc(fake.first_name()), esc(fake.last_name())
        email = f"admin{i}@vle.uwi.edu"
        user_rows.append(
            f"({uid},'{fn}','{ln}','{email}','admin','{hash_pw('adminpw'+str(uid))}')"
        )

    write_inserts(OUT, "UserAccount",
                  ["userID","fname","lname","email","accessLvl","password"],
                  user_rows)

    # 2. Course
    print("Writing Course inserts...")
    course_rows = [
        f"('{code}','{esc(name)}','{esc(dept)}')"
        for code, name, dept in courses_meta
    ]
    write_inserts(OUT, "Course", ["courseCode","courseName","department"], course_rows)

    # 3. Enrol, Teaches, CourseMember
    print("Writing Enrol / Teaches / CourseMember inserts...")
    enrol_rows, teaches_rows, cm_rows = [], [], []

    for sid, courses in student_course_map.items():
        for cc in courses:
            enrol_rows.append(f"({sid},'{cc}',{random.randint(40,100)})")
            cm_rows.append(f"({sid},'student','{cc}')")

    for cc, lids in course_lecturer_map.items():
        for lid in lids:
            teaches_rows.append(f"({lid},'{cc}')")
            cm_rows.append(f"({lid},'lecturer','{cc}')")

    write_inserts(OUT, "Enrol",        ["userID","courseCode","grade"],       enrol_rows)
    write_inserts(OUT, "Teaches",      ["userID","courseCode"],               teaches_rows)
    write_inserts(OUT, "CourseMember", ["userID","memberRole","courseCode"],  cm_rows)

    # 4. DiscussionForum & DiscussionThread
    # topic is VARCHAR(20) — keep labels short
    print("Writing Forum / Thread inserts...")
    forum_rows, thread_rows = [], []
    SHORT_TOPICS = ["General", "Questions", "Feedback", "Resources", "Notices"]

    for idx, cc in enumerate(course_codes, 1):
        forum_rows.append(f"({idx},'{esc(cc)} Forum','{cc}')")
        for _ in range(2):
            uid   = random.choice(student_ids_list)
            topic = random.choice(SHORT_TOPICS)          # fits VARCHAR(20)
            body  = esc(fake.sentence()[:490])           # fits VARCHAR(500)
            thread_rows.append(
                f"(NULL,{idx},NULL,{uid},'{body}','{topic}','2026-04-01')"
            )

    write_inserts(OUT, "DiscussionForum",
                  ["dfID","dfname","courseCode"],
                  forum_rows)
    write_inserts(OUT, "DiscussionThread",
                  ["dtID","dfID","parentpostID","userID","threadbody","topic","date_created"],
                  thread_rows)

    # 5. CourseSection & SectionItems
    # secItemID is AUTO_INCREMENT → do NOT supply it; let MySQL assign 1…N
    print("Writing Section / SectionItems inserts...")
    sec_rows, item_rows = [], []
    sec_id = 1

    ITEM_TYPES = ["assignment", "links", "files", "slides"]   # <= 15 chars each

    for cc in course_codes:
        for s in range(1, 3):                                  # 2 sections per course
            sec_rows.append(f"({sec_id},'{esc('Section '+str(s))}','{cc}')")
            for _ in range(2):                                 # 2 items per section
                itype = random.choice(ITEM_TYPES)
                title = esc(fake.catch_phrase()[:50])
                body  = esc(fake.sentence()[:490])
                item_rows.append(
                    f"(NULL,{sec_id},'{title}','{body}',NULL,'{itype}','2026-05-15')"
                )
            sec_id += 1

    write_inserts(OUT, "CourseSection",
                  ["secID","secName","courseCode"],
                  sec_rows)
    write_inserts(OUT, "SectionItems",
                  ["secItemID","secID","title","secBody","secContent","itemtype","dueDate"],
                  item_rows)

    # 6. CourseCalendar & CalendarEvents
    print("Writing Calendar / Event inserts...")
    cal_rows, ev_rows = [], []

    for idx, cc in enumerate(course_codes, 1):
        cal_rows.append(f"({idx},'{cc}')")
        ev_rows.append(f"(NULL,{idx},'2026-05-20','Midterm Exam',NULL)")

    write_inserts(OUT, "CourseCalendar",
                  ["calendarID","courseCode"],
                  cal_rows)
    write_inserts(OUT, "CalendarEvents",
                  ["eventID","calendarID","eventDate","eventTitle","secItemID"],
                  ev_rows)

    # 7. Submission
    # secItemID must reference an existing SectionItems row (AUTO_INCREMENT 1…N)
    print("Writing Submission inserts...")
    sub_rows = []

    for sid in random.sample(student_ids_list, 5000):
        # Pick a random secItemID known to exist after the SectionItems inserts
        sec_item = random.randint(1, total_section_items)
        body     = esc(fake.sentence()[:200])
        sub_rows.append(
            f"(NULL,{sid},{sec_item},'{body}',NULL,'2026-04-15',{random.randint(50,100)})"
        )

    write_inserts(OUT, "Submission",
                  ["subID","userID","secItemID","subText","subContent","submDate","grade"],
                  sub_rows)

    OUT.write("\nCOMMIT;\nSET FOREIGN_KEY_CHECKS = 1;\n")

print(f"\n✅ Done! SQL written to {OUTPUT_FILE}")
print(f"   Students : {NUM_STUDENTS:,}")
print(f"   Lecturers: {NUM_LECTURERS:,}")
print(f"   Admins   : {NUM_ADMINS:,}")
print(f"   Courses  : {num_courses:,}")
print(f"   Section items: {total_section_items:,}")