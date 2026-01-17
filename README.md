# Social Media Feed with Like and Comment

A full-stack social media application built with React and Node.js, enabling users to create posts with images, follow/unfollow others, and interact via likes and comments. Designed for smooth UX with infinite scrolling and robust backend support.

## Screenshots

Below are screenshots demonstrating the app’s key functionalities:


<img width="1079" height="698" alt="image" src="https://github.com/user-attachments/assets/1f7913de-44f2-49fe-88c3-ffdec0a73f72" />

<img width="1887" height="862" alt="image" src="https://github.com/user-attachments/assets/96126248-84d1-41ff-a985-fc407315331f" />

<img width="1777" height="834" alt="image" src="https://github.com/user-attachments/assets/fbedcafb-16dc-41dc-8a79-163e5d6ca864" />


**User Feed with Posts, Likes, and Comments**

Add screenshots of your feed page, showing posts with images, likes, and comments here.

**User Profile & Follow/Unfollow Functionality**

<img width="1786" height="776" alt="image" src="https://github.com/user-attachments/assets/3e5a7330-981d-4118-8924-89b2647b2390" />

<img width="1770" height="801" alt="image" src="https://github.com/user-attachments/assets/8543fa03-3051-4ecf-8463-937351734ce3" />




## Project Overview

This application implements core social media features including:

### Post Creation  
Users can create posts containing text and images, which are uploaded and stored using Cloudinary.

### Follow/Unfollow Users  
Users can follow or unfollow others, influencing the posts shown in their feed.

### Like and Comment Features  
Users can like posts and add comments, with counts and interactions updated in real-time.

### Infinite Scrolling Feed  
The feed supports infinite scrolling to dynamically load more posts as the user scrolls down.

## Features & Highlights

- Image Uploading via Cloudinary for optimized media management.  
- MongoDB and Mongoose schemas to model users, posts, comments, and relationships.  
- RESTful API built with Express.js and Node.js to handle backend logic.  
- React.js Frontend with functional components and hooks for dynamic UI and state management.  
- React Infinite Scroll Component to implement smooth feed pagination.  
- Sample Data Script to seed the database with users and posts for demo/testing.

## Tech Stack

- React.js (Functional Components & Hooks)  
- Node.js & Express.js  
- MongoDB & Mongoose  
- Cloudinary for image storage  
- React Infinite Scroll  
- JavaScript (ES6+)  
- CSS3 / Styled Components (or your CSS choice)

## Setup Instructions

### Prerequisites

- Node.js (v16 or later recommended)  
- npm or yarn package manager  
- MongoDB instance (local or cloud)  
- Cloudinary account for image uploads  
- Git

### Step-by-Step Setup

```bash
# Clone the repository
git clone https://github.com/nitin2001581402/Social-Media.git
cd Social-Media

# Install dependencies for frontend
cd client
npm install

# Install dependencies for backend
cd ../server
npm install
