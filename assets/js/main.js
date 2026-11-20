// Main Application Logic - Akshit Mehta Telemyr Edition

document.addEventListener("DOMContentLoaded", () => {
  initNavSquares();
  initWorksList();
  initProjectModal();
  initTerminal();
  initContactForm();
});

/* ==========================================================================
   1. Telemyr Nav Squares (Interactive Bottom/Top Dock)
   ========================================================================== */
function initNavSquares() {
  const squares = document.querySelectorAll(".nav-square");
  const sections = document.querySelectorAll("section[id]");

  squares.forEach(sq => {
    sq.addEventListener("click", (e) => {
      const targetId = sq.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          squares.forEach(s => s.classList.remove("active"));
          sq.classList.add("active");
        }
      }
    });
  });

  // ScrollSpy to highlight active Nav Square
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        squares.forEach(sq => {
          if (sq.getAttribute("href") === `#${id}`) {
            sq.classList.add("active");
          } else {
            sq.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

/* ==========================================================================
   2. Works / Case Studies Rendering
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
   3. Telemyr Project Deep-Dive Modal
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

  window.openProjectModal = function(projectId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById("modal-category").innerText = project.categoryLabel;
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-desc").innerText = project.fullDesc;
    document.getElementById("modal-arch").innerText = project.architecture;
    document.getElementById("modal-metrics").innerText = project.metrics || "Production Grade Code";

    // Features
    const featuresList = document.getElementById("modal-features");
    featuresList.innerHTML = project.features.map(f => `
      <li style="padding: 0.35rem 0; border-bottom: 1px dashed var(--color-rule-grey); font-size: 0.9rem; color: #333;">
        • ${f}
      </li>
    `).join("");

    // Tech
    const techEl = document.getElementById("modal-tech");
    techEl.innerHTML = project.tech.map(t => `
      <span style="display: inline-block; padding: 0.3rem 0.75rem; background: var(--color-light-grey); border: var(--rule); border-radius: 4px; font-size: 0.8rem; font-family: var(--font-mono); margin: 0.2rem;">
        ${t}
      </span>
    `).join("");

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
   4. Minimalist Terminal Emulator
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById("terminal-input");
  const terminalBody = document.getElementById("terminal-output");
  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: () => `
      <div style="color: #AFF005; font-weight: bold; margin-bottom: 4px;">Available Commands:</div>
      <div>• <span style="color:#AFF005">about</span>: Background & focus</div>
      <div>• <span style="color:#AFF005">skills</span>: Full-stack & data science stack</div>
      <div>• <span style="color:#AFF005">projects</span>: Repositories list</div>
      <div>• <span style="color:#AFF005">stats</span>: Production impact metrics</div>
      <div>• <span style="color:#AFF005">contact</span>: Direct email & handles</div>
      <div>• <span style="color:#AFF005">clear</span>: Clear console</div>
    `,
    about: () => `
      <div><strong>Akshit Mehta</strong> | Data Analyst & Full-Stack AI Engineer</div>
      <div style="color:#888;">Empirical data analysis, predictive pipelines, and high-performance web systems.</div>
    `,
    skills: () => `
      <div><strong>Python, SQL, TypeScript, C++, Pandas, NumPy, Scikit-Learn, SciPy, Next.js, PostgreSQL</strong></div>
    `,
    projects: () => `
      <div>1. Logistics ML Prediction (91.4% AUC-ROC)</div>
      <div>2. Logistics 10-Chart Statistical Visual Suite</div>
      <div>3. High-Throughput ETL Cleansing Pipeline</div>
      <div>4. TalentSphere AI Job Platform</div>
      <div>5. OpenCourse Adaptive Platform</div>
      <div>6. Nix Spring Boot Natural Language Assistant</div>
      <div>7. Stranded C++ 60 FPS Engine</div>
    `,
    stats: () => `
      <div>• 7+ Production-ready codebases</div>
      <div>• 91.4% AUC-ROC on logistics failure predictions</div>
      <div>• 100% Open source on GitHub (@Mehtaji2004)</div>
    `,
    contact: () => `
      <div>Email: mehtaakshit65@gmail.com</div>
      <div>GitHub: https://github.com/Mehtaji2004</div>
    `,
    clear: () => {
      terminalBody.innerHTML = "";
      return null;
    }
  };

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value.trim().toLowerCase();
      if (!val) return;

      const echo = document.createElement("div");
      echo.innerHTML = `<span style="color:#AFF005;">akshit@telemyr:~$</span> ${escapeHtml(val)}`;
      terminalBody.appendChild(echo);

      if (commands[val]) {
        const out = commands[val]();
        if (out) {
          const res = document.createElement("div");
          res.style.margin = "4px 0 10px 0";
          res.innerHTML = out;
          terminalBody.appendChild(res);
        }
      } else {
        const err = document.createElement("div");
        err.style.color = "#ff5555";
        err.style.margin = "4px 0 10px 0";
        err.innerHTML = `Command not recognized: '${escapeHtml(val)}'. Type 'help'.`;
        terminalBody.appendChild(err);
      }

      terminalInput.value = "";
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.innerText = str;
  return d.innerHTML;
}

/* ==========================================================================
   5. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("telemyr-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const company = document.getElementById("tf-company").value.trim();
    const name = document.getElementById("tf-name").value.trim();
    const email = document.getElementById("tf-email").value.trim();
    const message = document.getElementById("tf-message").value.trim();

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name} (${company || "Individual"})`);
    const body = encodeURIComponent(`${message}\n\nSender: ${name}\nEmail: ${email}\nCompany: ${company}`);

    window.location.href = `mailto:mehtaakshit65@gmail.com?subject=${subject}&body=${body}`;
  });
}
