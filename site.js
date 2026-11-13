/* Featured-video picker: the thumbnails under the player swap its source, poster and caption. */
(function () {
  var DEMOS = [
    { id: "full", title: "Supplementary video", length: "4 min 15 s", src: "videos/supp_video.mp4?v=20261113c", poster: "assets/posters/full.jpg?v=20261113e",
      caption: "The full narrated video, with the study design, hardware set-up, the y line with the payload and the z line without it (measured deviations drawn ×100, live joint-5 torque), the bound sweep in simulation, the ablation on the wave lines and a summary." },
    { id: "s1", title: "Overview", length: "44 s", src: "videos/s1_overview.mp4?v=20261113b", poster: "assets/posters/s1.jpg?v=20261113b",
      caption: "Study design, in which the common value is stepped up on the robot from its nominal value to the onset of wrist oscillation, and a two-mass loop model fitted to these two runs gives the damping of every setting. Constrained Bayesian optimization in the simulator, with and without the payload, searches at three levels of the damping bound, and the optimum of each level runs on the robot against the production ADRC, the binomial observer and the nominal value." },
    { id: "s2", title: "Hardware set-up", length: "22 s", src: "videos/s2_setup.mp4?v=20261113c", poster: "assets/posters/s2.jpg?v=20261113c",
      caption: "Indy7 running the production real-time controller PLEM at 1 kHz, a 4.5 kg case hanging from the flange, and the three 0.30 m lines along x, y and z." },
    { id: "s3", title: "y line with payload", length: "33 s", src: "videos/s3_yline.mp4?v=20261113b", poster: "assets/posters/s3.jpg?v=20261113b",
      caption: "Production ADRC, the nominal ρ = 59 and the optimum of the bound 0.05, (82, 92, 90, 79), on the y line with the payload, with the measured deviation drawn on the frames magnified 100 times." },
    { id: "s4", title: "z line, wrist damping", length: "37 s", src: "videos/s4_zline.mp4?v=20261113c", poster: "assets/posters/s4.jpg?v=20261113c",
      caption: "The z line without payload, where the nominal ρ = 59 runs cleanly with a broad wrist-mode bump, ρ = 104 carries a sustained 30 Hz wrist oscillation below the torque clamp, and the optimum of the lowest bound runs cleanly with the mode damped near 29 Hz, as the two-mass model predicted." },
    { id: "s5", title: "Simulation", length: "42 s", src: "videos/s5_simulation.mp4?v=20261113b", poster: "assets/posters/s5.jpg?v=20261113b",
      caption: "The three searches against the predicted wrist damping (Fig. 3), and the wrist mode identified from the robot runs (Fig. 2)." },
    { id: "s5b", title: "Ablation, wave lines", length: "38 s", src: "videos/s5b_ablation.mp4?v=20261113b", poster: "assets/posters/s5b.jpg?v=20261113b",
      caption: "The cost weighting on a wave motion. The production ADRC, the optimum of the perpendicular weighting (92, 92, 92, 80) and the optimum of the lowest bound on the y wave line with the payload, the measured deviation drawn ×30, and the search repeated under three weightings." },
    { id: "s6", title: "Summary", length: "31 s", src: "videos/s6_summary.mp4?v=20261113b", poster: "assets/posters/s6.jpg?v=20261113b",
      caption: "The damping of the measured wrist mode, carried from the robot to the simulator, is what makes the search transfer, the three bounds lie within the repeat scatter of each other on the robot, and the ablation leaves the optimum within the scatter of the search." }
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
