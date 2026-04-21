# COMP3161 VLE API

Introduction to Database Management Systems final project for a simple Virtual Learning Environment.

The project uses Flask, MySQL, deterministic seed data, Basic Auth for protected routes, and a Postman collection for a full demo workflow.

## Quick Setup

From the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

Create `.env` from `.env.example` and set your local MySQL credentials.

Regenerate seed data when needed:

```powershell
.\.venv\Scripts\python.exe gen_vle.py
```

Rebuild the database:

```powershell
mysql -u root -p < vle.sql
mysql -u root -p Vle < vle_inserts.sql
mysql -u root -p Vle < reports.sql
```

Run the API:

```powershell
.\.venv\Scripts\python.exe app.py
```

## Current Project Shape

This repo is a Flask + MySQL coursework API for a simple Virtual Learning Environment.

- `app.py` contains the API routes and shared helpers.
- `vle.sql` defines the main schema.
- `reports.sql` defines the report views.
- `gen_vle.py` regenerates deterministic seed data into `vle_inserts.sql`.
- `postman/` contains the full local workflow collection and environment.

## Key Design Choices

- `CourseMember` is a read-only view derived from `Enrol` and `Teaches`.
- Basic Auth is the current temporary auth approach for protected routes.
- Each course has exactly one lecturer.
- `Enrol.grade` is derived from assignment grades.
- Course content and submission content are metadata/text, not real uploaded files.
- Seed data is deterministic so the team can rebuild the same demo state reliably.

## Documentation

- `docs/API_GUIDE.md` explains how to run, authenticate, test, and demo the system.
- `docs/DECISIONS.md` explains the important design choices, rationale, and current trade-offs.

## Postman

Import these files into Postman:

- `postman/VLE API Full Workflow.postman_collection.json`
- `postman/VLE Local.postman_environment.json`

Use `demo_credentials.txt` for the seed student, lecturer, and admin credentials.
