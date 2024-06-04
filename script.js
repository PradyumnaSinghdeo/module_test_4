document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const studentData = data;
            renderTable(studentData);
            setupSearch(studentData);
            setupSortButtons(studentData);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderTable(data) {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';

    data.forEach(student => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${student.serial}" alt="" width="30"></td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;

        tbody.appendChild(tr);
    });
}

function setupSearch(data) {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredData = data.filter(student => 
            student.first_name.toLowerCase().includes(query) || 
            student.last_name.toLowerCase().includes(query) || 
            student.email.toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });
}

function setupSortButtons(data) {
    document.getElementById('sortAZ').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
        renderTable(sortedData);
    });

    document.getElementById('sortZA').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`));
        renderTable(sortedData);
    });

    document.getElementById('sortByMarks').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => a.marks - b.marks);
        renderTable(sortedData);
    });

    document.getElementById('sortByPassing').addEventListener('click', () => {
        const filteredData = data.filter(student => student.passing);
        renderTable(filteredData);
    });

    document.getElementById('sortByClass').addEventListener('click', () => {
        const sortedData = [...data].sort((a, b) => a.class - b.class);
        renderTable(sortedData);
    });

    document.getElementById('sortByGender').addEventListener('click', () => {
        const maleStudents = data.filter(student => student.gender === 'Male');
        const femaleStudents = data.filter(student => student.gender === 'Female');
        renderTable(maleStudents, 'Male Students');
        renderTable(femaleStudents, 'Female Students');
    });
}
