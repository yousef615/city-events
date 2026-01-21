// Change active list item
let nav_item = document.querySelectorAll(".nav-item");
let nav_link = document.getElementsByClassName("nav-link");
for (var i = 0; i < nav_link.length; i++) {
  nav_link[i].onclick = function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  };
}

// Hide the header on scroll down
let lastScrollTop = 0;
navbar = document.getElementById("nav");
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 50 && scrollTop > lastScrollTop) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
  lastScrollTop = scrollTop;
});

// scroll to top button

var scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// program the slider on home page
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const wrapper = document.querySelector(".slide-wrapper");

function showSlides() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  updateSliderPosition();
}

function manualSlide(n) {
  clearInterval(autoSlideInterval);
  slideIndex += n;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  updateSliderPosition();
  autoSlideInterval = setInterval(showSlides, 3000);
}

function updateSliderPosition() {
  if (!wrapper) return;
  if (window.innerWidth >= 1114) {
    wrapper.style.transform = `translateX(${
      -slideIndex * (window.innerWidth * 0.8411)
    }px)`;
  } else if (window.innerWidth >= 750 && window.innerWidth <= 890) {
    wrapper.style.transform = `translateX(${
      -slideIndex * (window.innerWidth * 0.835)
    }px)`;
  } else if (window.innerWidth >= 891 && window.innerWidth <= 1113) {
    wrapper.style.transform = `translateX(${
      -slideIndex * (window.innerWidth * 0.838)
    }px)`;
  } else if (window.innerWidth < 750 && window.innerWidth > 550) {
    wrapper.style.transform = `translateX(${
      -slideIndex * (window.innerWidth * 0.83)
    }px)`;
  } else if (window.innerWidth < 550) {
    console.log("very Small");
    wrapper.style.transform = `translateX(${
      -slideIndex * (window.innerWidth * 0.82)
    }px)`;
  }
}
updateSliderPosition();

let autoSlideInterval = setInterval(showSlides, 3000);

// Start Events Page

// filter and search
const searchInput = document.getElementById("myInput");
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const cards = document.querySelectorAll(".events-cards .card");
    cards.forEach((card) => {
      const cardContent = card.innerText.toLowerCase();
      if (cardContent.includes(filter)) {
        card.style.display = "";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Start Event Page

function saveEventData(eventId) {
  localStorage.setItem("selectedEventId", eventId);
}

document.addEventListener("DOMContentLoaded", function () {
  const selectedId = localStorage.getItem("selectedEventId");
  const detailSections = document.querySelectorAll(".event-details-section");

  if (detailSections.length > 0) {
    detailSections.forEach((section) => {
      section.style.display = "none";
    });

    if (selectedId) {
      const activeSection = document.getElementById(selectedId);
      if (activeSection) {
        activeSection.style.display = "block";

        const eventTitle = activeSection.querySelector("h1").innerText;
        document.title = eventTitle + " - City Events 2026";
      }
    } else if (detailSections.length > 0) {
      detailSections[0].style.display = "block";
    }
  }
});

// Start Contact Page

document.getElementById("contactForm").addEventListener(
  "submit",
  function (event) {
    const form = event.target;
    const alertPlaceholder = document.getElementById("alertPlaceholder");
    event.preventDefault();

    const showAlert = (message, type) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
      alertPlaceholder.innerHTML = "";
      alertPlaceholder.append(wrapper);
    };

    if (!form.checkValidity()) {
      event.stopPropagation();
      showAlert(
        "Please fix the errors in the form before submitting.",
        "danger"
      );
    } else {
      showAlert("Success! Your message has been sent to the team.", "success");
      form.reset();
      form.classList.remove("was-validated");
      return;
    }

    form.classList.add("was-validated");
  },
  false
);
