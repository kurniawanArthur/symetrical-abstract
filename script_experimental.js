window.addEventListener("load", function () {
    // Membuat kanvas
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");

    // Mengatur panjang-lebar kanvas
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
    let hue = 190;
    let spread = 1.7;
    let color = `hsl(${hue}, 100%, 50%)`;
    let lineWidth = 11;
    let bubble = 11

    const initialSides = 11;
    const initialSpread = 1.7;
    const initialScale = 0.5;
    const initialHue = 190;
    const initialColor = `hsl(${initialHue}, 100%, 50%)`;
    const initialLineWidth = 11;
    const initialbubble = 11;

    const randomizeButon = document.getElementById("randomizeButton");
    const resetButon = document.getElementById("resetButton");

    // Fungsi membuat sliders
    function createSliderListener(sliderId, valueSetter) {
        const slider = document.getElementById(sliderId);
        slider.addEventListener("change", function (e) {
            valueSetter(e.target.value);
            updateSliders();
            drawFractal();
        });
        return slider;
    }

    // Membuat sliders
    const lineWidth_slider = createSliderListener("lineWidth", (value) => lineWidth = value);
    const spread_slider = createSliderListener("spread", (value) => spread = value);
    const scale_slider = createSliderListener("scale", (value) => scale = value);
    const sides_slider = createSliderListener("sides", (value) => sides = value);
    const bubble_slider = createSliderListener("bubble", (value) => bubble = value);
    const color_slider = createSliderListener("color", (value) => {
        hue = value;
        color = `hsl(${hue}, 100%, 50%)`;
    });

    // Label masing-masing sliders
    const lineWidth_label = document.querySelector('[for="lineWidth"]');
    const spread_label = document.querySelector('[for="spread"]');
    const scale_label = document.querySelector('[for="scale"]');
    const sides_label = document.querySelector('[for="sides"]');
    const color_label = document.querySelector('[for="color"]');
    const bubble_label = document.querySelector('[for="bubble"]');

    // Menambahkan event listener pada tombol screenshot
    const screenshotButton = document.getElementById("screenshot");
    screenshotButton.addEventListener("click", takeScreenshot);

    // Fungsi menggambar cabang
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

            context.beginPath();
            context.arc(0, size, bubble, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 255, 255, 0.5)';
            context.fill();

        }
    }

    // Fungsi menggambar fraktal
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

    // Fubgsi melakukan generate random fraktal
    function randomizeFractals() {
        sides = Math.floor(Math.random() * 19 + 2);
        spread = Math.random() * 2.9 + 0.1;
        scale = Math.random() * 0.2 + 0.3;
        hue = Math.floor(Math.random() * 360)
        color = `hsl(${hue}, 100%, 50%)`
        lineWidth = Math.floor(Math.random() * 20 + 1)
        randomizeButon.style.backgroundColor = color
        bubble = Math.floor(Math.random() * 19 + 2);
        updateSliders()
    }

    // Tombol untuk randomisasi
    randomizeButon.addEventListener("click", function () {
        randomizeFractals()
        drawFractal()
    });

    // Tombol untuk reset
    resetButon.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Mengembalikan nilai awal
        sides = initialSides;
        spread = initialSpread;
        scale = initialScale;
        hue = initialHue;
        color = initialColor;
        lineWidth = initialLineWidth;
        bubble = initialbubble;
        randomizeButon.style.backgroundColor = "white"

        // Memperbarui sliders dan menggambar fraktal
        updateSliders();
        drawFractal();
    });

    // Fungsi untuk mengambil screenshot
    function takeScreenshot() {
        // Mendapatkan data URL dari isi canvas
        const dataURL = canvas.toDataURL("image/png");

        // Membuat elemen <a> untuk mendownload screenshot
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "screenshot.png";

        // Menyimpan elemen <a> dan mendownloadnya
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    // Fungsi menangkap nilai sliders lalu melakukan update
    function updateSliders() {
        spread_slider.value = spread
        spread_label.innerText = `Spread: ${Number(spread).toFixed(1)}`
        scale_slider.value = scale
        scale_label.innerText = `Scale: ${Number(scale).toFixed(2)}`
        sides_slider.value = sides
        sides_label.innerText = `Sides: ${sides}`
        lineWidth_slider.value = lineWidth
        lineWidth_label.innerText = `Width: ${lineWidth}`
        color_slider.value = hue
        color_label.innerText = `color: ${hue}`
        bubble_slider.value = bubble; // Menambahkan ini
        bubble_label.innerText = `Bubble: ${bubble}`; // Menambahkan ini
    }
    updateSliders();
    drawFractal();
});