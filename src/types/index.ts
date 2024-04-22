export interface DepartmentData {
    id: number;
    name: string;
}

export interface SalaryData {
    amount: string;
    date: string;
}

export interface RateData {
    date: string;
    sign: string;
    value: string;
}

export interface EmployeeData {
  id?: string;
  name?: string;
  surname?: string;
  department?: {
    id?: number;
    name?: string;
  }
}

export interface DonationData {
  id?: string;
  date?: string;
  amount?: string;
}

export interface DepartmentAttributes {
  id: number;
  name: string;
}

export interface DonationAttributes {
  id?: number;
  amount: string;
  date: Date;
  employeeId: number;
}

export interface EmployeeAttributes {
  id: number;
  name: string;
  surname: string;
  departmentId: number;
}

export interface Ratettributes {
  id?: number;
  date: Date;
  sign: string;
  value: number;
}

export interface SalaryAttributes {
  id?: number;
  amount: number;
  date: Date;
  employeeId: number;
}

export interface Employee {
    id?: string;
    name?: string;
    surname?: string;
    department?: {
        id?: string;
        name?: string;
    } | null;
    salary?: {
        id?: string;
        amount?: string;
        date?: string;
    }[] | null;
    donation?: {
        id?: string;
        date?: string;
        amount?: string;
    }[];
}

export interface Rate {
  date?: string;
  sign?: string;
  value?: string;
}