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

document.addEventListener('DOMContentLoaded', ()=> {

    const bookSessionBtn = document.getElementById('bookSessionBtn');
const bookSessionContainer = document.querySelector('.book-session-container');

bookSessionBtn.addEventListener('click', e => {
    bookSessionContainer.style.display = 'block';
})

    document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form= e.target;
    const formData = new FormData(form);

    //Bundle form data
    const  gradeLevel = formData.get('grade_level');
    const subjects = formData.getAll('subject[]') || [];
    const subjectsText = subjects.length > 0 ? subjects.join(', ') : 'None';
    const classDuration = formData.get('class_duration');
    const numSections = formData.get('num_sections');
    const studentName = formData.get('student_name');
    const email= formData.get('email') || 'None';
    const phone = formData.get('phone');

    const bundledText = `
        New Online Class Request 
        Student name: ${studentName}
        Email: ${email}
        Phone: ${phone}

        Grade level: ${gradeLevel}
        Subjects of interest: ${subjectsText}
        Class Duration: ${classDuration}
        Number of Section: ${numSections}   
    `.trim();

    console.log(bundledText);
})
})
