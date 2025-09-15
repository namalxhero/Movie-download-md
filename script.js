const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const statusDiv = document.getElementById("status");

const ADMIN_EMAIL = "nipunanamal698@gmail.com"; // only admin can upload

let googleUser = null;

// Initialize Google Sign-In
window.onload = () => {
  google.accounts.id.initialize({
    client_id: "125301807884-tmqm16kkitakltbr3sv44cena89m0cut.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    loginBtn,
    { theme: "outline", size: "large" }
  );
  google.accounts.id.prompt(); // silent auto popup if user already signed in
};

function handleCredentialResponse(response) {
  const jwt = response.credential;
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const user = JSON.parse(atob(base64));
  googleUser = user;
  console.log("Logged in user:", user);

  if (user.email === ADMIN_EMAIL) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    uploadArea.style.display = "block";
  } else {
    alert("🚫 Only admin can upload movies.");
  }
}

logoutBtn.onclick = () => {
  googleUser = null;
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  uploadArea.style.display = "none";
  statusDiv.innerHTML = "";
};

// Dummy upload function (replace with your own server API)
uploadBtn.onclick = () => {
  const files = fileInput.files;
  if (!files.length) return alert("Select files first");
  statusDiv.innerHTML = "Uploading...";
  for (let file of files) {
    // Simulate upload
    setTimeout(() => {
      statusDiv.innerHTML += `<br/>✅ ${file.name} uploaded!`;
    }, 500);
  }
};

