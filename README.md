# FENZA SMP Website

Official landing page and community portal for FENZA SMP, a whitelist-only vanilla Minecraft survival multiplayer server supporting Java and Bedrock cross-play.

## Overview

FENZA SMP focuses on a pure, grief-free vanilla Minecraft survival experience without pay-to-win mechanics, claim borders, or bloated hubs. The website serves as the primary gateway for prospective members to review server philosophy, meet staff, and follow the whitelist application process.

## Key Features

- Pure Vanilla Focus: Information on server gameplay, anti-grief policies via CoreProtect, and player-driven world building.
- MoonCycle Integration: Overview and link to the custom MoonCycle plugin mechanics.
- Connected Application Flow: A clear three-step progress guide explaining how to join the Discord, submit an application in the applications channel, and receive the whitelist server address upon approval.
- Lightweight Matte UI: Dark-themed interface with GPU-optimized frosted matte blur surfaces, smooth CSS transitions, and clean typography.
- Live Discord Integration: Displays approximate online members and community presence using the Discord API.
- Fully Responsive: Optimized layout and navigation for mobile, tablet, and desktop viewports.

## Tech Stack

- Semantic HTML5
- Modern CSS3 (Custom properties, CSS Grid, Flexbox, backdrop-filter)
- Vanilla JavaScript (ES6+, passive event listeners, Canvas API)
- Fonts: Inter, Space Grotesk, and Minecraft Pixel font

## Local Development

No build step or external dependencies are required. You can serve the project using any local static file server.

### Using Python

```bash
python -m http.server 8000
```

### Using Node.js (npx serve)

```bash
npx serve .
```

Open `http://localhost:8000` in your web browser.

## How to Join the Server

1. Join the official Discord server.
2. Submit your Minecraft Java or Bedrock username in the applications channel.
3. Once accepted and whitelisted by staff, the server connection details will be provided directly on Discord.
