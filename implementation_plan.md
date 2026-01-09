# Octo8 SSR 3D Scaffold - Implementation Plan

## 1. Vision & Aesthetics
**Objective:** Create a high-fidelity, "all-black" Server-Side Rendering (SSR) UI scaffold featuring a functional dashboard and a central 3D visualization.
**Aesthetic Style:** "Octo8" - Ultra-premium, deep dark mode, crisp edges, glassmorphism, and neon/holographic accents.
- **Iconography:** **GitHub Octicons** (via `react-octicons` or SVG) for a developer-centric, technical look.
- **Background:** `#000000` (True Black) or very deep slate.
- **Accents:** Subtle glassmorphic glows (cyan/electric blue for active states).
- **Typography:** Monospace for terminals, sleek sans-serif (Inter/SF Pro) for UI.

## 2. Architecture & Tech Stack
*   **Framework:** React + Vite (Fast, minimal overhead).
*   **3D Engine:** `react-three-fiber` (Three.js wrapper for React) + `drei` (helpers).
*   **Styling:** Vanilla CSS (for maximum control over "Octo8" specifics).
*   **Development Tooling:** **Polypane** (User's preferred browser for responsive/state debugging). All layouts will be verified against Polypane's responsive standards.
*   **Deployment:** Vercel Configuration.

## 3. Layout Structure
The standard viewport will be divided into fixed regions:

### A. Sidebar (Left - "Antigravity IDE")
*   **Width:** Fixed (e.g., 300px-350px).
*   **Content:** Full chat interface simulation using **Octicons** for UI elements (send, attach, history).
*   **Style:** Borderless, deep blur background, indistinguishable from the actual IDE logic.

### B. Terminal Deck (Bottom 20%)
*   **Height:** Fixed 20% viewport height.
*   **Content:** Functional WSL-style command input simulations.
*   **Style:** Raw terminal aesthetic, scanlines, blinking cursor, monospaced font.

### C. The Stage (Center - Remaining Space)
*   **Content:** The 3D Rotational Z-Axis Skeleton.
*   **Function:** Holds the "5 Panels" visualization.

## 4. The 3D Visualization (The Core)
This is the "Wow" factor.
*   **The Artifact:** 5 floating UI panels arranged in 3D space.
*   **Interaction:** Rotatable on the Z-axis (and potentially X/Y for depth inspection).
*   **Visuals:**
    *   **Skeleton Mapping:** Wireframe or semi-transparent glass look.
    *   **Depth:** Panels spaced out along the Z-axis to show layer hierarchy.
    *   **Edges:** Crisp, glowing edges to highlight the "glassmorphic" curve.
    *   **Animation:** Smooth, damped rotational controls (OrbitControls).

## 5. Future Roadmap: Integrations
*Once the aesthetic shell is perfected, we will wire the panels to real backends:*
*   **Panel 1-5 Connectors:** Prepare hooks to accept data from external APIs.
*   **GitHub Student Dev Pack Integrations:**
    *   **Databases:** Connect to managed DBs (e.g., MongoDB Atlas, Heroku Postgres) often found in the pack.
    *   **Scripts:** Create slots to trigger utility scripts/CI-CD jobs (Travis CI, DigitalOcean droplets).
    *   **Verification:** Use Student Pack tools for monitoring (e.g., Datadog if applicable).
*   **Outbound Communication Testing:**
    *   **Mail.test Integration:** Dedicate a specific terminal view or panel for "Mail.test" to visualize and verify outbound email flows during development.
    *   **Twilio Integration:** Add controls for SMS and RVM (Ringless Voicemail) debugging and simulation.

## 6. Implementation Steps

### Phase 1: Foundation (The "Black Canvas")
1.  **Init:** Clean React+Vite project.
2.  **Deps:** Install `react-octicons`, `three`, `@react-three/fiber`.
3.  **Global CSS:** Reset to strict black, set typography.

### Phase 2: The "Antigravity" Shell
1.  **Sidebar:** Build the chat UI with Octicons.
2.  **Terminal:** Build the bottom console (simulated WSL).

### Phase 3: The 3D Engine
1.  **Scene:** Setup Canvas in center state.
2.  **Panels:** Create 5 `GlassPanel` meshes with glow shaders.
3.  **Controls:** Implement Z-axis rotation logic.

### Phase 4: Polish & Polypane Check
1.  **Effects:** Add Bloom and chromatic aberration.
2.  **Responsive Check:** Ensure the layout holds in Polypane (checking various viewports).
