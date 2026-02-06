const CONTACT_EMAIL = 'otherworldstudios@protonmail.com';

document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.getElementById('contactLink');
    if (contactLink) {
        contactLink.setAttribute('tabindex', '0');
        contactLink.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contactLink.click();
            }
        });
    }

    // Copy email button
    const copyBtn = document.getElementById('copyEmailBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    if (copyBtn && copyFeedback) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(CONTACT_EMAIL).then(function() {
                copyFeedback.textContent = 'Copied!';
                copyFeedback.classList.add('visible');
                setTimeout(function() {
                    copyFeedback.textContent = '';
                    copyFeedback.classList.remove('visible');
                }, 2000);
            }).catch(function() {
                copyFeedback.textContent = 'Copy failed';
                copyFeedback.classList.add('visible');
            });
        });
    }

    // Contact form: build mailto with subject and body
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = (document.getElementById('contactName') && document.getElementById('contactName').value) || '';
            var email = (document.getElementById('contactFrom') && document.getElementById('contactFrom').value) || '';
            var subject = (document.getElementById('contactSubject') && document.getElementById('contactSubject').value) || 'Message from Other World Studios site';
            var message = (document.getElementById('contactMessage') && document.getElementById('contactMessage').value) || '';
            var body = (name ? 'From: ' + name + '\n' : '') + (email ? 'Reply-To: ' + email + '\n\n' : '') + message;
            var mailto = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.location.href = mailto;
        });
    }
});
