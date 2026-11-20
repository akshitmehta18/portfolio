// Main Application Logic - Akshit Mehta Telemyr Edition

document.addEventListener("DOMContentLoaded", () => {
  initHeroCanvas();
  initNavSquares();
  initWorksList();
  initProjectModal();
  initTerminal();
  initContactForm();
});

/* ==========================================================================
   1. Telemyr Kinetic Hero Canvas Animation
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = 45;
  const connectionDistance = 140;
  const mouse = { x: null, y: null, radius: 160 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.5;
      this.baseColor = Math.random() > 0.8 ? "#AFF005" : "#0D0D0D";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse evasion / interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3.5;
          this.y -= Math.sin(angle) * force * 3.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor;
      ctx.globalAlpha = 0.45;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.14;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "#000000";
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Telemyr Nav Squares (Interactive Bottom/Top Dock)
   ========================================================================== */
function initNavSquares() {
  const squares = document.querySelectorAll(".nav-square");
  const sections = document.querySelectorAll("section[id], footer[id]");

  squares.forEach((sq) => {
    sq.addEventListener("click", (e) => {
      const targetId = sq.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          squares.forEach((s) => s.classList.remove("active"));
          sq.classList.add("active");
        }
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          squares.forEach((sq) => {
            if (sq.getAttribute("href") === `#${id}`) {
              sq.classList.add("active");
            } else {
              sq.classList.remove("active");
            }
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ==========================================================================
   3. Works / Case Studies Rendering
   ========================================================================== */
function initWorksList() {
  const container = document.getElementById("works-container");
  if (!container || !window.PORTFOLIO_PROJECTS) return;

  container.innerHTML = window.PORTFOLIO_PROJECTS.map((project, index) => {
    const num = `0${index + 1}`.slice(-2);
    const techPreview = project.tech.slice(0, 3).join(" • ");

    return `
      <div class="work-item" onclick="openProjectModal('${project.id}')">
        <span class="work-num">${num}</span>
        <div>
          <h3 class="work-title">${project.title}</h3>
          <p class="work-desc">${project.shortDesc}</p>
        </div>
        <div class="work-item-meta">
          <span class="work-badge">${project.badge || project.categoryLabel}</span>
          <div>${techPreview}</div>
        </div>
        <div class="work-item-action">
          <span>Explore</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    `;
  }).join("");
}

/* ==========================================================================
   4. Telemyr Project Deep-Dive Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById("telemyr-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  if (!modal) return;

  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  window.openProjectModal = function (projectId) {
    const project = window.PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (!project) return;

    document.getElementById("modal-category").innerText = project.categoryLabel;
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-desc").innerText = project.fullDesc;
    document.getElementById("modal-arch").innerText = project.architecture;
    document.getElementById("modal-metrics").innerText = project.metrics || "Production Grade Code";

    // Features
    const featuresList = document.getElementById("modal-features");
    featuresList.innerHTML = project.features
      .map(
        (f) => `
      <li style="padding: 0.4rem 0; border-bottom: 1px dashed var(--color-rule-grey); font-size: 0.9rem; color: #333;">
        • ${f}
      </li>
    `
      )
      .join("");

    // Tech
    const techEl = document.getElementById("modal-tech");
    techEl.innerHTML = project.tech
      .map(
        (t) => `
      <span style="display: inline-block; padding: 0.35rem 0.8rem; background: var(--color-light-grey); border: var(--rule); border-radius: 4px; font-size: 0.8rem; font-family: var(--font-mono); margin: 0.2rem;">
        ${t}
      </span>
    `
      )
      .join("");

    // Links
    const linksEl = document.getElementById("modal-links");
    linksEl.innerHTML = "";
    if (project.github) {
      linksEl.innerHTML += `
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
           style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: var(--color-black); color: var(--color-white); text-decoration: none; font-size: 0.85rem; font-weight: 600;">
          View GitHub Repository →
        </a>
      `;
    }
    if (project.demo) {
      linksEl.innerHTML += `
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" 
           style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: var(--color-accent-lime); color: var(--color-black); text-decoration: none; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem;">
          Launch Live App ↗
        </a>
      `;
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };
}

/* ==========================================================================
   5. Conversational & Intelligent Developer Terminal
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById("terminal-input");
  const terminalBody = document.getElementById("terminal-output");
  const chips = document.querySelectorAll(".term-chip");
  if (!terminalInput || !terminalBody) return;

  const history = [];
  let historyIdx = -1;

  const runCommand = (rawInput) => {
    const input = rawInput.trim();
    if (!input) return;

    history.push(input);
    historyIdx = history.length;

    // Echo input
    const echo = document.createElement("div");
    echo.style.marginTop = "8px";
    echo.innerHTML = `<span style="color:#AFF005; font-weight:600;">akshit@telemyr:~$</span> <span style="color:#ffffff;">${escapeHtml(input)}</span>`;
    terminalBody.appendChild(echo);

    const norm = input.toLowerCase();
    let responseHtml = "";

    // 1. Natural greetings
    if (["hey", "hi", "hello", "hey there", "hola", "yo", "greeting", "greetings"].includes(norm)) {
      responseHtml = `
        <div style="color:#AFF005; font-weight:600;">Hey there! 👋 Welcome to my studio terminal.</div>
        <div style="color:#d1d5db; margin-top:3px;">
          I'm Akshit Mehta — Data Analyst transitioning into advanced Data Science & AI with full-stack engineering proficiency.
        </div>
        <div style="color:#9ca3af; margin-top:4px;">
          Try typing <strong style="color:#38bdf8">projects</strong>, <strong style="color:#38bdf8">skills</strong>, or <strong style="color:#AFF005">hire</strong>, or click the shortcut chips above!
        </div>
      `;
    }
    // 2. Help
    else if (norm === "help" || norm === "man" || norm === "commands") {
      responseHtml = `
        <div style="color: #AFF005; font-weight: bold; margin-bottom: 4px;">Available Commands:</div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 6px; color:#e5e7eb;">
          <div><span style="color:#38bdf8; font-weight:600;">about</span> : Biography & technical focus</div>
          <div><span style="color:#38bdf8; font-weight:600;">skills</span> : Core stack matrix & ratings</div>
          <div><span style="color:#38bdf8; font-weight:600;">projects</span> : View all 7 production repos</div>
          <div><span style="color:#38bdf8; font-weight:600;">stats</span> : Production metrics & benchmarks</div>
          <div><span style="color:#38bdf8; font-weight:600;">contact</span> : Email & direct handles</div>
          <div><span style="color:#AFF005; font-weight:600;">hire</span> : Direct recruitment sequence</div>
          <div><span style="color:#9ca3af; font-weight:600;">clear</span> : Clear console buffer</div>
        </div>
      `;
    }
    // 3. About
    else if (["about", "whoami", "bio", "who are you"].includes(norm)) {
      responseHtml = `
        <div style="color:#ffffff; font-weight:600; font-size:0.95rem;">Akshit Mehta</div>
        <div style="color:#38bdf8; font-weight:500;">Data Analyst & Full-Stack AI Engineer</div>
        <p style="color:#d1d5db; margin-top:4px; line-height:1.5;">
          Bridging empirical machine learning with scalable web applications. Strong track record in predictive logistics modeling, exploratory hypothesis testing, and production Next.js apps.
        </p>
      `;
    }
    // 4. Skills
    else if (["skills", "stack", "tech"].includes(norm)) {
      responseHtml = `
        <div style="color: #AFF005; font-weight: bold; margin-bottom: 4px;">Technical Proficiency:</div>
        <div style="color:#d1d5db; line-height:1.6;">
          • <strong style="color:#fff;">Python 3.x</strong> : Advanced [██████████] 95%<br>
          • <strong style="color:#fff;">Scikit-Learn & ML</strong> : Advanced [█████████░] 90%<br>
          • <strong style="color:#fff;">Pandas & NumPy</strong> : Advanced [██████████] 95%<br>
          • <strong style="color:#fff;">Next.js & React</strong> : Proficient [████████░░] 85%<br>
          • <strong style="color:#fff;">SQL (PostgreSQL)</strong> : Proficient [████████░░] 85%<br>
          • <strong style="color:#fff;">TypeScript & JS</strong> : Proficient [████████░░] 85%<br>
          • <strong style="color:#fff;">C++ (SFML/OOP)</strong> : Competent [███████░░░] 75%
        </div>
      `;
    }
    // 5. Projects
    else if (["projects", "works", "repos", "portfolio"].includes(norm)) {
      responseHtml = `
        <div style="color: #AFF005; font-weight: bold; margin-bottom: 4px;">Featured Repositories (7 Total):</div>
        <div style="color:#d1d5db; line-height:1.6;">
          1. <strong style="color:#fff;">Logistics ML Prediction</strong> — AUC-ROC 91.4% delay forecasting engine.<br>
          2. <strong style="color:#fff;">Logistics 10-Chart Visual Suite</strong> — Statistical hypothesis testing & visuals.<br>
          3. <strong style="color:#fff;">High-Throughput Logistics ETL</strong> — Robust data cleansing & imputation.<br>
          4. <strong style="color:#fff;">TalentSphere</strong> — AI job & skills assessment platform (Next.js Edge).<br>
          5. <strong style="color:#fff;">OpenCourse</strong> — AI-driven adaptive syllabus & learning generator.<br>
          6. <strong style="color:#fff;">Nix Spring Boot Assistant</strong> — Natural language interface for Java repos.<br>
          7. <strong style="color:#fff;">Stranded</strong> — 2D deterministic physics shooter game engine in C++.
        </div>
        <div style="margin-top:6px; color:#9ca3af; font-size:0.8rem;">
          💡 Click any case study in the Work section above for full architecture flowcharts!
        </div>
      `;
    }
    // 6. Stats
    else if (["stats", "metrics", "benchmarks"].includes(norm)) {
      responseHtml = `
        <div style="color:#AFF005; font-weight:600;">Production Impact Metrics:</div>
        <div style="color:#d1d5db; line-height:1.6;">
          • Shipped Projects: <strong style="color:#fff;">7+ production-ready codebases</strong><br>
          • Model Performance: <strong style="color:#AFF005;">91.4% AUC-ROC</strong> on Logistics Delay Classifier<br>
          • Tech Stack: <strong style="color:#38bdf8;">10+ core technologies</strong> spanning ML & full-stack web<br>
          • GitHub Code Quality: <strong style="color:#fff;">100% open source & reproducible</strong>
        </div>
      `;
    }
    // 7. Contact
    else if (["contact", "email", "reach", "socials", "phone", "linkedin"].includes(norm)) {
      responseHtml = `
        <div style="color:#AFF005; font-weight:600;">Get In Touch:</div>
        <div style="color:#d1d5db; line-height:1.7;">
          • Email: <a href="mailto:mehtaakshit65@gmail.com" style="color:#38bdf8; text-decoration:underline;">mehtaakshit65@gmail.com</a><br>
          • Phone: <a href="tel:+918219178089" style="color:#38bdf8; text-decoration:underline;">+91 82191 78089</a><br>
          • LinkedIn: <a href="https://www.linkedin.com/in/akshitmehta0004/" target="_blank" style="color:#38bdf8; text-decoration:underline;">linkedin.com/in/akshitmehta0004</a><br>
          • GitHub: <a href="https://github.com/Mehtaji2004" target="_blank" style="color:#38bdf8; text-decoration:underline;">github.com/Mehtaji2004</a><br>
          • Status: <strong style="color:#AFF005;">Open for Full-Time Roles &amp; High-Impact Projects</strong>
        </div>
      `;
    }
    // 8. Hire
    else if (["hire", "sudo hire", "recruit", "offer"].includes(norm)) {
      responseHtml = `
        <div style="padding: 8px 12px; background: rgba(175, 240, 5, 0.15); border: 1px solid #AFF005; border-radius: 6px; margin: 4px 0;">
          <strong style="color:#AFF005;">[INITIATING RECRUITMENT SEQUENCE]</strong><br>
          <span style="color:#fff;">Launching direct inquiry to mehtaakshit65@gmail.com...</span>
        </div>
      `;
      setTimeout(() => {
        window.location.href = "mailto:mehtaakshit65@gmail.com?subject=Job%20Opportunity%20/%20Project%20Collaboration";
      }, 800);
    }
    // 9. Clear
    else if (norm === "clear" || norm === "cls") {
      terminalBody.innerHTML = "";
      return;
    }
    // 10. Fallback with helpful suggestions
    else {
      responseHtml = `
        <div style="color:#f87171;">Command not recognized: '<span style="color:#fff; font-weight:600;">${escapeHtml(input)}</span>'</div>
        <div style="color:#9ca3af; font-size:0.8rem; margin-top:2px;">
          Try typing <strong style="color:#38bdf8">help</strong>, <strong style="color:#38bdf8">about</strong>, <strong style="color:#38bdf8">projects</strong>, <strong style="color:#38bdf8">skills</strong>, or click any chip above.
        </div>
      `;
    }

    const outEl = document.createElement("div");
    outEl.style.margin = "6px 0 12px 0";
    outEl.innerHTML = responseHtml;
    terminalBody.appendChild(outEl);

    terminalInput.value = "";
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(terminalInput.value);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && historyIdx > 0) {
        historyIdx--;
        terminalInput.value = history[historyIdx];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        terminalInput.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        terminalInput.value = "";
      }
    }
  });

  // Connect quick chips to auto-run
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cmd = chip.getAttribute("data-cmd");
      if (cmd) {
        terminalInput.value = cmd;
        runCommand(cmd);
      }
    });
  });
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.innerText = str;
  return d.innerHTML;
}

/* ==========================================================================
   6. Contact Form Handler (Resilient & Multi-Channel)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("telemyr-contact-form");
  const successBox = document.getElementById("contact-success");
  const resetBtn = document.getElementById("contact-reset-btn");
  const gmailBtn = document.getElementById("gmail-open-btn");
  const submitBtn = document.getElementById("contact-submit-btn");
  const btnText = document.getElementById("btn-text");

  if (!form || !successBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const company = document.getElementById("tf-company").value.trim() || "Independent Project";
    const name = document.getElementById("tf-name").value.trim();
    const email = document.getElementById("tf-email").value.trim();
    const message = document.getElementById("tf-message").value.trim();

    if (!name || !email || !message) return;

    if (btnText) btnText.innerText = "Sending...";
    if (submitBtn) submitBtn.disabled = true;

    const subjectStr = `Portfolio Inquiry from ${name} (${company})`;
    const bodyStr = `${message}\n\n---\nSender: ${name}\nEmail: ${email}\nCompany/Project: ${company}`;

    const encodedSubject = encodeURIComponent(subjectStr);
    const encodedBody = encodeURIComponent(bodyStr);

    // 1. Prepare direct Gmail Web URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mehtaakshit65@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
    if (gmailBtn) gmailBtn.href = gmailUrl;

    // 2. Prepare mailto link
    const mailtoUrl = `mailto:mehtaakshit65@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    // 3. Copy message to clipboard for seamless reliability
    try {
      navigator.clipboard.writeText(`To: mehtaakshit65@gmail.com\nSubject: ${subjectStr}\n\n${bodyStr}`);
    } catch (_) {}

    // 4. Update success message details
    const successHeadline = document.getElementById("success-headline");
    const successMessage = document.getElementById("success-message");

    if (successHeadline) successHeadline.innerText = `Thank you, ${name}.`;
    if (successMessage) {
      successMessage.innerHTML = `Your message regarding <strong>${company}</strong> has been prepared. I will write back to <strong>${email}</strong> within 24 hours. A copy has also been placed on your clipboard.`;
    }

    // 5. Trigger email link (will open email app or Gmail)
    setTimeout(() => {
      // Hidden trigger anchor to prevent navigation blocks
      const a = document.createElement("a");
      a.href = mailtoUrl;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Transition UI to Telemyr success view
      form.style.display = "none";
      successBox.style.display = "block";
      if (btnText) btnText.innerText = "Send Message";
      if (submitBtn) submitBtn.disabled = false;
    }, 400);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      successBox.style.display = "none";
      form.style.display = "block";
    });
  }
}
