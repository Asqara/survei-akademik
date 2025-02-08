let currentQuestion = 1;
let totalQuestions = document.querySelectorAll('.quiz-container .question').length;
let userAnswers = {};
let kelas = localStorage.getItem("kelas");
let nama = localStorage.getItem("nama");
let email = localStorage.getItem("email");
let uniqueAnswers = new Set();
const kelompokST01_08 = Array.from({ length: 8 }, (_, i) => `ST${String(i + 1).padStart(2, "0")}`);
const kelompokST09_17 = Array.from({ length: 9 }, (_, i) => `ST${i + 9}`);
const kelompokST18_ST25 = Array.from({ length: 8 }, (_, i) => `ST${i + 18}`);
const kelompokST26_ST38 = Array.from({ length: 13 }, (_, i) => `ST${i + 26}`);
const kelompokSS01_SS06 = Array.from({ length: 6 }, (_, i) => `SS${String(i + 1).padStart(2, "0")}`);
const kelompokSS10_SS12 = Array.from({ length: 3 }, (_, i) => `SS${i + 10}`);
let matkulMap = {};
let indexMatkul = 0;  // Variabel global

function updateIndexMatkul(currentQuestion) {
    indexMatkul = Math.floor((currentQuestion - 1) / 5);
}
document.addEventListener("DOMContentLoaded", function() {
    // Ambil semua pertanyaan
    const questions = document.querySelectorAll(".question");

    questions.forEach(question => {
        const questionId = question.getAttribute("data-question");
        const savedAnswer = localStorage.getItem(`answer-${questionId}`);

        if (savedAnswer) {
            // Cek opsi yang sesuai dengan jawaban yang tersimpan
            const options = question.querySelectorAll(".option");
            options.forEach(option => {
                if (option.textContent.trim() === savedAnswer) {
                    option.classList.add("selected");
                    option.style.borderColor = "#ffff";
                }
            });
        }
    });
});



window.onload = function() {
    const existingCode = getCookie("survey_submitted");
    

    if (localStorage.getItem("surveyCompleted") !== "true") {
        window.location.href = "../index.html";// Balikin ke halaman utama
    }
    
    if(existingCode) {
        document.getElementById("message").innerHTML = `
            Anda sudah mengisi survei ini sebelumnya.<br>
            Kode Unik Anda: <strong>${existingCode}</strong>
        `;
        document.getElementById("message").classList.remove("hidden");
        document.querySelector(".quiz-container").style.display = 'none';
    }
    

};

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
if (kelompokST01_08.includes(kelas)) {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "Biologi Dasar",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Kimia Sains dan Teknologi",
        "matkul-7": "Matematika dan Berpikir Logis"
    };
   
} 
else if (kelompokST09_17.includes(kelas)||kelas === "ST09") {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "Fisika Sains Teknologi",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Sosiologi",
        "matkul-7": "Statistika dan Analisis Data"
    };
}
else if (kelompokST18_ST25.includes(kelas)) {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "matkul tai",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Sosiologi",
        "matkul-7": "Statistika dan Analisis Data"
    };
}
else if (kelompokST26_ST38.includes(kelas)) {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "Fisika Sains Teknologi",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Sosiologi",
        "matkul-7": "Statistika dan Analisis Data"
    };
}
else if (kelompokSS01_SS06.includes(kelas)) {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "Fisika Sains Teknologi",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Sosiologi",
        "matkul-7": "Statistika dan Analisis Data"
    };
}
else if (kelas === "SS07") {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "Fisika Sains Teknologi",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Sosiologi",
        "matkul-7": "Statistika dan Analisis Data"
    };
}
else if (kelompokSS10_SS12.includes(kelas)||kelas === 'SS08'||kelas === 'SS09') {
    document.querySelector('.quiz-container').style.display = 'block';
    matkulMap = {
        "matkul-1": "Fisika Sains Teknologi",
        "matkul-2": "Bahasa Indonesia",
        "matkul-3": "Agama",
        "matkul-4": "Pertanian Inovatif",
        "matkul-5": "Bahasa Inggris",
        "matkul-6": "Sosiologi",
        "matkul-7": "Statistika dan Analisis Data"
    };
}
Object.keys(matkulMap).forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
        el.textContent = matkulMap[className];
    });
});
const matkulValues = Object.values(matkulMap);

if (typeof showQuestion === "function") {
    showQuestion(1);
} else {
    console.error("showQuestion() tidak ditemukan!");
}

function selectOption(option) {
    const question = option.closest('.question');
    const questionId = question.getAttribute("data-question");

    // Reset warna semua opsi ke default (tidak berwarna atau abu-abu)
    question.querySelectorAll('.option').forEach(opt => {
        opt.style.borderColor = "transparent"; // Hapus warna merah atau biru sebelumnya
        opt.classList.remove('selected');
    });

    // Tambahkan efek border biru hanya ke opsi yang dipilih
    option.classList.add('selected');
    option.style.borderColor = "#ffff"; // Warna biru untuk jawaban yang dipilih
    
    updateIndexMatkul(currentQuestion);
    let selectedText = option.textContent.trim();

    // Simpan ke localStorage dengan ID pertanyaan
    localStorage.setItem(`answer-${questionId}`, selectedText);
    console.log(`Jawaban disimpan untuk Q${questionId}: ${selectedText}`);

    console.log(indexMatkul);
    // Simpan jawaban user, hanya satu per pertanyaan
    userAnswers[currentQuestion] = option.textContent + ' untuk ' + matkulValues[indexMatkul];
   

    console.log(`Jawaban tersimpan untuk Q${currentQuestion}:`, userAnswers[currentQuestion]);
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function showQuestion(n) {
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('active');
    });
    const question = document.querySelector(`[data-question="${n}"]`);
    question.classList.add('active');
    updateProgress();
}

function nextQuestion() {
    const currentQ = document.querySelector(`[data-question="${currentQuestion}"]`);
    const selectedOption = currentQ.querySelector('.option.selected');

    if (!selectedOption) {
        currentQ.classList.add('shake');
        currentQ.querySelectorAll('.option').forEach(opt => opt.style.borderColor = "red");

        setTimeout(() => currentQ.classList.remove('shake'), 500);
        return;
    }

    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
        toggleButtons(); // Perbarui tampilan tombol
    } else {
        submitData();
        window.location.href = "../index.html";
    }
}
function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
        toggleButtons(); // Perbarui tampilan tombol setelah berpindah soal
    }
}

function toggleButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Sembunyikan tombol "Sebelumnya" jika di pertanyaan pertama
    prevBtn.style.display = currentQuestion === 1 ? 'none' : 'block';

    // Ubah tombol "Selanjutnya" menjadi "Submit" jika sudah di pertanyaan terakhir
    if (currentQuestion === totalQuestions) {
        nextBtn.textContent = 'Submit';
        nextBtn.onclick = function() {
            submitData();
            showResult();
        };
    } else {
        nextBtn.textContent = 'Selanjutnya';
        nextBtn.onclick = nextQuestion;
    }
}

function generateUniqueCode() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${timestamp}-${randomPart}`;
}

function showResult() {

    document.querySelector('.question.active').classList.remove('active');
    document.querySelector('.navigation').style.display = 'none';
    document.querySelector('.result').classList.add('show');
    
}


function submitData() {
    const uniqueCode = generateUniqueCode();
    
    // Simpan kode unik ke tampilan
    document.getElementById('unique-code').textContent = uniqueCode;
    const questions = document.querySelectorAll('.question');

const answers = [];
questions.forEach((question, index) => {
    const selectedOption = question.querySelector('.option.selected');

    // Hitung indexMatkul berdasarkan kelompok pertanyaan (5 per matkul)
    const indexMatkul = Math.floor(index / 5);

    if (selectedOption) {
        answers.push(selectedOption.textContent + ',' + matkulValues[indexMatkul]);
    } else {
        answers.push(null); // jika belum dijawab
    }
});

    
    getIpAddress().then(ipAddress => {
        submitFormData(nama, kelas, email, answers, ipAddress, uniqueCode);
    });

    // Set cookie dan tampilkan hasil
    setCookie("survey_submitted", uniqueCode, 365);
    showResult();
}

function getIpAddress() {
return fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => data.ip);
}

function submitFormData(name, kelas, email, answers, ipAddress, uniqueCode) {
    let url ;
    if (kelompokST01_08.includes(kelas)){
        url = 'https://script.google.com/macros/s/AKfycbxVRB0xAurHpVkiWgOYxkdguhCHUHhTbR5lRcnSzqgfcPPflVBuzXO4OJ7twCda4GBt/exec';
    }
    else if (kelompokST09_17.includes(kelas)||kelas === "ST09") {
        url = 'AKfycbwSHxtes8i22KSmigd2qZpaJk2RHG1d-1qnN5ojASC4x89zvDkUf---hGB69FYvcTL7';
    }
    else if (kelompokST18_ST25.includes(kelas)) {
        url = 'https://script.google.com/macros/s/AKfycbxXk_RxVqX9CABkGWNl91piPL5HtqTTrhbozVpiLU1RygCi8jlIaXkRiqqut5ffL4Qx/exec';
    }
    else if (kelompokST26_ST38.includes(kelas)) {
        url = 'https://script.google.com/macros/s/AKfycbzEWKxle0eZ-GwgG_X97-vIS-Xlt0-L68cEJb7W2dLNz_fRjBetEiayPHRq0NMyLxcV/exec';
    }
    else if (kelompokSS01_SS06.includes(kelas)) {
        url = 'https://script.google.com/macros/s/AKfycbzMz9g1-SslTiRMtIyuJOYAxcQTCQy5SEARrLvzcNEsHZL_hCl7dqA55y4OHovgialo/exec';
    }
    else if (kelas === "SS07") {
        url ='https://script.google.com/macros/s/AKfycbzUM1yzvmUeMMLiWZQykwAEkKNp9ZKmU5lWkjsRpM7NTZJxHehKPA9Lv5D4SQvGOAj9/exec';
    }
    else if (kelompokSS10_SS12.includes(kelas)||kelas === 'SS08'||kelas === 'SS09') {
        url = 'https://script.google.com/macros/s/AKfycbycwuKOOgLLLl1xlFkTDD7FNE181mQN3Dr1hdSWRKRXpUOvNcEnhe2DQv3xEnig8QoL/exec';
    }
    
    
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'name': name,
            'kelas': kelas,
            'email': email,
            'answers': JSON.stringify(answers),
            'ip': ipAddress,
            'unique_code': uniqueCode // Tambahkan parameter kode unik
        })
    }).catch(error => console.error('Error:', error));
}



// Initialize
toggleButtons();
updateProgress();