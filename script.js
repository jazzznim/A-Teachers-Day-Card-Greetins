const $ = (id) => document.getElementById(id);

const book = $("book");
const cover = $("cover");
const openBtn = $("openBtn");
const customizer = $("customizer");

const teacherInput = $("teacherInput");
const senderInput = $("senderInput");
const messageInput = $("messageInput");
const photoInput = $("photoInput");
const audioInput = $("audioInput");

const cardTeacher = $("cardTeacher");
const coverTeacher = $("coverTeacher");
const cardSender = $("cardSender");
const cardMessage = $("cardMessage");
const messageCount = $("messageCount");

let photoUrl = "";
let audioUrl = "";

function toggleBook() {
  book.classList.toggle("open");
  if (book.classList.contains("open")) {
    createSparkles(12);
  }
}

cover.addEventListener("click", toggleBook);
openBtn.addEventListener("click", toggleBook);
book.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleBook();
  }
});

$("editTopBtn").addEventListener("click", () => {
  customizer.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => teacherInput.focus(), 500);
});

$("closeEditBtn").addEventListener("click", () => {
  customizer.classList.toggle("hidden");
});

function updatePreview() {
  const teacher = teacherInput.value.trim() || "Teacher";
  const sender = senderInput.value.trim() || "Your Student";
  const message = messageInput.value.trim() || "Thank you for being an amazing teacher.";

  cardTeacher.textContent = teacher;
  coverTeacher.textContent = teacher;
  cardSender.textContent = sender;
  cardMessage.textContent = message;
  messageCount.textContent = messageInput.value.length;
}

teacherInput.addEventListener("input", updatePreview);
senderInput.addEventListener("input", updatePreview);
messageInput.addEventListener("input", updatePreview);

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("Please choose an image file.");
    photoInput.value = "";
    return;
  }

  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = URL.createObjectURL(file);

  $("previewPhoto").src = photoUrl;
  $("previewPhoto").style.display = "block";
  $("photoPlaceholder").classList.add("hidden");
  createSparkles(8);
});

audioInput.addEventListener("change", () => {
  const file = audioInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("audio/")) {
    alert("Please choose an audio file.");
    audioInput.value = "";
    return;
  }

  if (audioUrl) URL.revokeObjectURL(audioUrl);
  audioUrl = URL.createObjectURL(file);

  $("audioPlayer").src = audioUrl;
  $("audioName").textContent = file.name;
  createSparkles(8);
});

$("applyBtn").addEventListener("click", () => {
  updatePreview();
  createConfetti(42);
  book.classList.add("open");
  setTimeout(() => book.classList.remove("open"), 1400);
});

$("confettiBtn").addEventListener("click", () => createConfetti(65));

$("resetBtn").addEventListener("click", () => {
  teacherInput.value = "Teacher";
  senderInput.value = "Your Student";
  messageInput.value = "Thank you for your patience, guidance, and kindness. You inspire us to keep learning, keep trying, and believe in ourselves. Your lessons reach far beyond the classroom.";
  photoInput.value = "";
  audioInput.value = "";

  if (photoUrl) URL.revokeObjectURL(photoUrl);
  if (audioUrl) URL.revokeObjectURL(audioUrl);
  photoUrl = "";
  audioUrl = "";

  $("previewPhoto").removeAttribute("src");
  $("previewPhoto").style.display = "none";
  $("photoPlaceholder").classList.remove("hidden");
  $("audioPlayer").removeAttribute("src");
  $("audioPlayer").load();
  $("audioName").textContent = "No audio added yet";

  updatePreview();
  book.classList.remove("open");
});

function createSparkles(count = 10) {
  const container = document.querySelector(".sparkles");
  const symbols = ["✦", "✧", "·", "✦", "⋆"];

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDuration = `${3 + Math.random() * 3}s`;
    s.style.fontSize = `${9 + Math.random() * 13}px`;
    container.appendChild(s);
    setTimeout(() => s.remove(), 6500);
  }
}

function createConfetti(count = 50) {
  const symbols = ["✦", "•", "♥", "◆", "★"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    c.style.left = `${Math.random() * 100}vw`;
    c.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    c.style.animationDelay = `${Math.random() * .55}s`;
    c.style.fontSize = `${8 + Math.random() * 13}px`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

updatePreview();
setInterval(() => createSparkles(2), 2800);
