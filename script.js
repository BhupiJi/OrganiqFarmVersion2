// script.js – OrganiqFarm interactive features

document.addEventListener("DOMContentLoaded", function () {

  // 1. Counter animation on homepage metrics
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // Adjust speed (lower = faster)

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 20);
    } else {
      counter.innerText = target + "%";
    }
  };

  const runCounters = () => {
    counters.forEach(counter => {
      if (isElementInViewport(counter)) {
        if (!counter.classList.contains("animated")) {
          counter.classList.add("animated");
          animateCounter(counter);
        }
      }
    });
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  window.addEventListener("scroll", runCounters);
  runCounters(); // Run on load in case already in view

  // 2. Load More button on blogs.html
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      const hiddenCards = document.querySelectorAll(".blog-card.hidden");
      let shown = 0;
      hiddenCards.forEach((card, index) => {
        if (index < 6) { // Show 6 more each time
          card.classList.remove("hidden");
          shown++;
        }
      });
      if (shown < 6) {
        loadMoreBtn.style.display = "none"; // Hide button when no more
      }
      // Optional: scroll a bit to see new cards
      window.scrollBy(0, 50);
    });
  }
});
