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

    // Contact form: build mailto, open it, then show confirmation
    const form = document.getElementById('contactForm');
    const formConfirmation = document.getElementById('formConfirmation');
    if (form && formConfirmation) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var nameEl = document.getElementById('contactName');
            var emailEl = document.getElementById('contactFrom');
            var subjectEl = document.getElementById('contactSubject');
            var messageEl = document.getElementById('contactMessage');

            var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
            var email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
            var subject = (subjectEl && subjectEl.value) ? subjectEl.value.trim() : 'Message from Other World Studios site';
            var message = (messageEl && messageEl.value) ? messageEl.value.trim() : '';

            var bodyParts = [];
            if (name) bodyParts.push('From: ' + name);
            if (email) bodyParts.push('Reply-To: ' + email);
            if (message) bodyParts.push(message);
            var body = bodyParts.join('\n\n');

            // Keep URL under ~2000 chars so mailto works everywhere
            var maxBodyLen = 1500;
            if (body.length > maxBodyLen) body = body.substring(0, maxBodyLen) + '...';

            var mailto = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

            // Use a temporary link and click it (more reliable than location.href in some browsers)
            var a = document.createElement('a');
            a.href = mailto;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Show confirmation
            formConfirmation.hidden = false;
            formConfirmation.classList.add('visible');
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
});
