import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Layout from "./components/Layout";
import HomePage from "./components/Pages/HomePage";
import SignInPage from "./components/Pages/SignIn/SignInPage";
import DictionaryPage from "./components/Pages/DictionaryPage";
import StudyPage from "./components/Pages/StudyPage";
import StudyCategoryPage from "./components/Pages/StudyCategoryPage";
import LessonPage from "./components/Pages/LessonPage";
import UserProgressPage from "./components/Pages/UserProgressPage";
import CategoryProgressPage from "./components/Pages/CategoryProgressPage";
//FIXME: development
import Loader from "./components/Loader";
// context
import { WordsContextProvider } from "./context/WordsContext";
import { UserDataContextProvider } from "./context/UserDataContext";

export default function AppContainer() {
  return (
    <div className="relative flex flex-col min-h-screen bg-shell">
      {/* sets the background image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover opacity-20 z-0"
        style={{ backgroundImage: "url('/trees.jpg')" }}
      ></div>
      {/* the rest of the app */}
      <div className="relative z-10 flex flex-col flex-grow">
        <Router>
          <WordsContextProvider>
            <UserDataContextProvider>
              <div className="flex flex-grow">
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/dictionary" element={<DictionaryPage />} />
                    <Route path="/study" element={<StudyPage />} />
                    <Route
                      path="/study/:category"
                      element={<StudyCategoryPage />}
                    />
                    <Route
                      path="/study/:category/:lesson"
                      element={<LessonPage />}
                    />
                    <Route path="/progress" element={<UserProgressPage />} />
                    <Route
                      path="/progress/:category"
                      element={<CategoryProgressPage />}
                    />
                    {/* development */}
                    <Route path="/loader" element={<Loader />} />
                  </Routes>
                </Layout>
              </div>
            </UserDataContextProvider>
          </WordsContextProvider>
        </Router>
      </div>
    </div>
  );
}
