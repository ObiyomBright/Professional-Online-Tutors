const registerBtn = document.getElementById('registerBtn');

// Toggle mobile menu
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-links').classList.remove('active'); // Close menu on click
    });
});

//Alert Box
function alertBox(message) {
    // Create the alert container
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alertBox'); // Adding class to style it
    alertContainer.textContent = message;

    // Append the alert container to the body (or any specific container element)
    document.body.appendChild(alertContainer);

    // Optional: remove the alert box after 3 seconds
    setTimeout(() => {
        alertContainer.remove();
    }, 3000);
}


//Function to send formData to Whatsapp
async function whatsappApi(formattedData) {

    try {
        const request = await fetch('index.php', {
            method: 'POST',
            body: JSON.stringify(formattedData),
        });

        const response = await request.json();

        if (response.status == 'error') {
            alertBox('Sorry, we were unable to complete your request. Kindly try again.');
            console.error(response.message);
        } else {
            alertBox(response.message);
            console.log(response.message);
        }

    } catch (error) {
        console.error(error);
    } finally {
        registerBtn.textContent = 'Register';
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const bookSessionBtn = document.getElementById('bookSessionBtn');
    const bookSessionContainer = document.querySelector('.book-session-container');

    bookSessionBtn.addEventListener('click', e => {
        bookSessionContainer.style.display = 'block';
    })

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        registerBtn.textContent = 'Registering...';

        const form = e.target;
        const formData = new FormData(form);

        //Bundle form data
        const gradeLevel = formData.get('grade_level');
        const subjects = formData.getAll('subject[]') || [];
        const subjectsText = subjects.length > 0 ? subjects.join(', ') : 'None';
        const classDuration = formData.get('class_duration');
        const numSections = formData.get('num_sections');
        const studentName = formData.get('student_name');
        const email = formData.get('email') || 'None';
        const phone = formData.get('phone');

        const bundledText = `
        Student name: ${studentName}
        Email: ${email}
        Phone: ${phone}

        Grade level: ${gradeLevel}
        Subjects of interest: ${subjectsText}
        Class Duration: ${classDuration}
        Number of Section: ${numSections}   
    `.trim();

        //Send Bundled Text to Whatsapp
        whatsappApi(bundledText);

    })
})
