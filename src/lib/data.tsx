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
    image: "assets/projects/images/tb-detector.png",
    title: "TB Detector",
    description:
      "TB Detector is a Deep Learning–based application that leverages the DenseNet-121 architecture to detect tuberculosis from chest X-Ray images with high accuracy. The model is optimized using ONNX Runtime and seamlessly integrated into a full-stack web system for practical deployment.",
    technologies: [
      "DenseNet-121",
      "ONNX",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "FastAPI",
      "PostgreSQL",
      "Alembic",
      "JWT Authentication",
    ],
    links: {
      preview: "#",
      github: "https://github.com/covryzne/tbc-detection-skripsi",
      githubApi: "#",
    },
  },
  {
    image: "assets/projects/images/netflix-recommender-system.jpg",
    title: "Netflix Recommender System",
    description:
      "A movie recommendation system that combines collaborative filtering and content-based features to deliver personalized suggestions. Includes evaluation pipelines (RMSE, Precision@K), an API endpoint for serving recommendations, and a demo UI for exploring results.",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "Pandas",
      "Numpy",
      "Scikit-learn",
      "Content-Based Filtering",
      "Neural Collaborative Filtering",
    ],
    links: {
      preview: "#",
      github:
        "https://github.com/covryzne/learn-dicoding/tree/main/Submission/Netflix%20Recommender%20System/Renew",
      githubApi: "#",
    },
  },
  {
    image: "assets/projects/images/grab-sentiment-analyze.jpg",
    title: "GrabInsight: Sentiment Analysis on Ride-Hailing User Reviews",
    description:
      "GrabInsight is a Natural Language Processing (NLP) project that analyzes user reviews from the Grab application to classify sentiments into positive and negative categories. By leveraging text preprocessing, TF-IDF vectorization, and machine learning classifiers, the system provides valuable insights into customer satisfaction and service quality. This project demonstrates end-to-end skills in data collection, text analytics, model building, and evaluation, highlighting the ability to transform raw feedback into actionable business intelligence.",
    technologies: [
      "Google Play Scraper",
      "Pandas",
      "Regex",
      "NLTK",
      "Sastrawi",
      "Lexicon-Based",
      "TF-IDF",
    ],
    links: {
      preview: "#",
      github:
        "https://github.com/covryzne/learn-dicoding/tree/main/Submission/Sentimen%20Analysis%20Grab",
      githubApi: "#",
    },
  },
  {
    image: "assets/projects/images/atcs-kota-madiun.png",
    title: "ATCS Kota Madiun",
    description:
      "GoldSight is an interactive web platform designed to help investors analyze and predict gold price movements. Leveraging Deep Learning (GRU) for time-series forecasting on historical data since 2000, the system provides accurate predictions up to 90 days ahead. The application also features market trend visualizations, a responsive dashboard, and educational insights, enabling users to make smarter, data-driven investment decisions.",
    technologies: [
      "TensorFlow",
      "Streamlit",
      "Pandas",
      "Plotly",
      "Joblib",
      "Kaggle",
    ],
    links: {
      preview: "#",
      github: "https://github.com/covryzne/atcs-kota-madiun",
      githubApi: "#",
    },
  },
  {
    image: "assets/projects/images/gold-sight.png",
    title:
      "GoldSight: Intelligent Gold Price Prediction & Investment Dashboard",
    description:
      "GoldSight is an interactive web platform designed to help investors analyze and predict gold price movements. Leveraging Deep Learning (GRU) for time-series forecasting on historical data since 2000, the system provides accurate predictions up to 90 days ahead. The application also features market trend visualizations, a responsive dashboard, and educational insights, enabling users to make smarter, data-driven investment decisions.",
    technologies: [
      "TensorFlow",
      "Streamlit",
      "Pandas",
      "Plotly",
      "Joblib",
      "Kaggle",
    ],
    links: {
      preview: "#",
      github: "https://github.com/covryzne/capstone-goldsight",
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
      "A professional certification program focused on end-to-end AI implementation, covering MLOps, model deployment, and intelligent system development.",
    issuer: "Lintasarta",
    issueDate: "",
    credentialUrl:
      "https://drive.google.com/file/d/1sEy1muWoWByrxe1Xa8wpBqM-5s7nNtW6/view?usp=sharing",
    image: "/assets/certificates/laskarai-ai-engineer-thumb.jpg",
    details: [
      "/assets/certificates/laskarai-ai-engineer-thumb.jpg",
      "/assets/certificates/laskarai-ai-engineer-detail.jpg",
      "/assets/certificates/laskarai-ai-engineer-detail2.jpg",
    ],
  },
  {
    title: "Associate Data Scientist BNSP",
    description:
      "A national competency certification assessing data analysis, machine learning modeling, and result communication skills under BNSP standards.",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    issueDate: "",
    credentialUrl:
      "https://drive.google.com/file/d/1w1g4nqcaofxtS5NFHhZlsjT3Jd2UrxHx/view?usp=sharing",
    image: "/assets/certificates/associate-data-scientist-bnsp-thumb.jpg",
    details: [
      "/assets/certificates/associate-data-scientist-bnsp-detail.jpg",
      "/assets/certificates/associate-data-scientist-bnsp-detail2.jpg",
    ],
  },
  {
    title: "Alibaba Cloud Associate Big Data",
    description:
      "A certification validating foundational knowledge of big data technologies and cloud computing within the Alibaba Cloud ecosystem.",
    issuer: "Alibaba Cloud",
    issueDate: "",
    credentialId: "",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=IACA03240800131291L",
    image: "/assets/certificates/alibaba-big-data-thumb.jpg",
  },
  {
    title: "Machine Learning Engineer",
    description:
      "A certification program emphasizing the application of machine learning techniques, from data preprocessing to model development and performance evaluation.",
    issuer: "DBS Bank Indonesia",
    issueDate: "",
    credentialUrl:
      "https://drive.google.com/file/d/1XW0s3qkNzvXXP56xt1_Y7aGGjICYBCfq/view?usp=sharing",
    image: "/assets/certificates/expert-ml-engineer-thumb.jpg",
    details: [
      "/assets/certificates/expert-ml-engineer-thumb.jpg",
      "/assets/certificates/expert-ml-engineer-detail.jpg",
    ],
  },
  {
    title: "Dicoding Machine Learning Pemula",
    description:
      "An introductory course on machine learning covering fundamental AI concepts, supervised learning, and model implementation using Python.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQEY1W2PO1",
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
      "An advanced program that explores machine learning model development, algorithm optimization, and performance improvement techniques.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "https://www.dicoding.com/certificates/GRX53E4G3Z0M",
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
      "A certification emphasizing the practical implementation of machine learning, including NLP, computer vision, and model deployment.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZO91YR0XG5",
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
      "An advanced certification focused on integrating machine learning models into production systems through APIs and automated pipelines.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYE5JJKZVM",
    image: "/assets/certificates/dicoding-msml-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-msml-thumb.jpg",
      "/assets/certificates/dicoding-msml-detail.jpg",
    ],
  },
  {
    title: "Dicoding Machine Learning Operations (MLOps)",
    description:
      "A professional certification covering the implementation of MLOps for automating pipelines, model deployment, and performance monitoring.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "https://www.dicoding.com/certificates/NVP75740WXR0",
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
      "An expert-level certification focusing on deep learning projects using CNNs, RNNs, and transfer learning for advanced AI solutions.",
    issuer: "Dicoding Indonesia",
    issueDate: "",
    credentialUrl: "https://www.dicoding.com/certificates/2VX35R923PYQ",
    image: "/assets/certificates/dicoding-dltm-thumb.jpg",
    details: [
      "/assets/certificates/dicoding-dltm-thumb.jpg",
      "/assets/certificates/dicoding-dltm-detail.jpg",
    ],
  },
  {
    title: "Data Scientist TSA Komdigi",
    description:
      "A professional certification program developing skills in data analysis, machine learning, and visualization for data-driven decision-making.",
    issuer: "Komdigi",
    issueDate: "",
    credentialId: "2009530840-2",
    credentialUrl: "https://digitalent.komdigi.go.id/cek-sertifikat",
    image: "/assets/certificates/data-scientist-komdigi.jpg",
    details: [
      "/assets/certificates/data-scientist-komdigi.jpg",
      "/assets/certificates/data-scientist-komdigi-detail.jpg",
    ],
  },
  {
    title: "Data Analyst GreatEdu Global Mahardika",
    description:
      "A certification program focusing on data analysis, SQL, and building interactive dashboards to generate business insights.",
    issuer: "GreatEdu Global Mahardika",
    issueDate: "",
    credentialUrl:
      "https://drive.google.com/file/d/1x34Bo0_TuxIEc3j0Rj1wRibEsMCBlSIk/view?usp=sharing",
    image: "/assets/certificates/data-analyst-greatedu-thumb.png",
    details: [
      "/assets/certificates/data-analyst-greatedu-detail.jpg",
      "/assets/certificates/data-analyst-greatedu-detail2.jpg",
    ],
  },
  {
    title: "ASEAN Data Science Explorer",
    description:
      "A regional competition and certification assessing data analysis and storytelling skills using real ASEAN datasets.",
    issuer: "ASEAN Data Science Explorer",
    issueDate: "",
    credentialUrl:
      "https://drive.google.com/file/d/1rhjkCjoyTIeNE0TxM30MCkC8a-Xn7fWg/view?usp=sharing",
    image: "/assets/certificates/adse-thumb.jpg",
    details: [
      "/assets/certificates/adse-thumb.jpg",
      "/assets/certificates/adse-detail.jpg",
    ],
  },
  {
    title: "Database Design and Programming TSA Komdigi",
    description:
      "A certification covering database design principles, normalization, and SQL query implementation for data-driven applications.",
    issuer: "Komdigi",
    issueDate: "",
    credentialId: "2005662840-582",
    credentialUrl: "https://digitalent.komdigi.go.id/cek-sertifikat",
    image: "/assets/certificates/database-design-programming-sql-thumb.jpg",
    details: [
      "/assets/certificates/database-design-programming-sql-thumb.jpg",
      "/assets/certificates/database-design-programming-sql-detail.jpg",
    ],
  },
  {
    title: "Data Driven Kesiapsigaan Bencana TSA Komdigi",
    description:
      "A certification focusing on applying data science for disaster preparedness and data-driven decision-making in emergency management.",
    issuer: "Komdigi",
    issueDate: "",
    credentialId: "2007380840-21",
    credentialUrl: "https://digitalent.komdigi.go.id/cek-sertifikat",
    image: "/assets/certificates/data-driven-komdigi-thumb.jpg",
    details: [
      "/assets/certificates/data-driven-komdigi-thumb.jpg",
      "/assets/certificates/data-driven-komdigi-detail.jpg",
      "/assets/certificates/data-driven-komdigi-detail2.jpg",
    ],
  },
];

export const skillsData: Skill[] = [
  { name: "Tensorflow", icon: <Icons.tensorflow className="size-12" /> },
  { name: "Pytorch", icon: <Icons.pytorch className="size-12" /> },
  { name: "Onnx", icon: <Icons.onnx className="size-12" /> },
  { name: "Mlflow", icon: <Icons.mlflow className="size-12" /> },
  { name: "PostgreSQL", icon: <Icons.postgresql className="size-12" /> },
  { name: "FastAPI", icon: <Icons.fastapi className="size-12" /> },
  { name: "Matplotlib", icon: <Icons.matplotlib className="size-12" /> },
  { name: "Prometheus", icon: <Icons.prometheus className="size-12" /> },
  { name: "Keras", icon: <Icons.keras className="size-12" /> },
  { name: "Grafana", icon: <Icons.grafana className="size-12" /> },
  { name: "Docker", icon: <Icons.docker className="size-12" /> },
  { name: "GitHub Actions", icon: <Icons.githubactions className="size-12" /> },
  { name: "Tailwind", icon: <Icons.tailwind className="size-12" /> },
  { name: "NextJS", icon: <Icons.nextjs className="size-12" /> },
];
