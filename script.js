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
        document.body.appendChild(textarea);
        textarea.select();
        try {
            showResult(document.execCommand('copy') ? 'Copied!' : 'Copy failed');
        } catch (e) {
            showResult('Copy failed');
        }
        document.body.removeChild(textarea);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONTACT_EMAIL).then(function() {
            showResult('Copied!');
        }).catch(fallbackCopy);
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
            } else if (window.scrollY > 400) {
                bar.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(contact);

    window.addEventListener('scroll', function() {
        if (window.scrollY <= 400) bar.classList.remove('is-visible');
    }, { passive: true });
}

function initMenu() {
    var btn = document.getElementById('menuBtn');
    var menu = document.getElementById('siteMenu');
    if (!btn || !menu) return;

    function closeMenu() {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.menu-btn-text').textContent = 'Menu';
        document.body.classList.remove('menu-open');
    }

    function openMenu() {
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.menu-btn-text').textContent = 'Close';
        document.body.classList.add('menu-open');
    }

    btn.addEventListener('click', function() {
        if (menu.classList.contains('is-open')) closeMenu();
        else openMenu();
    });

    menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
}

function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal').forEach(function(el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el, i) {
        el.style.transitionDelay = (i % 5) * 0.06 + 's';
        observer.observe(el);
    });
}

function initHeroGrid() {
    var canvas = document.getElementById('heroCanvas');
    var hint = document.getElementById('heroHint');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var pointer = { x: -1000, y: -1000 };
    var animId;
    var spacing = 48;

    function resize() {
        var hero = canvas.parentElement;
        canvas.width = hero.offsetWidth * devicePixelRatio;
        canvas.height = hero.offsetHeight * devicePixelRatio;
        canvas.style.width = hero.offsetWidth + 'px';
        canvas.style.height = hero.offsetHeight + 'px';
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        spacing = window.innerWidth < 640 ? 36 : 48;
    }

    function draw() {
        var w = canvas.width / devicePixelRatio;
        var h = canvas.height / devicePixelRatio;
        ctx.clearRect(0, 0, w, h);

        for (var x = 0; x <= w; x += spacing) {
            for (var y = 0; y <= h; y += spacing) {
                var dx = pointer.x - x;
                var dy = pointer.y - y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var influence = Math.max(0, 1 - dist / 140);
                var alpha = 0.06 + influence * 0.55;
                var radius = 1 + influence * 2.5;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(77, 159, 255, ' + alpha + ')';
                ctx.fill();

                if (influence > 0.15) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.strokeStyle = 'rgba(77, 159, 255, ' + (influence * 0.12) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animId = requestAnimationFrame(draw);
    }

    function onMove(e) {
        var rect = canvas.getBoundingClientRect();
        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var clientY = e.touches ? e.touches[0].clientY : e.clientY;
        pointer.x = clientX - rect.left;
        pointer.y = clientY - rect.top;
        if (hint) hint.classList.add('is-hidden');
    }

    function onLeave() {
        pointer.x = -1000;
        pointer.y = -1000;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        if (hint) hint.style.display = 'none';
        return;
    }

    resize();
    draw();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchend', onLeave);

    return function() {
        cancelAnimationFrame(animId);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    var contactLink = document.getElementById('contactLink');
    if (contactLink) {
        contactLink.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contactLink.click();
            }
        });
    }

    var copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) copyBtn.addEventListener('click', copyEmailToClipboard);

    initMenu();
    initSmoothScroll();
    initMobileCtaBar();
    initScrollReveal();
    initHeroGrid();
});
