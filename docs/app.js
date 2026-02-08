/**
 * This isn't elegant, but it works. This tool is just supposed to do the thing, not impress anyone.
 */
const qrimg = document.getElementById("qr-img");

function generate() {
    qrimg.setAttribute("src", "");

    var qrtext = document.getElementById("qr-text").value;
    var qrsize = parseInt(document.getElementById("qr-size").value);
    var qrmime = document.getElementById("qr-mime").value;
    var qrbgalpha = parseFloat(document.getElementById("qr-bg-alpha").value);
    var qrbgcolor = document.getElementById("qr-bg-color").value;
    var qrforground = document.getElementById("qr-fg-color").value;

    if (qrmime == "image/svg") {
        var config = {
            content: qrtext,
            width: qrsize,
            height: qrsize,
            color: qrforground,
            background: qrbgcolor,
            padding: 0,
            join: true,
        };
        var qrcode = new QRCode(config);
        var svg_string = qrcode.svg();
        if (qrbgalpha < 1) {
            svg_string = svg_string.replace(
                "<rect",
                `<rect opacity="${qrbgalpha}" `,
            );
        }
        var dataurl = "data:image/svg+xml;base64," + window.btoa(svg_string);
    } else {
        if (qrmime == "image/jpeg") {
            qrbgalpha = 1;
        }
        var config = {
            size: qrsize,
            mime: qrmime,
            backgroundAlpha: qrbgalpha,
            background: qrbgcolor,
            foreground: qrforground,
            value: qrtext,
        };
        var qrcode = new QRious(config);
        var dataurl = qrcode.toDataURL(qrmime);
    }

    qrimg.setAttribute("src", dataurl);

    return false;
}

/**
 * Record inputs in local storage so they persist across page loads.
 */
const inputs = document.querySelectorAll("input, select");
inputs.forEach(function (input) {
    input.addEventListener("change", function () {
        localStorage.setItem(input.id, input.value);
    });
    const storedValue = localStorage.getItem(input.id);
    if (storedValue) {
        input.value = storedValue;
    }
});

document.getElementById("qrcode-form").addEventListener("submit", function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    generate();
});

window.onload = function () {
    generate();
};
