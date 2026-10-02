// ===== 1. Dynamic copyright year =====
// Finds <span id="year"> in the footer and fills in the current year.
document.getElementById("year").textContent = new Date().getFullYear();


// ===== 2. Copy email button =====
const copyButton = document.getElementById("copy-email");
const copyMessage = document.getElementById("copy-message");

copyButton.addEventListener("click", function () {
  // The email is stored in the button's data-email attribute (edit it in index.html)
  const email = copyButton.dataset.email;

  // Modern way to copy text (works on https:// and localhost)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(function () { showMessage("Email copied! ✅"); })
      .catch(function () { fallbackCopy(email); });
  } else {
    fallbackCopy(email);
  }
});

// Backup method for browsers/pages where the modern way is blocked
function fallbackCopy(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    showMessage("Email copied! ✅");
  } catch (error) {
    showMessage("Could not copy. Email: " + text);
  }
  document.body.removeChild(temp);
}

// Shows a small message under the buttons for 2.5 seconds
function showMessage(text) {
  copyMessage.textContent = text;
  setTimeout(function () { copyMessage.textContent = ""; }, 2500);
}


// ===== 3. Highlight the active navbar link while scrolling =====
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "home";

  // Find the last section whose top has passed just under the navbar
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  // If we are at the very bottom of the page, highlight the last section
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
    current = sections[sections.length - 1].id;
  }

  // Add "active" only to the link that matches the current section
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink(); // run once when the page loads
