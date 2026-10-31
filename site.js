/* Featured-video picker: the thumbnails under the player swap its source, poster and caption. */
(function () {
  var DEMOS = [
    { id: "full", title: "Supplementary video", length: "3:11", src: "videos/supp_video.mp4", poster: "assets/posters/full.jpg",
      caption: "The full narrated video: study design, hardware set-up, the three Cartesian lines with and without the payload (measured deviations drawn ×100, live joint-5 torque), the simulation search and a summary." },
    { id: "s1", title: "Overview", length: "0:36", src: "videos/s1_overview.mp4", poster: "assets/posters/s1.jpg",
      caption: "Study design: a fourth-order ESO gain rule with one relocation parameter per gain order, tuned by constrained Bayesian optimization on a randomized simulated Indy7 and tested on the robot with its production ADRC gains." },
    { id: "s2", title: "Hardware set-up", length: "0:22", src: "videos/s2_setup.mp4", poster: "assets/posters/s2.jpg",
      caption: "Indy7 running the production real-time controller PLEM at 1 kHz, a 4.5 kg case hanging from the flange, and the three 0.30 m lines along x, y and z." },
    { id: "s3", title: "y line with payload", length: "0:34", src: "videos/s3_yline.mp4", poster: "assets/posters/s3.jpg",
      caption: "Production ADRC, the selected setting and the adopted ρ = 87 on the y line with the payload; the measured deviation is drawn on the frames magnified 100 times." },
    { id: "s4", title: "z line: margin located", length: "0:44", src: "videos/s4_zline.mp4", poster: "assets/posters/s4.jpg",
      caption: "The z line: ρ = 104 carries a sustained 30 Hz wrist oscillation below the torque clamp, the located per-order setting runs cleanly; live joint-5 torque strips." },
    { id: "s5", title: "Simulation", length: "0:33", src: "videos/s5_simulation.mp4", poster: "assets/posters/s5.jpg",
      caption: "The search on the randomized plant and the validation on unseen configurations (Fig. 3) and the margin against the disturbance residual along the rule (Fig. 2)." },
    { id: "s6", title: "Summary", length: "0:13", src: "videos/s6_summary.mp4", poster: "assets/posters/s6.jpg",
      caption: "What the search contributes: the choice of the trade-off between accuracy and torque margin on an uncertain plant." }
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
