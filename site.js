document.addEventListener("DOMContentLoaded", function () {
  var introScreen = document.getElementById("introScreen");
  var introEnter = document.getElementById("introEnter");
  var introHint = document.getElementById("introHint");
  var canEnter = false;

  if (introScreen) {
    document.documentElement.classList.add("intro-lock");
  }

  function enterSite() {
    if (!canEnter) return;
    if (!introScreen || introScreen.classList.contains("is-hide")) return;
    introScreen.classList.add("is-hide");
    document.body.classList.add("intro-done");
    document.documentElement.classList.remove("intro-lock");
    setTimeout(function () {
      introScreen.style.display = "none";
    }, 1400);
  }

  if (introScreen) {
    setTimeout(function () {
      canEnter = true;
      if (introEnter) introEnter.disabled = false;
      if (introHint) introHint.textContent = "按 ENTER 進入";
    }, 2500);

    if (introEnter) introEnter.addEventListener("click", enterSite);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") enterSite();
    });
  }

  var lineButton = document.querySelector(".js-line-id");
  if (lineButton) {
    lineButton.addEventListener("click", function (event) {
      event.preventDefault();
      lineButton.classList.toggle("is-show-id");
    });
  }

  var revealItems = document.querySelectorAll(".js-reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.18 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }
});
