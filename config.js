/**
 * ==========================================
 * CONFIGURACIÓN GLOBAL DEL PROYECTO
 * ==========================================
 * Proyecto: CV Profesional Web
 * Autor: César Andrés Álvarez Romero
 * Versión: 1.1.0
 * Última actualización: Junio 2026
 * ==========================================
 */

const APP_CONFIG = {

    // ======================================
    // INFORMACIÓN GENERAL
    // ======================================

    projectName: "CV Profesional Web",

    author: "César Andres Alvarez Romero",

    version: "1.1.0",

    releaseDate: "2026-06-02",

    // ======================================
    // CONTACTO
    // ======================================

    email: "cesar.andres5242@gmail.com",

    github: "https://github.com/Cesar-CAAR",

    // ======================================
    // REDES (POR SI LAS AGREGAS DESPUÉS)
    // ======================================

    linkedin: "",

    portfolio: "",

    // ======================================
    // EDUCACIÓN
    // ======================================

    university:
        "Universidad Tecnológica del Sur de Sonora",

    degree:
        "Universidad Tecnológica del Sur de Sonora",

    // ======================================
    // TECNOLOGÍAS PRINCIPALES
    // ======================================

    technologies: [

        "Angular",
        "TypeScript",
        "JavaScript",
        ".NET",
        "ASP.NET Core",
        "C#",
        ".NET MAUI",
        "PostgreSQL",
        "SQL Server",
        "Git",
        "GitHub",
        "Ubuntu Server",
        "Arduino",
        "ESP8266"

    ],

    // ======================================
    // PROYECTOS DESTACADOS
    // ======================================

    featuredProjects: [

        {
            name: "Arcano Pizza",
            category: "web"
        },

        {
            name: "Sistema de Administración de Usuarios",
            category: "web"
        },

        {
            name: "API + MAUI",
            category: "web"
        },

        {
            name: "ESP8266 IoT",
            category: "iot"
        }

    ]

};

// ==========================================
// LOG DE ARRANQUE
// ==========================================

console.log(
    `%c${APP_CONFIG.projectName} v${APP_CONFIG.version}`,
    "color:#4f46e5;font-size:14px;font-weight:bold;"
);

console.log(
    `Autor: ${APP_CONFIG.author}`
);