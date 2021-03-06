'''
Team Cows Go Moo :: Stella Oh, Winnie Huang, Helena Williams, Constance Chen
Softdev Pd 1
P5: This is the End
2021-05-24
'''
from flask import Flask, render_template, request, session
import os
import sqlite3
import urllib.request
import json

app = Flask(__name__)
app.secret_key = os.urandom(32) #need this, if we didn't include this it would produce a runtime error

#Create db for user information
db = sqlite3.connect("p5database.db")
c = db.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, password text)""")
c.execute("""CREATE TABLE IF NOT EXISTS g1 (username text, points int)""")
c.execute("""CREATE TABLE IF NOT EXISTS g2 (username text, points int)""")
c.execute("""CREATE TABLE IF NOT EXISTS g3 (username text, points int)""")
c.execute("""CREATE TABLE IF NOT EXISTS g4 (username text, points int)""")
db.commit()
db.close()

#Checks if user is in session
@app.route("/", methods = ['GET', 'POST']) #methods=['GET', 'POST']
def disp_loginpage():
    if "user" in session:
        return render_template('home.html', user = session["user"])
    else:
        return render_template('login.html')

#Routes user to registration page
@app.route("/register", methods = ['GET', 'POST'])
def register():
    return render_template('register.html')

#Registration for new user, stores user info into users db
@app.route("/register_auth", methods = ['GET', 'POST'])
def registerConfirming():
    db = sqlite3.connect("p5database.db")
    c1 = db.cursor()

    #gets all the data from the register.html form to check if they exist/match
    u = request.form['new_username']
    p = request.form['new_password_1']
    p1 = request.form['new_password_2']
    c = ''

    #Gets a list of all the registered usernames to check later on
    usernames_list = []
    for x in c1.execute("SELECT username FROM users;"):
        usernames_list.append(x[0])

    if len(u.strip()) == 0:
        return render_template('register.html', error_type = "Please enter valid username, try again")
    elif len(p.strip()) == 0:
        return render_template('register.html', error_type = "Please enter valid password, try again")
    #Checks if the username exists
    elif u in usernames_list:
        return render_template('register.html', error_type = "Username already exists, try again")
    #Checks if the passwords match
    elif p != p1:
        return render_template('register.html', error_type = "Passwords do not match, try again")
    #If both pass, it adds the newly registered user and directs the user to the login page
    else:
        c1.execute("INSERT INTO users (username, password) VALUES (?, ?)", (u, p))
        db.commit()
        db.close()
        return render_template("login.html", error_type = "Please login with your new account")

#Checks credentials of login attempt
@app.route("/auth", methods = ['GET', 'POST']) # methods=['GET', 'POST']
def welcome():
    db = sqlite3.connect("p5database.db")
    c2 = db.cursor()
    username = request.form['username']
    password = request.form['password']

    u_list = []
    for x in c2.execute("SELECT username FROM users"):
        for y in x:
            u_list.append(y)
    p_list = []
    for a in c2.execute("SELECT password FROM users"):
        for b in a:
            p_list.append(b)

    if username in u_list and password in p_list:
        session["user"] = username
        return render_template('home.html', user = username, message = "Your Login Has Been Successful! \(^-^)/")
    else:
        return render_template('login.html', error_type = "Invalid login attempt, please try again.")