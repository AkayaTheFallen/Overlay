// Speichern von Herausforderungen und Zählerständen im Local Storage
let counters = JSON.parse(localStorage.getItem("counters")) || {};
let challenges = JSON.parse(localStorage.getItem("challenges")) || [];

// Lade die gespeicherten Herausforderungen und Zählerstände
window.onload = function() {
    updateChallengeList();
}

// Aktualisiere die Liste der Herausforderungen im HTML
function updateChallengeList() {
    const challengeList = document.getElementById("challengeList");
    challengeList.innerHTML = "";

    // Begabte Jägerin hinzufügen, falls noch nicht vorhanden
    if (!challenges.includes("Begabte Jägerin")) {
        challenges.push("Begabte Jägerin");
        counters["Begabte Jägerin"] = 0;
    }

    challenges.forEach(challenge => {
        const challengeItem = document.createElement("div");
        challengeItem.classList.add("challenge-item");
        challengeItem.innerHTML = `
            <span class="challenge-name">${challenge}</span>
            <div class="counter-buttons">
                <button onclick="changeCounter('${challenge}', 1)">+</button>
                <span id="${challenge}Counter">${counters[challenge]}</span>
                <button onclick="changeCounter('${challenge}', -1)">-</button>
            </div>
        `;
        challengeList.appendChild(challengeItem);
    });
}

// Zähler für eine Herausforderung ändern
function changeCounter(challenge, value) {
    counters[challenge] += value;
    document.getElementById(`${challenge}Counter`).textContent = counters[challenge];
    saveData();
}

// Neue Herausforderung hinzufügen
function addChallenge() {
    const newChallenge = document.getElementById("newChallenge").value.trim();
    if (newChallenge && !challenges.includes(newChallenge)) {
        challenges.push(newChallenge);
        counters[newChallenge] = 0;
        document.getElementById("newChallenge").value = "";
        updateChallengeList();
        saveData();
    }
}

// Speichern der Daten in Local Storage
function saveData() {
    localStorage.setItem("counters", JSON.stringify(counters));
    localStorage.setItem("challenges", JSON.stringify(challenges));
}
