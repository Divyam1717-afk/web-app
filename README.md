
DevSecOps Web App - Setup Instructions

Project Overview:
This is a minimal Node.js and Express web application with MongoDB, designed to demonstrate DevSecOps best practices. The project integrates containerization, security scanning, secrets management, and infrastructure as code principles.

Tech Stack:
Node.js
Express
MongoDB (via Docker)
Docker and Docker Compose
GitHub Actions for CI/CD
Trivy for vulnerability scanning
Terraform and tfsec for infrastructure hardening

Prerequisites:
Install Docker Desktop
Install Node.js and npm
Install Git
Install Trivy (https://aquasecurity.github.io/trivy/)
Optional: Install Terraform and tfsec

Project Setup Steps:
1. Clone the repository from GitHub
2. Navigate to the project directory
3. Create a file named .env in the root folder with the following content:
MONGO_URI equals mongodb://mongo:27017/webappdb
JWT_SECRET equals your_secret_key
PORT equals 3000
4. Build and start the app using Docker Compose:
docker-compose build
docker-compose up -d
5. The app will be running at http://localhost:3000

API Endpoints:
GET /users - Retrieve all users
POST /users - Create a new user with name, email, and password
POST /login - Authenticate and receive a JWT token

Testing:
Use Postman to test the above endpoints
Ensure MongoDB is reachable and running inside Docker

Security Scanning:
Run Trivy to scan the file system and Docker image:
trivy fs .
trivy image web-app-app

GitHub Actions:
GitHub Actions is configured via .github/workflows/sec.yml
On every push, Trivy scan is triggered automatically

Secrets Management:
Sensitive values like database URI, JWT secret, and port are stored in the .env file
dotenv is used to load them securely into the app

Infrastructure Hardening:
A local Terraform file is included in the terraform directory for demonstration
tfsec was used to scan it, and 2 high-severity issues were flagged

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

Note:
No secrets are committed into GitHub
Trivy reported no critical vulnerabilities after the final image build
You can rerun the Docker and Trivy steps if you make code changes

Final Check:
Make sure the containers are up by running:
docker ps
