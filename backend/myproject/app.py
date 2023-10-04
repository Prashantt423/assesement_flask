from bson import ObjectId
from flask_cors import CORS
# rtsp_url = 'rtsp://zephyr.rtsp.stream/movie?streamKey=712da9738c7cccb6a14478b8e837346f'

from flask import Flask, request, jsonify, send_from_directory, send_file
import subprocess
import os
import shutil
from pymongo import MongoClient

MONGODB_URI="mongodb+srv://<id>:<password>@cluster0.w3dfu.mongodb.net/rtsp_stream?retryWrites=true&w=majority"
app = Flask(__name__, static_url_path='', static_folder='static', template_folder='templates')
CORS(app)
overlays = []
ffmpeg_process = None


client = MongoClient(MONGODB_URI)  # Replace with your MongoDB connection URL
db = client['my_db']  # Replace with your database name
overlays_collection = db['overlays']  # Replace with your collection name


def clear_static_folder():
    # Clear the contents of the 'static' directory
    folder_path = 'static'
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")
    print("Deletion successfull")

@app.route('/video/<path:filename>')
def video_stream(filename):
    if(filename=="stream"):
        # Specify the path to your HLS video stream file (e.g., 'static/output.m3u8')
        hls_stream_path = 'static/output.m3u8'
        return send_file(hls_stream_path)
    hls_segment_path = os.path.join('static', filename)
    return send_file(hls_segment_path)


@app.route('/livestream', methods=['GET'])
def stream():
    global ffmpeg_process
    rtsp_url = None
    # Check if the 'action' query parameter is provided
    action = request.args.get('action')
    rtsp_url = request.args.get('url') 

    print(rtsp_url)
    
    if action == 'start':
        # Start the stream (if not already running)
        clear_static_folder()
        if ffmpeg_process:
            ffmpeg_process.terminate()
            ffmpeg_process = None
        
        if rtsp_url is None:
            return jsonify({'message:please provide a valid link..'})
        
        elif ffmpeg_process is None:
            command = ['ffmpeg', '-i', rtsp_url, '-c:v', 'copy', '-c:a', 'aac', '-f', 'hls', 'static/output.m3u8']
            ffmpeg_process = subprocess.Popen(command)
        return jsonify({'message':'stream started successfully'})
    
    elif action == 'stop':
        # Stop the stream (if running)
        if ffmpeg_process:
            ffmpeg_process.terminate()
            ffmpeg_process = None
            clear_static_folder()
        return jsonify({'message': 'Stream stopped successfully'})
    
    # Handle other actions or errors here if needed
    
    return jsonify({'message': 'Invalid action'})


# Routes for creating, retrieving, updating, and deleting overlays
@app.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.get_json()
    overlays = list(overlays_collection.find({}))

    if(len(overlays) == 0):
        result = overlays_collection.insert_one(data)
        return jsonify({'message': 'Overlay created successfully', 'inserted_id': str(result.inserted_id)})
    else:
        result = overlays_collection.update_one({'_id': ObjectId(overlays[0]['_id'])}, {'$set': data})
        return jsonify({'message': 'Overlay updated successfully'})
    
@app.route('/overlays', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find({}, {'_id': 0}))  # Exclude '_id' field
    return jsonify(overlays)

@app.route('/overlays', methods=['PUT'])
def update_overlay():
    overlays = list(overlays_collection.find({}))
    if(len(overlays)==0):
        return jsonify({'message':'Nothing to update.'});
    id = overlays[0]['_id'];
    data = request.get_json()
    result = overlays_collection.update_one({'_id': ObjectId(id)}, {'$set': data})
    
    if result.modified_count == 0:
        return jsonify({'message': 'Overlay not found or not updated'})
    
    return jsonify({'message': 'Overlay updated successfully'})

@app.route('/overlays', methods=['DELETE'])
def delete_overlay(id):
    overlays = list(overlays_collection.find({}))
    if(len(overlays)==0):
        return jsonify({'message':'Nothing to delete.'});
    id = overlays[0]['_id'];
    result = overlays_collection.delete_one({'_id': ObjectId(id)})
    
    if result.deleted_count == 0:
        return jsonify({'message': 'Overlay not found or not deleted'})
    
    return jsonify({'message': 'Overlay deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
