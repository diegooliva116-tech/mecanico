/* ═══════════════════════════════════════
   MOTOR TOTAL · TALLER MECÁNICO · JS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

    // ─── NAV SCROLL ───
    var nav = document.getElementById('nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    // ─── MENÚ MÓVIL ───
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // ─── PARTÍCULAS / CHISPAS ───
    var particlesContainer = document.getElementById('particles');

    for (var i = 0; i < 20; i++) {
        var spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = Math.random() * 100 + '%';
        spark.style.animationDuration = (Math.random() * 8 + 6) + 's';
        spark.style.animationDelay = (Math.random() * 10) + 's';

        var size = Math.random() * 3 + 1;
        spark.style.width = size + 'px';
        spark.style.height = size + 'px';

        particlesContainer.appendChild(spark);
    }


    // ─── SCROLL REVEAL ───
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var parent = entry.target.parentElement;
                var hermanos = parent.querySelectorAll('.reveal, .reveal-left, .reveal-right');
                var indice = Array.from(hermanos).indexOf(entry.target);

                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, indice * 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function(el) {
        observer.observe(el);
    });


    // ─── CONTADOR HERO ───
    var counter1 = document.getElementById('counter1');
    var target = 3200;
    var counted = false;

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !counted) {
                counted = true;
                var current = 0;
                var increment = target / 80;

                function updateCounter() {
                    current += increment;
                    if (current >= target) {
                        counter1.textContent = target.toLocaleString() + '+';
                    } else {
                        counter1.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    }
                }
                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(counter1);


    // ─── LIGHTBOX ───
    var lightbox = document.getElementById('lightbox');
    var lbImg = document.getElementById('lbImg');
    var lbCerrar = document.getElementById('lbCerrar');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    var galeriaItems = document.querySelectorAll('.galeria-item');
    var currentImg = 0;

    function abrirLb(i) {
        currentImg = i;
        lbImg.src = galeriaItems[i].querySelector('img').src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function cerrarLb() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImg() {
        currentImg = (currentImg - 1 + galeriaItems.length) % galeriaItems.length;
        lbImg.src = galeriaItems[currentImg].querySelector('img').src;
        lbImg.style.animation = 'none';
        lbImg.offsetHeight;
        lbImg.style.animation = 'lbFade 0.3s ease';
    }

    function nextImg() {
        currentImg = (currentImg + 1) % galeriaItems.length;
        lbImg.src = galeriaItems[currentImg].querySelector('img').src;
        lbImg.style.animation = 'none';
        lbImg.offsetHeight;
        lbImg.style.animation = 'lbFade 0.3s ease';
    }

    galeriaItems.forEach(function(item, i) {
        item.addEventListener('click', function() { abrirLb(i); });
    });

    lbCerrar.addEventListener('click', cerrarLb);
    lbPrev.addEventListener('click', prevImg);
    lbNext.addEventListener('click', nextImg);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) cerrarLb();
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') cerrarLb();
        if (e.key === 'ArrowLeft') prevImg();
        if (e.key === 'ArrowRight') nextImg();
    });

    // Swipe móvil
    var touchX = 0;
    lightbox.addEventListener('touchstart', function(e) {
        touchX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        var diff = touchX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImg();
            else prevImg();
        }
    }, { passive: true });


    // ─── FORMULARIO ───
    var form = document.getElementById('formContacto');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var campos = form.querySelectorAll('input[required], select[required]');
        var ok = true;
        var btnTexto = form.querySelector('.btn-texto');
        var btnCargando = form.querySelector('.btn-cargando');

        form.querySelectorAll('.error').forEach(function(el) {
            el.classList.remove('error');
        });

        campos.forEach(function(campo) {
            if (!campo.value.trim()) {
                campo.classList.add('error');
                ok = false;
                setTimeout(function() { campo.classList.remove('error'); }, 3000);
            }
        });

        if (ok) {
            btnTexto.style.display = 'none';
            btnCargando.style.display = 'inline';

            setTimeout(function() {
                btnTexto.textContent = '✓ ¡Turno solicitado!';
                btnTexto.style.display = 'inline';
                btnCargando.style.display = 'none';

                var boton = form.querySelector('.btn-primary');
                boton.style.background = '#4CAF50';

                setTimeout(function() {
                    form.reset();
                    btnTexto.textContent = 'Enviar solicitud de turno';
                    boton.style.background = '';
                }, 3000);
            }, 1800);
        }
    });


    // ─── SMOOTH SCROLL ───
    document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            var id = this.getAttribute('href');
            if (id === '#') return;

            var destino = document.querySelector(id);
            if (destino) {
                window.scrollTo({
                    top: destino.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

});