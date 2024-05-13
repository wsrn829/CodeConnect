# CodeConnect
#### Video Demo:  https://youtu.be/CAnuI00jcZw
#### Description:
CodeConnect is Sarina Wu's solo work for CS50X Final Project. 

It is a full-stack social app used to connect like-minded individuals using posts and code to build a platform for people who enjoy writing and coding. 

I built this app from scratch, using Django REST framework, Django ORM, Python, and SQLite3 for the API and the database, and React and JavaScript for the frontend. I also used Django token-based authentication for the backend Auth and custom frontend Auth using React and React useContext hook. I also used Bootstrap and CSS for styling. 

Key features include:

1. Register/Login/Logout
2. Create Profile
3. Edit Profile
4. Create a Post
5. List Posts
6. Create a Project
7. List Projects
8. Follow Other User
9. Unfollow Other User
10. List of Following Users
11. List of Followers

#### How to run your application.
   1. Clone the repository: `git clone <repository_url>`
   2. Navigate to the project directory with `cd <project_directory>`
   3. Install the Python dependencies with `pip install -r requirements.txt`
   4. Apply the Django migrations with `python manage.py migrate`
   5. Start the Django server with `python manage.py runserver`
   6. In a new terminal, navigate to the frontend directory: `cd ghi`
   7. Install the Node.js dependencies with `npm install`
   8. Start the React development server with `npm start`

- Now, your Django backend should be running at http://localhost:8000/ and your React frontend should be running at http://localhost:3000/.
- 
- Please replace <repository_url> and <project_directory> with the actual URL of your GitHub repository and the name of your project directory, respectively.
