import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthPlaceholderPage from '../pages/AuthPlaceholderPage';
import PublicProfilePage from '../pages/PublicProfilePage';
import SchedulePage from '../pages/SchedulePage';
import BookingPage from '../pages/BookingPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPlaceholderPage mode="login" />} />
        <Route path="/register" element={<AuthPlaceholderPage mode="register" />} />
        <Route path="/dr-meera-iyer" element={<PublicProfilePage />} />
        <Route path="/therapist/schedule" element={<SchedulePage />} />
        <Route path="/book/:slug" element={<BookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
