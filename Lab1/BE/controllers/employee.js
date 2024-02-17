const employee = [
  { id: '1200089', name: 'Ahmed Tarek' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id; // Extract the employee ID from the request parameters

  try {
    // Find the index of the employee with the given ID
    const index = employee.findIndex(emp => emp.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Remove the employee from the array
    employee.splice(index, 1);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee", error: error.message });
  }
};

exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body; // Extract ID and name from request body

  
    // Add the new employee to the array
    employee.push({ id, name });

   
};
