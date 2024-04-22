import { Employee, Rate } from "../types";

export function parseDumpText(rawData: string): { employees: Employee[]; rates: Rate[] } {
    const dataLines = rawData.split('\n');
    let employees: Employee[] = [];
    let rates: { date?: string; sign?: string; value?: string }[] = [];

    let selectEmployee: Employee | null = null;
    let selectRate: { date?: string; sign?: string; value?: string } | null = null;

    let isEmployee = false;
    let isDepartment = false;
    let isDonation = false;
    let isSalary = false;
    let isRate = false;

    let currentSalaryId: string | null = null;
    let currentDonationId: string | null = null;

    dataLines.forEach((line) => {
    const [key, value] = line.trim().split(': ');
        
        switch (key) {
            case 'E-List':
                isEmployee = false;
                isDepartment = false;
                isDonation = false;
                isSalary = false;
                isRate = false;
            
                break;
        
            case 'Employee':
                if (selectEmployee) {
                    employees = [
                        ...employees,
                        selectEmployee,
                    ];
                }

                selectEmployee = {};

                isEmployee = true;
                isDepartment = false;
                isDonation = false;
                isSalary = false;
                isRate = false;
                break;
        
        case 'Department':
            if (selectEmployee) {
                selectEmployee = {
                    ...selectEmployee,
                    department: {}
                };
            };
            
            isEmployee = false;
            isDepartment = true;
            isDonation = false;
            isSalary = false;
            isRate = false;
            break;
        
        case 'Salary':
            if (selectEmployee) {
                selectEmployee = {
                    ...selectEmployee,
                    salary: [],
                };
            };

            isEmployee = false;
            isDepartment = false;
            isDonation = false;
            isSalary = true;
            isRate = false;
            break;
        
            case 'Donation':
            if (selectEmployee && !selectEmployee.donation) {
                selectEmployee.donation = [];
            }
                
            isEmployee = false;
            isDepartment = false;
            isDonation = true;
            isSalary = false;
            isRate = false;
            break;
            
        case 'Rates':
            isEmployee = false;
            isDepartment = false;
            isDonation = false;
            isSalary = false;
            isRate = false;
            break;
            
        case 'Rate':
            if (selectRate) {
                rates = [
                    ...rates,
                    selectRate,
                ];
            };
                
            selectRate = {};
                
            isEmployee = false;
            isDepartment = false;
            isDonation = false;
            isSalary = false;
            isRate = true;
            break;
                
        case 'id':
            if (selectEmployee && isEmployee) {
                selectEmployee = {
                    ...selectEmployee,
                    id: value,
                };
            };

            if (selectEmployee && isDepartment) {
                selectEmployee = {
                    ...selectEmployee,
                    department: {
                        ...selectEmployee?.department,
                        id: value,
                    },
                };
            };

                if (selectEmployee && isDonation) {
                currentDonationId = value;
                selectEmployee = {
                    ...selectEmployee,
                    donation: [
                        ...(selectEmployee.donation || []),
                        {
                            id: value,
                        }
                    ],
                };
            };

            if (selectEmployee && isSalary) {
                currentSalaryId = value;

                selectEmployee = {
                    ...selectEmployee,
                    salary: [
                        ...(selectEmployee.salary || []),
                        {
                            id: value,
                        }
                    ],
                };
            }

            break;
        case 'name':
            if (isEmployee) {
                selectEmployee = {
                    ...selectEmployee,
                    name: value,
                };
            };

            if (isDepartment) {
                selectEmployee = {
                    ...selectEmployee,
                    department: {
                        ...selectEmployee?.department,
                        name: value,
                    },
                };
            };


            break;
      
        case 'surname':
            if (selectEmployee) {
                selectEmployee = {
                    ...selectEmployee,
                    surname: value,
                }
            };
                
            break;
        
        case 'date':
            if (selectEmployee) {
                if (isDonation) {
                    let donationTemp = selectEmployee.donation?.map((donation) => {
                        if (donation.id === currentDonationId) {
                            donation = {
                                ...donation,
                                date: value,
                            };
                        };

                        return donation;
                    });

                    selectEmployee = {
                        ...selectEmployee,
                        donation: donationTemp,
                    }

                }

                if (isSalary) {
                    let salaryTemp = selectEmployee.salary?.map((salary) => {
                        if (salary.id === currentSalaryId) {
                            salary = {
                                ...salary,
                                date: value,
                            }
                        }

                        return salary;
                    });

                    selectEmployee = {
                        ...selectEmployee,
                        salary: salaryTemp,
                    };
                }
                };
                
                if (selectRate && isRate) {
                    selectRate = {
                        ...selectRate,
                        date: value,
                    }
                }

            break;
        
        case 'amount':
            if (selectEmployee) {
                if (isDonation) {
                    let donationTemp = selectEmployee.donation?.map((donation) => {
                        if (donation.id === currentDonationId) {
                            donation = {
                                ...donation,
                                amount: value,
                            };
                        };

                        return donation;
                    });

                    selectEmployee = {
                        ...selectEmployee,
                        donation: donationTemp,
                    }
                }

                if (isSalary) {
                    let salaryTemp = selectEmployee.salary?.map((salary) => {
                        if (salary.id === currentSalaryId) {
                            salary = {
                                ...salary,
                                amount: value,
                            }
                        }

                        return salary;
                    });

                    selectEmployee = {
                        ...selectEmployee,
                        salary: salaryTemp,
                    };
                }
            }
            
            break;
            
            case 'value':
                if (selectRate && isRate) {
                    selectRate = {
                        ...selectRate,
                        value: value,
                    }
                }

                break;
        
            case 'sign':
                if (selectRate && isRate) {
                    selectRate = {
                        ...selectRate,
                        sign: value,
                    }
                }

                break;
      default:
        break;
    }
  });

  if (selectEmployee) {
    employees.push(selectEmployee);
    }
    
     if (selectRate) {
    rates.push(selectRate);
  }

  return { employees, rates };
}
