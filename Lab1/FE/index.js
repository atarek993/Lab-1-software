function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// Add event listener to submit button
document.getElementById('submitbtn').addEventListener('click', createEmployee);

// Add event listener to delete button
document.getElementById('dataTable').addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-danger')) {
    const id = event.target.closest('tr').querySelector('td:first-child').textContent; // Get ID of the employee to be deleted
    deleteEmployee(id); // Call deleteEmployee function with the ID
  }
});

// Create employee function
async function createEmployee() {
  const name = document.getElementById('name').value; // Get name from input field
  const id = document.getElementById('id').value; // Get ID from input field

  if (!id || !name)
  {
    return;
  }

  // Send data to backend
  try {
    const response = await fetch('http://localhost:3000/api/v1/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name })
    });

    if (!response.ok) {
      throw new Error('Failed to create employee');
    }

    fetchEmployees(); // Call fetchEmployees to update the table
  } catch (error) {
    console.error(error);
  }
}

// Delete employee function
async function deleteEmployee(id) {
  // Send ID to backend
  try {
    const response = await fetch(`http://localhost:3000/api/v1/employee/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }

    fetchEmployees(); // Call fetchEmployees to update the table
  } catch (error) {
    console.error(error);
  }
}

fetchEmployees()
