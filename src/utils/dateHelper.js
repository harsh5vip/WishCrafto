/**
 * Calculates the number of days remaining until a target date.
 * If the date has passed in the current year, it shows days until next year.
 * @param {string} targetDate - Format YYYY-MM-DD
 */
export const getDaysCountdown = (targetDate) => {
  const now = new Date();
  let target = new Date(targetDate);
  
  // Set time of target to midnight
  target.setHours(0, 0, 0, 0);
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = target.getTime() - nowMidnight.getTime();
  
  // If target has passed this year, compute for the next year
  if (diff < 0) {
    target.setFullYear(now.getFullYear() + 1);
    diff = target.getTime() - nowMidnight.getTime();
  }

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};

/**
 * Formats a YYYY-MM-DD date string into a pretty editorial style.
 * E.g., Nov 09, 2026
 * @param {string} dateString 
 */
export const formatDateString = (dateString) => {
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};
