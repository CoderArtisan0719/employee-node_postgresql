export const calculateRewards = async (req: any, res: any) => {
  try {
        // const results = await CalculationService.calculateRewards();
        res.json('results');
    } catch (error) {
      // res.status(500).json({ message: error.message });
      console.log(error)
    }
}