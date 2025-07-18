
DevSecOps Web App - README

This project is a minimal full-stack Node.js + Express web app using MongoDB, demonstrating best practices in DevSecOps including:

- Secrets Management
- Dockerized Deployment
- CI/CD with GitHub Actions
- Vulnerability Scanning using Trivy
- Infrastructure as Code (IaC) using Terraform
- Security scanning of IaC using tfsec
- API testing with Postman

Tech Stack
----------
- Node.js + Express
- MongoDB (via Docker)
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- dotenv for secrets management
- Trivy (security scanning)
- Terraform (local dummy infra)
- tfsec (IaC security checks)
- Postman (API testing)

Folder Structure
----------------
web-app/
├── .env                     # Secrets (not committed)
├── Dockerfile               # Docker build instructions
├── docker-compose.yml       # Define app + MongoDB services
├── package.json             # App dependencies
├── README.md                # You're here!
├── src/
│   └── index.js             # Main app code with .env usage
├── .github/
│   └── workflows/
│       └── sec.yml          # GitHub Actions pipeline
├── terraform/
│   └── main.tf              # IaC config (local AWS dummy)

Features
--------
- JWT-based user login
- Password hashing (bcrypt)
- MongoDB integration using Docker
- GitHub Actions pipeline for CI/CD
- Trivy scan for vulnerabilities
- tfsec scan for infrastructure hardening
- API tested with Postman

Setup Instructions
------------------

Prerequisites:
- Docker Desktop
- Node.js
- Git
- Trivy
- Terraform

Installation & Run
------------------
1. Clone the repository:
   git clone https://github.com/YourUsername/web-app.git
   cd web-app

2. Create your .env file:
   MONGO_URI=mongodb://mongo:27017/webappdb
   JWT_SECRET=supersecretkey
   PORT=3000

3. Build and start containers:
   docker-compose build
   docker-compose up -d

The app will be running at: http://localhost:3000

API Endpoints
-------------

Register User (POST /users)
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securepass"
}

Login (POST /login)
{
  "email": "alice@example.com",
  "password": "securepass"
}

Get Users (GET /users)

Security Scanning
-----------------
Run Trivy scans:
   trivy fs .
   trivy image web-app-app

Run tfsec scan:
   cd terraform
   tfsec

This README summarizes your DevSecOps-ready application.
