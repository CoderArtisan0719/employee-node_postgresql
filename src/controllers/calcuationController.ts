import { Request, Response } from 'express';
import { sequelize } from "../config/database";

const calculateRewards = async (req: Request, res: Response): Promise<void> => {
  try {
    const rewardData = await sequelize.query(`
    WITH ConvertedDonations AS (
    SELECT 
        d."employeeId",
        d."date",
        CAST(SPLIT_PART(d.amount, ' ', 1) AS NUMERIC) *
        COALESCE((SELECT r.value FROM public."Rates" r WHERE r.sign = SPLIT_PART(d.amount, ' ', 2) AND r.date = d.date), 1) AS amount_usd
    FROM 
        public."Donations" d
    ),
    TotalQualifyingDonations AS (
        SELECT 
            SUM(CASE WHEN amount_usd > 100 THEN amount_usd ELSE 0 END) AS total
        FROM 
            ConvertedDonations
    ),
    EmployeeDonations AS (
        SELECT 
            "employeeId",
            SUM(amount_usd) AS total_donated,
            SUM(CASE WHEN amount_usd > 100 THEN amount_usd ELSE 0 END) AS qualifying_donated
        FROM 
            ConvertedDonations
        GROUP BY 
            "employeeId"
    )
    SELECT 
        e.id AS employee_id,
        e.name AS employee_name,
        ed.total_donated,
        CASE 
            WHEN ed.qualifying_donated > 0 THEN (ed.qualifying_donated / (SELECT total FROM TotalQualifyingDonations)) * 10000 
            ELSE 0 
        END AS reward
    FROM 
        public."Employees" e
    JOIN 
        EmployeeDonations ed ON e."id" = ed."employeeId";
    `, { type: 'SELECT' });
    res.status(200).json(rewardData);
  } catch (error) {
    console.error('Failed to calculate rewards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default calculateRewards;

