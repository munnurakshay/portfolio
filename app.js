document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("uDJGJA4IHgWMw4Xwa");

  const form = document.getElementById("contact-form");
  const popup = document.getElementById("success-popup");
  const msgBox = document.getElementById("form-message");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (msgBox) {
      msgBox.style.display = "none";
      msgBox.textContent = "";
    }

    const turnstileToken = getTurnstileToken();

    if (!turnstileToken) {
      showError("Please verify the captcha.");
      return;
    }

    try {
      await emailjs.sendForm(
        "service_vnxkttn",
        "template_jhrho1j",
        form
      );

      form.reset();
      resetTurnstile();
      showPopup();

    } catch (err) {
      showError("Failed to send message. Try again later.");
      console.error(err);
    }
  });

  function showPopup() {
    if (!popup) return;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
  }

  function showError(message) {
    if (!msgBox) return;
    msgBox.textContent = message;
    msgBox.className = "message-box error";
    msgBox.style.display = "block";
  }

  function getTurnstileToken() {
    const input = document.querySelector(
      'input[name="cf-turnstile-response"]'
    );
    return input ? input.value : null;
  }

  function resetTurnstile() {
    if (window.turnstile) {
      window.turnstile.reset();
    }
  }
});
