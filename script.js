// =============================================
// 📚 EDU LIBRARY - MAIN SCRIPT (Simplified Version)
// Handles: Reading List + Login/Signup Validation
// =============================================
// ----------------------
// 📘 READING LIST LOGIC
// ----------------------
let readingList = JSON.parse(localStorage.getItem("readingList")) || [];
// Add item to Reading List
function addToList(title) {
  readingList.push({ title });
  localStorage.setItem("readingList", JSON.stringify(readingList));
  alert(title + " added to your Reading List!");
  showReadingList();
}

// Show Reading List (like cart display)
function showReadingList() {
  const box = document.getElementById("list-items");
  if (!box) return;

  box.innerHTML = "";

  if (readingList.length === 0) {
    box.innerHTML = "<p>Your Reading List is empty.</p>";
    return;
  }


  readingList.forEach((item, index) => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <span>📘 ${item.title}</span>
      <button onclick="removeBook(${index})"
        style="
          background:#ff4d4d;
          color:white;
          border:none;
          padding:5px 12px;
          border-radius:15px;
          cursor:pointer;
        ">
        Remove
      </button>
    `;

    box.appendChild(div);
  });
}


function removeBook(index) {
  readingList.splice(index, 1);
  localStorage.setItem("readingList", JSON.stringify(readingList));
  showReadingList();
}


// Clear Reading List
function clearReadingList() {
  localStorage.removeItem("readingList");
  readingList = [];
  showReadingList();
}


// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) clearBtn.addEventListener("click", clearReadingList);
  showReadingList();
});

// ----------------------
// 🔐 SIGNUP VALIDATION
// ----------------------
function validateSignup() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    alert("⚠️ All fields are required!");
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

   localStorage.setItem("userName", name);
   localStorage.setItem("userEmail", email);
   localStorage.setItem("userPassword", password);
  alert("✅ Signup successful! You can now log in.");
  window.location.href = "login.html";
  return false;
}

// ----------------------
// 🔑 LOGIN VALIDATION
// ----------------------
function validateLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === "" || password === "") {
    alert("⚠️ Please fill in both fields!");
    return false;
  }

  if (email === storedEmail && password === storedPassword) {
    alert("✅ Login successful! Welcome back.");
    window.location.href = "index.html";
    return false;
  } else {
    alert("❌ Invalid email or password.");
    return false;
  }
}


// =========================
// 👨‍💼 ADMIN ADD BOOK LOGIC
// =========================
function addBook() {
  const title = document.getElementById("bookTitle").value.trim();
  const desc = document.getElementById("bookDesc").value.trim();
  const img = document.getElementById("bookImg").value.trim();
  const pdf = document.getElementById("bookPdf").value.trim();

  if (!title || !desc || !img || !pdf) {
    alert("Please fill all fields");
    return;
  }

  let books = JSON.parse(localStorage.getItem("books")) || [];

  books.push({ title, desc, img, pdf });

  localStorage.setItem("books", JSON.stringify(books));

  alert("Book added successfully!");

  document.getElementById("bookTitle").value = "";
  document.getElementById("bookDesc").value = "";
  document.getElementById("bookImg").value = "";
  document.getElementById("bookPdf").value = "";
}

// =========================
// 📝 FEEDBACK LOGIC
// =========================
function openFeedback(bookName) {
  localStorage.setItem("feedbackBook", bookName);
  window.location.href = "feedback.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const bookSpan = document.getElementById("bookName");
  if (bookSpan) {
    bookSpan.innerText = localStorage.getItem("feedbackBook");
  }
});

function submitFeedback() {
  const book = localStorage.getItem("feedbackBook");
  const text = document.getElementById("feedbackText").value.trim();

  if (text === "") {
    alert("Please write feedback");
    return;
  }

  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push({ book, text });

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  alert("Feedback submitted successfully!");
  window.location.href = "resources.html";
}

// ==============================
// 📝 FEEDBACK SYSTEM
// ==============================

function giveFeedback(bookName) {
  const feedback = prompt("Enter your feedback for " + bookName + ":");

  if (!feedback || feedback.trim() === "") {
    alert("Feedback cannot be empty!");
    return;
  }

  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbacks.push({
    book: bookName,
    feedback: feedback,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  alert("✅ Feedback submitted successfully!");
}

let selectedBook = "";

// Open feedback box
function openFeedback(bookName) {
  selectedBook = bookName;
  document.getElementById("feedbackBook").innerText = "Book: " + bookName;
  document.getElementById("feedbackModal").style.display = "block";
}

// Close popup
function closeFeedback() {
  document.getElementById("feedbackModal").style.display = "none";
  document.getElementById("feedbackText").value = "";
}

// Save feedback
function submitFeedback() {
  const text = document.getElementById("feedbackText").value.trim();

  if (text === "") {
    alert("Please write feedback");
    return;
  }

  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbacks.push({
    book: selectedBook,
    feedback: text,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  alert("Feedback submitted!");
  closeFeedback();
}
