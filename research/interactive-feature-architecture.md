# Interactive Portfolio Feature Architecture

## Performance Principle

The expanded portfolio will be a **progressively enhanced archive**. Core content, repository links, contact paths, and case studies remain usable without JavaScript-driven motion. High-cost or pointer-specific effects activate only where the device supports them, and every feature receives a reduced-motion or mobile fallback.

| Requested Feature | Implementation Strategy | Mobile / Reduced-Motion Fallback |
| --- | --- | --- |
| Motion showreel | Short, muted looping visual clip inside a dialog with explicit play control. | Static poster with an “Open reel” link; no autoplay. |
| 3D keyboard configurator | CSS perspective keyboard model with selectable keycap themes and switch profiles. | Selectable static swatches and a summary label. |
| Case-study transition | Animated veil and shared project color treatment on internal route selection. | Instant route change. |
| Scroll progress rail | IntersectionObserver updates case-study rail markers. | Fixed static markers. |
| Process timeline | Accessible disclosure list with animated visual stage changes. | Expanded stacked stages with no transform. |
| Capability constellation | Canvas-free DOM constellation using transform-only pointer parallax. | Static skill ledger. |
| Experiments archive | Expandable semantic details cards with custom transition. | Native details behavior. |
| Availability planner | Modal inquiry planner with date/session intent choices and mailto hand-off. | Standard email inquiry link. |
| Cursor modes | Desktop fine-pointer cursor label driven by hover targets. | Hidden on touch or reduced motion. |
| Contact success moment | Contact dialog confirmation state with a short signal-path animation. | Immediate text confirmation. |

## Route and Content Structure

The existing homepage continues to be the public index. New feature sections use native HTML where possible, with client components reserved for interaction state. The portfolio will avoid a backend or artificial booking calendar. Availability selections create a transparent email draft, keeping the project frontend-only and avoiding false claims of live scheduling.

## Media Asset Constraint

The reel is an original visual atmosphere asset, not a fabricated client testimonial, user review, or project-performance claim. It will function as an opening identity study and be labeled as a motion reel. Its dialog remains user-triggered and muted by default.
