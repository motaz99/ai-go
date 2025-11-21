function sendEmail(event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector(".send-btn");
  const originalText = submitBtn.textContent;

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const subject = document.getElementById("subject")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // UI: loading state
  submitBtn.textContent = "⏳ Sending...";
  submitBtn.disabled = true;

  const params = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
  };

  // Ensure emailjs is available
  if (typeof emailjs === "undefined" || !emailjs.send) {
    console.error("EmailJS not loaded.");
    alert("Email service unavailable. Try again later.");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    return;
  }

  emailjs
    .send(
      window.emailJsCredentials.serviceID,
      window.emailJsCredentials.templateID,
      params
    )
    .then((response) => {
      console.log("EmailJS response:", response);
      submitBtn.textContent = "✅ Message Sent!";
      submitBtn.style.background =
        "linear-gradient(135deg, #059669 0%, #10b981 100%)";
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      submitBtn.textContent = "❌ Failed to Send";
      submitBtn.style.background =
        "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)";
      alert(
        "Failed to send email. Please try again or contact support@aigo.com."
      );

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 3000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    sendEmail(e);
  });
});
