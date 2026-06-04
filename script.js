/* ==========================
   VERSION
========================== */

function inicializarVersion() {

    const versionElement =
        document.getElementById("version");

    if (
        versionElement &&
        window.APP_CONFIG
    ) {

        versionElement.textContent =
            APP_CONFIG.version;

    }

}

/* ==========================
   CONTACTO
========================== */

function inicializarContacto() {

    const emailLink =
        document.getElementById("emailLink");

    const githubLink =
        document.getElementById("githubLink");

    if (!window.APP_CONFIG) return;

    if (emailLink) {

        emailLink.textContent =
            APP_CONFIG.email;

        emailLink.href =
            `mailto:${APP_CONFIG.email}`;

    }

    if (githubLink) {

        githubLink.textContent =
            "Cesar-CAAR";

        githubLink.href =
            APP_CONFIG.github;

    }

}

/* ==========================
   TEMA
========================== */

function inicializarTema() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const themeIcon =
        document.getElementById(
            "themeIcon"
        );

    const themeText =
        document.getElementById(
            "themeText"
        );

    if (!themeToggle) return;

    const temaGuardado =
        localStorage.getItem(
            "theme"
        );

    if (temaGuardado === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeIcon.textContent = "☀️";
        themeText.textContent = "Modo Claro";

    }

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.documentElement.getAttribute(
                    "data-theme"
                );

            if (currentTheme === "dark") {

                document.documentElement.removeAttribute(
                    "data-theme"
                );

                localStorage.setItem(
                    "theme",
                    "light"
                );

                themeIcon.textContent = "🌙";
                themeText.textContent =
                    "Modo Oscuro";

            } else {

                document.documentElement.setAttribute(
                    "data-theme",
                    "dark"
                );

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                themeIcon.textContent = "☀️";
                themeText.textContent =
                    "Modo Claro";

            }

        }

    );

}

/* ==========================
   FILTROS
========================== */

function inicializarFiltros() {

    const botones =
        document.querySelectorAll(
            ".filter-btn"
        );

    const proyectos =
        document.querySelectorAll(
            ".project-card"
        );

    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    botones.forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                    boton.classList.add(
                        "active"
                    );

                    const categoria =
                        boton.dataset.filter;

                    proyectos.forEach(
                        proyecto => {

                            const mostrar =
                                categoria === "all" ||
                                proyecto.dataset.category === categoria;

                            proyecto.classList.toggle(
                                "hidden",
                                !mostrar
                            );

                        }
                    );

                }
            );

        }
    );

}

/* ==========================
   REVEAL
========================== */

function inicializarAnimaciones() {

    const elementos =
        document.querySelectorAll(
            ".reveal"
        );

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );

    elementos.forEach(
        elemento =>
            observer.observe(
                elemento
            )
    );

}

/* ==========================
   PDF
========================== */

async function descargarPDF() {
    // 1. Creamos un enlace (etiqueta <a>) temporal en memoria
    const enlace = document.createElement("a");
    
    // 2. CORRECCIÓN DE RUTA: Apuntamos a la subcarpeta 'CV' dentro de 'assets'
    // Y usamos el nombre de archivo exacto que aparece en tu explorador.
    enlace.href = "assets/CV/CV_Cesar_Andres_Alvarez_Romero.pdf"; 
    
    // 3. Indicamos el nombre con el que queremos que el usuario lo guarde
    enlace.download = "CV_Cesar_Andres_Alvarez_Romero.pdf";
    
    // 4. Agregamos el enlace al documento, lo "clicamos" y lo borramos
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

function inicializarPDF() {

    const boton =
        document.getElementById(
            "downloadPdfBtn"
        );

    if (!boton) return;

    boton.addEventListener(
        "click",
        descargarPDF
    );

}

/* ==========================
   INICIO
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarVersion();
        inicializarContacto();
        inicializarTema();
        inicializarFiltros();
        inicializarAnimaciones();
        inicializarPDF();

    }
);