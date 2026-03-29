# EduMin - School Management System

EduMin is a modern, client-side school management application built to
simplify student administration. It provides an intuitive workflow for
onboarding an institution, managing student records, tracking events,
and exporting data.

## Overview

EduMin helps administrators:

- Enroll and manage student records.
- Monitor admissions and activities from a central dashboard.
- Track institutional events with reminders.
- Search, update, and export student data.

## Core Features

### 1. Institution Onboarding and Access Control

- First-time onboarding flow to capture institution name, address,
  and administrator name.
- Route protection that redirects non-onboarded users to onboarding.
- Automatic redirect of onboarded users to the dashboard.

### 2. Administrative Dashboard

- Academic overview with total enrolled students.
- Recently admitted students panel.
- Upcoming activities section.
- Empty-state guidance when no students are available.

### 3. Event Management

- Add events with title, date, time, and location.
- Remove scheduled events directly from the dashboard.
- Event reminders generated as notifications for upcoming events.

### 4. Student Enrollment

- Structured form for personal, academic, and guardian details.
- Auto-generated student IDs based on the current year.
- Input validation for required fields, names, email, and phone numbers.
- Ghana phone normalization and validation (`+233XXXXXXXXX`) for both
  student and guardian contacts.

### 5. Student Directory Management

- Paginated table for viewing all student records.
- Global search support for student ID, names, and program of study.
- In-place editing via modal.
- Safe deletion with confirmation modal.

### 6. Data Export

- Export student records to Excel (`.xlsx`) from the View Students page.

### 7. Notifications

- Action notifications for student add, update, and delete operations.
- Event add/remove notifications.
- Reminder notifications for upcoming events.
- Unread badge with mark-as-read behavior.

### 8. UI and UX

- Responsive layout for desktop and mobile devices.
- Mobile hamburger menu with slide-in sidebar and backdrop.
- Light and dark theme toggle with persistence.

## Technical Stack

- Frontend: React 19
- Build Tool: Vite
- Routing: React Router
- Data Export: SheetJS (`xlsx`)
- Storage: Browser `localStorage`

## Project Structure

```text
src/
  components/
    AppLayout/
    Header/
    Sidebar/
  context/
    InstitutionContext
    NotificationsContext
    SearchContext
    ThemeContext
  lib/
    studentsStorage
  pages/
    Landing/
    Onboarding/
    Dashboard/
    AddStudents/
    ViewStudents/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/OEMBA/school-management-system.git
cd school-management-system
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Data Persistence

The application uses `localStorage` for persistence:

- Institution profile
- Student records
- Events
- Notifications
- Theme preference

## Team

Group 34

- Mba Oswald Emmanuel (Project Lead and Integration)
- Acquah Priscilla Emefa
- Justice Mensah
- Yakubu Wumpini
- Seidu Elliot Rashid
- Anobil Benjamin
- Boateng Christopher Brobbey
- Napari Salahudeen Ali
- Rawuf Adeleke
- Amankwah Felix
