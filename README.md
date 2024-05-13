# CodeConnect
#### Description:
CodeConnect is Sarina Wu's solo work for CS50X2024 Final Project. I designed and developed this application entirely from scratch.

This is a comprehensive full-stack social application designed to connect individuals with similar interests, particularly those passionate about writing and coding, through posts and projects.

Leveraging a combination of Django REST framework, Django ORM, Python, and SQLite3 for the backend API and database, and React with React hooks and JavaScript for the frontend, CodeConnect serves as a platform for users to connect, share ideas, and have fun.

------------------------------------------

- It incorporates several key functionalities, including Django token-based authentication for secure backend access to user accounts.

- I also implemented a custom frontend authentication system using React with React hooks and JavaScript to enhance both user experience and security measures.

- I also engineered lists of followed users and followers using advanced filtering techniques in Python syntax, eliminating the need for additional database tables, to optimize performance and minimize database complexity.

- Django ORM and migrations were employed to facilitate efficient management of the database, ensuring seamless interaction with the application's data. Bootstrap and CSS were utilized for styling, ensuring a visually appealing and user-friendly interface. The incorporation of these technologies enabled CodeConnect to offer a polished and professional look while maintaining responsiveness across different devices and screen sizes.

--------------------------------------------

Key features of CodeConnect include:

- Register/Login/Logout: Users can easily create an account, log in, and log out, ensuring a seamless onboarding experience.
- Create Profile: Users have the option to create and customize their profiles, providing essential information about themselves and their interests.
- Edit Profile: Users can update and modify their profiles as needed, ensuring their information remains up-to-date.
- Create a Post: CodeConnect allows users to create and share posts, enabling them to express their thoughts, share experiences, and engage with the community.
- List Posts: A comprehensive list of posts is available, allowing users to browse through and interact with various content shared by the community.
- Create a Project: Users can create projects, fostering collaboration and enabling them to showcase their work and seek feedback from peers.
- List Projects: A curated list of projects is available, providing users with insights into the diverse range of projects created by the community.
- Follow Other Users: Users can connect with like-minded individuals by following other users, facilitating networking and collaboration opportunities.
- Unfollow Other Users: Users have the flexibility to unfollow other users at any time, ensuring control over their network and connections.
- List of Following Users: CodeConnect offers a comprehensive list of users that a user is following, providing visibility into their network and connections.
- List of Followers: Users can view a list of individuals who are following them, fostering engagement and interaction within the community.

-------------------------------------------------

To run CodeConnect locally, follow these steps:

- Clone the repository: git clone <repository_url>
- Navigate to the project directory: cd <project_directory>
- Install Python dependencies: pip install -r requirements.txt
- Apply Django migrations: python manage.py migrate
- Start the Django server: python manage.py runserver
- In a new terminal, navigate to the frontend directory: cd ghi
- Install Node.js dependencies: npm install
- Start the React development server: npm start

Following these steps will launch the Django backend at http://localhost:8000/ and the React frontend at http://localhost:3000/.

Replace <repository_url> and <project_directory> with the actual URL of your GitHub repository and the name of your project directory, respectively.

By offering a comprehensive set of features and a user-friendly interface, CodeConnect aims to foster collaboration, facilitate knowledge sharing, and build a vibrant community of writers and coders proud and passionate about their craft.
