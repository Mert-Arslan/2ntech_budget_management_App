"use client";

import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const localVal = JSON.parse(localStorage.getItem(key));
      if (localVal === null) {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } else {
        return localVal;
      }
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return initialValue;
    }
  });

  const setLocalStorage = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.error("Error storing data to localStorage:", error);
    }
  };

  return [storedValue, setLocalStorage];
};
