import { useEffect, useState } from 'react';
import StockStepsCard from './utils/cards/StockStepsCard';
import { fetchPlans } from './utils/FetchPlans';

const StockSteps = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const plansData = await fetchPlans();
        setPlans(plansData);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlansData();
  }, []);

  return (
    <div className="">
      {plans.length === 0 ? (
        <p>Loading plans...</p>
      ) : (
        <div className="flex flex-wrap gap-10 my-[4rem] justify-center items-center">
          {plans.map((plan) => (
            <StockStepsCard
              key={plan.id}
              daily={`For ${plan.number_of_days} days`}
              returns={`Return ${plan.investment_profit_percent}%`}
              title={plan.category.name}
              total={`Total ${plan.investment_profit_percent}%`}
              amount={`$${plan.minimum_amount} - $${plan.maximum_amount}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSteps;
