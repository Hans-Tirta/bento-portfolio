import project_finance_app from "../../assets/project_finance_app.png";
import project_rumah_tangga from "../../assets/project_rumah_tangga.png";
import project_raiso from "../../assets/project_raiso.png";
import project_portfolio from "../../assets/project_portfolio.png";

const projects = [
  {
    title: "Finance Tracker",
    subtitle: "Personal Finance Management App",
    shortDescription:
      "A comprehensive finance tracking application built with PERN stack for managing income and expenses.",
    description:
      "A comprehensive finance tracking application that enables users to manage income, expenses, and accounts with ease. Built using the PERN stack, the platform provides a real-time financial overview and powerful tools to stay in control of personal budgeting.",
    keyFeatures: [
      "Dashboard: View total income, expenses, net balance, top spending categories, and recent transactions",
      "Transactions: Add, filter, search, and export transaction records to CSV",
      "Accounts: Track financial sources such as cash, bank accounts, and cards",
      "Profile: Manage user info, update password, or delete account",
    ],
    tech: ["PostgreSQL", "Express.js", "React.js", "Node.js"],
    tools: ["VS Code", "Postman", "Docker", "Git"],
    githubLink: "https://github.com/hans-tirta/finance-app",
    liveDemo: null,
    type: "Full Stack",
    status: "Completed",
    image: project_finance_app,
  },
  {
    title: "Portfolio (v1)",
    subtitle: "Responsive Developer Portfolio",
    shortDescription:
      "A personal portfolio website built from scratch using semantic HTML, CSS, and vanilla JavaScript.",
    description:
      "A personal portfolio website designed and developed from scratch to showcase my education, experience, skills, and latest projects. Built using semantic HTML, custom CSS styling, and vanilla JavaScript for interactive elements, the site is responsive and user-friendly across devices.",
    keyFeatures: [
      "About Me, Education & Experience timeline",
      "Categorized Skills with icons (Tools, Languages, Frameworks, etc.)",
      "Project carousel with previews and tech stack tags",
      "Contact section with direct email and LinkedIn links",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    tools: ["Visual Studio Code", "Figma"],
    githubLink: "https://github.com/hans-tirta/portfolio-v1",
    liveDemo: "https://portfolio-hans-tirtas-projects.vercel.app/",
    type: "Frontend",
    status: "Completed",
    image: project_portfolio,
  },
  {
    title: "Rumah Tangga",
    subtitle: "Home Services Marketplace",
    shortDescription:
      "A MERN stack web application connecting homeowners with local service providers.",
    description:
      "A web application that connects homeowners with local service providers. Built with the MERN stack, it streamlines the booking process for domestic services while ensuring secure user interactions.",
    keyFeatures: [
      "User authentication & profile management",
      "Create and manage service orders",
      "Review & rating system for providers",
      "Secure payment processing integration",
    ],
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JavaScript",
      "SCSS",
    ],
    tools: ["VS Code", "Git", "Postman"],
    githubLink: "https://github.com/hans-tirta/rumah-tangga",
    liveDemo: null,
    type: "Full Stack",
    status: "Completed",
    image: project_rumah_tangga,
  },
  {
    title: "RAiso",
    subtitle: "Online Stationery Store",
    shortDescription:
      "An e-commerce platform built with ASP.NET using Domain-Driven Design principles.",
    description:
      "A solo-developed e-commerce platform focused on stationery products, designed with ASP.NET and structured using Domain-Driven Design (DDD) principles for clarity, scalability, and maintainability. The app features role-based access for Guests, Users, and Admins with distinct capabilities.",
    keyFeatures: [
      "Role-based access: Guest, User, Admin",
      "User authentication & profile management",
      "Product CRUD operations and cart management",
      "Transaction history, detail views, and reporting",
    ],
    tech: ["ASP.NET", "SQL", "C#", "HTML", "CSS"],
    tools: ["Visual Studio 2022"],
    githubLink: "https://github.com/hans-tirta/raiso",
    liveDemo: null,
    type: "Full Stack",
    status: "Completed",
    image: project_raiso,
  },
];

export default projects;
