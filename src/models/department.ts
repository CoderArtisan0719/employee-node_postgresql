import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { DepartmentAttributes } from '../types';

class Department extends Model<DepartmentAttributes> {
  public id!: number;
  public name!: string;

  static initModel(): void {
    Department.init(
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
      },
      {
        sequelize,
        modelName: 'Department', 
        tableName: 'Departments',
      }
    );
  }
}

Department.initModel();

export { Department, DepartmentAttributes };
