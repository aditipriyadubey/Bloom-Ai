import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DiagnosticQuiz from "./pages/DiagnosticQuiz";
import TodaysJourney from "./pages/TodaysJourney";
import MicroLesson from "./pages/MicroLesson";
import Practice from "./pages/Practice";
import DoubtChat from "./pages/DoubtChat";
import LearningTree from "./pages/LearningTree";
import Achievements from "./pages/Achievements";
import Progress from "./pages/Progress";
import TeacherDashboard from "./pages/TeacherDashboard";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* App routes with sidebar/navbar layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<DiagnosticQuiz />} />
        <Route path="/journey" element={<TodaysJourney />} />
        <Route path="/lesson/:id" element={<MicroLesson />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/tree" element={<LearningTree />} />
        <Route path="/doubt" element={<DoubtChat />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>

      {/* Wildcard fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;