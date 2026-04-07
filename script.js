// =======================
// EMAILJS INIT
// =======================
emailjs.init({
    publicKey: "mU4Gv7hUESNrYdwy"
});


// =======================
// GLOBALS
// =======================
let fontSize = 16;
const MAX = 28;
const MIN = 10;

let originalContent = {};


// =======================
// PAGE INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".page").forEach(page => {
        originalContent[page.id] = page.innerHTML;
        page.style.display = "none";
    });

    const intro = document.getElementById("intro");

    setTimeout(() => {
        if (intro) {
            intro.style.opacity = "0";

            setTimeout(() => {
                intro.style.display = "none";
                openPage("welcome");
            }, 800);
        } else {
            openPage("welcome");
        }
    }, 1500);

    // Cursor
    const cursor = document.getElementById("cursor");

    if (cursor) {
        document.addEventListener("mousemove", e => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }
});


// =======================
// PAGE SYSTEM
// =======================
function openPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(p => {
        p.classList.remove("show");
        p.style.display = "none";
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.style.display = "block";
        setTimeout(() => target.classList.add("show"), 10);
    }
}


// =======================
// SEARCH
// =======================
function searchPages() {

    const input = document.getElementById("search").value.toLowerCase().trim();
    const resultsBox = document.getElementById("searchResults");
    const resultCount = document.getElementById("resultCount");

    resultsBox.innerHTML = "";

    let results = [];

    document.querySelectorAll(".page").forEach(page => {

        const name = page.id.toLowerCase();
        const content = originalContent[page.id]?.toLowerCase() || "";

        let score = 0;

        if (name.includes(input)) score += 50;
        if (content.includes(input)) score += 10;

        if (score > 0) {
            results.push({ page, score });
        }
    });

    results.sort((a, b) => b.score - a.score);

    results.forEach(r => {
        const item = document.createElement("div");
        item.className = "search-item";
        item.innerText = r.page.id;
        item.onclick = () => openPage(r.page.id);
        resultsBox.appendChild(item);
    });

    resultCount.innerText = input ? `${results.length} result(s)` : "";
}


// =======================
// THEME
// =======================
function toggleTheme() {
    document.body.classList.toggle("light");
}


// =======================
// TEXT SIZE
// =======================
function increaseText() {
    if (fontSize < MAX) {
        fontSize += 2;
        document.body.style.fontSize = fontSize + "px";
    }
}

function decreaseText() {
    if (fontSize > MIN) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + "px";
    }
}

function resetText() {
    fontSize = 16;
    document.body.style.fontSize = fontSize + "px";
}


// =======================
// FEEDBACK SYSTEM (FIXED + LOADING)
// =======================
function openFeedback() {
    document.getElementById("feedbackBox").style.display = "flex";
}

function closeFeedback() {
    document.getElementById("feedbackBox").style.display = "none";
}


// loading helper
function setLoading(state) {
    const btn = document.getElementById("sendBtn");

    if (!btn) return;

    if (state) {
        btn.disabled = true;
        btn.innerText = "Sending...";
    } else {
        btn.disabled = false;
        btn.innerText = "Send";
    }
}


// MAIN SEND
function sendFeedback() {

    const textEl = document.getElementById("feedbackText");
    const userMessage = textEl.value.trim();

    if (!userMessage) {
        alert("Write something first!");
        return;
    }

    setLoading(true);

    const params = {
        from_name: "TNS User",
        message: userMessage,
        time: new Date().toLocaleString()
    };

    emailjs.send("service_5uvkwjt", "template_6oy1wzb", params)
        .then(() => {

            alert("Sent 🚀");

            textEl.value = "";
            closeFeedback();

        })
        .catch((err) => {
            console.error("EMAIL ERROR:", err);
            alert("Failed ❌ check console");
        })
        .finally(() => {
            setLoading(false);
        });
}
