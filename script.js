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

    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            var isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open menu');
            });
        });
    }
});
