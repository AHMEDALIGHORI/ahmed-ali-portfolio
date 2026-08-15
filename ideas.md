# Ahmed Ali Ghori — Portfolio Design Directions

## Approach 1

**Theme Name:** Signal / Field

**Very Brief Intro:** A mineral, editorial portfolio that pairs a quiet paper background with saturated signal-orange interruptions. It feels like a personal field journal for an interactive developer—precise, human, and visually confident.

**Probability:** 0.06

## Approach 2

**Theme Name:** Luminous Workshop

**Very Brief Intro:** A low-light creative studio environment defined by glassy interactive panels and intensely lit 3D objects. The atmosphere is technical and cinematic, suited to a WebGL-first showcase.

**Probability:** 0.03

## Approach 3

**Theme Name:** Chromatic Index

**Very Brief Intro:** A playful archive of experiments in cobalt, lime, and off-white, with index-like navigation and experimental typographic scales. It frames each project like a collectible artifact.

**Probability:** 0.08

---

# Chosen Approach — Signal / Field

## Design Movement

Contemporary **Swiss editorial design** blended with the tactile precision of an independent creative studio’s process book. The presentation favors unexpected proportions, controlled whitespace, and deliberate visual hierarchy rather than conventional portfolio tiles.

## Core Principles

1. **Asymmetric clarity:** Align key content to an off-center vertical field line; the layout remains legible but never generic.
2. **Material contrast:** Pair warm paper, charcoal ink, and a high-energy signal color with sharp hairline rules and soft photographic crops.
3. **Work before decoration:** Text, projects, and interaction cues carry the experience; graphic forms add rhythm but never compete with the work.
4. **Human technicality:** The developer’s portrait grounds the precise visual system, while dynamic index marks reference WebGL and generative experimentation.

## Color Philosophy

The core is a warm archival **bone paper** that feels tactile and human rather than sterile. Almost-black ink carries information density and contrast. **Signal vermilion (#FF4D2E)** is reserved for selection, presence, and action—a memorable, ownable burst that references the energy of rendered pixels and a designer’s edit marker. A pale mineral blue-gray provides quiet depth in photographic and project surfaces.

## Layout Paradigm

The site reads as a **vertical project ledger**, not a centered landing page. A slim left metadata rail anchors the desktop layout, while the body flows through oversized, low-density editorial fields. Project cards are staggered across an implicit 12-column editorial grid, with one oversized feature and two compressed evidence tiles. On mobile, the rail collapses into a compact top identity strip and the document becomes a deliberately paced single column.

## Signature Elements

1. A vertical **field line** that appears in the hero, project index, and contact area.
2. Angular, wireframe-like **signal shapes** and small square coordinate markers that reference 3D work without turning the page into a tech demo.
3. A custom rotating **A/G monogram**, rendered as a high-contrast symbol in the navigation and footer.

## Interaction Philosophy

Interactions feel like navigating a physical design archive. Underlines slide with deliberate direction, project rows lift by a few pixels and reveal a more vivid field color, and navigation links ease toward their destination. Feedback should be immediate, restrained, and valuable—never ornamental.

## Animation

Hero content enters in a short editorial sequence: field line first, then type, then the portrait plate. Project visual layers use transform-only hover movement and a 180–240ms `cubic-bezier(0.23, 1, 0.32, 1)` transition. The monogram turns no more than one quarter rotation on hover. All nonessential movement is disabled for `prefers-reduced-motion`.

## Typography System

**DM Serif Display** is used only for the expressive, oversized introduction and selected project titles. **Space Grotesk** is the working typeface for labels, navigation, metadata, and readable body text. Large display sizes are tightly tracked and left aligned; metadata is compact, uppercase, and materially spaced.

## Brand Essence

**Ahmed Ali Ghori is an immersive frontend developer who turns technically ambitious ideas into responsive, story-led digital interfaces.**

Personality adjectives: **precise, inquisitive, cinematic**.

## Brand Voice

Direct, intelligent, and invitational. Headlines make a visual claim; CTAs propose a focused next move. Avoid generic welcoming language and generic success claims.

Example headline: “Interfaces with a point of view.”

Example CTA: “Bring the next idea into focus.”

## Wordmark & Logo

The mark is an interlocked **A/G** glyph: two angular, offset planes form an A-like aperture and a subtly cropped G orbit. It is intentionally symbol-first, so it can rotate, stamp a project thumbnail, and work as a favicon without relying on generated lettering.

## Signature Brand Color

**Signal Vermilion — #FF4D2E**

## Skiper-Informed Motion Revision

The portfolio will adopt Skiper UI’s component-level interaction energy without importing its visual language wholesale. The implementation will use three Signal / Field-specific patterns: **magnetic field actions** for primary project and contact links, **perspective evidence plates** that tilt gently toward the pointer, and an **active case-study rail** that marks the reader’s place through long-form project narratives. These effects are deliberately local, use transform and opacity rather than layout animation, and are disabled under `prefers-reduced-motion`.
