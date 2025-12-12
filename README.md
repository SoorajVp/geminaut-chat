---

# 🚀 Node.js + Docker Sample Project

This is a simple Node.js application running inside a Docker container. The project demonstrates how to containerize a basic Express.js server and run it using Docker.

---

## 📁 Project Structure

```
.
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
└── README.md
```

---

## 📦 What This Project Does

* Runs a simple Express server on port **3000**
* Responds with `"Hello from Docker + Node.js!"` when accessing the root URL
* Uses the official **Node.js 18 Alpine** Docker image (lightweight)
* Installs only production dependencies
* Demonstrates a minimal but proper Docker workflow

---

## 🛠️ Requirements

Make sure you have:

* **Node.js** (optional, only needed if you want to run without Docker)
* **Docker** installed on your machine
  👉 [https://www.docker.com/get-started](https://www.docker.com/get-started)

---

## ▶️ Running the App Without Docker (Optional)

```bash
npm install
node server.js
```

The server will start at:

```
http://localhost:3000
```

---

## 🐳 Running the App With Docker

### 1️⃣ Build the Docker Image

```bash
docker build -t node-docker-sample .
```

### 2️⃣ Run the Docker Container

```bash
docker run -p 3000:3000 node-docker-sample
```

Now visit:

```
http://localhost:3000
```

You should see:

```
Hello from Docker + Node.js!
```

---

## 📝 Dockerfile Overview

Your Dockerfile consists of:

* Using `node:18-alpine`
* Setting working directory
* Installing only production dependencies
* Copying your application files
* Exposing port 3000
* Running `node server.js`

---

## 🧹 Cleaning Up Docker Images & Containers (Optional)

List all containers:

```bash
docker ps -a
```

Stop a running container:

```bash
docker stop <container_id>
```

Remove a container:

```bash
docker rm <container_id>
```

Remove the image:

```bash
docker rmi node-docker-sample
```

---

## 📌 Notes

* This project is a minimal example, perfect for testing Docker with Node.js.
* Can be extended with routes, middlewares, environment variables, and more.

---
