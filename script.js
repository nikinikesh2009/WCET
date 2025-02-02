// Sci-Fi Glow Effect on Scroll
document.addEventListener("scroll", function () {
    let boxes = document.querySelectorAll(".question-box");
    boxes.forEach((box) => {
        let position = box.getBoundingClientRect().top;
        let screenHeight = window.innerHeight / 1.3;
        if (position < screenHeight) {
            box.style.transform = "scale(1.05)";
            box.style.boxShadow = "0 0 30px magenta";
        } else {
            box.style.transform = "scale(1)";
            box.style.boxShadow = "0 0 15px cyan";
        }
    });
});

// Interactive Hover Animation
document.querySelectorAll(".sci-fi-button").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        let x = e.pageX - btn.offsetLeft;
        let y = e.pageY - btn.offsetTop;
        btn.style.background = `radial-gradient(circle at ${x}px ${y}px, magenta, cyan)`;
    });
});
