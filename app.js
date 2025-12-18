let applications = loadApplications();

const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const locationInput = document.getElementById("location");
const dateInput = document.getElementById("date");
const statusInput = document.getElementById("status");
const sourceInput = document.getElementById("source");
const notesInput = document.getElementById("notes");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const tableBody = document.getElementById("tableBody");

document.getElementById("addBtn").addEventListener("click", addApplication);
searchInput.addEventListener("input", render);
filterStatus.addEventListener("change", render);

function addApplication() {
  const company = companyInput.value.trim();
  const role = roleInput.value.trim();

  if (!company || !role) {
    alert("Company and Role are required");
    return;
  }

  const duplicate = applications.some(app =>
    app.company.toLowerCase() === company.toLowerCase() &&
    app.role.toLowerCase() === role.toLowerCase()
  );

  if (duplicate) {
    alert("Duplicate application detected");
    return;
  }

  applications.push({
    id: crypto.randomUUID(),
    company,
    role,
    location: locationInput.value,
    status: statusInput.value,
    source: sourceInput.value,
    notes: notesInput.value,
    appliedDate: dateInput.value || new Date().toISOString().slice(0, 10),
    lastUpdated: new Date().toISOString()
  });

  saveApplications(applications);
  clearForm();
  render();
}

function clearForm() {
  document.querySelectorAll("input, textarea").forEach(i => i.value = "");
}

function deleteApplication(id) {
  applications = applications.filter(app => app.id !== id);
  saveApplications(applications);
  render();
}

function render() {
  tableBody.innerHTML = "";

  const query = searchInput.value.toLowerCase();
  const status = filterStatus.value;

  const filtered = applications.filter(app =>
    (app.company.toLowerCase().includes(query) ||
     app.role.toLowerCase().includes(query)) &&
    (status === "All" || app.status === status)
  );

  filtered.forEach(app => {
    const tr = document.createElement("tr");

    const idleDays = daysBetween(app.lastUpdated, new Date());

    if (idleDays > 15 && !["Offer", "Rejected"].includes(app.status)) {
      tr.classList.add("warning");
    }

    tr.innerHTML = `
      <td>${app.company}</td>
      <td>${app.role}</td>
      <td class="${app.status}">${app.status}</td>
      <td>${app.appliedDate}</td>
      <td>${new Date(app.lastUpdated).toLocaleDateString()}</td>
      <td><button onclick="deleteApplication('${app.id}')">Delete</button></td>
    `;

    tableBody.appendChild(tr);
  });

  renderAnalytics(applications);
}

render();
