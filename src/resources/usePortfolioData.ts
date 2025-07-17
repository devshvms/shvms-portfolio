import { useEffect, useState } from 'react';
import { getPortfolioDataFromFirestore } from './dataService';

export const usePortfolioData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPortfolioDataFromFirestore()
      .then((portfolioData) => {
        setData(portfolioData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch portfolio data');
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}; 