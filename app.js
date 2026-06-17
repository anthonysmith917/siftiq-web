const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel-content');
const topbarTitle = document.getElementById('topbarTitle');
const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebar');

// Sample dataset for the Sheets panel
const tableData = [
  { date: '5/1/2024', region: 'North', product: 'Widget A', category: 'Gadgets', sales: 12450, qty: 120, profit: 3240 },
  { date: '5/2/2024', region: 'South', product: 'Widget A', category: 'Gadgets', sales: 9230, qty: 110, profit: 2130 },
  { date: '5/3/2024', region: 'East', product: 'Widget B', category: 'Devices', sales: 15980, qty: 140, profit: 4010 },
  { date: '5/4/2024', region: 'West', product: 'Widget C', category: 'Gadgets', sales: 8760, qty: 95, profit: 1890 }
];

let currentSortKey = null;
let sortAscending = true;

function renderTable() {
  const tbody = document.querySelector('#dataTable tbody');
  if (!tbody) return;
  // Create a copy of data to sort
  let sorted = [...tableData];
  if (currentSortKey) {
    sorted.sort((a, b) => {
      const valA = a[currentSortKey];
      const valB = b[currentSortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAscending ? valA - valB : valB - valA;
      }
      return sortAscending ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }
  // Build rows
  tbody.innerHTML = '';
  for (const row of sorted) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.date}</td>
      <td>${row.region}</td>
      <td>${row.product}</td>
      <td>${row.category}</td>
      <td>$${row.sales.toLocaleString()}</td>
      <td>${row.qty}</td>
      <td>$${row.profit.toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  }
}

function setupTableSorting() {
  const headers = document.querySelectorAll('#dataTable th');
  headers.forEach(th => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-key');
      if (currentSortKey === key) {
        // Toggle sort direction
        sortAscending = !sortAscending;
      } else {
        currentSortKey = key;
        sortAscending = true;
      }
      renderTable();
    });
  });
  // Initial render
  renderTable();
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const panelId = item.getAttribute('data-panel');
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    panels.forEach(p => p.style.display = 'none');
    document.getElementById('panel-' + panelId).style.display = 'block';
    topbarTitle.textContent = panelId.charAt(0).toUpperCase() + panelId.slice(1);
  });
});

if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// Initialize the sheet table and sorting once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupTableSorting();
});
