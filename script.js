document.getElementById('expense-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
  
    if (date && category && amount) {
      const listItem = document.createElement('li');
      listItem.textContent = `${date} - ${category}: $${amount}`;
      document.getElementById('expense-list').appendChild(listItem);
  
      // Update the chart data
      addExpenseToChart(category, parseFloat(amount));
    }
  });
  
// Initialize Chart.js data
const chartData = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
  }]
};

// Predefined array of colors
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

function addExpenseToChart(category, amount) {
  const index = chartData.labels.indexOf(category);

  if (index > -1) {
    // If the category already exists, add to its amount
    chartData.datasets[0].data[index] += amount;
  } else {
    // If the category is new, add it with a unique color
    chartData.labels.push(category);
    chartData.datasets[0].data.push(amount);

    // Assign a color for the new category
    const colorIndex = chartData.labels.length - 1;
    const newColor = colors[colorIndex % colors.length]; // Loop through colors if exhausted
    chartData.datasets[0].backgroundColor.push(newColor);
  }

  // Update the chart
  expenseChart.update();
}

const ctx = document.getElementById('expense-chart').getContext('2d');
const expenseChart = new Chart(ctx, {
  type: 'pie',
  data: chartData,
});
