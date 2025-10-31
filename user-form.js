// FOR REQUEST PART - Price Calculation
document.addEventListener("DOMContentLoaded", function () {
  const documentTypeSelect = document.getElementById("document_type");
  const quantityInput = document.getElementById("quantity");
  const priceInput = document.getElementById("price");

  const prices = {
    "Barangay Certificate": 0,
    "Certificate of Indigency": 0,
    "Proof of Residency": 0,
    "Barangay Business Permit": 0,
    "Certificate to File Action": 0,
    "Barangay ID": 0,
    "First Time Job Seeker Certificate": 0,
  };

  function updatePrice() {
    const selectedType = documentTypeSelect.value;
    const quantity = parseInt(quantityInput.value) || 0;
    const unitPrice = prices[selectedType] || 0;
    const totalPrice = unitPrice * quantity;
    priceInput.value = `₱${totalPrice.toFixed(2)}`;
  }

  documentTypeSelect.addEventListener("change", updatePrice);
  quantityInput.addEventListener("input", updatePrice);

  // Initial calculation
  updatePrice();
});

// Text to uppercase automatically
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll('input[type="text"], textarea');

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
    });
  });
});

// number
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  // Allow only digits (ASCII codes 48 to 57)
  return charCode >= 48 && charCode <= 57;
}

// STEP NAVIGATION SYSTEM
document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const sections = document.querySelectorAll(".section[data-step]");
  const navItems = document.querySelectorAll(".nav-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const form = document.getElementById("documentRequestForm");
  const previewModal = document.getElementById("previewModal");

  // Function to show a specific step
  function showStep(step) {
    // Hide all sections
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Show current section
    sections[step].classList.add("active");

    // Update sidebar navigation
    navItems.forEach((item, index) => {
      item.classList.remove("active");
      if (index === step) {
        item.classList.add("active");
      }
    });

    // Update button visibility and text based on step
    if (step === 0) {
      // Step 0: Only Next button
      backBtn.style.position = "relative";
      prevBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = "Next";
    } else if (step === sections.length - 1) {
      // Step 3 (last step): Previous and Done/Submit button
      prevBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = "Done";
    } else {
      // Steps 1-2: Both Previous and Next buttons
      prevBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = "Next";
    }

    currentStep = step;

    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Validate current step before proceeding
  function validateStep(step) {
    const currentSection = sections[step];
    const requiredFields = currentSection.querySelectorAll("[required]");
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach((field) => {
      // Check if field is empty or unchecked (for checkboxes)
      if (field.type === "checkbox") {
        if (!field.checked) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
          field.style.outline = "2px solid #f44336";
        }
      } else if (field.type === "file") {
        if (!field.files || field.files.length === 0) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
          field.style.border = "2px solid #f44336";
        }
      } else {
        if (!field.value.trim()) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
          field.style.border = "1px solid #f44336";
        } else {
          field.style.border = "1px solid #ccc";
        }
      }
    });

    // Show alert if validation fails
    if (!isValid) {
      showValidationAlert(
        "Please fill in all required fields before proceeding."
      );
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstInvalidField.focus();
      }
    }

    return isValid;
  }

  // Show validation alert
  function showValidationAlert(message) {
    const alert = document.getElementById("validationAlert");
    alert.textContent = message;
    alert.style.display = "block";
    alert.style.animation = "slideDown 0.3s ease";

    setTimeout(() => {
      alert.style.animation = "slideUp 0.3s ease";
      setTimeout(() => {
        alert.style.display = "none";
      }, 300);
    }, 3000);
  }

  // Show preview modal with form data
  function showPreviewModal() {
    const formData = new FormData(form);
    let previewHTML = `
            <h2 style="color: #21205d; margin-bottom: 20px; border-bottom: 2px solid #21205d; padding-bottom: 10px;">
                Review Your Information
            </h2>
        `;

    // Personal Information Section
    previewHTML += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #21205d; font-size: 18px; margin-bottom: 15px;">Personal Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600; width: 40%;">Full Name:</td>
                        <td style="padding: 10px;">${formData.get(
                          "first_name"
                        )} ${formData.get("middle_name")} ${formData.get(
      "last_name"
    )} ${formData.get("suffix") || ""}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Contact Number:</td>
                        <td style="padding: 10px;">${formData.get(
                          "contact_number"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Date of Birth:</td>
                        <td style="padding: 10px;">${formData.get(
                          "date_of_birth"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Gender:</td>
                        <td style="padding: 10px;">${formData.get(
                          "gender"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Place of Birth:</td>
                        <td style="padding: 10px;">${formData.get(
                          "place_of_birth"
                        )}</td>
                    </tr>
                </table>
            </div>
        `;

    // Address Section
    previewHTML += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #21205d; font-size: 18px; margin-bottom: 15px;">Permanent Address</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600; width: 40%;">Street:</td>
                        <td style="padding: 10px;">${formData.get(
                          "street"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Barangay:</td>
                        <td style="padding: 10px;">${formData.get(
                          "barangay"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">City/Province:</td>
                        <td style="padding: 10px;">${formData.get(
                          "city"
                        )}, ${formData.get("province")}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Region:</td>
                        <td style="padding: 10px;">${formData.get(
                          "region"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Zip Code:</td>
                        <td style="padding: 10px;">${formData.get(
                          "zip_code"
                        )}</td>
                    </tr>
                </table>
            </div>
        `;

    // Document Request Section
    previewHTML += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #21205d; font-size: 18px; margin-bottom: 15px;">Document Request</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600; width: 40%;">Document Type:</td>
                        <td style="padding: 10px;">${formData.get(
                          "document_type"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Purpose:</td>
                        <td style="padding: 10px;">${formData.get(
                          "purpose"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Quantity:</td>
                        <td style="padding: 10px;">${formData.get(
                          "quantity"
                        )}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">Total Price:</td>
                        <td style="padding: 10px;">${formData.get("price")}</td>
                    </tr>
                </table>
            </div>
        `;

    // Uploaded Files Section
    const selfieFile = document.getElementById("selfie_with_id").files[0];
    const idFile = document.getElementById("id_picture").files[0];
    previewHTML += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #21205d; font-size: 18px; margin-bottom: 15px;">Uploaded Documents</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600; width: 40%;">Selfie with ID:</td>
                        <td style="padding: 10px;">${
                          selfieFile ? selfieFile.name : "No file selected"
                        }</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <td style="padding: 10px; font-weight: 600;">ID Picture:</td>
                        <td style="padding: 10px;">${
                          idFile ? idFile.name : "No file selected"
                        }</td>
                    </tr>
                </table>
            </div>
        `;

    // Modal buttons
    previewHTML += `
            <div class="modal-buttons">
                <button type="button" id="closeModalBtn">Go Back</button>
                <button type="button" id="finalSubmitBtn">Confirm & Submit</button>
            </div>
        `;

    document.getElementById("modalContent").innerHTML = previewHTML;
    previewModal.style.display = "block";

    // Add event listeners to modal buttons
    document
      .getElementById("closeModalBtn")
      .addEventListener("click", function () {
        previewModal.style.display = "none";
      });

    document
      .getElementById("finalSubmitBtn")
      .addEventListener("click", function () {
        // Here you would submit the form
        alert("Form submitted successfully!");
        // form.submit(); // Uncomment this to actually submit the form
        previewModal.style.display = "none";
      });
  }

  // Previous button click handler
  prevBtn.addEventListener("click", function () {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });

  // Next button click handler
  nextBtn.addEventListener("click", function () {
    if (currentStep < sections.length - 1) {
      // Validate before moving to next step
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    } else {
      // Last step - validate and show preview
      if (validateStep(currentStep)) {
        showPreviewModal();
      }
    }
  });

  // Allow clicking on sidebar navigation items
  navItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      // Only allow going back or to completed steps
      if (index < currentStep) {
        showStep(index);
      } else if (index === currentStep) {
        // Already on this step, do nothing
      } else {
        // Trying to skip ahead - validate current step first
        if (validateStep(currentStep)) {
          showStep(index);
        }
      }
    });
  });

  // Remove error styling when user starts typing/selecting
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", function () {
      this.style.border = "1px solid #ccc";
      this.style.outline = "none";
    });

    field.addEventListener("change", function () {
      this.style.border = "1px solid #ccc";
      this.style.outline = "none";
    });
  });

  // Initialize first step
  showStep(0);
});
