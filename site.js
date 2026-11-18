/* Featured-video picker: the thumbnails under the player swap its source, poster and caption. */
(function () {
  var DEMOS = [
    { id: "full", title: "Supplementary video", length: "4 min 27 s", src: "videos/supp_video.mp4?v=20261118e", poster: "assets/posters/full.jpg?v=20261118d",
      caption: "The narrated video, 4 min 27 s." },
    { id: "s1", title: "Overview", length: "57 s", src: "videos/s1_overview.mp4?v=20261118c", poster: "assets/posters/s1.jpg?v=20261118b",
      caption: "The cascaded procedure, simulator to robot to simulator to robot, each stage passing one result to the next." },
    { id: "s2", title: "Hardware set-up", length: "23 s", src: "videos/s2_setup.mp4?v=20261118", poster: "assets/posters/s2.jpg?v=20261113d",
      caption: "A six-axis manipulator with the production real-time controller PLEM at 1 kHz, a 4.5 kg case on the flange, three 0.30 m lines." },
    { id: "s3", title: "y line with payload", length: "33 s", src: "videos/s3_yline.mp4?v=20261117k", poster: "assets/posters/s3.jpg?v=20261117k",
      caption: "Production ADRC, the nominal ρ = 59 and the optimum of the bound 0.05 on the y line with the payload, the deviation drawn ×100." },
    { id: "s4", title: "z line, wrist damping", length: "37 s", src: "videos/s4_zline.mp4?v=20261117k", poster: "assets/posters/s4.jpg?v=20261117k",
      caption: "The z line without payload, where ρ = 104 oscillates at 30 Hz and the optimum of the lowest bound runs with the mode damped, as the two-mass model predicted." },
    { id: "s5", title: "Simulation", length: "42 s", src: "videos/s5_simulation.mp4?v=20261117c", poster: "assets/posters/s5.jpg?v=20261117c",
      caption: "The three searches against the predicted wrist damping, and the wrist mode identified from the robot runs." },
    { id: "s5b", title: "Ablation, wave lines", length: "38 s", src: "videos/s5b_ablation.mp4?v=20261117j", poster: "assets/posters/s5b.jpg?v=20261117j",
      caption: "The cost weighting on a wave motion, three settings on the y wave line with the payload, the deviation drawn ×30." },
    { id: "s6", title: "Summary", length: "37 s", src: "videos/s6_summary.mp4?v=20261118", poster: "assets/posters/s6.jpg?v=20261118",
      caption: "Every optimum ran with its wrist mode in the order the calibrated model predicted, and the data do not rank the bounds." }
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
