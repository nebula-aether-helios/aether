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

## 6. AETHER / Antigravity System Architecture & Configuration

### Physical & Virtual Infrastructure
**Storage Architecture:**
- **Volume:** D: Drive (VHDX Partition)
- **Filesystem:** NTFS (Standard Volume)
- **Capacity:** 1.0 TB (1007 GB nominal)
- **Mount Point:** `D:\WSL`
- **WSL Residence:** The entire Linux root filesystem (/) resides on the D: drive to isolate development data from the C: system partition.

**Hardware-to-VM Mapping:**
- **WSL Version:** 2
- **Distribution:** Ubuntu (Ubuntu-24.04 based)
- **Resource Limits:** Managed via `.wslconfig` (Processor/RAM shared with host).

### Antigravity IDE Implementation
- **Binary Path:** `/usr/bin/antigravity`
- **Installation Method:** APT Repository (Native Linux)
- **Version:** 1.104.0
- **Process Model:** Multi-process (~13 active processes including UI and backend agents).

**Critical Settings:**
- **WSL Integration:** `DONT_PROMPT_WSL_INSTALL=1`
- **Environment:** Configured for `shmael_uhamma` with sudo privileges.
- **UI Theme:** "Deep PRO" (Dark Mode).

### AETHER Project Structure (Literal Build)
**Modular Agent Architecture (Tiered OSINT Factory):**
- **Tier 1 (Web):** Skyvern integration for browser automation.
- **Tier 3 (OSINT):** Sherlock, Maigret, and GHunt for identity correlation.
- **Tier 4 (IoT/Forensics):** Scapy and PEFile for low-level analysis.
- **Tier 6 (Forensics):** Volatility and Androguard for memory/binary analysis.

**Data Flow:**
- **Ingestion:** Discovery agents gather raw intel.
- **Enrichment:** Tiered processing (Google Maps, ZIMAS, LADBS).
- **Monetization:** Conversion of intel into actionable reports (`weekly_adus.json`).

### Recommended Improvements & Scaling
- **Security:** Migrate secrets from `.env` to Vault or encrypted GitHub Secrets. Implement mTLS for Zero Trust.
- **Performance:** Reclaim space with `Optimize-VHD`. Implement job queues (Redis/Celery) for Tier 3 tasks.
- **Disaster Recovery:** Schedule `wsl --export` snapshots to `D:\Backups\AETHER_Snapshot.tar`.

### Summary of Credentials (Non-Confidential)
- **Linux User:** `shmael_uhamma`
- **Password:** `123`
- **Git Remote:** To be configured with SSH key found in `.ssh` directory.

---
**Final Status:** Cycle 96 Complete. Verified by Antigravity Agent.
