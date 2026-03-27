let fontSize = 16;
const MAX = 28;
const MIN = 10;

let originalContent = {};

/* 🚀 INIT */
document.addEventListener("DOMContentLoaded", () => {

    // SAVE ORIGINAL PAGES
    document.querySelectorAll(".page").forEach(page => {
        originalContent[page.id] = page.innerHTML;
        page.style.display = "none";
    });

    // INTRO → then START
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

    // CURSOR
    const cursor = document.getElementById("cursor");

    if (cursor) {
        document.addEventListener("mousemove", e => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }
});


/* 📄 PAGE SYSTEM */
function openPage(id) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(p => {
        p.style.display = "none";
        p.classList.remove("show");
    });

    const target = document.getElementById(id);

    if (target) {
        target.style.display = "block";
        setTimeout(() => target.classList.add("show"), 10);
    }
}


/* 🔍 SEARCH (CLEAN + STABLE) */
function searchPages() {

    const inputEl = document.getElementById("search");
    const resultsBox = document.getElementById("searchResults");
    const resultCount = document.getElementById("resultCount");

    if (!inputEl || !resultsBox || !resultCount) return;

    const input = inputEl.value.toLowerCase().trim();

    resultsBox.innerHTML = "";

    let pages = document.querySelectorAll(".page");

    let results = [];

    pages.forEach(page => {

        const name = page.id.toLowerCase();
        const content = originalContent[page.id]?.toLowerCase() || "";

        let score = 0;

        // 🔥 STRONG MATCH (page name)
        if (name === input) score += 100;

        // 🔥 NAME CONTAINS (important)
        if (name.includes(input) && input !== "") score += 50;

        // 🔸 CONTENT MATCH (weak)
        if (content.includes(input) && input !== "") score += 10;

        if (input === "") score = 0;

        if (score > 0) {
            results.push({ page, score });
        }
    });

    // sort best first
    results.sort((a, b) => b.score - a.score);

    results.forEach(r => {

        const item = document.createElement("div");
        item.className = "search-item";
        item.innerText = r.page.id;

        item.onclick = () => openPage(r.page.id);

        resultsBox.appendChild(item);
    });

    resultCount.innerText = input === "" ? "" : results.length + " result(s)";
}

/* 🌙 THEME */
function toggleTheme() {
    document.body.classList.toggle("light");
}


/* 🔠 TEXT SIZE */
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


/* 💬 FEEDBACK */
function openFeedback() {
    document.getElementById("feedbackBox").style.display = "flex";
}

function closeFeedback() {
    document.getElementById("feedbackBox").style.display = "none";
}

function sendFeedback() {
    const text = document.getElementById("feedbackText");

    if (!text || text.value.trim() === "") {
        alert("Write something first!");
        return;
    }

    console.log("📩 FEEDBACK:", text.value);

    alert("Message sent!");

    text.value = "";
}
