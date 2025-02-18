
document.getElementById("dropdown-btn").addEventListener("click", function () {
    document.getElementById("dropdown-list").classList.toggle("show");
});

document.querySelectorAll("#dropdown-list li").forEach(item => {
    item.addEventListener("click", function () {
        document.getElementById("dropdown-btn").textContent = this.textContent;
        document.getElementById("dropdown-btn").setAttribute("data-value", this.getAttribute("data-value"));
        document.getElementById("dropdown-list").classList.remove("show");
    });
});
function halamanPembuka(){
document.querySelector('.start-screen').style.display = 'none';
const text = [
    "Hai KM PKU Selamat Datang!",
    "Selamat Datang Di Website Kami",
    "Survei Biro Riset Pengembangan!"
];

let textIndex = 0; // Indeks untuk array text
let charIndex = 0; // Indeks untuk karakter dalam teks
const typingElement = document.getElementById("typing");

function typeEffect() {
    if (charIndex < text[textIndex].length) {
        typingElement.textContent += text[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 50);
    } else {
        setTimeout(() => {
            typingElement.textContent = "";
            charIndex = 0;
            textIndex = (textIndex + 1) % text.length; // Pindah ke teks berikutnya
            typeEffect();
        }, 2000);
    }
}

typeEffect();

}
halamanPembuka();
function mulai(){
    document.getElementById('container').style.display = 'none'; // Menghilangkan container
    document.querySelector('.start-screen').style.display = 'block'; // Menampilkan start-screen
}
let userAnswers = {};
window.onload = function() {
    const existingCode = getCookie("survey_submitted");
    
    if(existingCode) {
        document.getElementById("message").innerHTML = `
            Anda sudah mengisi survei ini sebelumnya.<br>
            Kode Unik Anda: <strong>${existingCode}</strong>
        `;
        document.getElementById("message").classList.remove("hidden");
        document.querySelector(".container").style.display = 'none';
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
function mulaiKuis() {
    const kelas = document.getElementById("dropdown-btn").getAttribute("data-value");
    const startScreen = document.querySelector('.start-screen');
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validasi input
    if (!kelas) {
        startScreen.classList.add("shake");
        document.getElementById("dropdown-btn").style.borderColor = "red";

        setTimeout(() => {
            startScreen.classList.remove("shake");
            document.getElementById("dropdown-btn").style.borderColor = "";
        }, 500);
        return;
    }

    document.getElementById("dropdown-btn").style.borderColor = "";
    startScreen.style.display = 'none';

    const kelompokST01_08 = Array.from({ length: 8 }, (_, i) => `ST${String(i + 1).padStart(2, "0")}`);
    const kelompokST09_17 = Array.from({ length: 9 }, (_, i) => `ST${i + 10}`);
    const kelompokST18_ST25 = Array.from({ length: 8 }, (_, i) => `ST${i + 18}`);
    const kelompokST26_ST38 = Array.from({ length: 13 }, (_, i) => `ST${i + 26}`);
    const kelompokSS01_SS06 = Array.from({ length: 6 }, (_, i) => `SS${String(i + 1).padStart(2, "0")}`);
    const kelompokSS10_SS12 = Array.from({ length: 3 }, (_, i) => `SS${i + 10}`);


    // Sembunyikan semua kuis terlebih dahulu
    const quizContainer = document.getElementById("survei");
    if (kelompokST01_08.includes(kelas)) {
        window.location.href = 'pertanyaan/cluster1.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
        return
    } 
    else if (kelompokST09_17.includes(kelas)||kelas === "ST09") {
        window.location.href = 'pertanyaan/cluster2.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
    }
    else if (kelompokST18_ST25.includes(kelas)||kelas === "ST18") {
        window.location.href = 'pertanyaan/cluster3.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
    }
    else if (kelompokST26_ST38.includes(kelas)) {
        window.location.href = 'pertanyaan/cluster4.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
    }
    else if (kelompokSS01_SS06.includes(kelas)) {
        window.location.href = 'pertanyaan/cluster5.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
    }
    else if (kelas === "SS07") {
        window.location.href = 'pertanyaan/cluster6.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
    }
    else if (kelompokSS10_SS12.includes(kelas)||kelas === 'SS08'||kelas === 'SS09') {
        window.location.href = 'pertanyaan/cluster7.html'
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("surveyCompleted", "true");
    }

    // Isi elemen berdasarkan matkulMap
    Object.keys(matkulMap).forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => {
            el.textContent = matkulMap[className];
        });
    });

    if (typeof showQuestion === "function") {
        showQuestion(1);
    } else {
        console.error("showQuestion() tidak ditemukan!");
    }
}
