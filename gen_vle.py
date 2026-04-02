# """
# VLE Database Population Script
# Generates SQL INSERT statements for the Vle database.

# Constraints met:
#   - 100,000 students  (IDs: 620xxxxxxx)
#   - 200 lecturers     (IDs: 200xxxxxxx)
#   - 10  admins        (IDs: 111xxxxxxx)
#   - 300 courses (safely over the 200 minimum)
#   - Each student enrols in 3-6 courses
#   - Each course has at least 10 student members
#   - Each lecturer teaches 1-5 courses
#   - Every lecturer teaches at least 1 course

# Requirements:
#     pip install faker

# Output:
#     vle_inserts.sql  (saved in the same folder as this script)
# """

# import random
# import hashlib
# import os
# from faker import Faker

# fake = Faker()
# random.seed(42)
# Faker.seed(42)

# OUTPUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vle_insert.sql")

# NUM_STUDENTS  = 100_000
# NUM_LECTURERS = 200
# NUM_ADMINS    = 10
# NUM_COURSES   = 300
# BATCH         = 500

# def student_id(i):  return 620_000_000 + i
# def lecturer_id(i): return 200_000_000 + i
# def admin_id(i):    return 111_000_000 + i
# def hash_pw(plain): return hashlib.sha256(plain.encode()).hexdigest()[:60]
# def esc(s):         return str(s).replace("'", "`")

# DEPARTMENTS = [
#     "Computer Science","Mathematics","Physics","Chemistry","Biology",
#     "Engineering","Economics","Management","Law","Medicine",
#     "Psychology","Sociology","History","Literature","Philosophy",
#     "Agriculture","Education","Nursing","Architecture","Accounting",
# ]

# COURSE_PREFIXES = {
#     "Computer Science":"COMP","Mathematics":"MATH","Physics":"PHYS",
#     "Chemistry":"CHEM","Biology":"BIOL","Engineering":"ENGR",
#     "Economics":"ECON","Management":"MGMT","Law":"LAW0",
#     "Medicine":"MEDI","Psychology":"PSYC","Sociology":"SOCI",
#     "History":"HIST","Literature":"LITE","Philosophy":"PHIL",
#     "Agriculture":"AGRI","Education":"EDUC","Nursing":"NURS",
#     "Architecture":"ARCH","Accounting":"ACCT",
# }

# COURSE_TOPICS = {
#     "Computer Science":["Intro to Programming","Data Structures","Algorithms","Operating Systems","Database Systems","Computer Networks","Software Engineering","Artificial Intelligence","Machine Learning","Cybersecurity","Web Development","Mobile Computing","Cloud Computing","Computer Graphics","Theory of Computation"],
#     "Mathematics":["Calculus I","Calculus II","Linear Algebra","Discrete Mathematics","Probability and Statistics","Real Analysis","Abstract Algebra","Numerical Methods","Differential Equations","Topology","Number Theory","Graph Theory","Complex Analysis","Mathematical Modelling","Operations Research"],
#     "Physics":["Mechanics","Electromagnetism","Thermodynamics","Quantum Physics","Optics","Nuclear Physics","Astrophysics","Condensed Matter","Fluid Dynamics","Acoustics","Relativity","Plasma Physics","Computational Physics","Experimental Methods","Particle Physics"],
#     "Chemistry":["General Chemistry","Organic Chemistry","Inorganic Chemistry","Physical Chemistry","Analytical Chemistry","Biochemistry","Polymer Chemistry","Environmental Chemistry","Spectroscopy","Electrochemistry","Medicinal Chemistry","Computational Chemistry","Industrial Chemistry","Nanochemistry","Food Chemistry"],
#     "Biology":["Cell Biology","Genetics","Ecology","Evolution","Microbiology","Zoology","Botany","Physiology","Immunology","Molecular Biology","Neuroscience","Marine Biology","Conservation Biology","Developmental Biology","Parasitology"],
#     "Engineering":["Engineering Mathematics","Statics","Dynamics","Materials Science","Thermodynamics","Fluid Mechanics","Circuit Analysis","Control Systems","Signal Processing","Structural Analysis","Environmental Engineering","Geotechnical Engineering","Manufacturing Processes","Project Management","Engineering Ethics"],
#     "Economics":["Microeconomics","Macroeconomics","Development Economics","International Economics","Public Finance","Econometrics","Labour Economics","Environmental Economics","Health Economics","Monetary Economics","Industrial Organisation","Behavioural Economics","Game Theory","Economic History","Financial Economics"],
#     "Management":["Principles of Management","Organisational Behaviour","Marketing Management","Human Resource Management","Strategic Management","Operations Management","Entrepreneurship","Business Ethics","Innovation Management","Supply Chain Management","Project Management Adv","Change Management","Leadership","Corporate Governance","Risk Management"],
#     "Law":["Constitutional Law","Contract Law","Criminal Law","Tort Law","Property Law","Administrative Law","International Law","Company Law","Human Rights Law","Family Law","Labour Law","Intellectual Property","Environmental Law","Tax Law","Procedure and Evidence"],
#     "Medicine":["Anatomy","Physiology","Biochemistry","Pharmacology","Pathology","Microbiology","Community Health","Clinical Medicine","Surgery","Paediatrics","Obstetrics","Psychiatry","Radiology","Ophthalmology","Forensic Medicine"],
#     "Psychology":["Introduction to Psychology","Cognitive Psychology","Social Psychology","Developmental Psychology","Abnormal Psychology","Personality Psychology","Biopsychology","Research Methods","Clinical Psychology","Health Psychology","Forensic Psychology","Educational Psychology","Organisational Psychology","Positive Psychology","Neuropsychology"],
#     "Sociology":["Introduction to Sociology","Social Theory","Research Methods","Gender Studies","Race and Ethnicity","Urban Sociology","Rural Sociology","Criminology","Social Policy","Globalisation","Cultural Sociology","Medical Sociology","Political Sociology","Family Sociology","Environmental Sociology"],
#     "History":["Ancient History","Medieval History","Modern History","Caribbean History","African History","World Wars","Colonial History","History of Science","Social History","Political History","Economic History","Historiography","Latin American History","Asian History","History of Religion"],
#     "Literature":["Introduction to Literature","Poetry Analysis","Prose Fiction","Drama and Theatre","Caribbean Literature","African Literature","Postcolonial Literature","Literary Theory","Creative Writing","Comparative Literature","Childrens Literature","Film and Literature","Womens Writing","World Literature","Language and Linguistics"],
#     "Philosophy":["Introduction to Philosophy","Logic","Ethics","Political Philosophy","Metaphysics","Epistemology","Philosophy of Mind","Philosophy of Science","Aesthetics","Philosophy of Language","Eastern Philosophy","Applied Ethics","Philosophy of Religion","Continental Philosophy","Analytic Philosophy"],
#     "Agriculture":["Crop Science","Animal Science","Soil Science","Agricultural Economics","Agronomy","Horticulture","Pest Management","Agricultural Engineering","Irrigation Management","Food Science","Post Harvest Technology","Aquaculture","Agroforestry","Agricultural Extension","Sustainable Agriculture"],
#     "Education":["Philosophy of Education","Curriculum Development","Educational Psychology","Assessment and Evaluation","Special Education","Early Childhood Education","STEM Education","ICT in Education","Literacy Education","Educational Leadership","Comparative Education","Adult Education","Guidance and Counselling","Sociology of Education","Teaching Practice"],
#     "Nursing":["Fundamentals of Nursing","Anatomy for Nurses","Medical Surgical Nursing","Paediatric Nursing","Maternal and Child Health","Mental Health Nursing","Community Nursing","Pharmacology for Nurses","Critical Care Nursing","Nursing Research","Nursing Ethics","Geriatric Nursing","Oncology Nursing","Emergency Nursing","Nursing Leadership"],
#     "Architecture":["Architectural Design","History of Architecture","Building Construction","Structural Systems","Environmental Design","Urban Planning","Landscape Architecture","Architectural Theory","Digital Design","Building Services","Housing Design","Heritage Conservation","Interior Architecture","Professional Practice","Building Information Modelling"],
#     "Accounting":["Financial Accounting","Management Accounting","Auditing","Taxation","Cost Accounting","Financial Reporting","Accounting Information Systems","Corporate Finance","Forensic Accounting","Public Sector Accounting","International Accounting","Accounting Theory","Business Law for Accountants","Advanced Auditing","Financial Analysis"],
# }

# def write_inserts(f, table, cols, value_strings):
#     col_str = ", ".join(cols)
#     for b in range(0, len(value_strings), BATCH):
#         chunk = value_strings[b : b + BATCH]
#         f.write(f"INSERT INTO {table} ({col_str}) VALUES\n")
#         f.write(",\n".join(chunk) + ";\n")

# with open(OUTPUT_FILE, "w", encoding="utf-8") as OUT:

#     OUT.write("-- ================================================================\n")
#     OUT.write("-- VLE Database Population Script\n")
#     OUT.write(f"-- Students:{NUM_STUDENTS:,}  Lecturers:{NUM_LECTURERS}  Courses:{NUM_COURSES}\n")
#     OUT.write("-- Run your CREATE TABLE schema BEFORE this file.\n")
#     OUT.write("-- Schema fix needed: SectionItems FK -> CourseSection(secID)\n")
#     OUT.write("-- ================================================================\n\n")
#     OUT.write("SET FOREIGN_KEY_CHECKS = 0;\n")
#     OUT.write("SET UNIQUE_CHECKS = 0;\n")
#     OUT.write("SET autocommit = 0;\n\n")

#     # ── 1. UserAccount ────────────────────────────────────────────────────────
#     print("Generating users...")
#     used_emails      = set()
#     lecturer_ids     = []
#     student_ids_list = []
#     user_rows        = []

#     def make_email(fname, lname, tag=""):
#         return f"{fname.lower()}.{lname.lower()}{tag}@vle.uwi.edu"

#     for i in range(NUM_STUDENTS):
#         uid   = student_id(i)
#         fname = esc(fake.first_name())
#         lname = esc(fake.last_name())
#         email = make_email(fname, lname)
#         tag   = 1
#         while email in used_emails:
#             email = make_email(fname, lname, str(tag)); tag += 1
#         used_emails.add(email)
#         pw = hash_pw(f"Student@{uid}")
#         user_rows.append(f"({uid},'{fname}','{lname}','{email}','student','{pw}')")
#         student_ids_list.append(uid)
#         if (i+1) % 25000 == 0: print(f"  {i+1:,} students...")

#     for i in range(NUM_LECTURERS):
#         uid   = lecturer_id(i)
#         fname = esc(fake.first_name())
#         lname = esc(fake.last_name())
#         email = make_email(fname, lname, f"_lec{i}")
#         while email in used_emails:
#             email = make_email(fname, lname, f"_lec{i}x")
#         used_emails.add(email)
#         pw = hash_pw(f"Lecturer@{uid}")
#         user_rows.append(f"({uid},'{fname}','{lname}','{email}','lecturer','{pw}')")
#         lecturer_ids.append(uid)

#     for i in range(NUM_ADMINS):
#         uid   = admin_id(i)
#         fname = esc(fake.first_name())
#         lname = esc(fake.last_name())
#         email = make_email(fname, lname, f"_adm{i}")
#         while email in used_emails:
#             email = make_email(fname, lname, f"_adm{i}x")
#         used_emails.add(email)
#         pw = hash_pw(f"Admin@{uid}")
#         user_rows.append(f"({uid},'{fname}','{lname}','{email}','admin','{pw}')")

#     OUT.write("-- ── UserAccount ──────────────────────────────────────────────\n")
#     write_inserts(OUT, "UserAccount",
#                   ["userID","fname","lname","email","accessLvl","password"], user_rows)
#     OUT.write("\n")
#     print(f"  {len(user_rows):,} users written.")

#     # ── 2. Course ─────────────────────────────────────────────────────────────
#     print("Generating courses...")
#     courses      = []
#     course_codes = []
#     counters     = {d: 1 for d in DEPARTMENTS}

#     for dept, topics in COURSE_TOPICS.items():
#         prefix = COURSE_PREFIXES[dept]
#         for topic in topics:
#             code = f"{prefix}{counters[dept]:04d}"[:8]
#             courses.append((code, topic[:50], dept))
#             course_codes.append(code)
#             counters[dept] += 1

#     course_rows = [f"('{cc}','{esc(cn)}','{dept}')" for cc,cn,dept in courses]
#     OUT.write("-- ── Course ───────────────────────────────────────────────────\n")
#     write_inserts(OUT, "Course", ["courseCode","courseName","department"], course_rows)
#     OUT.write("\n")
#     print(f"  {len(courses)} courses written.")

#     # ── 3. Teaches + CourseMember (lecturers) ─────────────────────────────────
#     print("Assigning lecturers to courses...")
#     lec_load    = {lid: 0 for lid in lecturer_ids}
#     lec_courses = {lid: [] for lid in lecturer_ids}
#     course_lec  = {}

#     shuffled_lec = lecturer_ids[:]
#     random.shuffle(shuffled_lec)
#     lec_ptr = 0

#     for cc in course_codes:
#         attempts = 0
#         while True:
#             lid = shuffled_lec[lec_ptr % len(shuffled_lec)]
#             lec_ptr += 1
#             if lec_load[lid] < 5:
#                 lec_courses[lid].append(cc)
#                 lec_load[lid] += 1
#                 course_lec[cc] = lid
#                 break
#             attempts += 1
#             if attempts > len(lecturer_ids) * 3:
#                 lid = min(lec_load, key=lec_load.get)
#                 lec_courses[lid].append(cc)
#                 lec_load[lid] += 1
#                 course_lec[cc] = lid
#                 break

#     for lid in lecturer_ids:
#         if lec_load[lid] == 0:
#             cc = random.choice(course_codes)
#             lec_courses[lid].append(cc)
#             lec_load[lid] += 1

#     teaches_rows = []
#     cm_lec_rows  = []
#     for lid, ccs in lec_courses.items():
#         for cc in ccs:
#             teaches_rows.append(f"({lid},'{cc}')")
#             cm_lec_rows.append(f"({lid},'lecturer','{cc}')")

#     OUT.write("-- ── Teaches ──────────────────────────────────────────────────\n")
#     write_inserts(OUT, "Teaches", ["userID","courseCode"], teaches_rows)
#     OUT.write("\n")
#     OUT.write("-- ── CourseMember (lecturers) ─────────────────────────────────\n")
#     write_inserts(OUT, "CourseMember", ["userID","memberRole","courseCode"], cm_lec_rows)
#     OUT.write("\n")
#     print(f"  {len(teaches_rows)} teaching assignments.")

#     # ── 4. Enrol + CourseMember (students) ────────────────────────────────────
#     print("Enrolling students...")
#     course_student_sets = {cc: set() for cc in course_codes}
#     student_course_map  = {sid: set() for sid in student_ids_list}

#     seed_ptr = 0
#     for cc in course_codes:
#         while len(course_student_sets[cc]) < 10:
#             sid = student_ids_list[seed_ptr % NUM_STUDENTS]
#             seed_ptr += 1
#             if sid not in course_student_sets[cc]:
#                 course_student_sets[cc].add(sid)
#                 student_course_map[sid].add(cc)

#     for idx, sid in enumerate(student_ids_list):
#         current = student_course_map[sid]
#         needed  = random.randint(3, 6) - len(current)
#         if needed > 0:
#             pool  = [cc for cc in course_codes if cc not in current]
#             picks = random.sample(pool, min(needed, len(pool)))
#             for cc in picks:
#                 student_course_map[sid].add(cc)
#                 course_student_sets[cc].add(sid)
#         if (idx+1) % 25000 == 0: print(f"  {idx+1:,} students enrolled...")

#     for sid in student_ids_list:
#         if len(student_course_map[sid]) > 6:
#             student_course_map[sid] = set(list(student_course_map[sid])[:6])

#     enrol_rows  = []
#     cm_stu_rows = []
#     for sid, ccs in student_course_map.items():
#         for cc in ccs:
#             grade = random.randint(40, 100) if random.random() > 0.15 else "NULL"
#             enrol_rows.append(f"({sid},'{cc}',{grade})")
#             cm_stu_rows.append(f"({sid},'student','{cc}')")

#     OUT.write("-- ── Enrol ────────────────────────────────────────────────────\n")
#     write_inserts(OUT, "Enrol", ["userID","courseCode","grade"], enrol_rows)
#     OUT.write("\n")
#     OUT.write("-- ── CourseMember (students) ──────────────────────────────────\n")
#     write_inserts(OUT, "CourseMember", ["userID","memberRole","courseCode"], cm_stu_rows)
#     OUT.write("\n")
#     print(f"  {len(enrol_rows):,} enrollments written.")

#     # ── 5. DiscussionForum + DiscussionThread ─────────────────────────────────
#     print("Generating forums and threads...")
#     FORUM_NAMES   = ["General Discussion","Q and A","Assignment Help","Study Groups","Announcements","Debate Corner"]
#     THREAD_TOPICS = ["Question","Help","Discussion","Feedback","Clarification","Resources","Review"]

#     forums   = []
#     threads  = []
#     forum_id = 1
#     thread_id= 1

#     for cc in course_codes:
#         members = list(course_student_sets[cc]) + [course_lec.get(cc)]
#         members = [m for m in members if m is not None]
#         for j in range(2):
#             forums.append((forum_id, FORUM_NAMES[j % len(FORUM_NAMES)], cc))
#             dfid = forum_id; forum_id += 1
#             root_ids = []
#             for _ in range(3):
#                 uid   = random.choice(members)
#                 body  = esc(fake.sentence(nb_words=random.randint(8,25))[:500])
#                 topic = random.choice(THREAD_TOPICS)
#                 dt    = fake.date_between(start_date="-2y", end_date="today")
#                 threads.append((thread_id, dfid, None, uid, body, topic, dt))
#                 root_ids.append(thread_id); thread_id += 1
#             for rid in root_ids:
#                 for _ in range(random.randint(1,3)):
#                     uid  = random.choice(members)
#                     body = esc(fake.sentence(nb_words=random.randint(5,15))[:500])
#                     dt   = fake.date_between(start_date="-2y", end_date="today")
#                     threads.append((thread_id, dfid, rid, uid, body, None, dt))
#                     thread_id += 1

#     forum_rows = [f"({fid},'{esc(fn)}','{cc}')" for fid,fn,cc in forums]
#     OUT.write("-- ── DiscussionForum ──────────────────────────────────────────\n")
#     write_inserts(OUT, "DiscussionForum", ["dfID","dfname","courseCode"], forum_rows)
#     OUT.write("\n")

#     thread_rows = []
#     for d,df,pp,u,body,topic,dt in threads:
#         pp_val    = str(pp) if pp is not None else "NULL"
#         topic_val = f"'{topic}'" if topic is not None else "NULL"
#         thread_rows.append(f"({d},{df},{pp_val},{u},'{body}',{topic_val},'{dt}')")

#     OUT.write("-- ── DiscussionThread ─────────────────────────────────────────\n")
#     write_inserts(OUT, "DiscussionThread",
#                   ["dtID","dfID","parentpostID","userID","threadbody","topic","date_created"],
#                   thread_rows)
#     OUT.write("\n")
#     print(f"  {len(forums)} forums | {len(threads):,} threads written.")

#     # ── 6. CourseSection ──────────────────────────────────────────────────────
#     print("Generating course sections...")
#     SECTION_NAMES = ["Week 1 - Introduction","Week 2 - Core Concepts","Week 3 - Applications",
#                      "Week 4 - Advanced Topics","Week 5 - Case Studies","Week 6 - Group Work",
#                      "Midterm Review","Week 8","Week 9","Week 10",
#                      "Week 11","Final Review","Assignments","Resources","Announcements"]

#     sections          = []
#     section_by_course = {}
#     sec_id = 1

#     for cc in course_codes:
#         section_by_course[cc] = []
#         names = random.sample(SECTION_NAMES, random.randint(5,10))
#         for name in names:
#             sections.append((sec_id, name, cc))
#             section_by_course[cc].append(sec_id)
#             sec_id += 1

#     sec_rows = [f"({s},'{esc(n)}','{cc}')" for s,n,cc in sections]
#     OUT.write("-- ── CourseSection ────────────────────────────────────────────\n")
#     write_inserts(OUT, "CourseSection", ["secID","secname","courseCode"], sec_rows)
#     OUT.write("\n")
#     print(f"  {len(sections)} sections written.")

#     # ── 7. SectionItems ───────────────────────────────────────────────────────
#     print("Generating section items...")
#     ITEM_TYPES  = ["assignment","links","files","slides"]
#     ITEM_TITLES = ["Lecture Notes","Assignment {}","Reading Material","Tutorial Slides",
#                    "Lab Sheet","Problem Set {}","Quiz {}","Project Guidelines",
#                    "Reference Links","Supplementary Reading"]

#     sec_items         = []
#     secitem_by_course = {}
#     sec_item_id = 1

#     for cc in course_codes:
#         secitem_by_course[cc] = []
#         for sid_s in section_by_course[cc]:
#             for k in range(random.randint(2,5)):
#                 itype = random.choice(ITEM_TYPES)
#                 title = random.choice(ITEM_TITLES).format(k+1)[:50]
#                 body  = esc(fake.sentence(nb_words=15)[:500])
#                 due   = fake.date_between(start_date="-1y", end_date="+6m") if itype=="assignment" else None
#                 sec_items.append((sec_item_id, sid_s, title, body, itype, due))
#                 if itype == "assignment":
#                     secitem_by_course[cc].append(sec_item_id)
#                 sec_item_id += 1

#     si_rows = []
#     for si,s,t,b2,it,d in sec_items:
#         due_val = f"'{d}'" if d is not None else "NULL"
#         si_rows.append(f"({si},{s},'{esc(t)}','{b2}','{it}',{due_val})")

#     OUT.write("-- ── SectionItems ─────────────────────────────────────────────\n")
#     write_inserts(OUT, "SectionItems",
#                   ["secItemID","secID","title","secBody","itemtype","dueDate"], si_rows)
#     OUT.write("\n")
#     print(f"  {len(sec_items):,} section items written.")

#     # ── 8. CourseCalendar + CalendarEvents ────────────────────────────────────
#     print("Generating calendars and events...")
#     EVENT_TITLES = ["Lecture","Tutorial","Lab Session","Office Hours","Quiz",
#                     "Midterm Exam","Final Exam","Assignment Due","Project Submission",
#                     "Guest Lecture","Study Group","Review Session","Workshop","Seminar"]

#     calendars  = []
#     cal_events = []
#     cal_id   = 1
#     event_id = 1

#     for cc in course_codes:
#         calendars.append((cal_id, cc))
#         for _ in range(random.randint(8,15)):
#             dt    = fake.date_between(start_date="-1y", end_date="+6m")
#             title = random.choice(EVENT_TITLES)
#             siid  = random.choice(secitem_by_course[cc]) if secitem_by_course[cc] and random.random()>0.5 else None
#             cal_events.append((event_id, cal_id, dt, title, siid))
#             event_id += 1
#         cal_id += 1

#     cal_rows = [f"({c},'{cc}')" for c,cc in calendars]
#     OUT.write("-- ── CourseCalendar ───────────────────────────────────────────\n")
#     write_inserts(OUT, "CourseCalendar", ["calenderID","courseCode"], cal_rows)
#     OUT.write("\n")

#     ev_rows = []
#     for e,c,d,t,si in cal_events:
#         si_val = str(si) if si is not None else "NULL"
#         ev_rows.append(f"({e},{c},'{d}','{esc(t)}',{si_val})")

#     OUT.write("-- ── CalendarEvents ───────────────────────────────────────────\n")
#     write_inserts(OUT, "CalendarEvents",
#                   ["eventID","calenderID","eventDate","eventTitle","secItemID"], ev_rows)
#     OUT.write("\n")
#     print(f"  {len(calendars)} calendars | {len(cal_events):,} events written.")

#     # ── 9. Submission ─────────────────────────────────────────────────────────
#     print("Generating submissions...")
#     sub_rows = []
#     sub_id   = 1

#     for cc in course_codes:
#         assignment_items = secitem_by_course[cc]
#         if not assignment_items: continue
#         sampled = random.sample(list(course_student_sets[cc]), min(30, len(course_student_sets[cc])))
#         for sid in sampled:
#             n = max(1, int(len(assignment_items) * random.uniform(0.5, 1.0)))
#             for siid in random.sample(assignment_items, min(n, len(assignment_items))):
#                 text  = esc(fake.sentence(nb_words=20)[:200])
#                 dt    = fake.date_between(start_date="-1y", end_date="today")
#                 grade = random.randint(40,100) if random.random() > 0.1 else "NULL"
#                 sub_rows.append(f"({sub_id},{sid},{siid},'{text}',NULL,'{dt}',{grade})")
#                 sub_id += 1

#     OUT.write("-- ── Submission ───────────────────────────────────────────────\n")
#     write_inserts(OUT, "Submission",
#                   ["subID","userID","secItemID","subText","subContent","submDate","grade"],
#                   sub_rows)
#     OUT.write("\n")
#     print(f"  {len(sub_rows):,} submissions written.")

#     OUT.write("COMMIT;\n")
#     OUT.write("SET FOREIGN_KEY_CHECKS = 1;\n")
#     OUT.write("SET UNIQUE_CHECKS = 1;\n")
#     OUT.write("SET autocommit = 1;\n")

# size_mb = os.path.getsize(OUTPUT_FILE) / 1024 / 1024
# print(f"\n✅  Done!  ->  {OUTPUT_FILE}")
# print(f"    File size   : {size_mb:.1f} MB")
# print(f"    Students    : {NUM_STUDENTS:,}")
# print(f"    Lecturers   : {NUM_LECTURERS}")
# print(f"    Admins      : {NUM_ADMINS}")
# print(f"    Courses     : {len(courses)}")
# print(f"    Enrollments : {len(enrol_rows):,}")
# print(f"    Threads     : {len(threads):,}")
# print(f"    Submissions : {len(sub_rows):,}")


"""
VLE Database Population Script
Generates SQL INSERT statements for the Vle database.

Constraints met:
  - 100,000 students  (IDs: 620xxxxxxx)
  - 200 lecturers     (IDs: 200xxxxxxx)
  - 10  admins        (IDs: 111xxxxxxx)
  - 300 courses (safely over the 200 minimum)
  - Each student enrols in 3-6 courses
  - Each course has at least 10 student members
  - Each lecturer teaches 1-5 courses
  - Every lecturer teaches at least 1 course

Requirements:
    pip install faker

Output:
    vle_inserts.sql  (saved in the same folder as this script)
"""

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
NUM_ADMINS    = 10
NUM_COURSES   = 300
BATCH         = 500

def student_id(i):  return 620_000_000 + i
def lecturer_id(i): return 200_000_000 + i
def admin_id(i):    return 111_000_000 + i
def hash_pw(plain): return hashlib.sha256(plain.encode()).hexdigest()[:60]
def esc(s):         return str(s).replace("'", "`")

DEPARTMENTS = [
    "Computer Science","Mathematics","Physics","Chemistry","Biology",
    "Engineering","Economics","Management","Law","Medicine",
    "Psychology","Sociology","History","Literature","Philosophy",
    "Agriculture","Education","Nursing","Architecture","Accounting",
]

COURSE_PREFIXES = {
    "Computer Science":"COMP","Mathematics":"MATH","Physics":"PHYS",
    "Chemistry":"CHEM","Biology":"BIOL","Engineering":"ENGR",
    "Economics":"ECON","Management":"MGMT","Law":"LAW0",
    "Medicine":"MEDI","Psychology":"PSYC","Sociology":"SOCI",
    "History":"HIST","Literature":"LITE","Philosophy":"PHIL",
    "Agriculture":"AGRI","Education":"EDUC","Nursing":"NURS",
    "Architecture":"ARCH","Accounting":"ACCT",
}

COURSE_TOPICS = {
    "Computer Science":["Intro to Programming","Data Structures","Algorithms","Operating Systems","Database Systems","Computer Networks","Software Engineering","Artificial Intelligence","Machine Learning","Cybersecurity","Web Development","Mobile Computing","Cloud Computing","Computer Graphics","Theory of Computation"],
    "Mathematics":["Calculus I","Calculus II","Linear Algebra","Discrete Mathematics","Probability and Statistics","Real Analysis","Abstract Algebra","Numerical Methods","Differential Equations","Topology","Number Theory","Graph Theory","Complex Analysis","Mathematical Modelling","Operations Research"],
    "Physics":["Mechanics","Electromagnetism","Thermodynamics","Quantum Physics","Optics","Nuclear Physics","Astrophysics","Condensed Matter","Fluid Dynamics","Acoustics","Relativity","Plasma Physics","Computational Physics","Experimental Methods","Particle Physics"],
    "Chemistry":["General Chemistry","Organic Chemistry","Inorganic Chemistry","Physical Chemistry","Analytical Chemistry","Biochemistry","Polymer Chemistry","Environmental Chemistry","Spectroscopy","Electrochemistry","Medicinal Chemistry","Computational Chemistry","Industrial Chemistry","Nanochemistry","Food Chemistry"],
    "Biology":["Cell Biology","Genetics","Ecology","Evolution","Microbiology","Zoology","Botany","Physiology","Immunology","Molecular Biology","Neuroscience","Marine Biology","Conservation Biology","Developmental Biology","Parasitology"],
    "Engineering":["Engineering Mathematics","Statics","Dynamics","Materials Science","Thermodynamics","Fluid Mechanics","Circuit Analysis","Control Systems","Signal Processing","Structural Analysis","Environmental Engineering","Geotechnical Engineering","Manufacturing Processes","Project Management","Engineering Ethics"],
    "Economics":["Microeconomics","Macroeconomics","Development Economics","International Economics","Public Finance","Econometrics","Labour Economics","Environmental Economics","Health Economics","Monetary Economics","Industrial Organisation","Behavioural Economics","Game Theory","Economic History","Financial Economics"],
    "Management":["Principles of Management","Organisational Behaviour","Marketing Management","Human Resource Management","Strategic Management","Operations Management","Entrepreneurship","Business Ethics","Innovation Management","Supply Chain Management","Project Management Adv","Change Management","Leadership","Corporate Governance","Risk Management"],
    "Law":["Constitutional Law","Contract Law","Criminal Law","Tort Law","Property Law","Administrative Law","International Law","Company Law","Human Rights Law","Family Law","Labour Law","Intellectual Property","Environmental Law","Tax Law","Procedure and Evidence"],
    "Medicine":["Anatomy","Physiology","Biochemistry","Pharmacology","Pathology","Microbiology","Community Health","Clinical Medicine","Surgery","Paediatrics","Obstetrics","Psychiatry","Radiology","Ophthalmology","Forensic Medicine"],
    "Psychology":["Introduction to Psychology","Cognitive Psychology","Social Psychology","Developmental Psychology","Abnormal Psychology","Personality Psychology","Biopsychology","Research Methods","Clinical Psychology","Health Psychology","Forensic Psychology","Educational Psychology","Organisational Psychology","Positive Psychology","Neuropsychology"],
    "Sociology":["Introduction to Sociology","Social Theory","Research Methods","Gender Studies","Race and Ethnicity","Urban Sociology","Rural Sociology","Criminology","Social Policy","Globalisation","Cultural Sociology","Medical Sociology","Political Sociology","Family Sociology","Environmental Sociology"],
    "History":["Ancient History","Medieval History","Modern History","Caribbean History","African History","World Wars","Colonial History","History of Science","Social History","Political History","Economic History","Historiography","Latin American History","Asian History","History of Religion"],
    "Literature":["Introduction to Literature","Poetry Analysis","Prose Fiction","Drama and Theatre","Caribbean Literature","African Literature","Postcolonial Literature","Literary Theory","Creative Writing","Comparative Literature","Childrens Literature","Film and Literature","Womens Writing","World Literature","Language and Linguistics"],
    "Philosophy":["Introduction to Philosophy","Logic","Ethics","Political Philosophy","Metaphysics","Epistemology","Philosophy of Mind","Philosophy of Science","Aesthetics","Philosophy of Language","Eastern Philosophy","Applied Ethics","Philosophy of Religion","Continental Philosophy","Analytic Philosophy"],
    "Agriculture":["Crop Science","Animal Science","Soil Science","Agricultural Economics","Agronomy","Horticulture","Pest Management","Agricultural Engineering","Irrigation Management","Food Science","Post Harvest Technology","Aquaculture","Agroforestry","Agricultural Extension","Sustainable Agriculture"],
    "Education":["Philosophy of Education","Curriculum Development","Educational Psychology","Assessment and Evaluation","Special Education","Early Childhood Education","STEM Education","ICT in Education","Literacy Education","Educational Leadership","Comparative Education","Adult Education","Guidance and Counselling","Sociology of Education","Teaching Practice"],
    "Nursing":["Fundamentals of Nursing","Anatomy for Nurses","Medical Surgical Nursing","Paediatric Nursing","Maternal and Child Health","Mental Health Nursing","Community Nursing","Pharmacology for Nurses","Critical Care Nursing","Nursing Research","Nursing Ethics","Geriatric Nursing","Oncology Nursing","Emergency Nursing","Nursing Leadership"],
    "Architecture":["Architectural Design","History of Architecture","Building Construction","Structural Systems","Environmental Design","Urban Planning","Landscape Architecture","Architectural Theory","Digital Design","Building Services","Housing Design","Heritage Conservation","Interior Architecture","Professional Practice","Building Information Modelling"],
    "Accounting":["Financial Accounting","Management Accounting","Auditing","Taxation","Cost Accounting","Financial Reporting","Accounting Information Systems","Corporate Finance","Forensic Accounting","Public Sector Accounting","International Accounting","Accounting Theory","Business Law for Accountants","Advanced Auditing","Financial Analysis"],
}

def write_inserts(f, table, cols, value_strings):
    col_str = ", ".join(cols)
    for b in range(0, len(value_strings), BATCH):
        chunk = value_strings[b : b + BATCH]
        f.write(f"INSERT INTO {table} ({col_str}) VALUES\n")
        f.write(",\n".join(chunk) + ";\n")

with open(OUTPUT_FILE, "w", encoding="utf-8") as OUT:

    OUT.write("-- ================================================================\n")
    OUT.write("-- VLE Database Population Script\n")
    OUT.write(f"-- Students:{NUM_STUDENTS:,}  Lecturers:{NUM_LECTURERS}  Courses:{NUM_COURSES}\n")
    OUT.write("-- Run your CREATE TABLE schema BEFORE this file.\n")
    OUT.write("-- Schema fix needed: SectionItems FK -> CourseSection(secID)\n")
    OUT.write("-- ================================================================\n\n")
    OUT.write("SET FOREIGN_KEY_CHECKS = 0;\n")
    OUT.write("SET UNIQUE_CHECKS = 0;\n")
    OUT.write("SET autocommit = 0;\n\n")

    # ── 1. UserAccount ────────────────────────────────────────────────────────
    print("Generating users...")
    used_emails      = set()
    lecturer_ids     = []
    student_ids_list = []
    user_rows        = []

    def make_email(fname, lname, tag=""):
        return f"{fname.lower()}.{lname.lower()}{tag}@vle.uwi.edu"

    for i in range(NUM_STUDENTS):
        uid   = student_id(i)
        fname = esc(fake.first_name())
        lname = esc(fake.last_name())
        email = make_email(fname, lname)
        tag   = 1
        while email in used_emails:
            email = make_email(fname, lname, str(tag)); tag += 1
        used_emails.add(email)
        pw = hash_pw(f"Student@{uid}")
        user_rows.append(f"({uid},'{fname}','{lname}','{email}','student','{pw}')")
        student_ids_list.append(uid)
        if (i+1) % 25000 == 0: print(f"  {i+1:,} students...")

    for i in range(NUM_LECTURERS):
        uid   = lecturer_id(i)
        fname = esc(fake.first_name())
        lname = esc(fake.last_name())
        email = make_email(fname, lname, f"_lec{i}")
        while email in used_emails:
            email = make_email(fname, lname, f"_lec{i}x")
        used_emails.add(email)
        pw = hash_pw(f"Lecturer@{uid}")
        user_rows.append(f"({uid},'{fname}','{lname}','{email}','lecturer','{pw}')")
        lecturer_ids.append(uid)

    for i in range(NUM_ADMINS):
        uid   = admin_id(i)
        fname = esc(fake.first_name())
        lname = esc(fake.last_name())
        email = make_email(fname, lname, f"_adm{i}")
        while email in used_emails:
            email = make_email(fname, lname, f"_adm{i}x")
        used_emails.add(email)
        pw = hash_pw(f"Admin@{uid}")
        user_rows.append(f"({uid},'{fname}','{lname}','{email}','admin','{pw}')")

    OUT.write("-- ── UserAccount ──────────────────────────────────────────────\n")
    write_inserts(OUT, "UserAccount",
                  ["userID","fname","lname","email","accessLvl","password"], user_rows)
    OUT.write("\n")
    print(f"  {len(user_rows):,} users written.")

    # ── 2. Course ─────────────────────────────────────────────────────────────
    print("Generating courses...")
    courses      = []
    course_codes = []
    counters     = {d: 1 for d in DEPARTMENTS}

    for dept, topics in COURSE_TOPICS.items():
        prefix = COURSE_PREFIXES[dept]
        for topic in topics:
            code = f"{prefix}{counters[dept]:04d}"[:8]
            # Prefix with dept code to guarantee globally unique course names
            unique_name = f"{prefix} {topic}"[:50]
            courses.append((code, unique_name, dept))
            course_codes.append(code)
            counters[dept] += 1

    course_rows = [f"(\'{cc}\',\'{esc(cn)}\',\'{dept}\')" for cc,cn,dept in courses]
    OUT.write("-- ── Course ───────────────────────────────────────────────────\n")
    write_inserts(OUT, "Course", ["courseCode","courseName","department"], course_rows)
    OUT.write("\n")
    print(f"  {len(courses)} courses written.")

    # ── 3. Teaches + CourseMember (lecturers) ─────────────────────────────────
    print("Assigning lecturers to courses...")
    lec_load    = {lid: 0 for lid in lecturer_ids}
    lec_courses = {lid: [] for lid in lecturer_ids}
    course_lec  = {}

    shuffled_lec = lecturer_ids[:]
    random.shuffle(shuffled_lec)
    lec_ptr = 0

    for cc in course_codes:
        attempts = 0
        while True:
            lid = shuffled_lec[lec_ptr % len(shuffled_lec)]
            lec_ptr += 1
            if lec_load[lid] < 5:
                lec_courses[lid].append(cc)
                lec_load[lid] += 1
                course_lec[cc] = lid
                break
            attempts += 1
            if attempts > len(lecturer_ids) * 3:
                lid = min(lec_load, key=lec_load.get)
                lec_courses[lid].append(cc)
                lec_load[lid] += 1
                course_lec[cc] = lid
                break

    for lid in lecturer_ids:
        if lec_load[lid] == 0:
            cc = random.choice(course_codes)
            lec_courses[lid].append(cc)
            lec_load[lid] += 1

    teaches_rows = []
    cm_lec_rows  = []
    for lid, ccs in lec_courses.items():
        for cc in ccs:
            teaches_rows.append(f"({lid},'{cc}')")
            cm_lec_rows.append(f"({lid},'lecturer','{cc}')")

    OUT.write("-- ── Teaches ──────────────────────────────────────────────────\n")
    write_inserts(OUT, "Teaches", ["userID","courseCode"], teaches_rows)
    OUT.write("\n")
    OUT.write("-- ── CourseMember (lecturers) ─────────────────────────────────\n")
    write_inserts(OUT, "CourseMember", ["userID","memberRole","courseCode"], cm_lec_rows)
    OUT.write("\n")
    print(f"  {len(teaches_rows)} teaching assignments.")

    # ── 4. Enrol + CourseMember (students) ────────────────────────────────────
    print("Enrolling students...")
    course_student_sets = {cc: set() for cc in course_codes}
    student_course_map  = {sid: set() for sid in student_ids_list}

    seed_ptr = 0
    for cc in course_codes:
        while len(course_student_sets[cc]) < 10:
            sid = student_ids_list[seed_ptr % NUM_STUDENTS]
            seed_ptr += 1
            if sid not in course_student_sets[cc]:
                course_student_sets[cc].add(sid)
                student_course_map[sid].add(cc)

    for idx, sid in enumerate(student_ids_list):
        current = student_course_map[sid]
        needed  = random.randint(3, 6) - len(current)
        if needed > 0:
            pool  = [cc for cc in course_codes if cc not in current]
            picks = random.sample(pool, min(needed, len(pool)))
            for cc in picks:
                student_course_map[sid].add(cc)
                course_student_sets[cc].add(sid)
        if (idx+1) % 25000 == 0: print(f"  {idx+1:,} students enrolled...")

    for sid in student_ids_list:
        if len(student_course_map[sid]) > 6:
            student_course_map[sid] = set(list(student_course_map[sid])[:6])

    enrol_rows  = []
    cm_stu_rows = []
    for sid, ccs in student_course_map.items():
        for cc in ccs:
            grade = random.randint(40, 100) if random.random() > 0.15 else "NULL"
            enrol_rows.append(f"({sid},'{cc}',{grade})")
            cm_stu_rows.append(f"({sid},'student','{cc}')")

    OUT.write("-- ── Enrol ────────────────────────────────────────────────────\n")
    write_inserts(OUT, "Enrol", ["userID","courseCode","grade"], enrol_rows)
    OUT.write("\n")
    OUT.write("-- ── CourseMember (students) ──────────────────────────────────\n")
    write_inserts(OUT, "CourseMember", ["userID","memberRole","courseCode"], cm_stu_rows)
    OUT.write("\n")
    print(f"  {len(enrol_rows):,} enrollments written.")

    # ── 5. DiscussionForum + DiscussionThread ─────────────────────────────────
    print("Generating forums and threads...")
    FORUM_NAMES   = ["General Discussion","Q and A","Assignment Help","Study Groups","Announcements","Debate Corner"]
    THREAD_TOPICS = ["Question","Help","Discussion","Feedback","Clarification","Resources","Review"]

    forums   = []
    threads  = []
    forum_id = 1
    thread_id= 1

    for cc in course_codes:
        members = list(course_student_sets[cc]) + [course_lec.get(cc)]
        members = [m for m in members if m is not None]
        for j in range(2):
            forums.append((forum_id, FORUM_NAMES[j % len(FORUM_NAMES)], cc))
            dfid = forum_id; forum_id += 1
            root_ids = []
            for _ in range(3):
                uid   = random.choice(members)
                body  = esc(fake.sentence(nb_words=random.randint(8,25))[:500])
                topic = random.choice(THREAD_TOPICS)
                dt    = fake.date_between(start_date="-2y", end_date="today")
                threads.append((thread_id, dfid, None, uid, body, topic, dt))
                root_ids.append(thread_id); thread_id += 1
            for rid in root_ids:
                for _ in range(random.randint(1,3)):
                    uid  = random.choice(members)
                    body = esc(fake.sentence(nb_words=random.randint(5,15))[:500])
                    dt   = fake.date_between(start_date="-2y", end_date="today")
                    threads.append((thread_id, dfid, rid, uid, body, None, dt))
                    thread_id += 1

    forum_rows = [f"({fid},'{esc(fn)}','{cc}')" for fid,fn,cc in forums]
    OUT.write("-- ── DiscussionForum ──────────────────────────────────────────\n")
    write_inserts(OUT, "DiscussionForum", ["dfID","dfname","courseCode"], forum_rows)
    OUT.write("\n")

    thread_rows = []
    for d,df,pp,u,body,topic,dt in threads:
        pp_val    = str(pp) if pp is not None else "NULL"
        topic_val = f"'{topic}'" if topic is not None else "NULL"
        thread_rows.append(f"({d},{df},{pp_val},{u},'{body}',{topic_val},'{dt}')")

    OUT.write("-- ── DiscussionThread ─────────────────────────────────────────\n")
    write_inserts(OUT, "DiscussionThread",
                  ["dtID","dfID","parentpostID","userID","threadbody","topic","date_created"],
                  thread_rows)
    OUT.write("\n")
    print(f"  {len(forums)} forums | {len(threads):,} threads written.")

    # ── 6. CourseSection ──────────────────────────────────────────────────────
    print("Generating course sections...")
    SECTION_NAMES = ["Week 1 - Introduction","Week 2 - Core Concepts","Week 3 - Applications",
                     "Week 4 - Advanced Topics","Week 5 - Case Studies","Week 6 - Group Work",
                     "Midterm Review","Week 8","Week 9","Week 10",
                     "Week 11","Final Review","Assignments","Resources","Announcements"]

    sections          = []
    section_by_course = {}
    sec_id = 1

    for cc in course_codes:
        section_by_course[cc] = []
        names = random.sample(SECTION_NAMES, random.randint(5,10))
        for name in names:
            sections.append((sec_id, name, cc))
            section_by_course[cc].append(sec_id)
            sec_id += 1

    sec_rows = [f"({s},'{esc(n)}','{cc}')" for s,n,cc in sections]
    OUT.write("-- ── CourseSection ────────────────────────────────────────────\n")
    write_inserts(OUT, "CourseSection", ["secID","secname","courseCode"], sec_rows)
    OUT.write("\n")
    print(f"  {len(sections)} sections written.")

    # ── 7. SectionItems ───────────────────────────────────────────────────────
    print("Generating section items...")
    ITEM_TYPES  = ["assignment","links","files","slides"]
    ITEM_TITLES = ["Lecture Notes","Assignment {}","Reading Material","Tutorial Slides",
                   "Lab Sheet","Problem Set {}","Quiz {}","Project Guidelines",
                   "Reference Links","Supplementary Reading"]

    sec_items         = []
    secitem_by_course = {}
    sec_item_id = 1

    for cc in course_codes:
        secitem_by_course[cc] = []
        for sid_s in section_by_course[cc]:
            for k in range(random.randint(2,5)):
                itype = random.choice(ITEM_TYPES)
                title = random.choice(ITEM_TITLES).format(k+1)[:50]
                body  = esc(fake.sentence(nb_words=15)[:500])
                due   = fake.date_between(start_date="-1y", end_date="+6m") if itype=="assignment" else None
                sec_items.append((sec_item_id, sid_s, title, body, itype, due))
                if itype == "assignment":
                    secitem_by_course[cc].append(sec_item_id)
                sec_item_id += 1

    si_rows = []
    for si,s,t,b2,it,d in sec_items:
        due_val = f"'{d}'" if d is not None else "NULL"
        si_rows.append(f"({si},{s},'{esc(t)}','{b2}','{it}',{due_val})")

    OUT.write("-- ── SectionItems ─────────────────────────────────────────────\n")
    write_inserts(OUT, "SectionItems",
                  ["secItemID","secID","title","secBody","itemtype","dueDate"], si_rows)
    OUT.write("\n")
    print(f"  {len(sec_items):,} section items written.")

    # ── 8. CourseCalendar + CalendarEvents ────────────────────────────────────
    print("Generating calendars and events...")
    EVENT_TITLES = ["Lecture","Tutorial","Lab Session","Office Hours","Quiz",
                    "Midterm Exam","Final Exam","Assignment Due","Project Submission",
                    "Guest Lecture","Study Group","Review Session","Workshop","Seminar"]

    calendars  = []
    cal_events = []
    cal_id   = 1
    event_id = 1

    for cc in course_codes:
        calendars.append((cal_id, cc))
        for _ in range(random.randint(8,15)):
            dt    = fake.date_between(start_date="-1y", end_date="+6m")
            title = random.choice(EVENT_TITLES)
            siid  = random.choice(secitem_by_course[cc]) if secitem_by_course[cc] and random.random()>0.5 else None
            cal_events.append((event_id, cal_id, dt, title, siid))
            event_id += 1
        cal_id += 1

    cal_rows = [f"({c},'{cc}')" for c,cc in calendars]
    OUT.write("-- ── CourseCalendar ───────────────────────────────────────────\n")
    write_inserts(OUT, "CourseCalendar", ["calenderID","courseCode"], cal_rows)
    OUT.write("\n")

    ev_rows = []
    for e,c,d,t,si in cal_events:
        si_val = str(si) if si is not None else "NULL"
        ev_rows.append(f"({e},{c},'{d}','{esc(t)}',{si_val})")

    OUT.write("-- ── CalendarEvents ───────────────────────────────────────────\n")
    write_inserts(OUT, "CalendarEvents",
                  ["eventID","calenderID","eventDate","eventTitle","secItemID"], ev_rows)
    OUT.write("\n")
    print(f"  {len(calendars)} calendars | {len(cal_events):,} events written.")

    # ── 9. Submission ─────────────────────────────────────────────────────────
    print("Generating submissions...")
    sub_rows = []
    sub_id   = 1

    for cc in course_codes:
        assignment_items = secitem_by_course[cc]
        if not assignment_items: continue
        sampled = random.sample(list(course_student_sets[cc]), min(30, len(course_student_sets[cc])))
        for sid in sampled:
            n = max(1, int(len(assignment_items) * random.uniform(0.5, 1.0)))
            for siid in random.sample(assignment_items, min(n, len(assignment_items))):
                text  = esc(fake.sentence(nb_words=20)[:200])
                dt    = fake.date_between(start_date="-1y", end_date="today")
                grade = random.randint(40,100) if random.random() > 0.1 else "NULL"
                sub_rows.append(f"({sub_id},{sid},{siid},'{text}',NULL,'{dt}',{grade})")
                sub_id += 1

    OUT.write("-- ── Submission ───────────────────────────────────────────────\n")
    write_inserts(OUT, "Submission",
                  ["subID","userID","secItemID","subText","subContent","submDate","grade"],
                  sub_rows)
    OUT.write("\n")
    print(f"  {len(sub_rows):,} submissions written.")

    OUT.write("COMMIT;\n")
    OUT.write("SET FOREIGN_KEY_CHECKS = 1;\n")
    OUT.write("SET UNIQUE_CHECKS = 1;\n")
    OUT.write("SET autocommit = 1;\n")

size_mb = os.path.getsize(OUTPUT_FILE) / 1024 / 1024
print(f"\n✅  Done!  ->  {OUTPUT_FILE}")
print(f"    File size   : {size_mb:.1f} MB")
print(f"    Students    : {NUM_STUDENTS:,}")
print(f"    Lecturers   : {NUM_LECTURERS}")
print(f"    Admins      : {NUM_ADMINS}")
print(f"    Courses     : {len(courses)}")
print(f"    Enrollments : {len(enrol_rows):,}")
print(f"    Threads     : {len(threads):,}")
print(f"    Submissions : {len(sub_rows):,}")
