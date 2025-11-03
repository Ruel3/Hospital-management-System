// --- Global Data Stores (Simulating Database Tables) ---
let patients = [];
let staff = [];
let admissions = [];
let prescriptions = [];
let billings = [];

// Pre-define Pharmacy data (as this is a static reference entity)
const pharmacies = [
    { pharmacyID: 'PH1', location: 'Main Hospital' },
    { pharmacyID: 'PH2', location: 'Satellite Clinic' }
];

// --- ID Counters ---
let nextPatientID = 1001;
let nextStaffID = 2001;
let nextAdmissionID = 3001;
let nextPrescriptionID = 4001;
let nextBillingID = 5001;

// --- Helper Functions ---

// Function to switch visible sections (for the navigation)
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

// Function to populate dropdowns (e.g., Pharmacy selection)
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

// --- Data Rendering Functions ---

function renderList(dataArray, listElementId) {
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

// --- Form Submission Handlers ---

// 1. Patient Form
document.getElementById('patient-form').addEventListener('submit', function(event) {
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

// 2. Staff Form
document.getElementById('staff-form').addEventListener('submit', function(event) {
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

// 3. Admission Form
document.getElementById('admission-form').addEventListener('submit', function(event) {
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

// 4. Prescription Form (and Pharmacy Display)
document.getElementById('prescription-form').addEventListener('submit', function(event) {
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

// 5. Billing Form
document.getElementById('billing-form').addEventListener('submit', function(event) {
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
