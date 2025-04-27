from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/greet', methods=['POST', 'GET'])
def handle_post():
    print("hello")
    name = request.args.get('name')
    print(name)
    return {"message": f"Hello, {name}!"}, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
