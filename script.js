const nombre =
"César Andrés";

let i = 0;

function escribir() {

    if(i < nombre.length){

        document
            .getElementById("typing")
            .innerHTML += nombre.charAt(i);

        i++;

        setTimeout(escribir,100);
    }
}

escribir();

document.getElementById("version")
.textContent = APP_CONFIG.version;

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");
        }
    });

});

document
.querySelectorAll(".reveal")
.forEach(el => observer.observe(el));

window.addEventListener("load", () => {

    document
    .querySelectorAll(".progress")
    .forEach(bar => {

        bar.style.width =
        bar.dataset.width + "%";

        bar.style.transition =
        "2s";
    });

});