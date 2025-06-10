# Language App

is an app to help protect endangered languages

## Tech stack

- React
- Go
- PostgreSQL
- Docker containers

## Tech stack

- To run the app use docker compose

## Learning logic

- What is the method used for learning here?

# Fontend

## Fontend stack

- React (with functional components)
- TypeScript
- Vite
- Tailwind CSS
- Context API for state management

## Project structure

src/
├── main.tsx # Entry point
├── main.css # Tailwind setup
├── Types.ts # Shared TypeScript types
├── vite-env.d.ts # Vite-specific typings

├── context/
│ ├── WordsContext.tsx # Vocabulary data
│ └── UserDataContext.tsx # Auth and user progress state

├── components/
│ ├── AppContainer.tsx # Top-level layout component
│ ├── Layout.tsx # Page layout wrapper (Header, Footer)
│ ├── Header.tsx
│ ├── Footer.tsx
│ ├── NavBar.tsx
│ ├── Loader.tsx
│ ├── IADLogo.tsx

│ ├── Buttons/
│ │ ├── AudioButton.tsx
│ │ ├── BlobButton.tsx
│ │ ├── LittleBlobButton.tsx
│ │ └── LittleBlobVariation.tsx

│ ├── WordCards/
│ │ ├── WordCard.tsx
│ │ └── LearningCard.tsx

│ ├── LessonTasks/
│ │ ├── FeedbackMessage.tsx
│ │ ├── FillGapsTask.tsx
│ │ ├── MatchPictureTask.tsx
│ │ ├── WriteWordTask.tsx
│ │ └── LessonProgress.tsx

│ └── Pages/
│ ├── HomePage.tsx
│ ├── LessonPage.tsx
│ ├── DictionaryPage.tsx
│ ├── StudyPage.tsx
│ ├── StudyCategoryPage.tsx
│ └── SignIn/
│ ├── SignInPage.tsx
│ ├── SignUpWindow.tsx
│ └── LogInWindow.tsx

## Assets

- Pictures: stored in public/pictures/, used for visual tasks.
- Fonts: stored in public/fonts/, used across the UI.
- SVGs: stored in src/assets/, for UI icons like the logo.

# Backend Structure

The backend is written in Go using the Gin web framework and connects to a PostgreSQL database.

### Modules

#### main.go

Entry point of the backend. It sets up routes, handles CORS, and initializes the database connection. It also defines endpoints like:

GET /words – returns all words with their metadata.

GET /categories – fetches distinct word categories.

GET /users – retrieves all user records.

POST /users/signin – handles user login.

#### auth

Contains logic related to user management. Currently includes:

AddUser() – adds a new user to the database with password hashing.

#### Database

PostgreSQL is used for storing words and user data.

.env file is used for storing the DATABASE_URL.

#### Notes

Passwords are hashed before storing.

Login updates the last_logged_in timestamp.

UUIDs are used for user IDs.

Null values from SQL are handled explicitly.

## colours

["8F6D37","C0C2C1","EF8E00","12110D","FEFEFE"]

## assets generated at:

- https://haikei.app/ the svg blobs
