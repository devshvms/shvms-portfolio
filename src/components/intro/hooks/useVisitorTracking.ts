import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc, setDoc, increment, arrayUnion } from 'firebase/firestore';

export const useVisitorTracking = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [deployment, setDeployment] = useState<{ deploymentId: string; deploymentDate: string } | null>(null);
  const [visitorInfo, setVisitorInfo] = useState<{ ip: string; location: string } | null>(null);

  useEffect(() => {
    const updateVisitorCount = async () => {
      const today = new Date().toDateString();
      const visitorCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('visitor_today='));
      const hasVisitedToday = visitorCookie && visitorCookie.includes(today);

      // Fetch visitor IP and location from a public API
      let ip = '';
      let location = '';
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          ip = data.ip;
          location = `${data.city}, ${data.region}, ${data.country_name}`;
        }
      } catch (e) {
        // fallback if API fails
        ip = 'unknown';
        location = 'unknown';
      }
      setVisitorInfo({ ip, location });

      const docRef = doc(db, 'siteStats', 'visitorCount');

      if (!hasVisitedToday) {
        // Set cookie for today
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        document.cookie = `visitor_today=${today}; expires=${tomorrow.toUTCString()}; path=/`;

        // Try to increment visitor_count and add visitor info in Firestore, create if missing
        try {
          await updateDoc(docRef, {
            visitor_count: increment(1),
            visitors: arrayUnion({ ip, location, date: new Date().toISOString() })
          });
        } catch (e) {
          // If doc doesn't exist, create it
          await setDoc(docRef, {
            visitor_count: 1,
            visitors: [{ ip, location, date: new Date().toISOString() }],
            deployment: { deploymentId: '', deploymentDate: '' }
          });
        }
      }

      // Always fetch the latest count and deployment info
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVisitorCount(docSnap.data().visitor_count || 0);
        setDeployment(docSnap.data().deployment || null);
      }
    };

    updateVisitorCount();
  }, []);

  return { visitorCount, deployment, visitorInfo };
}; 