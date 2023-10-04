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
