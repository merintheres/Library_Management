from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/customer')
def customer():
    return render_template('customer_home.html')

@app.route('/admin')
def admin():
    return render_template('admin_home.html')

@app.route('/search')
def search_book():
    return render_template('search_book.html')

@app.route('/issue')
def issue_book():
    return render_template('issue_book.html')

@app.route('/return')
def return_book():
    return render_template('return_book.html')

@app.route('/add')
def add_book():
    return render_template('add_book.html')

@app.route('/update')
def update_book():
    return render_template('update_book.html')

@app.route('/delete')
def delete_book():
    return render_template('delete_book.html')

@app.route('/status')
def issue_status():
    return render_template('issue_status.html')

if __name__ == '__main__':
    app.run(debug=True)
