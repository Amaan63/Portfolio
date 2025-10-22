// src/data/projectData.ts

export interface Badge {
  emoji: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
  technology: string;
  techStack: string[];
  baseImageUrl?: string;
  imageNames?: string[];
  badges: Badge[];
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Car Parking Management",
    description:
      "A smart parking solution with slot booking, payment integration, and admin-staff-user modules built using Java, Hibernate, JSP, and MySQL.",
    technology: "Java",
    techStack: ["Java", "Hibernate", "JSP", "BootStrap", "MySQL", "Razor Pay"],
    baseImageUrl:
      "https://raw.githubusercontent.com/Amaan63/Car-Parking-Management-System/main/OutputImages/",
    imageNames: [
      "Landing%20Page.png",
      "Admin%20Login.png",
      "Admin%20Panel.png",
      "UserLogin.png",
      "UserRegistration.png",
      "UserDashboard.png",
      "ManageVehicle.png",
      "VehicleBookingForm.png",
      "ParkingHistory.png",
      "PaymentIntegration.png",
      "PaymentHistory.png",
    ],
    badges: [
      { emoji: "🚗", label: "Slot Booking" },
      { emoji: "💳", label: "Payment Gateway" },
      { emoji: "🧑‍💻", label: "Admin Panel" },
    ],
    github: "https://github.com/Amaan63/Car-Parking-Management-System",
    live: "https://car-parking-management-system.onrender.com",
  },
  {
    title: "Pokémon Wikipedia",
    description:
      "A Pokémon encyclopedia web app using PokeAPI with search functionality, image display, types, and pagination. Built using React, Tailwind CSS, and Mantine UI.",
    technology: "React",
    techStack: ["React", "Tailwind CSS", "PokeAPI"],
    baseImageUrl:
      "https://raw.githubusercontent.com/Amaan63/Pokemon-Wikipedia/main/OutputScreenShots/",
    imageNames: ["MainPage.png", "SearchBar.png", "Pokemon-Modal.png"],
    badges: [
      { emoji: "🧬", label: "Pokémon API" },
      { emoji: "🔍", label: "Search Bar" },
      { emoji: "🧾", label: "Pokédex Info" },
    ],
    github: "https://github.com/Amaan63/Pokemon-Wikipedia",
    live: "https://pokemon-wikipedia.vercel.app/",
  },
  {
    title: "Student Management CRUD App",
    description:
      "A full-stack application built using React and Spring Boot that enables users to manage student records. The app supports adding, viewing, updating, and deleting students with real-time UI updates and RESTful API integration.",
    technology: "Java",
    techStack: [
      "React",
      "Spring Boot",
      "Axios",
      "REST API",
      "MySQL",
      "Bootstrap",
    ],
    badges: [
      { emoji: "👨‍🎓", label: "Student Record Management" },
      { emoji: "🔄", label: "CRUD Operations" },
      { emoji: "⚙️", label: "RESTful API Integration" },
    ],
    github: "https://github.com/Amaan63/Simple-CRUD-SpringBoot-React",
  },
  {
    title: "Blog Editor",
    description:
      "A rich text blog editor with user login, markdown support, and image uploads using React, Node.js, and MongoDB.",
    technology: "JAVA", // Note: Your data had this as "JAVA", filter is "Java"
    techStack: ["React", "SpringBoot", "MySQL", "Tailwind CSS", "JWT"],
    baseImageUrl:
      "https://raw.githubusercontent.com/Amaan63/Blog-Editor/main/OutputScreenShots/",
    imageNames: [
      "Dashboard.png",
      "Register.png",
      "Login.png",
      "BlogForm.png",
      "Editblog.png",
      "StoringJWT.png",
    ],
    badges: [
      { emoji: "📝", label: "Markdown Support" },
      { emoji: "🖼️", label: "Image Upload" },
      { emoji: "👤", label: "User Auth" },
    ],
    github: "https://github.com/Amaan63/Blog-Editor",
  },
  {
    title: "Online Shopping Application",
    description:
      "A user-friendly online shopping platform built using JSP, Servlets, and JDBC. It offers dynamic product browsing, shopping cart functionality, secure checkout, and a powerful admin panel to manage users, products, and orders.",
    technology: "Java",
    techStack: [
      "Java",
      "JSP",
      "Servlets",
      "JDBC",
      "MySQL",
      "Bootstrap",
      "JavaScript",
    ],
    badges: [
      { emoji: "🛍️", label: "E-commerce Features" },
      { emoji: "🧑‍💼", label: "Admin Panel" },
      { emoji: "📦", label: "Order Management" },
    ],
    github: "https://github.com/Amaan63/Online-Shopping-Application",
  },
];