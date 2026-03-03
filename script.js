/* ======================================================
   MAIN SCRIPT FILE
   Handles:
   - Hero carousel
   - FAQ accordion
   - Application slider
   - Process carousel
   - Sticky header behavior
====================================================== */
document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
   HERO IMAGE CAROUSEL
   Enables left/right navigation
================================ */
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".right");
  const prevBtn = document.querySelector(".left");

  if (track && slides.length && nextBtn && prevBtn) {
    let index = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  /* ===============================
   FAQ ACCORDION
   Expands one item at a time
================================ */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        item.classList.toggle("active");
      });
    }
  });

  /* ===============================
   APPLICATION CARD CAROUSEL
   Horizontal scroll slider
================================ */
  const appTrack = document.querySelector(".app-track");
  const appNextBtn = document.querySelector(".app-next");
  const appPrevBtn = document.querySelector(".app-prev");
  const appCards = document.querySelectorAll(".app-card");

  if (appTrack && appNextBtn && appPrevBtn && appCards.length) {
    let appIndex = 0;

    function getCardWidth() {
      const card = appCards[0];
      const style = window.getComputedStyle(appTrack);
      const gap = parseInt(style.gap) || 0;
      return card.offsetWidth + gap;
    }

    function updateAppCarousel() {
      const cardWidth = getCardWidth();
      appTrack.style.transform = `translateX(-${appIndex * cardWidth}px)`;
    }

    appNextBtn.addEventListener("click", () => {
      const cardWidth = getCardWidth();
      const visibleCards = Math.floor(
        appTrack.parentElement.offsetWidth / cardWidth,
      );
      const maxIndex = appCards.length - visibleCards;

      if (appIndex < maxIndex) {
        appIndex++;
        updateAppCarousel();
      }
    });

    appPrevBtn.addEventListener("click", () => {
      if (appIndex > 0) {
        appIndex--;
        updateAppCarousel();
      }
    });

    window.addEventListener("resize", () => {
      updateAppCarousel();
    });
  }

  /* ===============================
   PROCESS IMAGE CAROUSEL
   Step-by-step manufacturing slider
================================ */
  const processTrack = document.querySelector(".process-track");
  const processSlides = document.querySelectorAll(".process-slide");
  const processNext = document.querySelector(".process-next");
  const processPrev = document.querySelector(".process-prev");

  if (processTrack && processSlides.length && processNext && processPrev) {
    let processIndex = 0;

    function updateProcessCarousel() {
      processTrack.style.transform = `translateX(-${processIndex * 100}%)`;
    }

    processNext.addEventListener("click", () => {
      processIndex = (processIndex + 1) % processSlides.length;
      updateProcessCarousel();
    });

    processPrev.addEventListener("click", () => {
      processIndex =
        (processIndex - 1 + processSlides.length) % processSlides.length;
      updateProcessCarousel();
    });
  }

  const processTabs = document.querySelectorAll(".process-tab");

  processTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      processTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});

/* ===============================
   STICKY HEADER FUNCTIONALITY
   Appears after first fold and
   hides/shows based on scroll direction
================================ */
const header = document.querySelector(".header");

let lastScrollY = 0;
let isStickyActive = false;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const firstFoldHeight = window.innerHeight;
  if (currentScrollY > firstFoldHeight) {
    if (!isStickyActive) {
      header.classList.add("sticky");
      document.body.classList.add("sticky-active");
      isStickyActive = true;
    }
    if (currentScrollY > lastScrollY) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  } else {
    header.classList.remove("sticky", "hide");
    document.body.classList.remove("sticky-active");
    isStickyActive = false;
  }

  lastScrollY = currentScrollY;
});
