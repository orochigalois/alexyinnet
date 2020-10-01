const cloudcanvas = document.getElementById('cloudcanvas');
const texts = [
    'HTML5', 'Javascript', 'CSS3', 'PHP', 'JQuery', 'WordPress', 'Shopify', 'MySQL', 'WooCommerce', 'MailChimp', 'Salesforce Integration',
    'SASS', 'Git', 'NodeJS', 'Laravel', 'Silverstripe',
    'Android', 'TensorFlow.js', 'Campaign Monitor', 'React', 'ACF',
    'threejs', 'Photoshop', 'Sketch',
];
const counts = [1, 2, 4, 5, 4, 2, 1];
const options = {
    tilt: Math.PI / 9,
    initialVelocityX: 0.09,
    initialVelocityY: 0.09,
    initialRotationX: Math.PI * 0.14,
    initialRotationZ: 0
};
wordSphere(cloudcanvas, texts, counts, options);

function wordSphere(cloudcanvas, texts, counts, options) {
    const π = Math.PI; // happy math!
    const {
        width = 1000,
            height = 700,
            radius = 300,
            fontSize = 50,
            tilt = 0,
            initialVelocityX = 0,
            initialVelocityY = 0,
            initialRotationX = 0,
            initialRotationZ = 0,
    } = options;
    let vx = initialVelocityX,
        vy = initialVelocityY;
    let rx = initialRotationX,
        rz = initialRotationZ;
    let ctx = cloudcanvas.getContext('2d');
    let clicked = false,
        lastX, lastY;
    ctx.textAlign = 'center';
    ctx.scale(2, 2);
    cloudcanvas.width = width * 1.5;
    cloudcanvas.height = height * 1.5;
    cloudcanvas.style.width = `${width}px`;
    cloudcanvas.style.height = `${height}px`;
    cloudcanvas.addEventListener('mousedown', event => {
        clicked = true;
        lastX = event.screenX;
        lastY = event.screenY;
    });
    cloudcanvas.addEventListener('mousemove', event => {
        if (!clicked) return;
        [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
        [lastX, lastY] = [event.screenX, event.screenY];
        // rotation update
        rz += -dy * 0.01;
        rx += dx * 0.01;
        // velocity update
        vx = dx * 0.1;
        vy = dy * 0.1;
        if (!looping) startLoop();
    });
    cloudcanvas.addEventListener('mouseup', e => clicked = false);
    cloudcanvas.addEventListener('mouseleave', e => clicked = false);

    function rot(x, y, t) {
        return [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)];
    }

    function render() {
        ctx.clearRect(0, 0, cloudcanvas.width, cloudcanvas.height);
        let ix = 0,
            iz = 0,
            i = 1;
        for (const text of texts) {
            const degZ = (π / (counts.length - 1)) * iz;
            const degX = (2 * π / counts[iz]) * ix;
            let x = radius * Math.sin(degZ) * Math.cos(degX);
            let y = radius * Math.sin(degZ) * Math.sin(degX);
            let z = radius * Math.cos(degZ) + 8 * (ix % 2) /* randomness */ ;
            // camera transform
            [y, z] = rot(y, z, tilt);
            [x, z] = rot(x, z, rz);
            [x, y] = rot(x, y, rx);
            // convert to cartesian and then draw.
            const alpha = 0.6 + 0.4 * (x / radius);
            const size = fontSize + 2 + 5 * (x / radius);
            ctx.fillStyle = `rgba(0,0,0,${alpha})`;
            ctx.font = `${size}px "Helvetica Neue", sans-serif`;
            ctx.fillText(text, y + width / 2, -z + height / 2);
            ix--;
            if (ix < 0) {
                iz++;
                ix = counts[iz] - 1;
            }
            i++;
        }
    }
    // renderer
    let looping = false;

    function rendererLoop() {
        if (looping) window.requestAnimationFrame(rendererLoop);
        render();
        // deacceleration - dirty code xD
        if (vx > 0) vx = vx - 0.01;
        if (vy > 0) vy = vy - 0.01;
        if (vx < 0) vx = vx + 0.01;
        if (vy > 0) vy = vy + 0.01;
        if (vx == 0 && vy == 0) stopLoop();
        rz += vy * 0.01;
        rx += vx * 0.01;
    }

    function startLoop() {
        looping = true;
        window.requestAnimationFrame(rendererLoop);
    }

    function stopLoop() {
        looping = false;
    }
    startLoop();
}