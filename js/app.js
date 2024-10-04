document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded and parsed.");

  // Add event listeners for all close buttons inside popups
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function () {
      const popupId = button.closest('.project-popup').id;
      closePopup(popupId);
    });
  });

  const overlay = document.getElementById('popup-overlay');

  if (overlay) {
    overlay.addEventListener('click', function () {
      console.log("Overlay clicked.");
      // Find the active popup
      const activePopup = document.querySelector('.project-popup.active');
      if (activePopup) {
        closePopup(activePopup.id);
      }
    });
  } else {
    console.error("Overlay element not found.");
  }

  // Close the popup when pressing the Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      console.log("Escape key pressed.");
      const activePopup = document.querySelector('.project-popup.active');
      if (activePopup) {
        closePopup(activePopup.id);
      }
    }
  });

  // Function to toggle the visibility of the info box
  function toggleInfoBox(infoId) {
    console.log("toggleInfoBox called with infoId:", infoId);

    if (!infoId) {
      console.error("Info box not found for ID:", infoId);
      return; // Prevent further execution if infoId is null
    }

    const infoBox = document.getElementById(infoId);

    if (infoBox) {
      if (infoBox.classList.contains('visible')) {
        infoBox.classList.remove('visible');
        console.log("Info box hidden:", infoId);
      } else {
        // Hide other info boxes
        document.querySelectorAll('.info-box').forEach((box) => {
          box.classList.remove('visible');
          console.log("Other info box hidden:", box.id);
        });
        infoBox.classList.add('visible');
        console.log("Info box shown:", infoId);
      }
    } else {
      console.error("Info box not found for ID:", infoId);
    }
  }

  // Ensure info icon click triggers toggleInfoBox with correct infoId
  document.querySelectorAll('.info-icon').forEach((infoIcon) => {
    console.log("Attaching click event to info-icon:", infoIcon);
    infoIcon.addEventListener('click', function (event) {
      event.stopPropagation();  // Prevent outside click handler from firing
      const infoId = infoIcon.getAttribute('data-info-id');
      console.log("Info icon clicked. data-info-id:", infoId);
      toggleInfoBox(infoId); // Use the correct infoId from data-info-id attribute
    });
  });

  // Prevent closing the info box when clicking inside it
  document.querySelectorAll('.info-box').forEach((infoBox) => {
    infoBox.addEventListener('click', function (event) {
      event.stopPropagation();  // Prevent outside click handler from firing
    });
  });

  // Close info boxes when clicking outside, but ignore clicks on the icon or box itself
  document.addEventListener('click', function (event) {
    document.querySelectorAll('.info-box.visible').forEach((infoBox) => {
      const infoIcon = document.querySelector(`[data-info-id="${infoBox.id}"]`);
      if (
        !infoBox.contains(event.target) && 
        (!infoIcon || !infoIcon.contains(event.target))
      ) {
        infoBox.classList.remove('visible');
        console.log("Info box closed due to outside click:", infoBox.id);
      }
    });
  });

  // Back to top arrow button functionality
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log("Back to top button clicked.");
    });
  } else {
    console.error("Back to top button not found.");
  }

  // Ensure left-btn transitions from "External Projects" to "Academic Projects"
  document.querySelectorAll('.left-btn').forEach(button => {
    button.addEventListener('click', function () {
      // Close the currently open popup
      const activePopup = document.querySelector('.project-popup.active');
      if (activePopup) {
        closePopup(activePopup.id);
      }
      // Open the "Academic Projects" popup
      openPopup('academicProjects');
    });
  });

  // Ensure right-btn transitions from "Academic Projects" to "External Projects"
  document.querySelectorAll('.right-btn').forEach(button => {
    button.addEventListener('click', function () {
      // Close the currently open popup
      const activePopup = document.querySelector('.project-popup.active');
      if (activePopup) {
        closePopup(activePopup.id);
      }
      // Open the "External Projects" popup
      openPopup('externalProjects');
    });
  });
});

// Function to open the popup
function openPopup(popupId) {
  console.log("openPopup called with popupId:", popupId);

  const popup = document.getElementById(popupId);
  const overlay = document.getElementById('popup-overlay');

  if (popup && overlay) {
    console.log("Popup and overlay found.");
    popup.style.display = 'block';
    popup.classList.add('active');
    overlay.style.display = 'block';

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  } else {
    console.error("Popup or overlay not found for ID:", popupId);
  }
}

// Function to close the popup
function closePopup(popupId) {
  console.log("closePopup called with popupId:", popupId);

  const popup = document.getElementById(popupId);
  const overlay = document.getElementById('popup-overlay');

  if (popup && overlay) {
    console.log("Popup and overlay found.");
    popup.classList.remove('active');

    // Use transitionend event to ensure it hides after CSS transition
    popup.addEventListener('transitionend', function handler() {
      popup.style.display = 'none';
      popup.removeEventListener('transitionend', handler);
    });

    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';  // Restore scrolling
  } else {
    console.error("Popup or overlay not found for ID:", popupId);
  }
}

// Detect touchstart event and remove hover effects on mobile
const navLinks = document.querySelectorAll('header nav .nav-container .nav-links .link');

navLinks.forEach(link => {
  // Remove hover styles on touch devices
  link.addEventListener('touchstart', function() {
    // Remove hover class
    link.classList.remove('active');
  });

  // Optionally, clear hover effect after a touch ends
  link.addEventListener('touchend', function() {
    navLinks.forEach(nav => nav.classList.remove('active')); // Clear active class from all
    link.classList.add('active'); // Set active class to current link
  });
});

