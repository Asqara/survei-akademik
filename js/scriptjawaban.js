
let currentQuestion = 1;
const userAnswers = [];
let matkulValues = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;
let questionsList = [];

const kelas = localStorage.getItem("kelas");
const nama = localStorage.getItem("nama");
const email = localStorage.getItem("email");

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".question").forEach(question => {
        const questionId = question.getAttribute("data-question");
        const savedAnswer = localStorage.getItem(`answer-${questionId}`);
        if (savedAnswer) {
            question.querySelectorAll(".option").forEach(option => {
                if (option.textContent.trim() === savedAnswer) {
                    option.classList.add("selected");
                    option.style.borderColor = "#ffff";
                }
            });
        }
    });
});

window.onload = function() {
    if (localStorage.getItem("surveyCompleted") !== "true") {
        window.location.href = "../index.html";
    }
    const existingCode = getCookie("survey_submitted");
    if (existingCode) {
        document.getElementById("message").innerHTML = `Anda sudah mengisi survei ini sebelumnya.<br>Kode Unik Anda: <strong>${existingCode}</strong>`;
        document.getElementById("message").classList.remove("hidden");
        document.querySelector('.container').style.display = 'none';
    }
};

document.addEventListener("DOMContentLoaded", function () {
    new Sortable(document.getElementById("available-container"), { group: "courses", animation: 150 });
    new Sortable(document.getElementById("selected-container"), { group: "courses", animation: 150 });
});

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function setCookie(name, value, days) {
let expires = "";
if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
}
document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
let nameEQ = name + "=";
let ca = document.cookie.split(';');
for(let i=0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
}
return null;
}
function showSurvey() {
    const selectedCourses = [...document.querySelectorAll('#selected-container .course')].map(el => el.textContent.trim());
    if (selectedCourses.length === 0) {
        alert('Silahkan pilih minimal 1 mata kuliah terlebih dahulu!');
        return;
    }
    
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    
    questionsList = [];
    selectedCourses.forEach((course) => {
    const questions = [
        { text: `Apa nilai mutu yang kamu dapatkan di mata kuliah tersebut?`, options: ["A", "AB", "B", "BC", "C", "D", "E"], judul: course },
        { text: `Seberapa sulit mata kuliah tersebut menurutmu?`, options: ["Sangat Sulit", "Sulit", "Mudah", "Sangat Mudah"], judul: course },
        { text: `Seberapa sulit bagi kamu untuk memahami penjelasan yang diberikan oleh dosen mata kuliah tersebut?`, options: ["Sangat Sulit", "Sulit", "Mudah", "Sangat Mudah"], judul: course },
        { text: `Seberapa sulit bagi kamu untuk mendapatkan jawaban yang memuaskan saat bertanya kepada dosen mata kuliah tersebut?`, options: ["Sangat Sulit", "Sulit", "Mudah", "Sangat Mudah"], judul: course },
        { text: `Rata-rata jam belajar mandiri per minggu (di luar kuliah) untuk mata kuliah tersebut?`, options: ["< 1 jam", "1-2 jam", "2-4 jam", "4-6 jam", "> 6 jam"], judul: course }
    ];
    questionsList.push(...questions);
});

    
    totalQuestions = questionsList.length;
    showQuestion(currentQuestionIndex);
    updateProgress();
}

function showQuestion(index) {
    if (!questionsList || questionsList.length === 0) {
        console.error("questionsList tidak ditemukan atau kosong.");
        return;
    }

    if (index >= questionsList.length) {
        console.warn("Index pertanyaan melebihi jumlah pertanyaan yang tersedia.");
        return;
    }

    const questionsWrapper = document.getElementById('questions-wrapper');
    if (!questionsWrapper) {
        console.error("Elemen #questions-wrapper tidak ditemukan.");
        return;
    }

    // Kosongkan kontainer sebelum menambahkan pertanyaan baru
    questionsWrapper.innerHTML = '';

    const questionData = questionsList[index];
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question';
    questionBlock.setAttribute('data-question', index);
    questionBlock.innerHTML = `
        <h2>${questionData.judul}</h2>
        <h4>${questionData.text}</h4>
        <div class="options">
            ${questionData.options.map(option => 
                `<div class="option" onclick="selectOption(this)">${option}</div>`
            ).join('')}
        </div>
    `;

    // Set display ke block supaya tidak hidden
    questionBlock.style.display = "block";
    questionBlock.style.opacity = "0";  // Supaya transisi bisa berjalan

    questionsWrapper.appendChild(questionBlock);

    // Gunakan timeout untuk efek animasi
    setTimeout(() => {
        questionBlock.style.opacity = "1";
        questionBlock.style.transform = "translateX(0)";
    }, 50);

    // Cek apakah ada jawaban yang sudah disimpan sebelumnya
    const savedAnswer = localStorage.getItem(`answer-${index}`);
    if (savedAnswer) {
        questionBlock.querySelectorAll('.option').forEach(option => {
            if (option.textContent.trim() === savedAnswer) {
                option.classList.add('selected');
            }
        });
    }

    toggleButtons();
}


function selectOption(option) {
    const question = option.closest('.question');
    const questionId = question.getAttribute("data-question");
    const questionata = questionsList[parseInt(questionId)];
    question.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    localStorage.setItem(`answer-${questionId}`, option.textContent.trim());
    userAnswers[questionId] = `${option.textContent.trim()}, ${questionata.judul}`;
    console.log(userAnswers[questionId]);
}
function nextQuestion() {
    if (!document.querySelector(`[data-question="${currentQuestionIndex}"] .option.selected`)) {
        document.querySelector(`[data-question="${currentQuestionIndex}"]`).classList.add('shake');
        setTimeout(() => document.querySelector(`[data-question="${currentQuestionIndex}"]`).classList.remove('shake'), 500);
        return;
    }
    if (currentQuestionIndex < questionsList.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        submitData();
    }
    updateProgress();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
    updateProgress();
}

function toggleButtons() {
    document.querySelector('.prev-btn').style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    document.querySelector('.next-btn').textContent = currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Selanjutnya';
}

function showResult() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById("message").innerHTML = `Terima Kasih Anda Telah Mengisi Survey Ini`;
        document.getElementById("message").classList.remove("hidden");
    
}

function generateUniqueCode() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${timestamp}-${randomPart}`;
}
function submitData() {
    const uniqueCode = generateUniqueCode();
    document.getElementById('unique-code').textContent = uniqueCode;
    
    getIpAddress().then(ipAddress => {
        submitFormData(nama, kelas, email, userAnswers, ipAddress, uniqueCode);
    });

    setCookie("survey_submitted", uniqueCode, 365);
    showResult();
}

function getIpAddress() {
return fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => data.ip);
}

function submitFormData(name, kelas, email, answers, ipAddress, uniqueCode) {
    let url = 'https://script.google.com/macros/s/AKfycbxVRB0xAurHpVkiWgOYxkdguhCHUHhTbR5lRcnSzqgfcPPflVBuzXO4OJ7twCda4GBt/exec';
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'name': name,
            'kelas': kelas,
            'email': email,
            'answers': JSON.stringify(answers),
            'ip': ipAddress,
            'unique_code': uniqueCode
        })
    }).catch(error => console.error('Error:', error));
}



// Initialize
toggleButtons();
updateProgress();