import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Ratettributes } from '../types';

class Rate extends Model<Ratettributes> {
  public id!: number;
  public date!: Date;
  public sign!: string;
  public value!: number;

  static initModel(): void {
    Rate.init(
      {
          id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
          },
          value: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
          },
          date: {
              type: DataTypes.DATE,
              allowNull: false,
          },
        sign: {
            type: DataTypes.STRING,
            allowNull: false,
          }
      },
      {
        sequelize,
        modelName: 'Rate',
        tableName: 'Rates',
      }
    );
  }
}

Rate.initModel();

export { Rate, Ratettributes };
