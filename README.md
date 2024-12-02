
# E-Sports News

News website for an e-sports update

![image](https://github.com/faqihmadani/esports-news/assets/76164968/f11abb74-bfc3-4966-a8ef-f35e98e8d5ec)

## Tech Stack

- React JS
- Express JS
- Tailwind CSS

## Features

- SignUp
- Login
- Create Post
- Update Post
- Delete Post

## Installation

There are two folders provided for back-end and front-end website.

First, clone this repository 

```bash
  git clone https://github.com/faqihmadani/esports-news.git my-project
  cd my-project
```

### Back End
1. Go to back-end folder

```bash
  cd /back-end
```

2. Install package using npm

```bash
  npm install
```

3. Create MySql database with two table, users and posts.
- Users has id, username, email, password, img columns
- Posts has id, title, description, category, img, date, uid (FK to users id)

4. Go to db.js and set the connection to MySql

```javascript
// db.js
  import mysql from "mysql"

  export const db = mysql.createConnection({
      host: "",
      user: "",
      password: "",
      database: ""
  })
```

5. Run server

```bash
  npm start
```

### Front End
1. Go to front-end folder

```bash
  cd /front-end
```


2. Install package using npm

```bash
  npm install
```

3. Create supabase storage for store images. The storage must be named `post-images`

4. Create .env file
Add the following environment variables to your .env file

```env
VITE_BASE_URL = your_backend_base_url
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_KEY = your_supabase_key
```

5. Run development server
```bash
  npm run dev
```


