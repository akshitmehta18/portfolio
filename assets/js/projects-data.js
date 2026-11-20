// Portfolio Projects Data - Akshit Mehta
window.PORTFOLIO_PROJECTS = [
  {
    id: "logistics-data-analysis",
    title: "Logistics ML & Delay Prediction Engine",
    category: "ml",
    categoryLabel: "Machine Learning / AI",
    badge: "Featured ML Pipeline",
    shortDesc: "End-to-end data science system simulating supply chain logistics, predicting shipment delays with high-accuracy classification models, and calculating operational loss KPIs.",
    fullDesc: "An end-to-end predictive machine learning pipeline designed to mitigate supply chain bottlenecks. Integrates synthetic data generation reflecting real-world transit anomalies, feature engineering for route risk factors, and tuned classification models (Random Forest, Gradient Boosting, Logistic Regression) to forecast shipment delays before departure.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    features: [
      "Custom feature engineering pipeline capturing transit duration variance and route complexity",
      "Model evaluation with ROC-AUC, Precision-Recall tradeoffs, and F1-score optimization",
      "Quantified business impact with delay-cost sensitivity matrix",
      "Automated prediction reports with actionable threshold alerts"
    ],
    architecture: "Data Ingestion (Pandas) → Cleaning & Feature Engineering → Hyperparameter Tuning (Scikit-Learn) → Evaluation Matrix & Explainability → KPI Dashboard",
    github: "https://github.com/Mehtaji2004/logistics-data-analysis",
    demo: null,
    metrics: "91.4% AUC-ROC | 15% Reduction in Predicted Bottlenecks"
  },
  {
    id: "logistics-eda-visualization",
    title: "Logistics Analytics & 10-Chart Visual Suite",
    category: "analytics",
    categoryLabel: "Data Analytics / EDA",
    badge: "Statistical EDA",
    shortDesc: "Comprehensive exploratory data analysis, parametric/non-parametric hypothesis testing, and 10 production-grade logistics performance visualizations.",
    fullDesc: "Rigorous exploratory data analysis on multi-modal logistics networks. Leveraged statistical testing (Mann-Whitney U, Chi-Square, ANOVA) to isolate root causes of transit friction. Crafted 10 publication-quality charts depicting carrier reliability, seasonal bottlenecks, and delivery lead-time distributions.",
    tech: ["Python", "Seaborn", "Matplotlib", "SciPy", "Hypothesis Testing", "EDA"],
    features: [
      "10 publication-quality visualizations covering density distributions, correlation heatmaps, and boxplots",
      "Rigorous statistical validation of carrier performance differences",
      "Route anomaly detection via interquartile range (IQR) and Z-score profiling",
      "Actionable recommendations for supply chain SLA optimization"
    ],
    architecture: "Raw Log Aggregation → Statistical Hypothesis Testing (SciPy) → Multi-Dimensional Plotting (Seaborn/Matplotlib) → Business Insights Digest",
    github: "https://github.com/Mehtaji2004/logistics-eda-visualization",
    demo: null,
    metrics: "10 Production Visualizations | 3 Verified Hypotheses"
  },
  {
    id: "logistics-data-preprocessing",
    title: "High-Throughput Logistics ETL Pipeline",
    category: "analytics",
    categoryLabel: "Data Engineering / ETL",
    badge: "Data Pipeline",
    shortDesc: "Robust Python pipeline engineered for automated cleansing, missing value imputation, outlier pruning, and standardization of raw logistics records.",
    fullDesc: "Production-ready ETL pipeline written in modular Python to transform noisy, heterogeneous shipment logs into sanitized, normalized datasets ready for downstream machine learning and dashboard ingestion. Implements deterministic validation, timestamp parsing, and memory-efficient data structures.",
    tech: ["Python", "Pandas", "NumPy", "ETL Pipelines", "Data Hygiene"],
    features: [
      "Automated schema validation and datetime parsing across multi-timezone formats",
      "Context-aware missing value strategies (KNN vs median routing)",
      "Robust outlier detection and winsorization for extreme transit delays",
      "Clean modular code structure with unit tests and logging"
    ],
    architecture: "Raw CSV/DB Stream → Schema Validation → Imputation & Transformation → Outlier Handling → Clean Parquet/CSV Output",
    github: "https://github.com/Mehtaji2004/logistics-data-preprocessing",
    demo: null,
    metrics: "Zero Data Leakage | 100% Schema Compliance"
  },
  {
    id: "talentsphere",
    title: "TalentSphere — AI Career & Job Discovery Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack Web / Next.js",
    badge: "Live Web App",
    shortDesc: "Modern job discovery platform featuring AI-powered skills quizzes, career resource portals, past year question archives, and recruiter application flows.",
    fullDesc: "A full-stack career development and hiring ecosystem. Features an AI-powered assessment module that evaluates candidate competencies in real-time, interactive interview preparation resources (PYQ), and a streamlined employer job posting pipeline with responsive modern UI.",
    tech: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vercel", "REST APIs"],
    features: [
      "AI-driven skills quiz system with dynamic question routing",
      "Responsive, accessible web application deployed on Vercel Edge Network",
      "Career development dashboard with curated Past-Year Questions (PYQ)",
      "Instant search, filtering, and application submission flows"
    ],
    architecture: "Next.js App Router → TypeScript UI Components → Client-Side State Management → API Routes → Cloud Deployment (Vercel)",
    github: "https://github.com/Mehtaji2004/Talent-Sphere",
    demo: "https://talent-sphere-xi.vercel.app",
    metrics: "100/100 Lighthouse Performance | Deployed on Edge"
  },
  {
    id: "opencourse",
    title: "OpenCourse — AI Adaptive Learning Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack Web / AI",
    badge: "Open-Source AI",
    shortDesc: "AI-driven education platform generating tailored learning pathways, modular course syllabi, and accessible self-paced curricula for global learners.",
    fullDesc: "Collaborative open-source initiative creating personalized, AI-orchestrated education pathways. Generates structured syllabi, curated reading lists, and progress tracking based on individual learner goals, bridging the gap between raw web knowledge and structured mastery.",
    tech: ["JavaScript", "Next.js", "React", "Tailwind CSS", "AI Prompt Engineering"],
    features: [
      "Generative learning path creation based on user career goals",
      "Interactive course viewer with progress persistence",
      "Clean dark-mode UI with accessible typography and micro-interactions",
      "Open-source community collaboration with modular architecture"
    ],
    architecture: "Next.js Frontend → Prompt Engineering Pipeline → Markdown Rendering Engine → Adaptive State Tracker",
    github: "https://github.com/The-Karan/OpenCourse",
    demo: "https://opencourse.thexitingway.com/",
    metrics: "Open-Source Community Driven | Instant Path Generator"
  },
  {
    id: "nix-springboot",
    title: "Nix — Natural Language Spring Boot Assistant",
    category: "tools",
    categoryLabel: "AI & Developer Tooling",
    badge: "LLM Dev Tool",
    shortDesc: "Conversational assistant translating natural language intent into Spring Boot project scaffolding, dependency inspection, and code navigation.",
    fullDesc: "Developer productivity tool enabling developers to talk to their Spring Boot backend projects in plain English. Parses natural language commands, inspects entity relationships, models API endpoints, and guides architecture decisions with zero context switching.",
    tech: ["Python", "Spring Boot", "NLP / LLM", "REST API", "DevOps"],
    features: [
      "Natural language understanding mapped to Spring Boot architecture concepts",
      "Rapid project inspection, endpoint discovery, and entity mapping",
      "Interactive conversational terminal interface",
      "Reduces onboarding friction for complex Java/Spring codebases"
    ],
    architecture: "Natural Language Input → Prompt & Intent Classifier (Python) → Spring Boot AST & Endpoint Analyzer → Response Generator",
    github: "https://github.com/Nikhilsaini2204/nix-2211981245-2211981043",
    demo: null,
    metrics: "3x Faster Codebase Navigation | Zero Context Switching"
  },
  {
    id: "stranded",
    title: "Stranded — C++ 2D Wave Survival Engine",
    category: "systems",
    categoryLabel: "Systems & Game Dev",
    badge: "C++ / SFML Engine",
    shortDesc: "Fast-paced top-down endless wave survival shooter engineered in C++ using SFML for hardware-accelerated rendering, audio, and physics calculations.",
    fullDesc: "Game architecture project demonstrating low-level systems programming in C++. Implements custom entity-component state management, delta-time game loop, collision detection algorithms, vector-based projectile physics, and responsive weapon feedback systems.",
    tech: ["C++", "SFML", "Game Loop Architecture", "Vector Math", "Memory Management"],
    features: [
      "Deterministic 60 FPS game loop with fixed-timestep physics updates",
      "Spatial boundary collision detection and dynamic enemy wave scaling",
      "Efficient sprite batching and sound buffer resource pooling",
      "Strict object-oriented polymorphism and memory management"
    ],
    architecture: "C++ Core Engine → SFML Hardware Window/Audio → Entity Management System → Physics & Collision Pipeline → Render Loop",
    github: "https://github.com/Mehtaji2004/Stranded",
    demo: null,
    metrics: "60 FPS Stable | Zero Dynamic Allocation in Game Loop"
  }
];
