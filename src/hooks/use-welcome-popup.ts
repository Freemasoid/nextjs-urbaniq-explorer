import { useState, useEffect } from "react";

const WELCOME_POPUP_KEY = "urbaniq-welcome-popup-seen";

export const useWelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen the welcome popup before
    const hasSeenWelcome = localStorage.getItem(WELCOME_POPUP_KEY);

    if (!hasSeenWelcome) {
      setIsOpen(true);
    }

    setIsLoading(false);
  }, []);

  const closeWelcomePopup = () => {
    setIsOpen(false);
    localStorage.setItem(WELCOME_POPUP_KEY, "true");
  };

  const resetWelcomePopup = () => {
    localStorage.removeItem(WELCOME_POPUP_KEY);
    setIsOpen(true);
  };

  return {
    isOpen,
    isLoading,
    closeWelcomePopup,
    resetWelcomePopup,
  };
};
