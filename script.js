document.addEventListener("DOMContentLoaded", function () {
    const heroText = document.querySelector(".hero h2");
    setTimeout(() => {
        heroText.style.textShadow = "0 0 15px cyan";
    }, 1500);
});
document.addEventListener("DOMContentLoaded", function () {
    let year = new Date().getFullYear();
    document.getElementById("current-year").textContent = year;
    document.getElementById("floating-year").textContent = year;
});
