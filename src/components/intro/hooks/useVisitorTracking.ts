import { useState, useEffect } from 'react';

export const useVisitorTracking = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const checkAndUpdateVisitorCount = () => {
      // Check if visitor has already been counted today
      const today = new Date().toDateString();
      const visitorCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('visitor_today='));
      
      const hasVisitedToday = visitorCookie && visitorCookie.includes(today);
      
      if (!hasVisitedToday) {
        // Set cookie for today with expiration
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        document.cookie = `visitor_today=${today}; expires=${tomorrow.toUTCString()}; path=/`;
        
        // Get current count from localStorage
        const storedCount = localStorage.getItem('visitorCount');
        const currentCount = storedCount ? parseInt(storedCount) : 0;
        const newCount = currentCount + 1;
        
        // Update localStorage and state
        localStorage.setItem('visitorCount', newCount.toString());
        setVisitorCount(newCount);
      } else {
        // Just display the current count without incrementing
        const storedCount = localStorage.getItem('visitorCount');
        const currentCount = storedCount ? parseInt(storedCount) : 0;
        setVisitorCount(currentCount);
      }
    };

    // Small delay to ensure this runs after initial render
    const timer = setTimeout(checkAndUpdateVisitorCount, 100);
    return () => clearTimeout(timer);
  }, []);

  return visitorCount;
}; 