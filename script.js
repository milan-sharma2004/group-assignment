document.addEventListener("DOMContentLoaded", () => {
  // 🌙 DARK MODE TOGGLE
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // 🧑‍⚕️ DYNAMIC DOCTOR LIST BY DEPARTMENT
  const departmentSelect = document.getElementById("department");
  const doctorSelect = document.getElementById("doctor");

  const doctorsByDepartment = {
    "General Medicine": [
      { name: "Dr. Michael Johnson", value: "dr_johnson" },
      { name: "Dr. Emma Davis", value: "dr_davis" },
      { name: "Nurse Lisa Wilson", value: "nurse_wilson" },
    ],
    Gynaecology: [
      { name: "Dr. Sonia Patel", value: "dr_patel" },
      { name: "Dr. Rachel Thompson", value: "dr_thompson" },
      { name: "Nurse Maria Garcia", value: "nurse_garcia" },
    ],
    Radiology: [
      { name: "Dr. Wei Chen", value: "dr_chen" },
      { name: "Dr. James Murphy", value: "dr_murphy" },
      { name: "Technician Carlos Rodriguez", value: "tech_rodriguez" },
    ],
    Dermatology: [
      { name: "Dr. Yuna Kim", value: "dr_kim" },
      { name: "Dr. William Taylor", value: "dr_taylor" },
      { name: "Nurse Ashley Brown", value: "nurse_brown" },
    ],
    Neurology: [
      { name: "Dr. Raj Sharma", value: "dr_sharma" },
      { name: "Dr. Emily Anderson", value: "dr_anderson" },
      { name: "Nurse Daniel Jackson", value: "nurse_jackson" },
    ],
  };

  departmentSelect.addEventListener("change", () => {
    const selectedDept = departmentSelect.value;
    doctorSelect.innerHTML = `<option value="">Select a doctor</option>`;

    if (selectedDept && doctorsByDepartment[selectedDept]) {
      doctorsByDepartment[selectedDept].forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.name; // You can also use doc.value
        option.textContent = doc.name;
        doctorSelect.appendChild(option);
      });
    }
  });

  // 🧾 FORM LOGIC AND BILL CALCULATION
  const patientForm = document.getElementById('patientForm');
  const patientType = document.getElementById('patientType');
  const roomSelection = document.getElementById('roomSelection');
  const output = document.getElementById('output');

  patientType.addEventListener('change', function () {
    if (this.value === 'IP') {
      roomSelection.style.display = 'block';
    } else {
      roomSelection.style.display = 'none';
    }
  });

  patientForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('patientName').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const symptoms = document.getElementById('symptoms').value.trim();
    const doctor = document.getElementById('doctor').value;
    const type = document.getElementById('patientType').value;
    const room = document.getElementById('roomType').value;

    if (!name || !contact || !dob || !symptoms || !doctor || !type) {
      alert('Please fill all required fields!');
      return;
    }

    let totalAmount = 0;

    if (type === 'OP') {
      totalAmount = 100; // OP Consultation Fee
    } else if (type === 'IP') {
      switch (room) {
        case 'General':
          totalAmount = 300; // Stay fee + initial
          break;
        case 'Semi-Private':
          totalAmount = 500;
          break;
        case 'Private':
          totalAmount = 800;
          break;
        default:
          alert('Please select a room type for IP patients.');
          return;
      }
    }

    output.innerHTML = `
      <h3>Registration Successful!</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Doctor Chosen:</strong> ${doctor}</p>
      <p><strong>Patient Type:</strong> ${type}</p>
      <p><strong>Total Amount to Pay:</strong> $${totalAmount}</p>
    `;
  });
});
