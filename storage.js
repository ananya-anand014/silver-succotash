const STORAGE_KEY = "applications";

function loadApplications() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveApplications(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}
