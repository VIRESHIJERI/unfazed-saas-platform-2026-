import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthPlaceholderPage from '../pages/AuthPlaceholderPage';
import PublicProfilePage from '../pages/PublicProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPlaceholderPage mode="login" />} />
        <Route path="/register" element={<AuthPlaceholderPage mode="register" />} />
        <Route path="/dr-meera-iyer" element={<PublicProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
