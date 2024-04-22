import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Department } from './department';
import { EmployeeAttributes } from '../types';

class Employee extends Model<EmployeeAttributes> {
  public id!: number;
  public name!: string;
  public surname!: string;
  public departmentId!: number;

  static initModel(): void {
    Employee.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        departmentId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Departments',
            key: 'id',
          }
        },
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'Employees',
      }
    );
  }
}

Employee.initModel();

Employee.belongsTo(Department, {foreignKey: 'departmentId'});
Department.hasMany(Employee, {foreignKey: 'departmentId'});

export { Employee, EmployeeAttributes };
