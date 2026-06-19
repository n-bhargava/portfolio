import { Routes, Route, Navigate } from 'react-router-dom';
import Me from './pages/Me';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Playground from './pages/Playground';

export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<Me />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects"      element={<Projects />} />
      <Route path="/projects/:id"  element={<Projects />} />
      <Route path="/playground"        element={<Playground />} />
      <Route path="*"           element={<Navigate to="/" replace />} />
    </Routes>
  );
}
