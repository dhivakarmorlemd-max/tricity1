import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile, UserRole } from '../types';
import { dataService } from '../services/api/dataService';

interface AuthContextType {
  user: User;
  studentProfile: StudentProfile;
  role: UserRole;
  isDemoMode: boolean;
  switchRole: (userId: string) => void;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(dataService.getCurrentUser());
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(dataService.getStudentProfile(user.id));

  const refreshUserData = () => {
    const currentUser = dataService.getCurrentUser();
    setUser(currentUser);
    setStudentProfile(dataService.getStudentProfile(currentUser.id));
  };

  const switchRole = (userId: string) => {
    const newUser = dataService.setCurrentUserRole(userId);
    setUser(newUser);
    setStudentProfile(dataService.getStudentProfile(newUser.id));
  };

  const updateProfile = (updatedFields: Partial<StudentProfile>) => {
    const updated = dataService.updateStudentProfile(updatedFields);
    setStudentProfile(updated);
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        studentProfile,
        role: user.role,
        isDemoMode: dataService.isDemoMode(),
        switchRole,
        updateProfile,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
