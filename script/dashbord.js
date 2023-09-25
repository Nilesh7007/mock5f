document.addEventListener("DOMContentLoaded", () => {
    const addEmployeeForm = document.getElementById("add-employee-form");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const employeeEmailInput = document.getElementById("employee-email");
    const departmentSelect = document.getElementById("department");
    const salaryInput = document.getElementById("salary");
    const addEmployeeButton = document.getElementById("add-employee-button");
    const employeeTableBody = document.getElementById("employee-table-body");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const currentPageSpan = document.getElementById("current-page");
    const logoutButton = document.getElementById("logout-button");

    let currentPage = 1;
    const itemsPerPage = 5;

    async function fetchAndDisplayEmployees(page) {
        try {
           
            const response = await fetch(`https://mock5-95s0.onrender.com/employee/page?page=${page}&limit=${itemsPerPage}`);
            if (response.ok) {
                const employees = await response.json();
                
            
                console.log("Data received:", employees);
           
            employeeTableBody.innerHTML = "";

            employees.forEach((employee) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${employee.First_Name}</td>
                    <td>${employee.Last_Name}</td>
                    <td>${employee.Email}</td>
                    <td>${employee.Department}</td>
                    <td>${employee.Salary}</td>
                    <td><button class="edit-button" data-id="${employee._id}">Edit</button></td>
                    <td><button class="delete-button" data-id="${employee._id}">Delete</button></td>
                `;
                employeeTableBody.appendChild(row);
            });

          s
            currentPage = data.currentPage;
            currentPageSpan.textContent = currentPage;
            prevPageButton.disabled = currentPage === 1;
            nextPageButton.disabled = currentPage === data.totalPages;
        }
        else {
            console.error("Failed to fetch employees: " + response.status);
        }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }

   
    fetchAndDisplayEmployees(currentPage);

   
    addEmployeeButton.addEventListener("click", async (e) => {
        e.preventDefault();

        
        const First_Name = firstNameInput.value;
        const Last_Name = lastNameInput.value;
        const Email = employeeEmailInput.value;
        const Department = departmentSelect.value;
        const Salary = parseFloat(salaryInput.value);

       
        const newEmployee = {
            First_Name,
            Last_Name,
            Email,
            Department,
            Salary,
        };

        try {
            const response = await fetch("https://mock5-95s0.onrender.com/employees/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEmployee),
            });

            if (response.ok) {
                
                firstNameInput.value = "";
                lastNameInput.value = "";
                employeeEmailInput.value = "";
                departmentSelect.value = "Tech";
                salaryInput.value = "";
                fetchAndDisplayEmployees(currentPage);
            } else {
                console.error("Failed to add employee");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    });


    async function deleteEmployee(employeeId) {
        try {
            // Send a DELETE request to the backend to delete the employee
            const response = await fetch(`/employees/${employeeId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Refresh the employee list after deletion
                fetchAndDisplayEmployees(currentPage);
            } else {
                console.error("Failed to delete employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }

    
    async function editEmployee(employeeId) {
        
        const newFirstName = prompt("Enter new first name:");
        const newLastName = prompt("Enter new last name:");
        const newEmail = prompt("Enter new email:");
        const newDepartment = prompt("Enter new department:");
        const newSalary = parseFloat(prompt("Enter new salary:"));

        if (newFirstName && newLastName && newEmail && newDepartment && !isNaN(newSalary)) {
            const updatedEmployee = {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                department: newDepartment,
                salary: newSalary,
            };

            try {
             
                const response = await fetch(`https://mock5-95s0.onrender.com/employees/employees/${employeeId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedEmployee),
                });

                if (response.ok) {
                   
                    fetchAndDisplayEmployees(currentPage);
                } else {
                    console.error("Failed to edit employee");
                }
            } catch (error) {
                console.error("Error editing employee:", error);
            }
        } else {
            console.error("Invalid input for editing employee");
        }
    }

    
    employeeTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const employeeId = e.target.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this employee?")) {
                deleteEmployee(employeeId);
            }
        } else if (e.target.classList.contains("edit-button")) {
            const employeeId = e.target.getAttribute("data-id");
            editEmployee(employeeId);
        }
    });


   
    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            fetchAndDisplayEmployees(currentPage - 1);
        }
    });

    nextPageButton.addEventListener("click", () => {
        fetchAndDisplayEmployees(currentPage + 1);
    });

  
    logoutButton.addEventListener("click", () => {
      
    });
});
