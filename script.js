/* ============================================================
   PORTFOLIO 3D — script.js (Detroit Lobby)
   Escena: núcleo holográfico, rejilla de datos, partículas flotantes.
   Corrección de resize para móviles (evita saltos por barra de direcciones)
   ============================================================ */

/* ==========================================
   CONFIG (de config.js)
========================================== */
window.APP_CONFIG = {
    nombre:    "César Andres Alvarez Romero",
    email:     "cesar.andres5242@gmail.com",
    github:    "https://github.com/Cesar-CAAR",
    version:   "2.0",
};

/* ==========================================
   HELPERS
========================================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ==========================================
   NAV SCROLL
========================================== */
function initNav() {
    const nav = $('#nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
}

/* ==========================================
   THEME TOGGLE
========================================== */
function initTheme() {
    const btn   = $('#themeToggle');
    const icon  = $('#themeIcon');
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    document.body.dataset.theme = saved;
    icon.textContent = saved === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
        const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = next;
        icon.textContent = next === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('portfolio-theme', next);
    });
}

/* ==========================================
   TYPED WORDS
========================================== */
function initTyped() {
    const words = $$('.typed-word');
    let current = 0;
    setInterval(() => {
        words[current].classList.remove('active');
        words[current].classList.add('exit');
        setTimeout(() => { words[current].classList.remove('exit'); }, 500);
        current = (current + 1) % words.length;
        words[current].classList.add('active');
    }, 2800);
}

/* ==========================================
   REVEAL ANIMATIONS
========================================== */
function initReveal() {
    const els = $$('.reveal-up, .reveal-left, .reveal-right, .reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                if (e.target.classList.contains('skill-track')) {
                    e.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
    setTimeout(() => {
        $$('.hero .reveal-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('active'), i * 150);
        });
    }, 300);
}

/* ==========================================
   PROJECT FILTERS
========================================== */
function initFilters() {
    const btns = $$('.filter-btn');
    const cards = $$('.project-card');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !show);
            });
        });
    });
}

/* ==========================================
   PDF
========================================== */
function initPDF() {
    const btn = $('#downloadPdfBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = 'assets/CV/CV_Cesar_Andres_Alvarez_Romero.pdf';
        a.download = 'CV_Cesar_Andres_Alvarez_Romero.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

/* ==========================================
   THREE.JS — HERO SCENE (Detroit Lobby)
   Núcleo holográfico central + rejilla + partículas
   Redimensionamiento optimizado para móviles
========================================== */
function initHeroScene() {
    if (!window.THREE) return;

    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050a14, 0.0008);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0.5, 0);

    /* ---- Luces ---- */
    scene.add(new THREE.AmbientLight(0x0a1a3a, 0.3));
    const mainLight = new THREE.PointLight(0x00c8ff, 1.8, 15);
    mainLight.position.set(0, 2, 3);
    scene.add(mainLight);
    const fillLight = new THREE.PointLight(0x7b68ee, 0.6, 12);
    fillLight.position.set(-2, 1, 1);
    scene.add(fillLight);

    /* ---- Núcleo holográfico central (icosaedro wireframe) ---- */
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00c8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, 0.8, 0);
    scene.add(core);

    const innerSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.4 })
    );
    innerSphere.position.copy(core.position);
    scene.add(innerSphere);

    // Anillos flotantes
    for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.0 + i * 0.25, 0.015, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.25 - i * 0.06 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(0, 0.8, 0);
        ring.rotation.x = Math.PI / 2;
        ring.rotation.z = i * 0.5;
        ring.userData = { speed: 0.002 + i * 0.001, axis: 'y' };
        scene.add(ring);
    }

    /* ---- Rejilla de datos ---- */
    const gridHelper = new THREE.GridHelper(8, 30, 0x00c8ff, 0x0a1a3a);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    const gridLineMat = new THREE.LineBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.15 });
    for (let z = -4; z <= 4; z += 1) {
        const points = [new THREE.Vector3(-4, -2.2, z), new THREE.Vector3(4, -2.2, z)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        scene.add(new THREE.Line(lineGeo, gridLineMat));
    }
    for (let x = -4; x <= 4; x += 1) {
        const points = [new THREE.Vector3(x, -2.2, -4), new THREE.Vector3(x, -2.2, 4)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        scene.add(new THREE.Line(lineGeo, gridLineMat));
    }

    /* ---- Partículas ascendentes ---- */
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 1] = -2 + Math.random() * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        velocities[i] = 0.005 + Math.random() * 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
        color: 0x00c8ff,
        size: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ---- Fragmentos geométricos flotantes ---- */
    const fragments = [];
    const fragGeo = new THREE.OctahedronGeometry(0.08, 0);
    const fragMat = new THREE.MeshStandardMaterial({ color: 0x00c8ff, roughness: 0.2, metalness: 0.8, emissive: new THREE.Color(0x001122) });
    for (let i = 0; i < 30; i++) {
        const frag = new THREE.Mesh(fragGeo, fragMat.clone());
        frag.position.set(
            (Math.random() - 0.5) * 7,
            (Math.random() - 0.5) * 5 + 1.5,
            (Math.random() - 0.5) * 5
        );
        frag.userData = {
            rotX: (Math.random() - 0.5) * 0.02,
            rotY: (Math.random() - 0.5) * 0.02,
            floatAmp: 0.15 + Math.random() * 0.3,
            floatFreq: 0.5 + Math.random() * 1,
            phase: Math.random() * Math.PI * 2,
            baseY: frag.position.y
        };
        scene.add(frag);
        fragments.push(frag);
    }

    /* ---- Movimiento del ratón (parallax) ---- */
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ================================================================
       REDIMENSIONAMIENTO (solo cuando cambia el ancho real)
       Así se evitan saltos al mostrar/ocultar la barra de direcciones
    ================================================================ */
    let currentWidth = window.innerWidth;

    function handleResize() {
        // Usamos visualViewport si está disponible (móviles modernos)
        const viewport = window.visualViewport;
        if (viewport) {
            const newWidth = viewport.width;
            if (Math.abs(newWidth - currentWidth) < 1) return; // solo cambios de ancho
            currentWidth = newWidth;
            camera.aspect = newWidth / viewport.height;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, viewport.height);
        } else {
            // Fallback para navegadores sin visualViewport
            const newWidth = window.innerWidth;
            if (Math.abs(newWidth - currentWidth) < 1) return;
            currentWidth = newWidth;
            camera.aspect = newWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, window.innerHeight);
        }
    }

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
    } else {
        window.addEventListener('resize', handleResize);
    }

    /* ---- Actualizar colores con el tema ---- */
    function updateThemeColors() {
        const style = getComputedStyle(document.documentElement);
        const primaryHex = style.getPropertyValue('--code').trim() || '#00c8ff';
        coreMat.color.set(primaryHex);
        innerSphere.material.color.set(primaryHex);
        particleMat.color.set(primaryHex);
        gridLineMat.color.set(primaryHex);
        fragMat.color.set(primaryHex);
        mainLight.color.set(primaryHex);
    }
    document.getElementById('themeToggle').addEventListener('click', () => {
        setTimeout(updateThemeColors, 50);
    });

    /* ---- Animación ---- */
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        core.rotation.y += 0.003;
        core.rotation.x = Math.sin(t * 0.2) * 0.05;
        innerSphere.rotation.y += 0.005;

        scene.children.forEach(child => {
            if (child.userData && child.userData.speed) {
                child.rotation[child.userData.axis] += child.userData.speed;
            }
        });

        const posArray = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            posArray[i * 3 + 1] += velocities[i];
            if (posArray[i * 3 + 1] > 4) {
                posArray[i * 3 + 1] = -2;
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        fragments.forEach(frag => {
            frag.rotation.x += frag.userData.rotX;
            frag.rotation.y += frag.userData.rotY;
            frag.position.y = frag.userData.baseY +
                Math.sin(t * frag.userData.floatFreq + frag.userData.phase) * frag.userData.floatAmp;
        });

        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
        camera.position.y += (2.0 - mouseY * 0.3 - camera.position.y) * 0.03;
        camera.lookAt(0, 0.8, 0);

        renderer.render(scene, camera);
    }
    animate();
}

/* ==========================================
   THREE.JS — CODE DIVIDER (rejilla minimalista)
========================================== */
function initCodeCanvas() {
    if (!window.THREE) return;
    const canvas = $('#code-canvas');
    if (!canvas) return;

    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 50);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0x1a2b4c, 0.5));
    const light = new THREE.PointLight(0x00c8ff, 2, 20);
    light.position.set(1, 2, 4);
    scene.add(light);

    const group = new THREE.Group();
    const gridSize = 20;
    const spacing = 0.4;
    const geo = new THREE.SphereGeometry(0.05, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00c8ff });
    for (let i = -gridSize/2; i < gridSize/2; i++) {
        for (let j = -gridSize/2; j < gridSize/2; j++) {
            const sphere = new THREE.Mesh(geo, mat);
            sphere.position.set(i * spacing, j * spacing, 0);
            group.add(sphere);
        }
    }
    scene.add(group);

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.z += 0.001;
        group.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
        renderer.render(scene, camera);
    }
    animate();
}

/* ==========================================
   CONTACT CANVAS (starfield cian)
========================================== */
function initContactCanvas() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas || !window.THREE) return;

    const section = canvas.parentElement;
    const W = section.offsetWidth, H = section.offsetHeight || 400;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 5;

    const ptGeo = new THREE.BufferGeometry();
    const pts   = new Float32Array(250 * 3);
    for (let i = 0; i < pts.length; i++) pts[i] = (Math.random() - 0.5) * 18;
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0x00c8ff, size: 0.05, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(ptGeo, ptMat));

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        scene.rotation.y = t * 0.03;
        scene.rotation.x = Math.sin(t * 0.02) * 0.15;
        renderer.render(scene, camera);
    }
    animate();
}

/* ==========================================
   INIT ALL
========================================== */
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initTheme();
    initTyped();
    initFilters();
    initPDF();
    initReveal();

    setTimeout(() => {
        initHeroScene();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                if (e.target.id === 'code-canvas') initCodeCanvas();
                if (e.target.id === 'contact-canvas') initContactCanvas();
                observer.unobserve(e.target);
            });
        }, { threshold: 0.1 });

        ['code-canvas', 'contact-canvas'].forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
    }, 100);
});