import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Employee, Department, Salary, Donation, Rate } from '../models';
import initializeDatabase from '../config/databaseSetup';
import { parseDumpText } from '../services/parseText';

interface DepartmentData {
    id: number;
    name: string;
}

interface SalaryData {
    amount: string;
    date: string;
}

interface RateData {
    date: string;
    sign: string;
    value: string;
}

interface EmployeeData {
  id?: string;
  name?: string;
  surname?: string;
  department?: {
    id?: number;
    name?: string;
  }
}

interface DonationData {
  id?: string;
  date?: string;
  amount?: string;
}

async function initializeDatabaseConnection(): Promise<void> {
  try {
    await initializeDatabase();
  } catch (error) {
    throw new Error('Database initialization failed');
  }
}

function readDumpData(filePath: string): any {
  const rawData = fs.readFileSync(filePath, 'utf8');
  return parseDumpText(rawData);
}

function prepareDepartments(data: any): Department[] {
  const departments = data.map((emp: any) => ({
    id: parseInt(emp.department?.id ?? "0"),
    name: emp.department?.name ?? "Unknown",
  })).filter((dept: DepartmentData) => dept.id !== 0);

  return Array.from(new Map(departments.map((dept: DepartmentData) => [dept.id, dept])).values()) as Department[];
}

function prepareEmployees(data: any): Employee[] {
  return data.map((emp: EmployeeData) => ({
    id: emp.id ? parseInt(emp.id) : null,
    name: emp.name ?? null,
    surname: emp.surname ?? null,
    departmentId: emp.department?.id,
  })).filter((emp: EmployeeData) => emp.id !== null);
}

function prepareSalaries(data: any): Salary[] {
  return data.flatMap((emp: any) => emp.salary?.map((salary: SalaryData) => ({
      employeeId: parseInt(emp.id),
      amount: parseFloat(salary.amount ?? "0"),
      date: new Date(salary.date ?? new Date())
  })) ?? []) as Salary[];
}

function prepareDonations(data: any): Donation[] {
  return data.flatMap((emp: any) => emp.donation?.map((donation: DonationData) => ({
    employeeId: parseInt(emp.id),
    amount: donation.amount ?? "Unknown",
    date: new Date(donation.date ?? new Date())
  })) ?? []);
}

function prepareRates(data: any): Rate[] {
  return data.rates.map((rate: RateData) => ({
    date: new Date(rate.date ?? new Date()),
    sign: rate.sign ?? "Unknown",
    value: parseFloat(rate.value ?? "0"),
  })) as Rate[];
}

async function importDumpData(req: Request, res: Response): Promise<void> {
  try {
    await initializeDatabaseConnection();
    const filePath = path.join(__dirname, '../data/dump.txt');
    const dumpData = readDumpData(filePath);

    const departments = prepareDepartments(dumpData.employees);
    await Department.bulkCreate(departments, { ignoreDuplicates: true });

    const employees = prepareEmployees(dumpData.employees);
    await Employee.bulkCreate(employees, { validate: true });

    const salaries = prepareSalaries(dumpData.employees);
    await Salary.bulkCreate(salaries, { validate: true });

    const donations = prepareDonations(dumpData.employees);
    await Donation.bulkCreate(donations, { validate: true });

    const rates = prepareRates(dumpData);
    await Rate.bulkCreate(rates, { validate: true });

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Failed to import dump data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { importDumpData };
