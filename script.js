const CONTACT_EMAIL = 'otherworldstudios@protonmail.com';

function copyEmailToClipboard() {
    var feedback = document.getElementById('copyFeedback');
    function showResult(msg) {
        if (feedback) {
            feedback.textContent = msg;
            feedback.classList.add('visible');
            setTimeout(function() {
                feedback.textContent = '';
                feedback.classList.remove('visible');
            }, 2500);
        }
    }
    function fallbackCopy() {
        var textarea = document.createElement('textarea');
        textarea.value = CONTACT_EMAIL;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            var ok = document.execCommand('copy');
            showResult(ok ? 'Copied!' : 'Copy failed');
        } catch (e) {
            showResult('Copy failed');
        }
        document.body.removeChild(textarea);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONTACT_EMAIL).then(function() {
            showResult('Copied!');
        }).catch(function() {
            fallbackCopy();
        });
    } else {
        fallbackCopy();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var contactLink = document.getElementById('contactLink');
    if (contactLink) {
        contactLink.setAttribute('tabindex', '0');
        contactLink.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contactLink.click();
            }
        });
    }

    var copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            copyEmailToClipboard();
        });
    }

    var form = document.getElementById('contactForm');
    var formConfirmation = document.getElementById('formConfirmation');
    if (form) {
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

            var maxBodyLen = 1200;
            var maxSubjectLen = 200;
            if (body.length > maxBodyLen) body = body.substring(0, maxBodyLen) + '...';
            if (subject.length > maxSubjectLen) subject = subject.substring(0, maxSubjectLen);

            var mailto = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

            try {
                window.location.href = mailto;
            } catch (err) {
                var a = document.createElement('a');
                a.href = mailto;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

            if (formConfirmation) {
                formConfirmation.hidden = false;
                formConfirmation.setAttribute('aria-hidden', 'false');
                formConfirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
});
