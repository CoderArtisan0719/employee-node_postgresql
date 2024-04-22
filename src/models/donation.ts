import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { DonationAttributes } from '../types';

class Donation extends Model<DonationAttributes> {
  public id!: number;
  public amount!: string;
  public date!: Date;
  public employeeId!: number;

  static initModel(): void {
    Donation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        amount: {
          type: DataTypes.STRING,
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
        modelName: 'Donation',
        tableName: 'Donations',
      }
    );
  }
}

Donation.initModel();

export { Donation, DonationAttributes };
