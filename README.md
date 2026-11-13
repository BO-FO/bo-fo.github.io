# bo-fo.github.io

Project page of **BO-FO** — *Bayesian Optimization of a Fourth-Order Extended State Observer With Pole Relocation for Robot Manipulators*
(Hwarang Kim, Sesun You; manuscript under review, IEEE Transactions on Industrial Electronics, 2026).

Live page: https://bo-fo.github.io

Static site, no build step (GitHub Pages serves the `main` branch root):

- `index.html`, `styles.css`, `site.js` — the page; `site.js` only drives the featured-video picker and the looping clips.
- `assets/` — figures (PNG renders of the manuscript's Fig. 1–4: `fig1_pipeline`, `ident` (Fig. 2), `search` (Fig. 3), `snapshots_all` (Fig. 4)) and poster frames (`assets/posters/`).
- `videos/` — the narrated supplementary video (`supp_video.mp4`, 4:16), its seven slide segments with narration (`s1_overview` … `s6_summary`, `s5b_ablation` the wave-line ablation), and `videos/loops/` — one looping clip per hardware setting of Table II plus the rejected ρ = 104 (the ρ = 87 clip was removed on 2026-11-08) (whole recorded arm, y, z and end-on x lines, one cycle, measured deviation drawn ×100; rendered by `video/make_page_loops.py` of the paper repository); `videos/motions_grid.mp4` — the eleven validation motions in Isaac Sim, production ADRC vs a damping-bound optimum of an earlier revision (`scripts/record_motions.py` + `video/make_motion_grid.py`).

2026-11-06: page synced with the manuscript revision of 2026-11-06 (two-mass wrist-damping bound, the adopted setting (108, 90, 91, 81), the wider-box settings and the robot session of that date).

2026-11-08: page synced with the manuscript revision of 2026-11-08: the comparators are the production ADRC, the nominal ρ = 59 and the binomial observer; ρ = 87 remains only as the step of the sweep that set the damping bound (no table row, no loop clip); new supplementary video (3:56).

2026-11-10: page synced with the manuscript revision of 2026-11-10 (story v9): the common value is stepped from the nominal ρ = 59 to 104 and a two-mass wrist model fitted to these two runs sets the damping bound, which the search sweeps over 0.15, 0.10 and 0.05 with and without the payload; the optima of the three bounds, the production ADRC, ρ = 59 and the binomial observer ran on the robot on 2026-11-10 (84 runs, two per line and load); the adopted setting is ρ<sub>i</sub> = (82, 92, 90, 79). New supplementary video (3:23), figures, tables and loops; the simulation motions grid still shows a damping-bound optimum of an earlier revision, (108, 90, 91, 81).

2026-11-13: page synced with the manuscript revision of 2026-11-13: Section VI (ablation of the cost weighting on wave lines, Table III, Fig. 5), the adopted setting tagged as fixed on the straight lines, Fig. 1 to 3 redrawn with larger text, Fig. 3 without its validation panel, Fig. 4 reduced to the production ADRC, ρ = 59, the binomial observer, ρ = 104 and the adopted setting; `videos/loops_wave/` holds one looping clip per setting of Table III on the wave lines with the payload (rendered by `video/make_wave_loops.py`); new supplementary video with an ablation slide.

2026-11-13, later: the manuscript's framing changed. No setting is called adopted any more; the optima of the three damping bounds are reported as equivalent on the robot (within the repeat scatter), the message being that Bayesian optimization in simulation inside the damping range that the nominal and the oscillating robot run delimit beats the binomial observer and the nominal value. The optimum of the bound 0.05 is the setting carried into the wave-line ablation. Page, tables, figures and the supplementary video updated accordingly.
