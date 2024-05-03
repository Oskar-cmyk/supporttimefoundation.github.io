document.addEventListener('DOMContentLoaded', function() {
    const tokens = document.querySelectorAll('.token');
    const explanations = document.querySelectorAll('.explanation');

    tokens.forEach(token => {
        token.addEventListener('click', function() {
            tokens.forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            const tokenInput = document.getElementById('token');
            tokenInput.value = this.dataset.name;

            // Hide all explanations
            explanations.forEach(explanation => {
                explanation.style.display = 'none';
            });

            // Display the corresponding explanation
            const explanationId = this.dataset.name.toLowerCase() + 'Explanation';
            const explanationToShow = document.getElementById(explanationId);
            if (explanationToShow) {
                explanationToShow.style.display = 'block';
            }
        });
    });

    const form = document.getElementById('supportForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const token = form.token.value;
        const comment = form.comment.value;
        const mail = form.mail.value;
        const deadline = form.deadline.value;

        console.log('Mail:', mail);x
        console.log('Token:', token);
        console.log('Comment:', comment);
        console.log('Deadline:', deadline);

        // Generate Google Calendar link
        const calendarLink = generateGoogleCalendarLink('Support Request', comment, 'Online', new Date(deadline));

        // Email sending code here
        emailjs.send("service_bmns2if", "template_ztzhrn8", {
            mail: mail,
            token: token,
            comment: comment,
            deadline: deadline,
            calendarLink: calendarLink // Include the Google Calendar link in the template
        }, "ZRxqAeYU2Bcg6hb4t")
        .then(function(response) {
            console.log('Email sent successfully:', response);
            alert('Support request submitted successfully!');
            form.reset();
            tokens.forEach(t => t.classList.remove('selected'));
            explanations.forEach(explanation => explanation.style.display = 'none');
        }, function(error) {
            console.error('Email sending failed:', error);
            alert('Request sending failed. Please try again later.');
        });
    });

    // Function to generate Google Calendar link
    const generateGoogleCalendarLink = (title, description, location, deadlineDate) => {
        const startDate = deadlineDate.toISOString().replace(/-|:|\.\d+/g, '');
        const endDate = new Date(deadlineDate.getTime() + (60 * 60 * 1000)).toISOString().replace(/-|:|\.\d+/g, ''); // 1 hour after start
        const encodedTitle = encodeURIComponent(title);
        const encodedDescription = encodeURIComponent(description);
        const encodedLocation = encodeURIComponent(location);

        return `https://www.google.com/calendar/event?action=TEMPLATE&dates=${startDate}/${endDate}&text=${encodedTitle}&details=${encodedDescription}&location=${encodedLocation}`;
    };
});
