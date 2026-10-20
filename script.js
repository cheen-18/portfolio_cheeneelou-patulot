/**
 * ==========================================================================
 * ANTI-GRAVITY ELF PORTFOLIO - SCRIPT ENGINE
 * Features:
 * - Anti-Gravity HTML5 Canvas Physics (Shuttlecocks, Tennis Balls, Aura Rings)
 * - Interactive Zero-G Mana Pulse
 * - Web Audio API Elven Chime Synthesizer
 * - Interactive 3D Card Levitation / Tilt
 * - Detailed Project Blueprint Modal
 * - Copy-to-Clipboard Toasts
 * - Active Scrollspy & Mobile Navigation
 * ==========================================================================
 */

// --- PROJECT SPECIFICATION DATA FOR MODAL ---
const PROJECT_DETAILS = {
  powersupply: {
    title: "Power Supply",
    category: "Hardware & Power Regulation",
    badge: "⚡ Circuit Engineering",
    description: "Designed and implemented a reliable power supply circuit engineered to provide stable, regulated DC voltage under varying loads with high noise immunity and thermal reliability.",
    specs: [
      "AC to DC transformation with full-wave rectification and high-capacity electrolytic filter capacitors.",
      "Linear & switched regulation stages maintaining strict voltage tolerance (< ±1.5%).",
      "Integrated over-current protection, thermal heatsink dissipation, and reverse-polarity safeguards.",
      "Extensively bench-tested using digital multimeters and oscilloscopes for ripple voltage minimization."
    ],
    tech: ["Circuit Design", "Voltage Regulation", "Bench Testing", "Filter Design", "Thermal Management"]
  },
  antenna: {
    title: "ANTENNA",
    category: "RF & Telecommunications",
    badge: "📡 Signal Engineering",
    description: "Developed and tested antenna configurations for optimized signal reception, focusing on geometry, impedance matching, and radiation efficiency across target frequencies.",
    specs: [
      "Analyzed radiation patterns and standing wave ratios (SWR) across configurable antenna geometries.",
      "Designed matching network networks to optimize RF energy transfer and minimize signal loss.",
      "Field-tested directional vs omnidirectional signal reception for maximum signal-to-noise ratio (SNR).",
      "Calibrated physical ground planes and element lengths according to wavelength formulas."
    ],
    tech: ["RF Engineering", "Signal Optimization", "Impedance Matching", "SWR Testing", "Telecommunication"]
  },
  spo2: {
    title: "SPO2",
    category: "Biomedical Instrumentation",
    badge: "💓 Health Technology",
    description: "Engineered an SPO2 monitoring device for accurate oxygen saturation readings, bridging non-invasive optical sensors with microcontroller signal processing.",
    specs: [
      "Interfaced dual-wavelength (Red ~660nm & Infrared ~940nm) photoplethysmography (PPG) optical sensors.",
      "Implemented DC-offset cancellation and bandpass filtering to isolate arterial pulsation from ambient noise.",
      "Programmed calibration algorithms to compute real-time SpO2 percentages and heart rate BPM.",
      "Integrated low-latency serial and display output for immediate physiological feedback."
    ],
    tech: ["Biomedical Sensors", "PPG Signal Processing", "Microcontroller Interfacing", "Embedded Algorithms", "C/C++"]
  },
  spirometer: {
    title: "3 BALL SPIROMETER",
    category: "Medical Diagnostics & Interface",
    badge: "🫁 Pulmonary Instrumentation",
    description: "Created a digital/hardware interface for a 3-ball spirometer respiratory tool, converting physical air chamber ball levitation into real-time quantitative diagnostic data.",
    specs: [
      "Equipped physical spirometer chambers with optical sensor arrays to detect chamber ball elevation thresholds.",
      "Calibrated volumetric flow rate thresholds (600cc/sec, 900cc/sec, 1200cc/sec) into precise digital triggers.",
      "Microcontroller telemetry calculates sustained inspiratory effort, volume metrics, and patient progress.",
      "Designed user-centric hardware readouts enabling patients and clinicians to verify exercise completion."
    ],
    tech: ["Optical Detection", "Hardware Interfacing", "Microcontroller Telemetry", "Respiratory Diagnostics", "Digital Calibration"]
  },
  shipsmart: {
    title: "SHIPSMART WEB-APP",
    category: "Full-Stack Logistics & Web",
    badge: "🚢 Modern Web Application",
    description: "Developed a seamless, user-friendly web application for smart shipping solutions, streamlining freight rate calculations, route coordination, and shipment status tracking.",
    specs: [
      "Built responsive, accessible UI components with modern styling and real-time form validation.",
      "Integrated automated weight-to-dimension dimensional freight calculation logic.",
      "Implemented end-to-end tracking dashboard enabling users to monitor shipment milestones in real-time.",
      "Optimized client-side performance, clean data architectures, and cross-browser responsiveness."
    ],
    tech: ["Web Application", "JavaScript/TypeScript", "UI/UX Architecture", "Smart Logistics", "REST APIs"]
  },
  sevensegment: {
    title: "SEVEN SEGMENT",
    category: "Digital Logic & Embedded Displays",
    badge: "🔢 Embedded Hardware",
    description: "Programmed and wired seven-segment display modules for hardware readouts, mastering binary-coded decimal decoding, multiplexing, and clean hardware wire harness integration.",
    specs: [
      "Wired common-anode and common-cathode multi-digit 7-segment LED display configurations.",
      "Programmed high-frequency time-division multiplexing to minimize GPIO pin usage without visible flicker.",
      "Implemented hardware BCD-to-7-segment decoders and shift register integration.",
      "Designed clean, color-coded breadboard harness ensuring signal integrity and electrical grounding."
    ],
    tech: ["Digital Logic", "Multiplexed Displays", "Embedded C", "Hardware Interfacing", "Shift Registers"]
  }
};

// ==========================================================================
// 1. WEB AUDIO API - ETHEREAL ELVEN CHIME SYNTHESIZER
// ==========================================================================
class ElvenSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  toggle() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  // Plays a crystal elven chime chord (harmonic pentatonic)
  playChime(freqMultiplier = 1) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      // Frequencies in an ethereal celestial scale (E, G#, B, D#)
      const baseFreqs = [659.25, 830.61, 987.77, 1244.51];
      
      baseFreqs.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * freqMultiplier, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.04 / (idx + 1), now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 1.3);
      });
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }

  // Plays a zero-gravity mana burst sound
  playManaBurst() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.8);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.9);
      
      setTimeout(() => this.playChime(1.5), 250);
    } catch (e) {
      console.warn("Audio mana burst error:", e);
    }
  }
}

const soundEngine = new ElvenSoundEngine();

// ==========================================================================
// 2. ANTI-GRAVITY HTML5 CANVAS PHYSICS ENGINE
// Features: Levitating Shuttlecocks, Glowing Green Tennis Balls, Magic Aura Rings
// ==========================================================================
class AntiGravityPhysics {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    this.mouse = { x: -1000, y: -1000, radius: 180, isHovering: false };

    // Floating Entities
    this.tennisBalls = [];
    this.shuttlecocks = [];
    this.magicRings = [];
    this.manaParticles = [];

    this.initCanvas();
    this.createEntities();
    this.bindEvents();
    this.animate();
  }

  initCanvas() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createEntities() {
    // 1. Subtle, slow-moving magical aura rings (Frieren's concentric glyph circles)
    this.magicRings = [
      { x: this.width * 0.18, y: this.height * 0.28, baseRadius: 180, angle: 0, speed: 0.0015, color: 'rgba(196, 181, 253, 0.15)' },
      { x: this.width * 0.82, y: this.height * 0.65, baseRadius: 220, angle: 0, speed: -0.0012, color: 'rgba(251, 191, 36, 0.12)' },
      { x: this.width * 0.5, y: this.height * 0.85, baseRadius: 160, angle: 0, speed: 0.002, color: 'rgba(139, 92, 246, 0.14)' }
    ];

    // 2. Glowing green tennis balls suspended in mid-air
    const tennisCount = Math.max(5, Math.floor(this.width / 240));
    this.tennisBalls = [];
    for (let i = 0; i < tennisCount; i++) {
      this.tennisBalls.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 14 + Math.random() * 8, // ~14-22px
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.2 - Math.random() * 0.4, // gentle upward zero-g drift
        angle: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        baseGlow: 0.7 + Math.random() * 0.3,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // 3. Levitating weightless badminton shuttlecocks
    const shuttleCount = Math.max(4, Math.floor(this.width / 300));
    this.shuttlecocks = [];
    for (let i = 0; i < shuttleCount; i++) {
      this.shuttlecocks.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        scale: 0.65 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.15 - Math.random() * 0.35,
        angle: (Math.random() - 0.5) * 0.8,
        vRot: (Math.random() - 0.5) * 0.008,
        bobPhase: Math.random() * Math.PI * 2
      });
    }

    // 4. Stardust mana motes
    const moteCount = Math.max(25, Math.floor(this.width / 45));
    this.manaParticles = [];
    for (let i = 0; i < moteCount; i++) {
      this.manaParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 1 + Math.random() * 2.5,
        vy: -0.2 - Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.2,
        alpha: 0.2 + Math.random() * 0.6,
        color: Math.random() > 0.4 ? '#c4b5fd' : '#fef08a'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.initCanvas();
      this.createEntities();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isHovering = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHovering = false;
    });
  }

  // Triggered by the Zero-G pulse button
  triggerManaBurst() {
    // Propel all tennis balls and shuttlecocks upwards with magical velocity
    this.tennisBalls.forEach(ball => {
      ball.vy = -3.5 - Math.random() * 2.5;
      ball.vx += (Math.random() - 0.5) * 2;
    });
    this.shuttlecocks.forEach(sc => {
      sc.vy = -3.0 - Math.random() * 2;
      sc.vRot = (Math.random() - 0.5) * 0.05;
    });

    // Spawn sparkle explosion at screen center
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.manaParticles.push({
        x: this.width * 0.5,
        y: this.height * 0.5,
        size: 2 + Math.random() * 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: Math.random() > 0.5 ? '#bef264' : '#fbbf24',
        decay: 0.015
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = performance.now() * 0.001;

    // --- DRAW MAGICAL AURA RINGS (FRIEREN CONCENTRIC GLYPHS) ---
    this.magicRings.forEach(ring => {
      ring.angle += ring.speed;
      this.drawMagicAuraRing(ring, time);
    });

    // --- DRAW MANA PARTICLES ---
    for (let i = this.manaParticles.length - 1; i >= 0; i--) {
      const p = this.manaParticles[i];
      p.y += p.vy;
      p.x += p.vx;

      if (p.decay) {
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          this.manaParticles.splice(i, 1);
          continue;
        }
      } else if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // --- UPDATE & DRAW GLOWING GREEN TENNIS BALLS ---
    this.tennisBalls.forEach(ball => {
      // Zero-G Physics: Gentle drift
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.angle += ball.vRot;

      // Wrap around bounds softly
      if (ball.y < -ball.radius * 2) {
        ball.y = this.height + ball.radius * 2;
        ball.x = Math.random() * this.width;
      }
      if (ball.x < -ball.radius * 2) ball.x = this.width + ball.radius * 2;
      if (ball.x > this.width + ball.radius * 2) ball.x = -ball.radius * 2;

      // Mouse Anti-Gravity Interaction: Gentle buoyancy repulsion
      if (this.mouse.isHovering) {
        const dx = ball.x - this.mouse.x;
        const dy = ball.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.mouse.radius && dist > 0) {
          const force = (1 - dist / this.mouse.radius) * 1.8;
          ball.vx += (dx / dist) * force;
          ball.vy += (dy / dist) * force;
        }
      }

      // Air resistance damping
      ball.vx *= 0.985;
      if (ball.vy < -0.6) ball.vy *= 0.985;
      else if (ball.vy > 0.4) ball.vy *= 0.985;

      this.drawGlowingTennisBall(ball, time);
    });

    // --- UPDATE & DRAW LEVITATING SHUTTLECOCKS ---
    this.shuttlecocks.forEach(sc => {
      sc.bobPhase += 0.02;
      const bobVy = Math.sin(sc.bobPhase) * 0.25;

      sc.x += sc.vx;
      sc.y += sc.vy + bobVy;
      sc.angle += sc.vRot;

      // Screen wrapping
      if (sc.y < -60) {
        sc.y = this.height + 60;
        sc.x = Math.random() * this.width;
      }
      if (sc.x < -60) sc.x = this.width + 60;
      if (sc.x > this.width + 60) sc.x = -60;

      // Mouse repulsion
      if (this.mouse.isHovering) {
        const dx = sc.x - this.mouse.x;
        const dy = sc.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.mouse.radius && dist > 0) {
          const force = (1 - dist / this.mouse.radius) * 1.5;
          sc.vx += (dx / dist) * force;
          sc.vy += (dy / dist) * force;
          sc.vRot += (Math.random() - 0.5) * 0.01;
        }
      }

      sc.vx *= 0.985;
      sc.vRot *= 0.99;

      this.drawLevitatingShuttlecock(sc);
    });
  }

  // Draw concentric elven magic circle
  drawMagicAuraRing(ring, time) {
    this.ctx.save();
    this.ctx.translate(ring.x, ring.y);
    this.ctx.rotate(ring.angle);

    this.ctx.strokeStyle = ring.color;
    this.ctx.lineWidth = 1.2;

    // Outer circle with dashed runes
    this.ctx.beginPath();
    this.ctx.arc(0, 0, ring.baseRadius, 0, Math.PI * 2);
    this.ctx.setLineDash([8, 12]);
    this.ctx.stroke();

    // Inner concentric ring
    this.ctx.beginPath();
    this.ctx.arc(0, 0, ring.baseRadius * 0.75, 0, Math.PI * 2);
    this.ctx.setLineDash([4, 6]);
    this.ctx.stroke();

    // Geometric cross / star lines
    this.ctx.setLineDash([]);
    this.ctx.beginPath();
    const r = ring.baseRadius * 0.75;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      this.ctx.moveTo(Math.cos(a) * (r - 10), Math.sin(a) * (r - 10));
      this.ctx.lineTo(Math.cos(a) * (r + 10), Math.sin(a) * (r + 10));
    }
    this.ctx.stroke();

    this.ctx.restore();
  }

  // Draw glowing neon green tennis ball with curved seam lines
  drawGlowingTennisBall(ball, time) {
    this.ctx.save();
    this.ctx.translate(ball.x, ball.y);
    this.ctx.rotate(ball.angle);

    const r = ball.radius;

    // Glowing Radial Halo
    const pulse = 1 + Math.sin(time * 2 + ball.pulseOffset) * 0.15;
    const glowGrad = this.ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r * 2.5 * pulse);
    glowGrad.addColorStop(0, 'rgba(163, 230, 53, 0.45)');
    glowGrad.addColorStop(0.5, 'rgba(132, 204, 22, 0.18)');
    glowGrad.addColorStop(1, 'rgba(77, 124, 15, 0)');

    this.ctx.fillStyle = glowGrad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, r * 2.5 * pulse, 0, Math.PI * 2);
    this.ctx.fill();

    // Ball Sphere Gradient
    const ballGrad = this.ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
    ballGrad.addColorStop(0, '#f7fee7');
    ballGrad.addColorStop(0.35, '#bef264');
    ballGrad.addColorStop(0.85, '#84cc16');
    ballGrad.addColorStop(1, '#4d7c0f');

    this.ctx.fillStyle = ballGrad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, r, 0, Math.PI * 2);
    this.ctx.fill();

    // White Curved Tennis Seam Lines
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.lineWidth = Math.max(1.8, r * 0.12);
    this.ctx.lineCap = 'round';

    // Left curved seam
    this.ctx.beginPath();
    this.ctx.arc(-r * 0.7, 0, r * 0.65, -Math.PI * 0.4, Math.PI * 0.4);
    this.ctx.stroke();

    // Right curved seam
    this.ctx.beginPath();
    this.ctx.arc(r * 0.7, 0, r * 0.65, Math.PI * 0.6, Math.PI * 1.4);
    this.ctx.stroke();

    this.ctx.restore();
  }

  // Draw levitating badminton shuttlecock
  drawLevitatingShuttlecock(sc) {
    this.ctx.save();
    this.ctx.translate(sc.x, sc.y);
    this.ctx.rotate(sc.angle);
    this.ctx.scale(sc.scale, sc.scale);

    // Soft Lavender Aura Glow around shuttlecock
    const glowGrad = this.ctx.createRadialGradient(0, 0, 10, 0, 0, 45);
    glowGrad.addColorStop(0, 'rgba(196, 181, 253, 0.4)');
    glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
    this.ctx.fillStyle = glowGrad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 45, 0, Math.PI * 2);
    this.ctx.fill();

    // Feathers Skirt (Translucent elven white)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    this.ctx.strokeStyle = '#c4b5fd';
    this.ctx.lineWidth = 1.2;

    this.ctx.beginPath();
    this.ctx.moveTo(-16, 14);
    this.ctx.lineTo(-26, -26);
    this.ctx.lineTo(26, -26);
    this.ctx.lineTo(16, 14);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Feather rib lines
    this.ctx.strokeStyle = 'rgba(167, 139, 250, 0.7)';
    this.ctx.beginPath();
    this.ctx.moveTo(-18, -26); this.ctx.lineTo(-10, 12);
    this.ctx.moveTo(-8, -26); this.ctx.lineTo(-3, 14);
    this.ctx.moveTo(0, -26); this.ctx.lineTo(0, 14);
    this.ctx.moveTo(8, -26); this.ctx.lineTo(3, 14);
    this.ctx.moveTo(18, -26); this.ctx.lineTo(10, 12);
    this.ctx.stroke();

    // Gold Rib Ties
    this.ctx.strokeStyle = '#fbbf24';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.ellipse(0, -12, 19, 4, 0, 0, Math.PI * 2);
    this.ctx.stroke();

    // Cork Base (Warm ivory with gold band)
    this.ctx.fillStyle = '#fffbeb';
    this.ctx.strokeStyle = '#fef08a';
    this.ctx.lineWidth = 1.2;

    this.ctx.beginPath();
    this.ctx.arc(0, 16, 13, 0, Math.PI, false);
    this.ctx.fill();
    this.ctx.stroke();

    // Gold collar band
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.fillRect(-13, 12, 26, 4);

    this.ctx.restore();
  }
}

// ==========================================================================
// 3. 3D CARD LEVITATION & TILT EFFECT
// ==========================================================================
function initCardTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt angles (max ~6 degrees)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

// ==========================================================================
// 4. PROJECT MODAL INSPECTION
// ==========================================================================
function openProjectModal(projectId) {
  const data = PROJECT_DETAILS[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const container = document.getElementById('modalDynamicContent');

  soundEngine.playChime(1.2);

  const tagsHtml = data.tech.map(t => `<span class="ptag">${t}</span>`).join('');
  const specsHtml = data.specs.map(s => `<li>${s}</li>`).join('');

  container.innerHTML = `
    <div class="modal-category">${data.category} ✦ ${data.badge}</div>
    <h3 class="modal-title">${data.title}</h3>
    <p class="modal-desc">${data.description}</p>
    
    <h4 class="modal-section-h4"><span>⚡</span> Technical Architecture & Implementation</h4>
    <ul class="modal-specs-list">
      ${specsHtml}
    </ul>

    <h4 class="modal-section-h4"><span>🏸</span> Engineering Skillset & Tags</h4>
    <div class="project-tags" style="margin-bottom: 24px;">
      ${tagsHtml}
    </div>

    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button class="pill-btn pill-btn-primary" onclick="closeProjectModal()">
        <span>✦ Close Blueprint</span>
      </button>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// ==========================================================================
// 5. TOAST NOTIFICATION SYSTEM & CLIPBOARD COPY
// ==========================================================================
function showToast(message, icon = '✦') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  soundEngine.playChime(1.5);

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color: var(--gold-300);">${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function initClipboardCopy() {
  // Direct Copy Buttons (Hero & Contact)
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`, '📋');
      }).catch(() => {
        showToast(`Copied to clipboard!`, '📋');
      });
    });
  });

  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'patulotcheneelou@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied email "${email}" to clipboard!`, '✉️');
      });
    });
  });
}

// ==========================================================================
// 6. CONTACT SPELL FORM INTERACTION
// ==========================================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const status = document.getElementById('formStatus');

  soundEngine.playManaBurst();

  status.className = 'form-status-msg success';
  status.textContent = `✨ Spell incantation received from ${name}! Preparing carrier message...`;

  showToast(`Spell message delivered to Cheeneelou!`, '✨');

  // Trigger zero-g pulse celebratory effect
  if (window.physicsEngine) {
    window.physicsEngine.triggerManaBurst();
  }

  // Create mailto fallback after magical animation
  setTimeout(() => {
    const subject = encodeURIComponent(`Inquiry from ${name} via Anti-Gravity Elf Portfolio`);
    const body = encodeURIComponent(document.getElementById('senderMessage').value + `\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:patulotcheneelou@gmail.com?subject=${subject}&body=${body}`;
    e.target.reset();
  }, 1200);
}

// ==========================================================================
// 7. ACTIVE NAVIGATION SCROLLSPY & MOBILE MENU
// ==========================================================================
function initNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');

  // Scrollspy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('mobile-open');
      mobileBtn.classList.toggle('open', isOpen);
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
        mobileBtn.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        soundEngine.playChime(1.1);
      });
    });
  }

  // Sound Toggle Button
  const soundBtn = document.getElementById('soundToggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const enabled = soundEngine.toggle();
      soundBtn.querySelector('.btn-icon').textContent = enabled ? '🔊' : '🔔';
      showToast(enabled ? 'Elven Chimes Activated 🔔' : 'Sound Muted 🔕', '✨');
      if (enabled) soundEngine.playChime(1);
    });
  }

  // Zero-G Mana Pulse Button
  const pulseBtn = document.getElementById('gravityPulseBtn');
  if (pulseBtn) {
    pulseBtn.addEventListener('click', () => {
      soundEngine.playManaBurst();
      if (window.physicsEngine) {
        window.physicsEngine.triggerManaBurst();
      }
      showToast('Anti-Gravity Mana Surge Unleashed! 🎾✨', '✨');
    });
  }
}

// ==========================================================================
// 8. FLOATING LOWER-RIGHT ANIME CHARACTER INTERACTIVITY
// ==========================================================================
function initFloatingMageCompanion() {
  const animeChar = document.getElementById('floatingAnimeCharacter');

  if (animeChar) {
    const triggerSpell = () => {
      soundEngine.playManaBurst();
      if (window.physicsEngine) {
        window.physicsEngine.triggerManaBurst();
      }
      showToast('Anti-Gravity Anime Mage: "Zero-G rally underway!" 🏸🎾✨', '✨');
    };

    animeChar.addEventListener('click', triggerSpell);
    animeChar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerSpell();
      }
    });
  }
}

// ==========================================================================
// DOM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Anti-Gravity Canvas
  window.physicsEngine = new AntiGravityPhysics('antiGravityCanvas');

  // Initialize Card Tilt
  initCardTilt();

  // Initialize Clipboard Copy
  initClipboardCopy();

  // Initialize Navigation & Controls
  initNavigation();

  // Initialize Floating Mage Companion & Character Card
  initFloatingMageCompanion();

  console.log("✦ Anti-Gravity Elf Portfolio Engine Initialized. Welcome, traveler.");
});
