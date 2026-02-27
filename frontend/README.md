# Complaint Management System with SLA Tracking

A full-stack role-based complaint management system built using MERN stack.

## Features

- User, Agent, Admin roles
- Priority-based SLA (Low, Medium, High, Critical)
- Automatic escalation using node-cron
- Complaint assignment system
- Dashboard analytics
- Modern Tailwind UI
- JWT Authentication

## Tech Stack

Frontend: React, Tailwind CSS  
Backend: Node.js, Express.js  
Database: MongoDB  
Authentication: JWT  
Automation: Node-Cron  

## Workflow

OPEN → IN_PROGRESS → RESOLVED  
If SLA exceeded → ESCALATED  

## How to Run

Backend:
cd backend
npm install
npm start

Frontend:
cd frontend
npm install
npm run dev
