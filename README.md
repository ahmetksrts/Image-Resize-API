# Image Resize API

This project is an API and frontend application for resizing images. It supports both local file uploads and images from URLs. The backend handles image processing using Node.js, Express, and Sharp, while the frontend is built with React.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Backend Server](#starting-the-backend-server)
  - [Starting the Frontend Application](#starting-the-frontend-application)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Resize Images**: The API allows you to resize images by providing the desired width and height.
- **File Upload Support**: Users can upload an image file from their local machine.
- **URL Support**: Users can provide an image URL for resizing.
- **Responsive Frontend**: The frontend application allows users to easily interact with the API.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/image-resize-api.git
   cd image-resize-api

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install

    
## Usage
### Starting the Backend Server
To start the backend server, navigate to the `backend` directory and run:
    ```bash
    node server.js

The backend server will start on `http://localhost:3000`.

### Starting the Frontend Application
To start the frontend application, navigate to the `frontend` directory and run:
    ```bash
    npm run dev

The frontend application will be available at `http://localhost:5173`.

## API Endpoints
- **POST /resize**: Resize an image,
-- **`image`** (optional):Image file to be uploaded.
-- **`imageUrl`** (optional):URL of the image to be resized.
-- **`width`**: Desired width of the resized image (query parameter).
-- **`height`**: Desired height of the resized image (query parameter).
- **Response**: The resized image.

Example:
    ```bash
    curl -X POST -F "image=@/path/to/image.jpg" "http://localhost:3000/resize?width=300&height=300"


 ## License
This project is licensed under the MIT License.