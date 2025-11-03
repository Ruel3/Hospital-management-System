// A simple array to act as a temporary 'database' for patients
let patients = [];
let nextPatientID = 1001;

// Get references to DOM elements
const patientForm = document.getElementById('patient-form');
const patientList = document.getElementById('patient-list');

// Event listener for form submission
patientForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const admissionDate = document.getElementById('admissionDate').value;
    
    // Create a new Patient object (based on your ERD entity 'Patient' and linked 'Admission')
    const newPatient = {
        patientID: `P${nextPatientID++}`,
        name: name,
        dateOfBirth: dob,
        admissionDate: admissionDate,
        // For simplicity, we only store the initial admission date here
        // A full system would manage a separate Admission entity
    };

    // Add the new patient to the array
    patients.push(newPatient);

    // Clear the form and update the list
    patientForm.reset();
    renderPatientList();
});

// Function to render the patient list on the UI
function renderPatientList() {
    patientList.innerHTML = ''; // Clear existing list items

    if (patients.length === 0) {
        patientList.innerHTML = '<li>No patients registered yet.</li>';
        return;
    }

    patients.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.textContent = 
            `ID: ${patient.patientID} | Name: ${patient.name} | DOB: ${patient.dateOfBirth} | Admitted: ${patient.admissionDate}`;
        patientList.appendChild(listItem);
    });
}

// Initial render
renderPatientList();
