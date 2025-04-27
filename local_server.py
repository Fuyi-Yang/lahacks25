from flask import Flask, request

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_input():
    data = request.get_json()  # assuming the input is JSON
    print("Received data:", data)

    # Do whatever you want with the data here
    result = {"message": "Data received successfully!"}

    return result, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
