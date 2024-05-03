document.addEventListener('DOMContentLoaded', function() {
    const tokens = document.querySelectorAll('.token');
    const explanations = document.querySelectorAll('.explanation');
    const form = document.getElementById('supportForm');
    const successMessage = document.getElementById('successMessage');

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

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const token = form.token.value;
        const comment = form.comment.value;
        const mail = form.mail.value;
        const deadline = form.deadline.value;

        console.log('Mail:', mail);
        console.log('Token:', token);
        console.log('Comment:', comment);

        // Email sending code here
        emailjs.send("service_bmns2if", "template_ztzhrn8", {
            mail: mail,
            token: token,
            comment: comment,
            deadline: deadline
        }, "ZRxqAeYU2Bcg6hb4t") // Include your user ID here
        .then(function(response) {
            console.log('Email sent successfully:', response);
            alert('Email sent successfully!');
            form.reset();
            tokens.forEach(t => t.classList.remove('selected'));
            explanations.forEach(explanation => explanation.style.display = 'none');
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }, function(error) {
            console.error('Email sending failed:', error);
            alert('Email sending failed. Please try again later.');
        });
    });
});
