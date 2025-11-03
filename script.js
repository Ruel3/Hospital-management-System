// --- Global Data Stores (Simulating Database Tables) ---
let patients = [];
// ... (Keep other arrays: staff, admissions, prescriptions, billings, pharmacies)
let staff = [];
let admissions = [];
let prescriptions = [];
let billings = [];
const pharmacies = [
    { pharmacyID: 'PH1', location: 'Main Hospital' },
    { pharmacyID: 'PH2', location: 'Satellite Clinic' }
];

// --- ID Counters (Keep these) ---
let nextPatientID = 1001;
let nextStaffID = 2001;
let nextAdmissionID = 3001;
let nextPrescriptionID = 4001;
let nextBillingID = 5001;

// --- Helper Functions ---

// REVISED: Function to switch visible sections using the 'active' class
function showSection(id) {
    // 1. Remove 'active' class from all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    // 2. Add 'active' class to the target section
    document.getElementById(id).classList.add('active');
}

// Function to populate dropdowns (e.g., Pharmacy selection) - Keep this
function populateDropdowns() {
    const pharmacySelect = document.getElementById('r_pharmacyID');
    pharmacySelect.innerHTML = '<option value="">Select Pharmacy</option>';
    pharmacies.forEach(p => {
        const option = document.createElement('option');
        option.value = p.pharmacyID;
        option.textContent = `${p.location} (${p.pharmacyID})`;
        pharmacySelect.appendChild(option);
    });
}

// --- Data Rendering Functions (Keep these) ---
function renderList(dataArray, listElementId) {
    // ... (Keep the full implementation of renderList) ...
    const list = document.getElementById(listElementId);
    list.innerHTML = '';
    if (dataArray.length === 0) {
        list.innerHTML = '<li>No records found.</li>';
        return;
    }
    dataArray.forEach(item => {
        const listItem = document.createElement('li');
        // Simple display based on entity type
        if (listElementId === 'patient-list') {
            listItem.textContent = `ID: ${item.patientID} | Name: ${item.name} | DOB: ${item.dateOfBirth}`;
        } else if (listElementId === 'staff-list') {
            listItem.textContent = `ID: ${item.staffID} | Name: ${item.name} | Role: ${item.role} | Spec: ${item.specialization}`;
        } else if (listElementId === 'admission-list') {
            listItem.textContent = `AdmID: ${item.admissionID} | Patient: ${item.patientID} | Room: ${item.roomNumber} | Status: ${item.dischargeDate ? 'Discharged' : 'Active'}`;
        } else if (listElementId === 'prescription-list') {
             const pharmacy = pharmacies.find(p => p.pharmacyID === item.pharmacyID);
             const pharmacyName = pharmacy ? pharmacy.location : 'Unknown Pharmacy';
            listItem.textContent = `RxID: ${item.prescriptionID} | Pt: ${item.patientID} | Med: ${item.medication} (${item.dosage}) | Dispensed by: ${pharmacyName}`;
        } else if (listElementId === 'billing-list') {
            listItem.textContent = `BillID: ${item.billID} | Pt: ${item.patientID} | Amount: $${item.totalAmount.toFixed(2)} | Status: ${item.paymentStatus}`;
        } else if (listElementId === 'pharmacy-list') {
            listItem.textContent = `ID: ${item.pharmacyID} | Location: ${item.location}`;
        }
        list.appendChild(listItem);
    });
}

// --- Form Submission Handlers (Keep all these as they were correct) ---
document.getElementById('patient-form').addEventListener('submit', function(event) {
    // ... (Patient form logic) ...
    event.preventDefault();
    const newPatient = {
        patientID: `P${nextPatientID++}`,
        name: document.getElementById('p_name').value,
        dateOfBirth: document.getElementById('p_dob').value,
        admissionDate: document.getElementById('p_admDate').value // Initial admission date
    };
    patients.push(newPatient);
    renderList(patients, 'patient-list');
    this.reset();
});

document.getElementById('staff-form').addEventListener('submit', function(event) {
    // ... (Staff form logic) ...
    event.preventDefault();
    const newStaff = {
        staffID: `S${nextStaffID++}`,
        name: document.getElementById('s_name').value,
        role: document.getElementById('s_role').value,
        specialization: document.getElementById('s_spec').value
    };
    staff.push(newStaff);
    renderList(staff, 'staff-list');
    this.reset();
});

document.getElementById('admission-form').addEventListener('submit', function(event) {
    // ... (Admission form logic) ...
    event.preventDefault();
    const newAdmission = {
        admissionID: `A${nextAdmissionID++}`,
        patientID: document.getElementById('a_patientID').value,
        staffID: document.getElementById('a_staffID').value, // Handled by
        roomNumber: document.getElementById('a_roomNum').value,
        admissionDate: new Date().toISOString().split('T')[0], // Use current date for simplicity
        dischargeDate: document.getElementById('a_discDate').value || null
    };
    admissions.push(newAdmission);
    renderList(admissions, 'admission-list');
    this.reset();
});

document.getElementById('prescription-form').addEventListener('submit', function(event) {
    // ... (Prescription form logic) ...
    event.preventDefault();
    const newPrescription = {
        prescriptionID: `R${nextPrescriptionID++}`,
        patientID: document.getElementById('r_patientID').value,
        staffID: document.getElementById('r_staffID').value, // Writes
        medication: document.getElementById('r_medication').value,
        dosage: document.getElementById('r_dosage').value,
        pharmacyID: document.getElementById('r_pharmacyID').value, // Dispensed by
        datePrescribed: new Date().toISOString().split('T')[0]
    };
    prescriptions.push(newPrescription);
    renderList(prescriptions, 'prescription-list');
    this.reset();
});

document.getElementById('billing-form').addEventListener('submit', function(event) {
    // ... (Billing form logic) ...
    event.preventDefault();
    const newBill = {
        billID: `B${nextBillingID++}`,
        patientID: document.getElementById('b_patientID').value,
        totalAmount: parseFloat(document.getElementById('b_totalAmount').value),
        paymentStatus: document.getElementById('b_paymentStatus').value,
        billingDate: new Date().toISOString().split('T')[0]
    };
    billings.push(newBill);
    renderList(billings, 'billing-list');
    this.reset();
});

// --- Initialization ---

function init() {
    // 1. Set the initial view to Patient
    // This is now handled by the 'active' class in HTML/CSS, but we call it here 
    // to ensure the class is set if it was missed in the HTML.
    showSection('patient-section');
    
    // 2. Populate the Pharmacy dropdown and list
    populateDropdowns();
    renderList(pharmacies, 'pharmacy-list');

    // 3. Render all initial lists (they will be empty)
    renderList(patients, 'patient-list');
    renderList(staff, 'staff-list');
    renderList(admissions, 'admission-list');
    renderList(prescriptions, 'prescription-list');
    renderList(billings, 'billing-list');
}

// Run initialization
window.onload = init;
