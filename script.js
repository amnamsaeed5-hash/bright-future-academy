// Admission Form Handling & Custom Validation
document.addEventListener('DOMContentLoaded', () => {
    const admissionForm = document.getElementById('admissionForm');

    if (admissionForm) {
        admissionForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form inputs
            const fullNameInput = document.getElementById('fullName');
            const fatherNameInput = document.getElementById('fatherName');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const courseInput = document.getElementById('course');
            const qualificationInput = document.getElementById('qualification');
            const alertBox = document.getElementById('alertContainer');

            // Regular Expressions
            const letterRegex = /^[A-Za-z\s]+$/; // Sirf letters aur spaces
            const numberRegex = /^[0-9\-+ ]+$/;  // Sirf digits/numbers

            let isValid = true;

            // Name Validation (Letters Only)
            if (!letterRegex.test(fullNameInput.value.trim())) {
                fullNameInput.classList.add('is-invalid');
                fullNameInput.classList.remove('is-valid');
                isValid = false;
            } else {
                fullNameInput.classList.remove('is-invalid');
                fullNameInput.classList.add('is-valid');
            }

            // Father Name Validation (Letters Only)
            if (!letterRegex.test(fatherNameInput.value.trim())) {
                fatherNameInput.classList.add('is-invalid');
                fatherNameInput.classList.remove('is-valid');
                isValid = false;
            } else {
                fatherNameInput.classList.remove('is-invalid');
                fatherNameInput.classList.add('is-valid');
            }

            // Phone Validation (Numbers Only)
            if (!numberRegex.test(phoneInput.value.trim())) {
                phoneInput.classList.add('is-invalid');
                phoneInput.classList.remove('is-valid');
                isValid = false;
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
            }

            // Email Validation
            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            // Course & Qualification Validation
            if (courseInput.value === "") {
                courseInput.classList.add('is-invalid');
                isValid = false;
            } else {
                courseInput.classList.remove('is-invalid');
            }

            if (qualificationInput.value.trim() === "") {
                qualificationInput.classList.add('is-invalid');
                isValid = false;
            } else {
                qualificationInput.classList.remove('is-invalid');
            }

            // If form is valid
            if (isValid) {
                const studentName = fullNameInput.value.trim();
                const studentEmail = emailInput.value.trim();
                const selectedCourse = courseInput.value;

                alertBox.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show shadow-sm mb-4 border-0 p-4" role="alert">
                        <div class="d-flex align-items-center mb-2">
                            <i class="fa-solid fa-circle-check text-success fs-3 me-3"></i>
                            <div>
                                <h5 class="alert-heading fw-bold mb-0">Application Submitted Successfully!</h5>
                                <small class="text-muted">Welcome to Bright Future Academy, ${studentName}.</small>
                            </div>
                        </div>
                        <hr>
                        <p class="mb-1"><i class="fa-solid fa-envelope me-2"></i>A confirmation receipt has been sent to <strong>${studentEmail}</strong> for the course <strong>${selectedCourse}</strong>.</p>
                        <small class="text-muted">Our admissions desk will reach out to you within 24 hours.</small>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

                // Reset Form
                this.reset();
                
                // Remove Validation Classes
                const inputs = this.querySelectorAll('.form-control, .form-select');
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });

                // Scroll to top to view alert
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});