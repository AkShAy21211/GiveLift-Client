# 🌐 Disaster Management & Anti-Fake News Platform

A full-stack, real-time disaster response platform built using **Next.js (App Router)** with role-based access for **general users, district coordinators, and state coordinators**. The platform enables verified communication, emergency resource coordination, and community-driven fake news reporting.

---

## 📌 Key Features

### 🚨 Disaster Management
- Citizens can report live disasters with location and severity
- Coordinators can monitor, update, and respond to incidents
- Live map with location-tagged disaster markers

### 🤝 Volunteer & Donation System
- Toggle volunteer availability & get matched with needs
- Pledge and track donations (resources or monetary)

### ❌ Anti-Fake News System
- Users can report suspicious news/rumors
- Coordinators verify & broadcast official corrections
- Verified Contributor badges for trusted users

### 💬 Real-Time Communication
- Role-based chat (Socket.IO)
- Instant push/email notifications
- Highlighted messages for official broadcasts

---

## 👥 User Roles

| Role               | Description |
|--------------------|-------------|
| `general_user`     | Citizens who report disasters, volunteer, donate, and flag fake news |
| `district_coordinator` | Local admin who manages disasters, fact-checks rumors, coordinates local volunteers/resources |
| `state_coordinator`    | Oversees all districts, issues official announcements, manages state-wide resources |

---

## 🧱 Tech Stack

| Layer         | Tech                             |
|---------------|----------------------------------|
| Frontend      | **Next.js (App Router)**, Tailwind CSS |
| Backend       | **Node.js + Express (API Layer)** |
| Database      | **MongoDB (Mongoose)**           |
| Real-Time     | **Socket.IO**                    |
| Auth & Roles  | **JWT Authentication**           |
| Maps & Geo    | **Google Maps API**              |
| Hosting       | Vercel / Render                  |

---

## 📁 Folder Structure (App Router)

