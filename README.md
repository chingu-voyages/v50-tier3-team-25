# NomNomNexus

[Visit NomNomNexus](https://nomnomnexus.store)

## Table of Contents

- [Overview](#overview)
  - [Application Overview](#application-overview)
  - [Screenshot](#screenshot)
  - [Video](#video)
- [Technologies Used](#technologies-used)
  - [Backend](#backend)
  - [Database](#database)
  - [Frontend](#frontend)
  - [Containerization and Deployment](#containerization-and-deployment)
    - [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Our Team](#our-team)

## Overview

Welcome to **NomNomNexus**, your ultimate gateway to discovering delicious food nationwide! Whether you're hunting for local favorites or uncovering hidden gems, our interactive map helps you explore a vast network of restaurants, making it easier than ever to satisfy your cravings and embark on exciting culinary adventures.

### Application Overview

NomNomNexus is more than just a restaurant finder—it's a comprehensive menu and ordering platform with robust frontend and backend functionalities. From secure user authentication to dynamic menu displays, our application ensures a seamless user experience:

- **User Accounts:** Create an account, add credit for smooth transactions, and manage your profile effortlessly.
- **Dynamic Menus:** Menus are fetched from the free-food-menus API, complete with images, prices, and restaurant details. Filter by category, or explore specific menus by clicking on map markers.
- **Interactive Map:** Discover restaurants across the country and fetch specific menus with a click.
- **Order Management:** Add or remove items from your order and manage payments via Stripe for secure transactions.
- **Responsive Design:** Enjoy a smooth, intuitive experience across all devices.

## Technologies Used

### Backend

Our backend is powered by a **Node.js** and **Express** API, facilitating user account creation, credit management, and secure transactions. We integrate the **free-food-menus API** to offer a selection of nearly 700 dishes across 15 categories, ensuring a diverse and enticing menu.

### Database

We utilize **MongoDB**, a NoSQL database known for its scalability and efficiency. It securely stores user accounts and credits, ensuring your data is always safe.

### Frontend

The frontend is built with **React** and **Vite**, styled with **Tailwind CSS** and **Bootstrap** for a sleek, responsive interface. **React Router DOM** powers smooth navigation, while **Stripe** handles payment processing, making transactions seamless and secure.

### Containerization and Deployment

Our application is containerized and deployed using a robust suite of tools to ensure reliability and efficiency:

- **Dockerhub:** We containerize the Express backend for consistent environments across development and production. The Docker image is stored on Dockerhub, enabling easy pulls and seamless integration.
- **GitHub Actions:** Our CI/CD pipeline is fully automated with GitHub Actions, ensuring seamless code integration and deployment. The workflow is smartly configured to trigger deployments only when changes are detected in the backend or frontend codebase.

  - **Backend Deployment:** Upon changes, the workflow builds a new Docker image for the backend and pushes it to Dockerhub. A self-hosted runner on an EC2 instance is then notified to pull the latest image and deploy it, ensuring the backend is always up-to-date.
  
  - **Frontend Deployment:** For the frontend, static files are built and deployed to an AWS S3 bucket. To guarantee that users always receive the latest version, we utilize an OIDC policy to interact with AWS CloudFront, invalidating the cache so the new files are served immediately upon deployment.

- **AWS Cloud Services:** We leverage Amazon AWS for cloud hosting:
  - **AWS CloudFront:** Ensures all HTTP requests are redirected to HTTPS for secure access and efficient caching.
  - **AWS S3 Bucket:** Hosts and serves React static files.
  - **AWS EC2:** Hosts the Node.js backend server, exposed via **Nginx** as a reverse proxy.
  
- **Systemd:** Manages the lifecycle of backend services and GitHub Actions runners, ensuring the backend is always available and ready for updates.

## Our Team

Meet the dedicated team behind NomNomNexus! Our team is passionate about food and technology, working tirelessly to connect you with the best dining experiences across the country.

- David Hyppolite: [GitHub](https://github.com/dhayv) / [LinkedIn](https://www.linkedin.com/in/david-h-60560b61/)
- Maddie Carlson: [GitHub](https://github.com/SpookyLamb) / [LinkedIn](https://www.linkedin.com/in/madeline-carlson-dev/)
- Eli Cohen [Github](https://github.com/ecohen1125) / [LinkedIn](https://www.linkedin.com/in/elijcohen/)
