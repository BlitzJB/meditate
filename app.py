from flask import Flask, render_template, send_file

app = Flask(__name__)


@app.route('/')
def _index():
    return render_template('index.html')


@app.route('/manifest.json')
def _appmanifest():
    return send_file('./manifest.json')


@app.route('/sw.js')
def _appsw():
    return send_file('./sw.js')


@app.route('/api/heart_beat')
def _hb():
    return 'ok'


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, True)