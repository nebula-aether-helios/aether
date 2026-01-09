# Octo8 Workstation - Agent Handover & Deployment Guide

## 1. Project Overview
This repository contains the finalized **Octo8 3D Workstation Scaffold**, a high-fidelity React/Three.js environment designed for "nano banana pro crispy" visual fidelity.

### Key Systems:
- **Cinematic Initialization:** 5-second synchronized boot sequence (Camera, Terminal, Electrical Borders, Sparks).
- **3D Interactive Stage:** 5 glass panels in a Z-axis stack with rotatable Z-axis controls.
- **Ether File System:** Pyramidic structures on the grid floor with ethereal connectivity lines.
- **Unified Timing:** All electrical pulses (borders, sparks, photons) are synchronized via a central `PULSE_FREQ` logic.
- **Terminal & Sidebar:** Functional UI shells using GitHub Octicons.

## 2. Tech Stack
- **Vite + React**
- **Three.js + React Three Fiber + Drei**
- **Postprocessing** (Bloom, Chromatic Aberration)
- **Framer Motion** (Sidebar animations)

## 3. Deployment Instructions
For the next agent or user:

### Local Development
1.  **Clone the Repo:**
    ```bash
    git clone https://github.com/nebula-aether-helios/aether.git
    cd aether
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run Dev Server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5174`.

### Production Build
1.  **Build:**
    ```bash
    npm run build
    ```
2.  **Preview:**
    ```bash
    npm run preview
    ```

## 4. SSR (Server-Side Rendering) Note
The original implementation plan mentioned **Octo8 SSR**. Currently, the project is a high-fidelity **Vite (SPA)** application. If the next phase requires transition to SSR (e.g., Next.js or Vite SSR), the components in `src/components` are modular and ready for migration.

## 5. Visual Standards (Critical)
- **Colors:** Agent Red (#ff0033), Cyan (#00ffcc), True Black (#000000).
- **Crispiness:** Do not increase edge thickness without testing Bloom thresholds.
- **Sync:** All new animations must use the `PULSE_FREQ` constant in `src/components/Stage3D.jsx` to maintain visual harmony.

---
**Final Status:** Cycle 96 Complete. Verified by Antigravity Agent.
