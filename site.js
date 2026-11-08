/* Featured-video picker: the thumbnails under the player swap its source, poster and caption. */
(function () {
  var DEMOS = [
    { id: "full", title: "Supplementary video", length: "3:56", src: "videos/supp_video.mp4", poster: "assets/posters/full.jpg",
      caption: "The full narrated video: study design, hardware set-up, the y line with the payload and the z line without it (measured deviations drawn ×100, live joint-5 torque), the simulation search and a summary." },
    { id: "s1", title: "Overview", length: "0:46", src: "videos/s1_overview.mp4", poster: "assets/posters/s1.jpg",
      caption: "Study design: the common value is stepped up on the robot from its nominal value until the wrist oscillates, and a two-mass loop model fitted to the bracketing runs gives the damping of every setting; constrained Bayesian optimization searches the four parameters of the gain rule within that damping bound; the optimum goes back to the robot against the production ADRC, the binomial observer and the nominal value." },
    { id: "s2", title: "Hardware set-up", length: "0:22", src: "videos/s2_setup.mp4", poster: "assets/posters/s2.jpg",
      caption: "Indy7 running the production real-time controller PLEM at 1 kHz, a 4.5 kg case hanging from the flange, and the three 0.30 m lines along x, y and z." },
    { id: "s3", title: "y line with payload", length: "0:47", src: "videos/s3_yline.mp4", poster: "assets/posters/s3.jpg",
      caption: "Production ADRC, the nominal ρ = 59 and the adopted setting (108, 90, 91, 81) on the y line with the payload; the measured deviation is drawn on the frames magnified 100 times." },
    { id: "s4", title: "z line: wrist damping", length: "0:47", src: "videos/s4_zline.mp4", poster: "assets/posters/s4.jpg",
      caption: "The z line without payload: the nominal ρ = 59 runs cleanly with a broad wrist-mode bump, ρ = 104 carries a sustained 30 Hz wrist oscillation below the torque clamp, and the adopted setting runs cleanly with the mode damped as predicted; live joint-5 torque strips." },
    { id: "s5", title: "Simulation", length: "0:43", src: "videos/s5_simulation.mp4", poster: "assets/posters/s5.jpg",
      caption: "The two searches against the predicted wrist damping and the validation on unseen configurations (Fig. 3), and the wrist mode identified from the robot runs (Fig. 2)." },
    { id: "s6", title: "Summary", length: "0:22", src: "videos/s6_summary.mp4", poster: "assets/posters/s6.jpg",
      caption: "The damping of the measured wrist mode, not the gain margin of the rigid loop, is the quantity to carry from the robot to the simulator." }
  ];
  var player = document.getElementById("featured-video");
  var caption = document.getElementById("featured-description");
  var picker = document.getElementById("demo-picker");
  if (!player || !picker) return;
  function select(demo, autoplay) {
    var wasPlaying = !player.paused && !player.ended;
    player.pause();
    player.poster = demo.poster;
    player.src = demo.src;
    player.load();
    caption.textContent = demo.caption;
    picker.querySelectorAll(".demo-choice").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.id === demo.id ? "true" : "false"); });
    if (autoplay && wasPlaying) { player.play().catch(function () {}); }
  }
  DEMOS.forEach(function (demo, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "demo-choice"; b.dataset.id = demo.id; b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    var img = document.createElement("img"); img.src = demo.poster; img.alt = ""; img.loading = "lazy";
    var t = document.createElement("strong"); t.textContent = demo.title;
    var l = document.createElement("span"); l.textContent = demo.length;
    b.appendChild(img); b.appendChild(t); b.appendChild(l);
    b.addEventListener("click", function () { select(demo, true); });
    picker.appendChild(b);
  });
})();

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
