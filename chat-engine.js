const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatTyping = document.getElementById('chatTyping');

function addMessage(text, role) {
  const msg = document.createElement('div');
  msg.className = 'chat-message ' + role;
  msg.innerHTML = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function simulateResponse(userText) {
  const t = userText.toLowerCase();
  let response = '';

  if (t.includes('sales') && t.includes('region')) {
    response = `
      Here’s a simulated breakdown of total sales by region for this year:<br><br>
      North: $2,145,843<br>
      South: $1,654,250<br>
      East: $1,528,960<br>
      West: $1,289,810<br><br>
      In the desktop app, this would create a bar chart in the Visualization panel.
    `;
  } else if (t.includes('gpa') && (t.includes('>') || t.includes('greater'))) {
    response = `
      I’ve applied a conceptual filter: GPA &gt; 3.0.<br><br>
      In SiftIQ, this would update the filtered row count in the status bar.
    `;
  } else if (t.includes('bar chart') && t.includes('gender')) {
    response = `
      I would generate a bar chart of Gender vs Count of Students.<br><br>
      X: Gender<br>
      Y: Count of rows<br>
      Chart type: Bar (Grouped).
    `;
  } else if (t.includes('summarize') || t.includes('summary')) {
    response = `
      Here’s a high‑level summary of the simulated dataset:<br><br>
      • Rows: 49,987<br>
      • Unique Students: 49,987<br>
      • Avg Balance: 2,500<br>
      • VisaType Filled: 100.00%<br><br>
      These could be added as dashboard KPI tiles in SiftIQ.
    `;
  } else if (t.includes('columns') || t.includes('schema')) {
    response = `
      Example columns in the student dataset:<br><br>
      StudentID, FirstName, LastName, Age, Gender, GPA, Major, Minor, CreditsCompleted, EnrollmentStatus.<br><br>
      I can help design filters, charts, and derived columns based on these fields.
    `;
  } else if (t.includes('help')) {
    response = `
      Try asking things like:<br><br>
      • “Show me total sales by region for this year”<br>
      • “Filter GPA &gt; 3.0 and summarize”<br>
      • “Create a bar chart of Gender vs Count”<br>
      • “Summarize this dataset”<br>
      • “What columns are available?”
    `;
  } else {
    response = `
      I’ve logged your request as a general analysis question.<br><br>
      In a future version, this chat can call a real AI API (OpenAI, Azure OpenAI, or Ollama) and run against live data loaded into SiftIQ.
    `;
  }

  addMessage(response, 'ai');
}

function handleSend() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';
  chatTyping.style.display = 'block';
  setTimeout(() => {
    chatTyping.style.display = 'none';
    simulateResponse(text);
  }, 700);
}

if (chatSend) {
  chatSend.addEventListener('click', handleSend);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend();
  });
}
