// Admission Form Handling & Custom Validation
document.addEventListener('DOMContentLoaded', () => {

    // 1. Auto Select Course in Admission Form from URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    const courseInput = document.getElementById('course');

    if (courseParam && courseInput) {
        courseInput.value = courseParam;
    }

    // 2. Admission Form Submission Logic
    const admissionForm = document.getElementById('admissionForm');

    if (admissionForm) {
        admissionForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form inputs
            const fullNameInput = document.getElementById('fullName');
            const fatherNameInput = document.getElementById('fatherName');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const qualificationInput = document.getElementById('qualification');
            const alertBox = document.getElementById('alertContainer');
            const confirmCheck = document.getElementById('confirmCheck');

            // Regular Expressions
            const letterRegex = /^[A-Za-z\s]+$/; // Sirf letters aur spaces
            const numberRegex = /^[0-9\-+ ]+$/;  // Sirf digits/numbers

            let isValid = true;

            // Name Validation (Letters Only)
            if (fullNameInput && !letterRegex.test(fullNameInput.value.trim())) {
                fullNameInput.classList.add('is-invalid');
                fullNameInput.classList.remove('is-valid');
                isValid = false;
            } else if (fullNameInput) {
                fullNameInput.classList.remove('is-invalid');
                fullNameInput.classList.add('is-valid');
            }

            // Father Name Validation (Letters Only)
            if (fatherNameInput && !letterRegex.test(fatherNameInput.value.trim())) {
                fatherNameInput.classList.add('is-invalid');
                fatherNameInput.classList.remove('is-valid');
                isValid = false;
            } else if (fatherNameInput) {
                fatherNameInput.classList.remove('is-invalid');
                fatherNameInput.classList.add('is-valid');
            }

            // Phone Validation (Numbers Only)
            if (phoneInput && !numberRegex.test(phoneInput.value.trim())) {
                phoneInput.classList.add('is-invalid');
                phoneInput.classList.remove('is-valid');
                isValid = false;
            } else if (phoneInput) {
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
            }

            // Email Validation
            if (emailInput && (!emailInput.value.includes('@') || !emailInput.value.includes('.'))) {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
                isValid = false;
            } else if (emailInput) {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            // Course Validation
            if (courseInput && courseInput.value === "") {
                courseInput.classList.add('is-invalid');
                isValid = false;
            } else if (courseInput) {
                courseInput.classList.remove('is-invalid');
            }

            // Qualification Validation
            if (qualificationInput && qualificationInput.value === "") {
                qualificationInput.classList.add('is-invalid');
                isValid = false;
            } else if (qualificationInput) {
                qualificationInput.classList.remove('is-invalid');
            }

            // Checkbox validation
            if (confirmCheck && !confirmCheck.checked) {
                isValid = false;
            }

            // If form is valid
            if (isValid) {
                const studentName = fullNameInput ? fullNameInput.value.trim() : "Student";
                const studentEmail = emailInput ? emailInput.value.trim() : "";
                const selectedCourseText = courseInput ? courseInput.options[courseInput.selectedIndex].text : "Selected Course";

                if (alertBox) {
                    alertBox.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show shadow-lg mb-4 border-0 p-4" role="alert">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fa-solid fa-circle-check text-success fs-3 me-3"></i>
                                <div>
                                    <h5 class="alert-heading fw-bold mb-0">Application Submitted Successfully!</h5>
                                    <small class="text-muted">Welcome to Bright Future Academy, ${studentName}.</small>
                                </div>
                            </div>
                            <hr>
                            <p class="mb-1"><i class="fa-solid fa-envelope me-2"></i>A confirmation receipt has been sent to <strong>${studentEmail}</strong> for the course <strong>${selectedCourseText}</strong>.</p>
                            <small class="text-muted">Our admissions desk will reach out to you within 24 hours.</small>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `;
                }

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

    // 3. Result Search Functionality (Expanded Database for Mam Demo)
    const resultForm = document.getElementById('resultForm');
    if (resultForm) {
        resultForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const rollNo = document.getElementById('rollNo').value.trim();
            const resultDiv = document.getElementById('resultOutput');

            // Bohat saare roll numbers ki list (Mam ko dikhane ke liye)
            const resultsDB = {
                "101": { name: "Ahmed Raza", course: "Frontend Web Development", marks: "485 / 500", percentage: "97%", grade: "A+" },
                "102": { name: "Fatima Noor", course: "Python & Machine Learning", marks: "472 / 500", percentage: "94.4%", grade: "A+" },
                "103": { name: "Hamza Ali", course: "MDCAT Preparation", marks: "465 / 500", percentage: "93%", grade: "A" },
                "104": { name: "Ayesha Khan", course: "ECAT Preparation", marks: "450 / 500", percentage: "90%", grade: "A" },
                "105": { name: "Bilal Ahmed", course: "Data Science & Analytics", marks: "440 / 500", percentage: "88%", grade: "A" },
                "106": { name: "Zainab Fatima", course: "Graphic & UI/UX Design", marks: "460 / 500", percentage: "92%", grade: "A+" },
                "107": { name: "Usman Khalid", course: "Spoken English", marks: "430 / 500", percentage: "86%", grade: "B+" },
                "108": { name: "Sadia Bilal", course: "Computer Science Core", marks: "475 / 500", percentage: "95%", grade: "A+" },
                "109": { name: "Ali Haider", course: "Frontend Web Development", marks: "420 / 500", percentage: "84%", grade: "B+" },
                "110": { name: "Nimra Akram", course: "MDCAT Preparation", marks: "490 / 500", percentage: "98%", grade: "A+" },
                "111": { name: "Talha Mahmood", course: "ECAT Preparation", marks: "410 / 500", percentage: "82%", grade: "B" },
                "112": { name: "Kainat Zahra", course: "Python & Machine Learning", marks: "455 / 500", percentage: "91%", grade: "A" },
                "113": { name: "Zeeshan Haider", course: "Data Science & Analytics", marks: "435 / 500", percentage: "87%", grade: "A" },
                "114": { name: "Rabia Basri", course: "Spoken English", marks: "465 / 500", percentage: "93%", grade: "A" },
                "115": { name: "Danyal Javed", course: "Graphic & UI/UX Design", marks: "425 / 500", percentage: "85%", grade: "B+" },
                "116": { name: "Mehwish Hayat", course: "Computer Science Core", marks: "480 / 500", percentage: "96%", grade: "A+" },
                "117": { name: "Saad Farooq", course: "Digital Marketing & SEO", marks: "415 / 500", percentage: "83%", grade: "B" },
                "118": { name: "Hira Mani", course: "Frontend Web Development", marks: "445 / 500", percentage: "89%", grade: "A" },
                "119": { name: "Fahad Mustafa", course: "MDCAT Preparation", marks: "405 / 500", percentage: "81%", grade: "B" },
                "120": { name: "Anum Fayyaz", course: "ECAT Preparation", marks: "470 / 500", percentage: "94%", grade: "A+" }
            };

            if (resultsDB[rollNo]) {
                const student = resultsDB[rollNo];
                resultDiv.innerHTML = `
                    <div class="card border-success border-2 shadow-sm rounded-4 mt-3 overflow-hidden">
                        <div class="card-header bg-success text-white fw-bold d-flex justify-content-between align-items-center">
                            <span><i class="fa-solid fa-check-circle me-2"></i>Result Found</span>
                            <span class="badge bg-light text-success fs-6">Grade: ${student.grade}</span>
                        </div>
                        <div class="card-body p-3">
                            <h6 class="fw-bold mb-1">Student Name: <span class="text-primary">${student.name}</span></h6>
                            <p class="text-muted small mb-2">Course: ${student.course} | Roll No: ${rollNo}</p>
                            <hr>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="small text-secondary">Total Marks:</span>
                                <span class="fw-bold text-dark">${student.marks}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="small text-secondary">Percentage:</span>
                                <span class="fw-bold text-success">${student.percentage}</span>
                            </div>
                            <span class="badge bg-success w-100 py-2">Status: PASSED</span>
                        </div>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="alert alert-danger shadow-sm rounded-3 mt-3 p-3">
                        <i class="fa-solid fa-triangle-exclamation me-2"></i><strong>No Record Found:</strong> Roll Number <strong>${rollNo}</strong> ka result system mein mojood nahi hai. (Try 101 to 120)
                    </div>
                `;
            }
        });
    }
});