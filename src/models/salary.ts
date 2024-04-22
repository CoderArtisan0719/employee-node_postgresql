import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SalaryAttributes } from '../types';

class Salary extends Model<SalaryAttributes> {
  public id!: number;
  public amount!: number;
  public date!: Date;
  public employeeId!: number;

  static initModel(): void {
    Salary.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        employeeId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Employees',
            key: 'id',
          },
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Salary',
        tableName: 'Salaries',
      }
    );
  }
}

// Initialize the Salary model
Salary.initModel();

export { Salary, SalaryAttributes };
