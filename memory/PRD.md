# Kedorion Website - Product Requirements Document

## Original Problem Statement
Build a Kedorion website - a physical AI research company landing page with brutalist/industrial design aesthetic. Features:
- Hero slider with 3 products (HELIOS-1, AEGIS ORBITAL, BIO-TRUTH)
- Mission section
- Sector cards (Energy, Space, Healthcare)
- Research logs section
- Newsletter signup with backend functionality + confirmation
- Contact form (functional)
- "Join Us" section with 2 AI Engineer jobs + CV upload
- Use uploaded SVG logo (kedorion.svg)
- Background video

## Architecture
### Backend (FastAPI + MongoDB)
- `/api/newsletter/subscribe` - Newsletter subscription
- `/api/contact` - Contact form submission
- `/api/jobs` - List job openings
- `/api/jobs/{job_id}/apply` - Job application with CV upload

### Frontend (React + Tailwind CSS)
- Single-page application with sections
- Framer Motion for animations
- Sonner for toast notifications
- Portal-based modals for job details

## User Personas
1. **Potential Employees**: AI/ML engineers looking for exciting research opportunities
2. **Investors/Partners**: People interested in physical AI technology
3. **Researchers**: Academics curious about Kedorion's work

## Core Requirements (Static)
- [x] Hero section with product slider
- [x] Mission/About section
- [x] Sector cards with hover effects
- [x] Research logs section
- [x] Newsletter subscription
- [x] Contact form
- [x] Jobs section with 2 AI Engineer positions
- [x] Job application with CV upload
- [x] Fullscreen menu
- [x] Video background

## Implementation Status
- **2024-12-25**: Initial MVP complete
  - All sections implemented
  - Backend APIs working
  - Newsletter, Contact, Job applications all functional
  - CV upload with file validation (PDF, DOC, DOCX)

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Newsletter functionality
- [x] Contact form functionality
- [x] Job listings
- [x] Job application with CV upload

### P1 (Important) - Future
- [ ] Email notifications for applications
- [ ] Admin dashboard for managing applications
- [ ] Job posting CRUD for admins
- [ ] Newsletter email sending integration

### P2 (Nice to have) - Future
- [ ] Multi-language support (German/English)
- [ ] Blog/News section
- [ ] Team member profiles
- [ ] Case studies page

## Next Tasks
1. Add email integration for contact/application notifications
2. Build admin dashboard for reviewing applications
3. Implement actual email sending for newsletter
4. Add analytics tracking
