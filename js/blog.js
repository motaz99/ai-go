let blogData = [];

// Fetch blog data from JSON
async function loadBlogData() {
  try {
    const response = await fetch("js/blog-data.json");
    const data = await response.json();
    blogData = data.articles;
  } catch (error) {
    console.error("Error loading blog data:", error);
  }
}

// Initialize blog functionality
document.addEventListener("DOMContentLoaded", function () {
  loadBlogData();
  setupBlogEventListeners();
});

// Set up event listeners for "Read More" links
function setupBlogEventListeners() {
  const readMoreLinks = document.querySelectorAll(".blog-link");
  console.log(readMoreLinks);

  readMoreLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openBlogModal(index);
    });
  });

  const closeButton = document.querySelector(".modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", closeBlogModal);
  }

  const modal = document.getElementById("blogModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBlogModal();
      }
    });
  }
}

function openBlogModal(index) {
  const article = blogData[index];
  if (!article) return;

  document.getElementById("modalTitle").textContent = article.title;
  document.getElementById("modalCategory").textContent = article.category;
  document.getElementById("modalDate").textContent = article.date;
  document.getElementById("modalAuthor").textContent = article.author;
  document.getElementById("modalContent").textContent = article.content;

  const modal = document.getElementById("blogModal");
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeBlogModal() {
  const modal = document.getElementById("blogModal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeBlogModal();
  }
});
