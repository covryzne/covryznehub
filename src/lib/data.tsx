import { Icons } from "@/components/icons";
import { Experience, NavLink, Project, Certification, Skill } from "./types";

export const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Certifications",
    href: "#certifications",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const projectsData: Project[] = [
  {
    video: "assets/videos/chat-collector-demo.mp4",
    title: "Chat Collector Pro",
    description:
      "A comprehensive chat collector application built with React and Node.js, featuring real-time collaboration, project tracking, and team management capabilities.",
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Material-UI",
    ],
    links: {
      preview: "#",
      github: "#",
      githubApi: "#",
    },
  },
  {
    video: "assets/videos/magic-bento-demo.mp4",
    title: "Magic Bento Box",
    description:
      "Magic Bento Box is a platform for creating and sharing magic recipes that can be used in the game.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Stripe",
    ],
    links: {
      preview: "#",
      github: "#",
      githubApi: "#",
    },
  },
] as const;

export const experiencesData: Experience[] = [
  {
    title: "Code Reviewer",
    company: "Dicoding Indonesia",
    description:
      "Served as an External Code Reviewer for Machine Learning and Data Science submissions, reviewing 220+ projects with an average rating of 4.99/5.00. Provided detailed feedback on code structure, modeling approaches, and clean code implementation. Collaborated asynchronously via Dicoding’s internal platform to ensure consistent and high-quality assessments, while contributing to 130+ forum discussions and verified learner solutions.",
    period: "Aug 2025 - Present",
    technologies: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Docker",
      "GitHub Actions",
      "MLflow",
      "Cloud Deployment",
    ],
  },
  {
    title: "AI Engineer Intern",
    company: "Lintasarta (Laskar AI x NVIDIA)",
    description:
      "Implemented an end-to-end MLOps pipeline for student performance prediction, covering data preprocessing, model experimentation, deployment, and monitoring in a production environment. Automated ML workflows (CI/CD) using GitHub Actions for data validation, training, and evaluation. Integrated MLflow for experiment tracking and model registry, containerized models with Docker, and deployed scalable REST APIs. Built real-time monitoring dashboards with Prometheus and Grafana. Developed GoldSight, a GRU-based time series forecasting system for gold price prediction (R² = 0.9971, MAPE = 0.62%) enhanced with news sentiment analysis integration, and deployed it to Streamlit as a cloud-based interactive service.",
    period: "Feb 2025 - Jun 2025",
    technologies: [
      "Python",
      "TensorFlow",
      "MLflow",
      "Docker",
      "FastAPI",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
  },
  {
    title: "Data Scientist Intern",
    company: "Kominfo x RSUD Dr. Soetomo (Kampus Merdeka - MSIB 7)",
    description:
      "Built risk classification models for stunting prediction in low birth weight and premature infants using Random Forest, Logistic Regression, and XGBoost. Conducted EDA, feature selection, and statistical analysis to identify key clinical predictors. Addressed data imbalance using SMOTE and class weighting to enhance model sensitivity. Evaluated models using ROC-AUC, Sensitivity, and Specificity with cross-validation to ensure robustness.",
    period: "Aug 2024 - Dec 2024",
    technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost", "PostgreSQL"],
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "DBS Bank Indonesia (DBS Foundation Coding Camp)",
    description:
      "Developed an end-to-end sarcasm detection pipeline using TensorFlow Extended (TFX). Implemented data ingestion, validation, and feature engineering with TF Transform, followed by model training with Keras. Conducted hyperparameter tuning using KerasTuner and automated model evaluation using TensorFlow Model Analysis (TFMA). Selected as one of 597 top participants out of 60,000 applicants at the Expert level.",
    period: "May 2024 - Oct 2024",
    technologies: [
      "TensorFlow",
      "Keras",
      "TFX",
      "KerasTuner",
      "TFMA",
      "Python",
      "Docker",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "PT GreatEdu Global Mahardika (Kampus Merdeka - MSIB 5)",
    description:
      "Analyzed Indonesia’s air quality data using K-Means Clustering and Decision Tree Regression to identify key pollution patterns and trends. Clustered regions into five groups based on AQI and pollutant metrics (PM2.5, CO, NO₂, O₃). Determined optimal cluster count using Elbow Method and Silhouette Score. Built an interactive dashboard in Looker Studio to visualize insights and deliver actionable recommendations for air quality improvement.",
    period: "Aug 2023 - Dec 2023",
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Decision Tree",
      "K-Means",
      "Looker Studio",
    ],
  },
];

export const certificationsData: Certification[] = [
  {
    title: "AI Engineer",
    description:
      "Professional certification program focused on AI engineering principles, practices, and applications.",
    issuer: "Lintasarta",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/laskarai-ai-engineer-thumb.jpg",
    details: [
      "/assets/certificates/laskarai-ai-engineer-thumb.jpg",
      "/assets/certificates/laskarai-ai-engineer-detail1.jpg",
      "/assets/certificates/laskarai-ai-engineer-detail2.jpg",
    ],
  },
  {
    title: "Associate Data Scientist BNSP",
    description:
      "Certification recognizing proficiency in data science concepts, techniques, and applications as per BNSP standards.",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/associate-data-scientist-bnsp-thumb.jpg",
    details: [
      "/assets/certificates/associate-data-scientist-bnsp-detail.jpg",
      "/assets/certificates/associate-data-scientist-bnsp-detail2.jpg",
    ],
  },
  {
    title: "Alibaba Cloud Associate Big Data",
    description:
      "Certification validating foundational knowledge and skills in big data technologies and Alibaba Cloud services.",
    issuer: "Alibaba Cloud",
    issueDate: "",
    credentialId: "",
    credentialUrl: "",
    image: "/assets/certificates/alibaba-big-data-thumb.jpg",
  },
  {
    title: "Machine Learning Engineer",
    description:
      "Professional certification program focused on machine learning principles, practices, and applications.",
    issuer: "DBS Bank Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/expert-ml-engineer-thumb.jpg",
    details: [
      "/assets/certificates/expert-ml-engineer-thumb.jpg",
      "/assets/certificates/expert-ml-engineer-detail.jpg",
    ],
  },
  {
    title: "Dicoding Machine Learning Pemula",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/dicoding-ml-pemula-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-ml-pemula-thumb.jpg",
      "/assets/certificates/dicoding-ml-pemula-detail.jpg",
      "/assets/certificates/dicoding-ml-pemula-detail2.jpg",
    ],
  },
  {
    title: "Dicoding Pengembangan Machine Learning",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/dicoding-pengembangan-ml-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-pengembangan-ml-thumb.jpg",
      "/assets/certificates/dicoding-pengembangan-ml-detail.jpg",
      "/assets/certificates/dicoding-pengembangan-ml-detail2.jpg",
    ],
  },
  {
    title: "Dicoding Machine Learning Terapan",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/dicoding-ml-terapan-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-ml-terapan-thumb.jpg",
      "/assets/certificates/dicoding-ml-terapan-detail.jpg",
      "/assets/certificates/dicoding-ml-terapan-detail2.jpg",
    ],
  },
  {
    title: "Dicoding Membangun Sistem Machine Learning",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/dicoding-msml-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-msml-thumb.jpg",
      "/assets/certificates/dicoding-msml-detail.jpg",
    ],
  },
  {
    title: "Dicoding Machine Learning Operations (MLOps)",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/dicoding-mlops-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-mlops-thumb.jpg",
      "/assets/certificates/dicoding-mlops-detail.jpg",
      "/assets/certificates/dicoding-mlops-detail2.jpg",
      "/assets/certificates/dicoding-mlops-detail3.jpg",
    ],
  },
  {
    title: "Dicoding Membangun Proyek Deep Learning Tingkat Mahir",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/dicoding-dltm-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-dltm-thumb.jpg",
      "/assets/certificates/dicoding-dltm-detail.jpg",
    ],
  },
  {
    title: "Data Scientist TSA Komdigi",
    description:
      "Professional certification program focused on data science principles, practices, and applications.",
    issuer: "Komdigi",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/data-scientist-komdigi.jpg",
    details: [
      "/assets/certificates/data-scientist-komdigi.jpg",
      "/assets/certificates/data-scientist-komdigi-detail.jpg",
    ],
  },
  {
    title: "Data Analyst GreatEdu Global Mahardika",
    description:
      "Professional certification program focused on data analysis principles, practices, and applications.",
    issuer: "GreatEdu Global Mahardika",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/data-analyst-greatedu-thumb.png",
    details: [
      "/assets/certificates/data-analyst-greatedu-detail.jpg",
      "/assets/certificates/data-analyst-greatedu-detail2.jpg",
    ],
  },
  {
    title: "ASEAN Data Science Explorer",
    description:
      "Professional certification program focused on machine learning principles, practices, and applications.",
    issuer: "ASEAN Data Science Explorer",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/adse-thumb.jpg",
    details: [
      "/assets/certificates/adse-thumb.jpg",
      "/assets/certificates/adse-detail.jpg",
    ],
  },
  {
    title: "Database Design and Programming TSA Komdigi",
    description:
      "Professional certification program focused on database design and programming principles, practices, and applications.",
    issuer: "Komdigi",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/database-design-programming-sql-thumb.jpg",
    details: [
      "/assets/certificates/database-design-programming-sql-thumb.jpg",
      "/assets/certificates/database-design-programming-sql-detail.jpg",
    ],
  },
  {
    title: "Data Driven Kesiapsigaan Bencana TSA Komdigi",
    description:
      "Professional certification program focused on data-driven disaster preparedness.",
    issuer: "Komdigi",
    issueDate: "",
    credentialUrl: "",
    image: "/assets/certificates/data-driven-komdigi-thumb.jpg",
    details: [
      "/assets/certificates/data-driven-komdigi-thumb.jpg",
      "/assets/certificates/data-driven-komdigi-detail.jpg",
      "/assets/certificates/data-driven-komdigi-detail2.jpg",
    ],
  },
];

export const skillsData: Skill[] = [
  { name: "Sass", icon: <Icons.sass className="size-12" /> },
  { name: "Tailwind", icon: <Icons.tailwind className="size-12" /> },
  { name: "JavaScript", icon: <Icons.javascript className="size-12" /> },
  { name: "TypeScript", icon: <Icons.typescript className="size-12" /> },
  { name: "React", icon: <Icons.react className="size-12" /> },
  { name: "NextJS", icon: <Icons.nextjs className="size-12" /> },
  { name: "NestJS", icon: <Icons.nestjs className="size-12" /> },
  { name: "Prisma", icon: <Icons.prisma className="size-12" /> },
  { name: "Docker", icon: <Icons.docker className="size-12" /> },
];
