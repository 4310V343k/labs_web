import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Updated faction descriptions - focused on the factions themselves
const factions = [
  {
    "name": "MIDA",
    "color": "#C8A0DC",
    "analysis": "A faction defined by its resistance to rigid authority and embrace of controlled chaos. MIDA thrives in uncertainty, questioning systems that present themselves as final. They value the freedom to test boundaries and refuse simple answers. To MIDA, disorder is not confusion—it is clarity. They are the architects of disruption, believers that transformation comes through challenging the established order.",
    "icon": {
      "url": "https://assets.thecdn.io/4c478eb6-d9fe-4068-ab30-21bba3fff315.svg",
      "filename": "4c478eb6-d9fe-4068-ab30-21bba3fff315.svg",
      "alt_filename": "4c478eb6-d9fe-4068-ab30-21bba3fff315.svg",
      "alt": "Mida Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  },
  {
    "name": "UESC",
    "color": "#1E69F5",
    "analysis": "The UESC represents the pillar of structure and order. A faction that believes systems exist for vital reasons and that stability is worth defending at any cost. They embrace accountability, measured action, and accountability in the face of chaos. Where others see opportunity for disruption, UESC sees responsibility. They are the guardians of civilization, the ones who step forward to hold the line when all else fractures.",
    "icon": {
      "url": "https://assets.thecdn.io/b1433f21-7e38-407e-b3f2-1c18cac122c6.svg",
      "filename": "b1433f21-7e38-407e-b3f2-1c18cac122c6.svg",
      "alt_filename": "b1433f21-7e38-407e-b3f2-1c18cac122c6.svg",
      "alt": "UESC Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  },
  {
    "name": "CyAc",
    "color": "#00FF00",
    "analysis": "CyAc is a systems-level faction that perceives patterns where others see only noise. They trust data above all else, believing information flows matter more than power dynamics. Their philosophy: order is not restrictive, it is revelatory. CyAc seeks to understand the mechanics of existence through pure information processing, optimizing every system for maximum efficiency and clarity.",
    "icon": {
      "url": "https://assets.thecdn.io/7fa8186f-84ca-47fb-9f8b-cff730dad3b4.svg",
      "filename": "7fa8186f-84ca-47fb-9f8b-cff730dad3b4.svg",
      "alt_filename": "7fa8186f-84ca-47fb-9f8b-cff730dad3b4.svg",
      "alt": "CyAc Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  },
  {
    "name": "NuCaloric",
    "color": "#FF0A60",
    "analysis": "NuCaloric is defined by pragmatism and an unwavering focus on long-term survival. This faction cares less for spectacle and ideology than for what keeps systems running when conditions worsen. They champion sustainability, shared benefit, and quiet reliability. While others chase ideals or political power, NuCaloric ensures civilization does not collapse. They are the steadfast engineers of continuity.",
    "icon": {
      "url": "https://assets.thecdn.io/48722c9c-8641-4241-a599-f3f7219887c7.svg",
      "filename": "48722c9c-8641-4241-a599-f3f7219887c7.svg",
      "alt_filename": "48722c9c-8641-4241-a599-f3f7219887c7.svg",
      "alt": "NuCal Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  },
  {
    "name": "SekGen",
    "color": "#95F6C2",
    "analysis": "SekGen embodies patience, precision, and profound respect for process. This faction believes meaningful improvement comes through refinement, not disruption. They value how things work as much as what they achieve. Every innovation is engineered carefully, every advancement deliberate. SekGen's philosophy: progress is not rushed—it is crafted with exactitude and tested relentlessly.",
    "icon": {
      "url": "https://assets.thecdn.io/1eb44893-1c23-4c04-85d1-64b8763cd217.svg",
      "filename": "1eb44893-1c23-4c04-85d1-64b8763cd217.svg",
      "alt_filename": "1eb44893-1c23-4c04-85d1-64b8763cd217.svg",
      "alt": "Seki Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  },
  {
    "name": "Traxus",
    "color": "#FF7500",
    "analysis": "Traxus is a faction of decisive action and acceptance of consequence. They prioritize outcomes over endless debate and willingly accept responsibility where others hesitate. Efficiency, leverage, and advancement drive Traxus forward. They do not seek control for its image or authority—they accept it because the weight of results must be carried by someone. Traxus leads through strength and conviction.",
    "icon": {
      "url": "https://assets.thecdn.io/abfb0e55-7769-4e6e-914b-bbfe514c1bdd.svg",
      "filename": "abfb0e55-7769-4e6e-914b-bbfe514c1bdd.svg",
      "alt_filename": "abfb0e55-7769-4e6e-914b-bbfe514c1bdd.svg",
      "alt": "Traxus Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  },
  {
    "name": "Arachne",
    "color": "#FF0000",
    "analysis": "Arachne stands apart, comfortable with finality and unusually calm about loss. This faction accepts that some outcomes cannot be avoided and finds meaning in cycles rather than resolutions. They are less concerned with mere survival than with significance and legacy. To Arachne, endings are not failures—they are transitions. This faction understands that all systems must eventually evolve beyond their current form.",
    "icon": {
      "url": "https://assets.thecdn.io/373f08e6-cf3a-4501-9920-24569fb20ef2.svg",
      "filename": "373f08e6-cf3a-4501-9920-24569fb20ef2.svg",
      "alt_filename": "373f08e6-cf3a-4501-9920-24569fb20ef2.svg",
      "alt": "Arachne Icon",
      "width": 32,
      "height": 32,
      "mimeType": "image/svg+xml"
    }
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await pool.query('DELETE FROM factions');
    console.log('Cleared existing factions...');

    // Insert factions
    for (const faction of factions) {
      await pool.query(
        'INSERT INTO factions (name, color, analysis, icon) VALUES ($1, $2, $3, $4)',
        [faction.name, faction.color, faction.analysis, JSON.stringify(faction.icon)]
      );
    }

    console.log(`Seeded ${factions.length} factions successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
