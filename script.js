// Function to fetch JSON data
function fetchJSON(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error fetching JSON:', error));
  }
  
  // Function to render employee data
  function renderEmployeeData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterSelect = document.getElementById('filterSelect').value.toLowerCase();
  
    fetchJSON('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
      .then(data => {
        const employees = data.employees;
        const filteredEmployees = employees.filter(employee => {
          const name = employee.name ? employee.name.toLowerCase() : '';
          const designation = employee.designation ? employee.designation.toLowerCase() : '';
          const skills = employee.skills ? employee.skills.map(skill => skill.toLowerCase()) : [];
  
          return (name.includes(searchInput) || designation.includes(searchInput)) &&
            (filterSelect === '' || designation.includes(filterSelect) || skills.includes(filterSelect));
        });
  
        const tableBody = document.querySelector('#employeeTable tbody');
        tableBody.innerHTML = '';
  
        filteredEmployees.forEach(employee => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name || '-'}</td>
            <td>${employee.designation || '-'}</td>
            <td>${employee.skills ? employee.skills.join(', ') : '-'}</td>
          `;
          tableBody.appendChild(row);
        });
      });
  }
  
  // Event listeners for search and filter
  document.getElementById('searchInput').addEventListener('input', renderEmployeeData);
  document.getElementById('filterSelect').addEventListener('change', renderEmployeeData);
  
  // Initial rendering
  renderEmployeeData();
  function getData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to filter data based on selected skills
  function filterData(data, selectedSkills) {
    return data.filter(employee => {
      return selectedSkills.every(skill => {
        return employee.skills.includes(skill.trim().toLowerCase());
      });
    });
  }

  // Function to display filtered results
  function displayFilteredResults(filteredData) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';

    filteredData.forEach(employee => {
      const li = document.createElement('li');
      li.textContent = employee.name;
      employeeList.appendChild(li);
    });
  }

  // API URL
  const apiUrl = 'https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json';

  // Select the skills filter checkboxes
  const sqlCheckbox = document.getElementById('sqlCheckbox');
  const javascriptCheckbox = document.getElementById('javascriptCheckbox');
  const pythonCheckbox = document.getElementById('pythonCheckbox');
  const htmlCheckbox = document.getElementById('htmlCheckbox');
  const cssCheckbox = document.getElementById('cssCheckbox');
  const photoshopCheckbox = document.getElementById('photoshopCheckbox');
  const manualTestingCheckbox = document.getElementById('manualTestingCheckbox');
  const javaCheckbox = document.getElementById('javaCheckbox');

  // Select the search input element
  const searchInput = document.getElementById('searchInput');

  // Retrieve data and initialize the filter
  getData(apiUrl)
    .then(data => {
      // Initialize the filter with all employees
      displayFilteredResults(data);

      // Event listener for the skills filter checkboxes
      const checkboxes = [
        sqlCheckbox, javascriptCheckbox, pythonCheckbox,
        htmlCheckbox, cssCheckbox, photoshopCheckbox,
        manualTestingCheckbox, javaCheckbox
      ];

      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const selectedSkills = checkboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
          const filteredData = filterData(data, selectedSkills);
          displayFilteredResults(filteredData);
        });
      });

      // Event listener for the search input change
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredData = data.filter(employee => employee.name.toLowerCase().includes(searchTerm));
        displayFilteredResults(filteredData);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

 

