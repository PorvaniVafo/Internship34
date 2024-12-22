Diary Application

Overview

This Diary Application allows users to create, edit, delete, and manage their personal diary entries. Users can also upload images to their entries. The application provides an intuitive UI with user authentication for secure access.

Features

User Authentication

Register and log in securely.

Authorization using JWT tokens.

Diary Entry Management

Create, edit, and delete text-based diary entries.

Rich text formatting support (e.g., bold, italic).

Maximum entry length: 10,000 characters.

Image Handling

Upload images to diary entries.

Display images as thumbnails within entries.

Remove uploaded images.

User-Friendly UI

Modern and clean design.

Confirmation dialogs for destructive actions (e.g., deleting entries).

Error Handling

Graceful handling of API errors with user-friendly messages.

Loading indicators for API requests.

Tech Stack

Frontend:

React for building user interfaces.

Axios for HTTP requests.

CSS for styling.

Backend:

Spring Boot for the server-side application.

Spring Security for authentication and authorization.

MySQL for the database.

Hibernate for ORM.

Installation and Setup

Prerequisites

Node.js and npm installed.

Java JDK and Maven installed.

MySQL database setup.

Backend Setup

Clone the repository.

Navigate to the backend directory.

Update the application.properties file with your database credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/diary_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_secret_key

Run the backend application:

mvn spring-boot:run

Verify the backend is running at http://localhost:3000/api/v1.

Frontend Setup

Navigate to the frontend directory.

Install dependencies:

npm install

Start the development server:

npm start

Open the application in your browser at http://localhost:3001.

API Endpoints

Authentication

POST /api/v1/auth/register - Register a new user.

POST /api/v1/auth/login - Log in a user and get an access token.

Posts

GET /api/v1/posts - Retrieve all posts.

POST /api/v1/posts - Create a new post.

PUT /api/v1/posts/{id} - Update a post.

DELETE /api/v1/posts/{id} - Delete a post.

Images

POST /api/v1/posts/{postId}/images - Upload images to a post.

DELETE /api/v1/posts/{postId}/images/{imageId} - Delete an image from a post.

Folder Structure

Frontend:

frontend/
├── public/                # Static files
├── src/
│   ├── api/              # API functions
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── styles/           # CSS files
│   └── App.js            # Root component
└── package.json

Backend:

backend/
├── src/
│   ├── main/
│   │   ├── java/com/example/internship/  # Main application logic
│   │   └── resources/                    # Configuration files
│   └── test/                             # Unit tests
└── pom.xml                               # Maven dependencies

Future Improvements

Add pagination for diary entries.

Implement a search feature for entries.

Enhance rich text editing capabilities.

Add support for multiple users and roles.
