// Main Application Logic - Akshit Mehta Portfolio

document.addEventListener("DOMContentLoaded", () => {
  initProjectCards();
  initProjectFilters();
  initProjectModal();
  initTerminal();
  initContactForm();
  initTypingEffect();
  initMobileMenu();
  initCopyEmail();
});

/* ==========================================================================
   1. Projects Rendering & Filter Logic
   ========================================================================== */
function renderProjects(filter = "all") {
  const container = document.getElementById("projects-grid");
  if (!container || !window.PORTFOLIO_PROJECTS) return;

  const projects = window.PORTFOLIO_PROJECTS;
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <p class="text-base">No projects found for this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((project, index) => {
    const techBadges = project.tech.slice(0, 4).map(t => `
      <span class="px-2.5 py-1 text-xs font-mono rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
        ${t}
      </span>
    `).join("");

    const demoBtn = project.demo ? `
      <a href="${project.demo}" target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Live Demo
      </a>
    ` : "";

    const githubBtn = project.github ? `
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 hover:text-white hover:border-slate-500 transition-all">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        GitHub
      </a>
    ` : "";

    return `
      <div class="glow-card group bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:border-sky-500/40">
        <div>
          <!-- Header Tag -->
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              ${project.badge || project.categoryLabel}
            </span>
            <span class="text-xs font-mono text-slate-500">0${index + 1}</span>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
            ${project.title}
          </h3>

          <!-- Description -->
          <p class="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
            ${project.shortDesc}
          </p>

          <!-- Tech Pills -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${techBadges}
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2">
            ${githubBtn}
            ${demoBtn}
          </div>
          <button 
            type="button" 
            onclick="openProjectModal('${project.id}')"
            class="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors group/btn">
            Details
            <svg class="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function initProjectCards() {
  renderProjects("all");
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll("[data-filter]");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-sky-500", "text-slate-950", "border-transparent", "shadow-lg", "shadow-sky-500/20");
        b.classList.add("bg-slate-900/80", "text-slate-400", "border-slate-800", "hover:border-slate-700", "hover:text-white");
      });

      btn.classList.remove("bg-slate-900/80", "text-slate-400", "border-slate-800", "hover:border-slate-700", "hover:text-white");
      btn.classList.add("bg-sky-500", "text-slate-950", "border-transparent", "shadow-lg", "shadow-sky-500/20");

      const filterVal = btn.getAttribute("data-filter");
      renderProjects(filterVal);
    });
  });
}

/* ==========================================================================
   2. Project Deep-Dive Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  if (!modal) return;

  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  window.openProjectModal = function(projectId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-category").innerText = project.categoryLabel;
    document.getElementById("modal-desc").innerText = project.fullDesc;
    document.getElementById("modal-metrics").innerText = project.metrics || "Production Grade Code";
    document.getElementById("modal-arch").innerText = project.architecture;

    // Features
    const featuresList = document.getElementById("modal-features");
    featuresList.innerHTML = project.features.map(f => `
      <li class="flex items-start gap-2 text-sm text-slate-300">
        <svg class="w-4 h-4 text-sky-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>${f}</span>
      </li>
    `).join("");

    // Tech
    const techContainer = document.getElementById("modal-tech");
    techContainer.innerHTML = project.tech.map(t => `
      <span class="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 text-sky-300 border border-sky-500/20">
        ${t}
      </span>
    `).join("");

    // Links
    const linksContainer = document.getElementById("modal-links");
    linksContainer.innerHTML = "";

    if (project.github) {
      linksContainer.innerHTML += `
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          View Source Code
        </a>
      `;
    }

    if (project.demo) {
      linksContainer.innerHTML += `
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Launch Live App
        </a>
      `;
    }

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };
}

/* ==========================================================================
   3. Interactive Senior Developer Terminal Emulator
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById("terminal-input");
  const terminalBody = document.getElementById("terminal-output");
  if (!terminalInput || !terminalBody) return;

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
      <div class="text-sky-300 font-bold mb-1">Available Commands:</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300">
        <div><span class="text-emerald-400 font-mono">about</span> - Brief bio & focus</div>
        <div><span class="text-emerald-400 font-mono">skills</span> - Core engineering stack</div>
        <div><span class="text-emerald-400 font-mono">projects</span> - View all 7 repositories</div>
        <div><span class="text-emerald-400 font-mono">stats</span> - Engineering metrics</div>
        <div><span class="text-emerald-400 font-mono">contact</span> - Email & handles</div>
        <div><span class="text-emerald-400 font-mono">sudo hire</span> - Direct offer flow</div>
        <div><span class="text-emerald-400 font-mono">clear</span> - Clear terminal buffer</div>
      </div>
    `,
    about: () => `
      <div class="text-slate-300 leading-relaxed">
        <span class="text-white font-bold">Akshit Mehta</span> | Senior Full-Stack Engineer & Data Scientist<br/>
        Passionate about bridging machine learning intelligence with production-grade full-stack systems.
        Proven track record of building predictive ML pipelines, statistical exploratory suites, and responsive Next.js platforms.
      </div>
    `,
    skills: () => `
      <div class="space-y-1 text-slate-300">
        <div><span class="text-sky-400 font-mono">Languages:</span> Python, TypeScript, JavaScript, SQL, C++, HTML5/CSS3</div>
        <div><span class="text-emerald-400 font-mono">Data Science & AI:</span> Pandas, NumPy, Scikit-Learn, SciPy, Matplotlib, Seaborn, Feature Engineering</div>
        <div><span class="text-indigo-400 font-mono">Full-Stack & Web:</span> React, Next.js, Node.js, REST APIs, Tailwind CSS</div>
        <div><span class="text-amber-400 font-mono">DevOps & Tooling:</span> Git, GitHub Actions, Docker, Linux, Vercel, PostgreSQL, SQLite</div>
      </div>
    `,
    projects: () => `
      <div class="space-y-1.5 text-slate-300">
        <div>1. <span class="text-white font-bold">Logistics ML Prediction</span> - Delay forecasting ML engine (Scikit-Learn)</div>
        <div>2. <span class="text-white font-bold">Logistics 10-Chart EDA</span> - Statistical hypothesis testing & visuals</div>
        <div>3. <span class="text-white font-bold">Logistics ETL Pipeline</span> - High-throughput data hygiene engine</div>
        <div>4. <span class="text-white font-bold">TalentSphere</span> - AI job & skills assessment platform (Next.js)</div>
        <div>5. <span class="text-white font-bold">OpenCourse</span> - AI adaptive learning path generator</div>
        <div>6. <span class="text-white font-bold">Nix Assistant</span> - Natural language assistant for Spring Boot</div>
        <div>7. <span class="text-white font-bold">Stranded Engine</span> - 2D physics shooter game loop in C++</div>
      </div>
    `,
    stats: () => `
      <div class="text-slate-300 space-y-1">
        <div>• 7+ Production Projects Delivered</div>
        <div>• 100% Modern Stack (Python 3.x, Next.js 14+, TypeScript)</div>
        <div>• High-Impact Data Science: 91.4% AUC-ROC on Supply Chain Model</div>
      </div>
    `,
    contact: () => `
      <div class="text-slate-300 space-y-1">
        <div>Email: <a href="mailto:mehtaakshit65@gmail.com" class="text-sky-400 underline">mehtaakshit65@gmail.com</a></div>
        <div>GitHub: <a href="https://github.com/Mehtaji2004" target="_blank" class="text-sky-400 underline">https://github.com/Mehtaji2004</a></div>
        <div>Location: India (Open to Remote Worldwide & Hybrid)</div>
      </div>
    `,
    "sudo hire": () => `
      <div class="text-emerald-400 font-bold p-2 bg-emerald-950/40 rounded border border-emerald-500/30">
        [PERMISSION GRANTED] Let's build something extraordinary together!<br/>
        Initiating contact sequence... Emailing mehtaakshit65@gmail.com
      </div>
    `,
    clear: () => {
      terminalBody.innerHTML = "";
      return null;
    }
  };

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawInput = terminalInput.value.trim();
      const input = rawInput.toLowerCase();
      if (!input) return;

      history.push(rawInput);
      historyIndex = history.length;

      // Echo command
      const cmdEcho = document.createElement("div");
      cmdEcho.className = "flex items-center gap-2 text-slate-400";
      cmdEcho.innerHTML = `
        <span class="text-emerald-400 font-mono font-bold">akshit@portfolio:~$</span>
        <span class="text-white font-mono">${escapeHtml(rawInput)}</span>
      `;
      terminalBody.appendChild(cmdEcho);

      // Execute
      if (commands[input]) {
        const result = commands[input]();
        if (result !== null) {
          const resEl = document.createElement("div");
          resEl.className = "mb-3 mt-1";
          resEl.innerHTML = result;
          terminalBody.appendChild(resEl);
        }
      } else {
        const errorEl = document.createElement("div");
        errorEl.className = "text-rose-400 mb-3 mt-1 text-xs";
        errorEl.innerHTML = `Command not recognized: '<span class="font-bold">${escapeHtml(rawInput)}</span>'. Type <span class="text-sky-400 font-mono font-bold">help</span> to list available commands.`;
        terminalBody.appendChild(errorEl);
      }

      terminalInput.value = "";
      terminalBody.scrollTop = terminalBody.scrollHeight;
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = "";
      }
    }
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

/* ==========================================================================
   4. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject")?.value.trim() || "Portfolio Inquiry";
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const mailtoUrl = `mailto:mehtaakshit65@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;
    
    window.location.href = mailtoUrl;
    showToast("Launching your email client...", "success");
    form.reset();
  });
}

/* ==========================================================================
   5. Dynamic Typing Subheadline
   ========================================================================== */
function initTypingEffect() {
  const el = document.getElementById("dynamic-typewriter");
  if (!el) return;

  const phrases = [
    "Machine Learning & Predictive Pipelines.",
    "Full-Stack Web Apps with Next.js & TypeScript.",
    "Production-Ready Data Engineering & EDA.",
    "Intelligent AI Applications & Developer Tools."
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   6. Toast Notifications & Email Copy
   ========================================================================== */
function initCopyEmail() {
  const btn = document.getElementById("copy-email-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText("mehtaakshit65@gmail.com").then(() => {
      showToast("Email copied to clipboard: mehtaakshit65@gmail.com", "success");
    }).catch(() => {
      showToast("Direct email: mehtaakshit65@gmail.com", "info");
    });
  });
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0");
  }, 3500);
}

/* ==========================================================================
   7. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });

  const links = mobileNav.querySelectorAll("a");
  links.forEach(l => {
    l.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
    });
  });
}
