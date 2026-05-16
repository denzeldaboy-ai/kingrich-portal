export type RolePermission = {
  id: string;
  roleName: string;
  description: string;
  canViewStudents: boolean;
  canEditStudents: boolean;
  canViewTeachers: boolean;
  canEditTeachers: boolean;
  canViewClasses: boolean;
  canEditClasses: boolean;
  canManageAttendance: boolean;
  canManageResults: boolean;
  canManageSettings: boolean;
};

export const roles: RolePermission[] = [
  {
    id: "1",
    roleName: "Administrator",
    description: "Full access to manage the school portal and all records.",
    canViewStudents: true,
    canEditStudents: true,
    canViewTeachers: true,
    canEditTeachers: true,
    canViewClasses: true,
    canEditClasses: true,
    canManageAttendance: true,
    canManageResults: true,
    canManageSettings: true,
  },
  {
    id: "2",
    roleName: "Teacher",
    description: "Can manage attendance and results, and view academic records.",
    canViewStudents: true,
    canEditStudents: false,
    canViewTeachers: true,
    canEditTeachers: false,
    canViewClasses: true,
    canEditClasses: false,
    canManageAttendance: true,
    canManageResults: true,
    canManageSettings: false,
  },
  {
    id: "3",
    roleName: "Clerk",
    description: "Can manage student and teacher records but not system settings.",
    canViewStudents: true,
    canEditStudents: true,
    canViewTeachers: true,
    canEditTeachers: true,
    canViewClasses: true,
    canEditClasses: false,
    canManageAttendance: false,
    canManageResults: false,
    canManageSettings: false,
  },
];