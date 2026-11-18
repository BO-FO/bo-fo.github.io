/* The featured video (the silent overview) starts on click and loops (no autoplay since 2026-11-18 evening, user); the thumbnail
   picker under it was removed on 2026-11-18 (user), the narrated video is linked in the header. */

/* Looping clips of every setting: the source is attached and playback started when a clip scrolls into view, paused when it leaves;
   one button pauses or resumes them all. */
(function () {
  var loops = Array.prototype.slice.call(document.querySelectorAll("video.loop"));
  var toggle = document.getElementById("loop-toggle");
  if (!loops.length) return;
  var wanted = true;                                   // the user's choice (Pause all / Play all)
  var visible = new Set();
  function sync(v) {
    if (wanted && visible.has(v)) {
      if (!v.getAttribute("src")) { v.src = v.dataset.src; v.load(); }
      v.play().catch(function () {});
    } else if (!v.paused) { v.pause(); }
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); sync(e.target); });
    }, { rootMargin: "120px 0px", threshold: 0.1 });
    loops.forEach(function (v) { io.observe(v); });
  } else {
    loops.forEach(function (v) { visible.add(v); sync(v); });
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      wanted = !wanted; toggle.setAttribute("aria-pressed", wanted ? "true" : "false"); toggle.textContent = wanted ? "Pause all" : "Play all";
      loops.forEach(sync);
    });
  }
})();
