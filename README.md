# bo-fo.github.io

Project page of **BO-FO** — *Bayesian Optimization of a Fourth-Order Extended State Observer With Pole Relocation for Robot Manipulators*
(Hwarang Kim, Sesun You; manuscript under review, IEEE Transactions on Industrial Electronics, 2026).

Live page: https://bo-fo.github.io

Static site, no build step (GitHub Pages serves the `main` branch root):

- `index.html`, `styles.css`, `site.js` — the page; `site.js` only drives the featured-video picker and the looping clips.
- `assets/` — figures (PNG renders of the manuscript's Fig. 1–4: `fig1_pipeline`, `ident` (Fig. 2), `search` (Fig. 3), `snapshots_all` (Fig. 4)) and poster frames (`assets/posters/`).
- `videos/` — the narrated supplementary video (`supp_video.mp4`, 3:56), its six slide segments with narration (`s1_overview` … `s6_summary`), and `videos/loops/` — one looping clip per hardware setting of Table II plus the rejected ρ = 104 (the ρ = 87 clip was removed on 2026-11-08) (whole recorded arm, y, z and end-on x lines, one cycle, measured deviation drawn ×100; rendered by `video/make_page_loops.py` of the paper repository); `videos/motions_grid.mp4` — the eleven validation motions in Isaac Sim, production ADRC vs the adopted setting (`scripts/record_motions.py` + `video/make_motion_grid.py`).

2026-11-06: page synced with the manuscript revision of 2026-11-06 (two-mass wrist-damping bound, the adopted setting (108, 90, 91, 81), the wider-box settings and the robot session of that date).

2026-11-08: page synced with the manuscript revision of 2026-11-08: the comparators are the production ADRC, the nominal ρ = 59 and the binomial observer; ρ = 87 remains only as the step of the sweep that set the damping bound (no table row, no loop clip); new supplementary video (3:56).
