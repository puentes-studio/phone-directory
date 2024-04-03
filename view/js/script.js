window.contactsList = [];

function validateForm(event) {
  event.preventDefault();

  // Get form inputs
  var nameInput = document.getElementById("name");
  var mobileInput = document.getElementById("mobile");
  var emailInput = document.getElementById("email");
  var errorDiv = document.getElementById("error");
  var contactTable = document
    .getElementById("summaryTable")
    .getElementsByTagName("tbody")[0];

  // Regular expressions for validation
  var nameRegex = /^[a-zA-Z\s]{1,20}$/;
  var mobileRegex = /^\d{10}$/;
  var emailRegex = /^[a-zA-Z][a-zA-Z\d.]{1,9}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,10}$/;

  // Validate name
  if (!nameRegex.test(nameInput.value)) {
    showError(
      "Contact name is required, contains only letters and spaces, and must be less than or equal to 20 characters in length."
    );
    return false;
  }

  // Validate mobile number
  if (!mobileRegex.test(mobileInput.value)) {
    showError(
      "Mobile number is required, must contain only numbers, and must be exactly 10 characters in length."
    );
    return false;
  }

  // Validate email
  if (!emailRegex.test(emailInput.value)) {
    showError("Email is required and must meet the specified format criteria.");
    return false;
  }

  // If all validation passes, add contact to table
  addContactToTable(
    nameInput.value,
    mobileInput.value,
    emailInput.value,
    contactTable
  );

  // Clear form inputs
  nameInput.value = "";
  mobileInput.value = "";
  emailInput.value = "";
}

function showError(message) {
  var errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.classList.remove("dn"); // Remove the 'dn' class to display the error message
}

function addContactToTable(name, mobile, email, table) {
  var newRow = table.insertRow();
  var nameCell = newRow.insertCell(0);
  var mobileCell = newRow.insertCell(1);
  var emailCell = newRow.insertCell(2);
  nameCell.textContent = name;
  mobileCell.textContent = mobile;
  emailCell.textContent = email;
}
console.log("Table:", table);
console.log("Name:", name);
console.log("Mobile:", mobile);
console.log("Email:", email);
