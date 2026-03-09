'use client';

import { useEffect } from 'react';

export default function DatabaseConnection() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const response = await fetch('/api/db-connect');
        if (!response.ok) throw new Error('Connection failed');
        
        const result = await response.json();
        console.log('Database status:', result.message);
      } catch (error) {
        console.error('Database connection error:', error);
      }
    };

    initializeDatabase();
  }, []);

  return null;
}