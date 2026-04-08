# datile-case-management
This is a Repository for a case management system for Datile IT AB
___
📌 Overview

Datile is a fullstack case management system designed to give organizations full control over cases, 
customers, purchases and reporting.

The system is built to reflect real-world business needs, where traceability, structure and data-driven decision-making are essential.

🎯 Purpose
The goal of this project is to:

Manage cases from creation to completion
Link cases to customers, contacts and assignees
Register and track purchases
Generate reports for analysis and decision-making
Ensure a stable and scalable system architecture

🧱 Tech Stack
Backend
Java 21
Spring Boot
Spring Security (JWT authentication)
JPA / Hibernate
Flyway (database migrations)

Frontend
React
TypeScript
Vite
Tailwind CSS
Database
MySQL 8
DevOps / Deployment
Docker
Docker Compose
Nginx (frontend hosting + reverse proxy)

🏗️ Architecture
Backend (Layered Architecture)
Controller -> Service -> Repository -> Database -> DTO -> Mapper

Principles:
Thin controllers
All business logic in the service layer
DTOs used to protect and shape data

Frontend Structure
Pages -> Components -> API Client -> Backend

Principles:
Centralized API handling
Reusable components
Clear separation between UI and data fetching

Domain Model
Core Entities
Errand (Case)
Customer
Contact
Purchase
Status
Priority
Assignee

Relationships:
Errand
├── Customer
├── Contact
├── Assignee
├── Status
├── Priority
└── Purchases[]

**🔐 Authentication & Security **
JWT-based authentication
Token stored in HttpOnly cookie
Stateless sessions
Protection against XSS via cookie strategy
Endpoints

POST /api/auth/login
GET /api/auth/me

📡 API Design
REST-based API structure:
GET /api/errands
POST /api/errands
PUT /api/errands/{id}
GET /api/customers
GET /api/reports

Query Parameters
?page=0&size=10&sortBy=customer

📊 Features

Cases (Errands)
Create, view and update cases
Link customer, contact and assignee
Status and priority management
Customers & Contacts
Full CRUD functionality
Soft delete (archiving instead of deletion)

Purchases
Register purchases per case
Manage costs and sales price
Reporting
Filtering (date, customer, status etc.)
Sorting
Pagination
CSV export
Pagination

Backend uses:
PageRequest.of(page, size)

Frontend handles:
Next / Prev navigation
Page numbers
Dynamic data fetching

💰Business Logic

The system enables:
Profitability calculation per case
Aggregation of purchase data
Data-driven insights through reports

🧪 Testing
Frontend:
Vitest
React Testing Library

Backend:
Spring Boot Test
MockMvc

Getting Started

Clone the repository
git clone
Start the system
docker-compose up --build
Application runs at:
Frontend: http://localhost/
Backend API: http://localhost:8080/api

⚙️ Environment Configuration
Example .env:
VITE_API_BASE_URL=http://localhost:8080/

📦 Deployment
The system is fully containerized and can run in any environment with Docker.
Frontend is built and served via Nginx
Backend runs as a Spring Boot container
Database runs in a MySQL container with persistent volume

⚠️ Known Challenges & Solutions
Problem solution:
Database permissions - Init script in Docker
API configuration - Centralized API client
Pagination - Implemented in both backend and frontend
Security - JWT + HttpOnly cookies

🚀 Future Improvements
Role-based access control (RBAC)
Dashboard with KPIs
Real-time updates
Improved UI/UX

🧠 Key Learnings
This project demonstrates:

Practical fullstack development
System design and architecture
API design and data flow
Secure authentication
Container-based deployment

Developers
👤 Ronja Fagerdahl, https://webwonder.se/
👤 Viktor Eriksson, LinkedIn

💡Final Note

This is not just a web application - it is a complete system designed to manage real-world business processes!