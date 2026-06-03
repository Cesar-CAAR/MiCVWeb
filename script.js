// ======================================
// CONFIGURACIÓN GENERAL
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    inicializarVersion();
    inicializarTema();
    inicializarFiltros();
    inicializarAnimaciones();

});

// ======================================
// VERSIONAMIENTO
// ======================================

function inicializarVersion() {

    const versionElement =
        document.getElementById("version");

    if (
        versionElement &&
        typeof APP_CONFIG !== "undefined"
    ) {

        versionElement.textContent =
            APP_CONFIG.version;

    }

}

// ======================================
// MODO OSCURO / CLARO
// ======================================

function inicializarTema() {

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const themeText =
        document.getElementById("themeText");

    // Recuperar tema guardado

    const temaGuardado =
        localStorage.getItem("theme");

    if (temaGuardado === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        actualizarBotonTema(
            themeIcon,
            themeText,
            true
        );
    }

    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {

        const temaActual =
            document.documentElement.getAttribute(
                "data-theme"
            );

        const modoOscuro =
            temaActual === "dark";

        if (modoOscuro) {

            document.documentElement.removeAttribute(
                "data-theme"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

            actualizarBotonTema(
                themeIcon,
                themeText,
                false
            );

        } else {

            document.documentElement.setAttribute(
                "data-theme",
                "dark"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

            actualizarBotonTema(
                themeIcon,
                themeText,
                true
            );

        }

    });

}

function actualizarBotonTema(
    icono,
    texto,
    modoOscuro
) {

    if (!icono || !texto) return;

    if (modoOscuro) {

        icono.textContent = "☀️";
        texto.textContent = "Modo Claro";

    } else {

        icono.textContent = "🌙";
        texto.textContent = "Modo Oscuro";

    }

}

// ======================================
// FILTRO DE PROYECTOS
// ======================================

function inicializarFiltros() {

    const botones =
        document.querySelectorAll(
            ".filter-btn"
        );

    const proyectos =
        document.querySelectorAll(
            ".project-card"
        );

    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            botones.forEach(btn =>
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
                (proyecto) => {

                    const categoriaProyecto =
                        proyecto.dataset.category;

                    const mostrar =
                        categoria === "all" ||
                        categoriaProyecto === categoria;

                    if (mostrar) {

                        proyecto.classList.remove(
                            "hidden"
                        );

                    } else {

                        proyecto.classList.add(
                            "hidden"
                        );

                    }

                }
            );

        });

    });

}

// ======================================
// ANIMACIONES REVEAL
// ======================================

function inicializarAnimaciones() {

    const elementos =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elementos.length) return;

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

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
        (elemento) => {

            observer.observe(
                elemento
            );

        }
    );

}

// ======================================
// EFECTO ESCRITURA (OPCIONAL)
// ======================================

function efectoEscritura(
    elementoId,
    texto,
    velocidad = 80
) {

    const elemento =
        document.getElementById(
            elementoId
        );

    if (!elemento) return;

    elemento.textContent = "";

    let indice = 0;

    function escribir() {

        if (indice < texto.length) {

            elemento.textContent +=
                texto.charAt(indice);

            indice++;

            setTimeout(
                escribir,
                velocidad
            );

        }

    }

    escribir();

}

// ======================================
// EJEMPLO DE USO
// ======================================

// efectoEscritura(
//     "nombre",
//     "César Andrés Álvarez Romero"
// );