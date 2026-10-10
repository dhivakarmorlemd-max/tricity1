import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './providers/AuthContext';
import { Navbar } from './components/ui/Navbar';
import { Sidebar } from './components/ui/Sidebar';
import { BottomDock2026 } from './components/layout/BottomDock2026';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { StudentOnboardingPage } from './pages/StudentOnboardingPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SkillTrackerPage } from './pages/SkillTrackerPage';
import { ProjectExplorerPage } from './pages/ProjectExplorerPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { PlacementPrepPage } from './pages/PlacementPrepPage';
import { PortfolioShowcasePage } from './pages/PortfolioShowcasePage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { TeacherReviewPage } from './pages/TeacherReviewPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { NotificationsHelpPage } from './pages/NotificationsHelpPage';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfaff] dark:bg-[#090616] text-slate-900 dark:text-slate-100 flex flex-col transition-colors relative overflow-x-hidden">
      {/* 2026 Radiant Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 pb-16 sm:pb-20">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 md:pl-64 p-4 md:p-8 max-w-7xl mx-auto w-full transition-all">
          <Outlet />
        </main>
      </div>

      <BottomDock2026 />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<StudentOnboardingPage />} />

          {/* Protected Dashboard Layout Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<StudentDashboardPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/skills" element={<SkillTrackerPage />} />
            <Route path="/projects" element={<ProjectExplorerPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/placement" element={<PlacementPrepPage />} />
            <Route path="/portfolio" element={<PortfolioShowcasePage />} />
            <Route path="/notifications" element={<NotificationsHelpPage />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherDashboardPage />} />
            <Route path="/teacher/submissions" element={<TeacherReviewPage />} />
            <Route path="/teacher/assignments" element={<TeacherReviewPage />} />
            <Route path="/teacher/students" element={<TeacherDashboardPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/templates" element={<AdminDashboardPage />} />
            <Route path="/admin/bank" element={<AdminDashboardPage />} />
            <Route path="/admin/logs" element={<AdminDashboardPage />} />
            
            {/* Settings & Profile */}
            <Route path="/profile" element={<ProfileSettingsPage />} />
            <Route path="/settings" element={<ProfileSettingsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
