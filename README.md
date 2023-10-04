# RTSP Livestream Player with Overlays

This project allows you to create an RTSP livestream player with the ability to add overlays to the video feed. The backend is built using Flask, MongoDB, and FFmpeg, while the frontend is developed using React.

## Setup Instructions

### Backend Setup

1. Install the required Python libraries by running the following command in your terminal:
pip install Flask Flask-CORS pymongo


2. Make sure you have FFmpeg installed on your system. You can download it from [ffmpeg.org](https://ffmpeg.org/download.html) and add it to your system's PATH.

3. Replace `<id>` and `<password>` in the `MONGODB_URI` with your MongoDB Atlas credentials.

4. Start the Flask server by running the following command in the backend directory:
python app.py

### Frontend Setup

1. Navigate to the frontend directory in your terminal.

2. Install the required npm packages by running the following command:
npm install

3. Start the React development server by running the following command:
 npm start

4. Open your web browser and go to `http://localhost:3000` to access the app.

### User Documentation

### Using the App

1. Enter the RTSP URL of the video stream you want to display in the input field.

2. Click the "Start Stream" button to begin displaying the livestream. You can stop the stream at any time by clicking the "Stop Stream" button.

3. If the stream is live, you can customize overlays that will be displayed on the video feed. Use the "Overlay Settings" section to set the position, size, content, and font color of the overlay.

4. Click the "Create Overlay" button to add a new overlay to the stream.

# Overlay Management API Documentation

This API allows you to create, retrieve, update, and delete overlays.

## Endpoints

### Create Overlay

- **URL:** `/overlays`
- **Method:** `POST`
- **Description:** Create a new overlay.
- **Request Body:** JSON object containing overlay data.
- **Response:**
  - `201 Created` - Overlay created successfully.
    ```json
    {
      "message": "Overlay created successfully",
      "inserted_id": "<inserted_overlay_id>"
    }
    ```
  - `200 OK` - Overlay updated successfully (if an overlay already exists, it will be updated).
    ```json
    {
      "message": "Overlay updated successfully"
    }
    ```

### Retrieve Overlays

- **URL:** `/overlays`
- **Method:** `GET`
- **Description:** Retrieve all overlays.
- **Response:**
  - `200 OK` - List of overlays.
    ```json
    [
      {
        "field1": "value1",
        "field2": "value2",
        // Other overlay fields
      },
      // Additional overlays
    ]
    ```

### Update Overlay

- **URL:** `/overlays`
- **Method:** `PUT`
- **Description:** Update an existing overlay.
- **Request Body:** JSON object containing overlay data.
- **Response:**
  - `200 OK` - Overlay updated successfully.
    ```json
    {
      "message": "Overlay updated successfully"
    }
  - `404 Not Found` - Overlay not found or not updated.
    ```json
    {
      "message": "Overlay not found or not updated"
    }
  - `200 OK` - Nothing to update (if no overlay exists).
    ```json
    {
      "message": "Nothing to update."
    }

### Delete Overlay

- **URL:** `/overlays`
- **Method:** `DELETE`
- **Description:** Delete an existing overlay.
- **Response:**
  - `200 OK` - Overlay deleted successfully.
    ```json
    {
      "message": "Overlay deleted successfully"
    }
  - `404 Not Found` - Overlay not found or not deleted.
    ```json
    {
      "message": "Overlay not found or not deleted"
    }
  - `200 OK` - Nothing to delete (if no overlay exists).
    ```json
    {
      "message": "Nothing to delete."
    }


## React Code

The React code for the frontend of the app can be found in the `App.js` file in the frontend directory. You can modify this code to customize the user interface and functionality of the app as needed.

## License

This project is open-source and available under the MIT License. You are free to use, modify, and distribute it as per the terms of the license.

Enjoy using the RTSP Livestream Player with Overlays!
