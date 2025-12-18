function daysBetween(date1, date2) {
  return Math.floor(
    (new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24)
  );
}
