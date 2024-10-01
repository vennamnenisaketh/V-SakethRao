
let data = [
    { id: 1, chemicalName: "Chemical A", vendor: "Vendor A", density: "1.0", viscosity: "10", packaging: "Bottle", packSize: "500ml", unit: "ml", quantity: "10" },
    { id: 2, chemicalName: "Chemical B", vendor: "Vendor B", density: "0.9", viscosity: "15", packaging: "Canister", packSize: "1L", unit: "L", quantity: "5" },
    { id: 3, chemicalName: "Chemical C", vendor: "Vendor C", density: "1.2", viscosity: "20", packaging: "Bag", packSize: "2kg", unit: "kg", quantity: "8" }
];

let selectedRowIndex = null;


function loadTableData() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; 
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.chemicalName}</td>
            <td>${row.vendor}</td>
            <td>${row.density}</td>
            <td>${row.viscosity}</td>
            <td>${row.packaging}</td>
            <td>${row.packSize}</td>
            <td>${row.unit}</td>
            <td>${row.quantity}</td>
            <td>
                <button onclick="editRow(${index})">Edit</button>
                <button onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        
        // Add click event for row selection
        tr.addEventListener('click', () => {
            selectedRowIndex = index; 
            highlightSelectedRow(tr); 
        });

        tableBody.appendChild(tr);
    });
}


function highlightSelectedRow(row) {
    const rows = document.querySelectorAll('tr');
    rows.forEach((r) => r.classList.remove('selected')); 
    row.classList.add('selected');  
}


function addRow() {
    const newRow = {
        id: data.length + 1,
        chemicalName: "New Chemical",
        vendor: "New Vendor",
        density: "1.0",
        viscosity: "10",
        packaging: "Bottle",
        packSize: "500ml",
        unit: "ml",
        quantity: "5"
    };
    data.push(newRow);  
    loadTableData();     
}


function deleteRow(index) {
    data.splice(index, 1); 
    loadTableData();        
}


function moveUp() {
    if (selectedRowIndex !== null && selectedRowIndex > 0) {
        
        [data[selectedRowIndex], data[selectedRowIndex - 1]] = [data[selectedRowIndex - 1], data[selectedRowIndex]];
        selectedRowIndex--;  
        loadTableData();     
    } else {
        alert('Cannot move up! Either no row selected or already at the top.');
    }
}


function moveDown() {
    if (selectedRowIndex !== null && selectedRowIndex < data.length - 1) {
       
        [data[selectedRowIndex], data[selectedRowIndex + 1]] = [data[selectedRowIndex + 1], data[selectedRowIndex]];
        selectedRowIndex++;  
        loadTableData();     
    } else {
        alert('Cannot move down! Either no row selected or already at the bottom.');
    }
}


function editRow(index) {
    const row = data[index];
    const tableBody = document.getElementById('tableBody');
    const rowElement = tableBody.rows[index];

    rowElement.innerHTML = `
        <td>${row.id}</td>
        <td><input type="text" id="chemicalName-${index}" value="${row.chemicalName}"></td>
        <td><input type="text" id="vendor-${index}" value="${row.vendor}"></td>
        <td><input type="text" id="density-${index}" value="${row.density}"></td>
        <td><input type="text" id="viscosity-${index}" value="${row.viscosity}"></td>
        <td><input type="text" id="packaging-${index}" value="${row.packaging}"></td>
        <td><input type="text" id="packSize-${index}" value="${row.packSize}"></td>
        <td><input type="text" id="unit-${index}" value="${row.unit}"></td>
        <td><input type="text" id="quantity-${index}" value="${row.quantity}"></td>
        <td>
            <button onclick="saveRow(${index})">Save</button>
            <button onclick="cancelEdit(${index})">Cancel</button>
        </td>
    `;
}


function saveRow(index) {
    const updatedRow = {
        id: data[index].id,
        chemicalName: document.getElementById(`chemicalName-${index}`).value,
        vendor: document.getElementById(`vendor-${index}`).value,
        density: document.getElementById(`density-${index}`).value,
        viscosity: document.getElementById(`viscosity-${index}`).value,
        packaging: document.getElementById(`packaging-${index}`).value,
        packSize: document.getElementById(`packSize-${index}`).value,
        unit: document.getElementById(`unit-${index}`).value,
        quantity: document.getElementById(`quantity-${index}`).value
    };

    
    data[index] = updatedRow;
    loadTableData(); 
}


function cancelEdit(index) {
    loadTableData();  
}


loadTableData();
