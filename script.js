window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //canvas settings
    context.fillStyle = 'orange';
    context.lineCap = 'round';
    context.shadowColor = "rgba(0,0,0,0.5)";
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;


    // effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    const maxLevel = 4;
    const branches = 2;
    let scale = 0.5;

    let sides = 11;
    let spread = 1.7;
    let color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
    let lineWidth = 11

    const randomizeButon = document.getElementById("randomizeButton");
    const resetButon = document.getElementById("resetButton");

    const lineWidth_slider = document.getElementById("lineWidth");
    const lineWidth_label = document.querySelector('[for="lineWidth"]');
    lineWidth_slider.addEventListener("change", function (e) {
        lineWidth = e.target.value
        updateSliders()
        drawFractal()
    })
    const spread_slider = document.getElementById("spread");
    const spread_label = document.querySelector('[for="spread"]');
    spread_slider.addEventListener("change", function (e) {
        spread = e.target.value
        updateSliders()
        drawFractal()
    })
    const sides_slider = document.getElementById("sides");
    const sides_label = document.querySelector('[for="sides"]');
    sides_slider.addEventListener("change", function (e) {
        sides = e.target.value
        updateSliders()
        drawFractal()
    })


    function drawBranch(level) {
        if (level > maxLevel) return;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(size, 0);
        context.stroke();

        for (let i = 0; i < branches; i++) {
            context.save();
            context.translate(size - (size / branches) * i, 0);
            context.rotate(spread);
            context.scale(scale, scale);
            drawBranch(level + 1)
            context.restore();

            context.save();
            context.translate(size - (size / branches) * i, 0);
            context.rotate(-spread);
            context.scale(scale, scale);
            drawBranch(level + 1)
            context.restore();
        }
    }


    function drawFractal() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.translate(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < sides; i++) {
            context.rotate((Math.PI * 2) / sides);
            drawBranch(0)
        }
        context.restore();
    }
    drawFractal()

    function randomizeFractals() {
        sides = Math.floor(Math.random() * 19 + 2);
        spread = Math.random() * 2.9 + 0.1;
        scale = Math.random() * 0.2 + 0.4;
        color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
        lineWidth = Math.floor(Math.random() * 20 + 1)
        randomizeButon.style.backgroundColor = color
        updateSliders()
    }

    randomizeButon.addEventListener("click", function () {
        randomizeFractals()
        drawFractal()
    })

    resetButon.addEventListener("click", function () {
        sides = 11;
        spread = 1.7;
        color = "skyblue"
        lineWidth = 11
        randomizeButon.style.backgroundColor = "white"
        updateSliders()
        drawFractal()
    })

    function updateSliders() {
        spread_slider.value = spread
        spread_label.innerText = `Spread: ${Number(spread).toFixed(1)}`
        sides_slider.value = sides
        sides_label.innerText = `Sides: ${sides}`
        lineWidth_slider.value = lineWidth
        lineWidth_label.innerText = `Width: ${lineWidth}`
    }
    updateSliders()
})