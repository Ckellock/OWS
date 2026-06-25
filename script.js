const CONTACT_EMAIL = 'otherworldstudios@protonmail.com';

/*
 * Google Calendar appointment scheduling
 * --------------------------------------
 * 1. Open Google Calendar → Create → Appointment schedule
 * 2. Set your availability, duration (e.g. 15 min), and video link (Google Meet)
 * 3. Click the schedule → Share → "Booking page" for bookingUrl
 * 4. Share → "Website embed" for embedUrl (append ?gv=true if not present)
 */
const BOOKING_CONFIG = {
    embedUrl: '',
    bookingUrl: ''
};

function initBookingCalendar() {
    var embedContainer = document.getElementById('bookingEmbed');
    var fallback = document.getElementById('bookingFallback');
    var fallbackText = document.getElementById('bookingFallbackText');
    var externalLink = document.getElementById('bookingExternalLink');
    var note = document.getElementById('bookingNote');
    if (!embedContainer || !fallback) return;

    var embedUrl = BOOKING_CONFIG.embedUrl.trim();
    var bookingUrl = BOOKING_CONFIG.bookingUrl.trim();

    if (embedUrl) {
        if (embedUrl.indexOf('?') === -1) {
            embedUrl += '?gv=true';
        } else if (embedUrl.indexOf('gv=') === -1) {
            embedUrl += '&gv=true';
        }

        var iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.title = 'Book a call with Other World Studios';
        iframe.className = 'booking-iframe';
        iframe.loading = 'lazy';
        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        embedContainer.appendChild(iframe);

        if (bookingUrl && externalLink) {
            externalLink.href = bookingUrl;
            note.hidden = false;
            note.innerHTML = 'Calendar not loading? <a href="' + bookingUrl + '" target="_blank" rel="noopener noreferrer">Open booking page</a> · Prefer email? <a href="#contact">Send a message</a>.';
        } else if (note) {
            note.hidden = false;
        }
        return;
    }

    embedContainer.hidden = true;

    if (bookingUrl && externalLink) {
        externalLink.href = bookingUrl;
        fallback.hidden = false;
        if (note) note.hidden = false;
        return;
    }

    if (fallbackText) {
        fallbackText.textContent = 'Calendar setup in progress — use the contact form below and we\u2019ll schedule a time.';
    }
    if (externalLink) {
        externalLink.textContent = 'Send a message';
        externalLink.href = '#contact';
        externalLink.removeAttribute('target');
        externalLink.removeAttribute('rel');
    }
    fallback.hidden = false;
}

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

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var id = link.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initMobileCtaBar() {
    var bar = document.getElementById('mobileCtaBar');
    var contact = document.getElementById('contact');
    if (!bar || !contact) return;

    bar.setAttribute('aria-hidden', 'false');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                bar.classList.remove('is-visible');
            } else if (window.scrollY > 300) {
                bar.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(contact);

    window.addEventListener('scroll', function() {
        if (window.scrollY <= 300) {
            bar.classList.remove('is-visible');
        }
    }, { passive: true });
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

    initSmoothScroll();
    initMobileCtaBar();
    initBookingCalendar();
});
