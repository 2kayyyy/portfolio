const logoName = document.getElementById("logo-name");
const body = document.querySelector("body");
const navbar = document.querySelector("nav");

window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");

  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "There was a problem. Please try again.";
  }

  // Handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// Helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);

      // Paper plane animation
      document.querySelectorAll(".btn-email").forEach((button) => {
        let getVar = (variable) =>
          getComputedStyle(button).getPropertyValue(variable);

        if (!button.classList.contains("active")) {
          button.classList.add("active");

          gsap.to(button, {
            keyframes: [
              {
                "--left-wing-first-x": 50,
                "--left-wing-first-y": 100,
                "--right-wing-second-x": 50,
                "--right-wing-second-y": 100,
                duration: 0.2,
                onComplete() {
                  gsap.set(button, {
                    "--left-wing-first-y": 0,
                    "--left-wing-second-x": 40,
                    "--left-wing-second-y": 100,
                    "--left-wing-third-x": 0,
                    "--left-wing-third-y": 100,
                    "--left-body-third-x": 40,
                    "--right-wing-first-x": 50,
                    "--right-wing-first-y": 0,
                    "--right-wing-second-x": 60,
                    "--right-wing-second-y": 100,
                    "--right-wing-third-x": 100,
                    "--right-wing-third-y": 100,
                    "--right-body-third-x": 60,
                  });
                },
              },
              // Rest of the keyframes go here...
            ],
          });

          // Rest of your gsap animation code...
        }
      });
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}


// Function to open the popup
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    console.log("Opening popup:", popupId);
    popup.style.display = "block";  // Show the popup
    popup.classList.add('active');  // Add the 'active' class for transition
  } else {
    console.error("Popup with id", popupId, "not found.");
  }
}

// Function to close the popup
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    console.log("Closing popup:", popupId);
    popup.classList.remove('active');  // Remove the 'active' class for transition
    setTimeout(() => { popup.style.display = "none"; }, 300); // Delay hiding for transition
  } else {
    console.error("Popup with id", popupId, "not found.");
  }
}




// Back to top arrow button
const backToTopBtn = $("#backToTopBtn");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    backToTopBtn.addClass("show");
  } else {
    backToTopBtn.removeClass("show");
  }
});

backToTopBtn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
