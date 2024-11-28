const questions = [
    { text: "Soal 1", desc: "Pertanyaan pertama...", options: ["A", "B", "C", "D"] },
    { text: "Soal 2", desc: "Pertanyaan kedua...", options: ["A", "B", "C", "D"] },
    { text: "Soal 3", desc: "Pertanyaan ketiga...", options: ["A", "B", "C", "D"] },
    { text: "Soal 4", desc: "Pertanyaan keempat...", options: ["A", "B", "C", "D"] },
    { text: "Soal 5", desc: "Pertanyaan kelima...", options: ["A", "B", "C", "D"] },
    { text: "Soal 6", desc: "Pertanyaan keenam...", options: ["A", "B", "C", "D"] },
    { text: "Soal 7", desc: "Pertanyaan ketujuh...", options: ["A", "B", "C", "D"] },
    { text: "Soal 8", desc: "Pertanyaan kedelapan...", options: ["A", "B", "C", "D"] },
    { text: "Soal 9", desc: "Pertanyaan kesembilan...", options: ["A", "B", "C", "D"] },
    { text: "Soal 10", desc: "Pertanyaan kesepuluh...", options: ["A", "B", "C", "D"] },
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);
let timer = 120; // Waktu dalam detik (2 menit)

// Load the current question
function loadQuestion(index) {
    const question = questions[index];
    document.querySelector(".question-container h1").innerText = `SOAL NO. ${index + 1}`;
    document.getElementById("question-desc").innerText = question.desc;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options
    question.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.textContent = opt;
        div.onclick = () => selectOption(i);
        if (answers[currentQuestion] === i) div.classList.add("selected");
        optionsContainer.appendChild(div);
    });

    updateSidebar();
}

// Handle option selection
function selectOption(index) {
    answers[currentQuestion] = index;
    loadQuestion(currentQuestion);
}

// Move to the previous question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// Move to the next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

// Update the question numbers in the sidebar
function updateSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = ""; // Clear previous sidebar content
    questions.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        if (answers[i] !== null) btn.classList.add("answered");
        btn.onclick = () => {
            currentQuestion = i;
            loadQuestion(i);
        };
        sidebar.appendChild(btn);
    });
}

// Show the results
function showResults() {
    const answered = answers.filter((a) => a !== null).length;
    alert(`Soal terjawab: ${answered}/${questions.length}`);
    // Here you can add code to calculate the score if you have correct answers
}

// Timer Countdown
function startTimer() {
    const timerElement = document.getElementById("timer");
    const interval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(interval);
            alert("Waktu habis! Quiz selesai.");
            showResults();
            return;
        }

        // Update timer text
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        timer--;
    }, 1000);
}

// Initialize the quiz
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion(0); // Load the first question
    startTimer(); // Start the timer

    // Navigation buttons
    document.getElementById("prev-btn").onclick = prevQuestion;
    document.getElementById("next-btn").onclick = nextQuestion;

    // Finish button
    document.querySelector(".finish-button").onclick = showResults;
});
