// Define a TypeScript type for a single experience object for type safety
export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  type: 'Full-time' | 'Contract' | 'Internship'; // Use a union type for specificity
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  logo: string;
  gradient: string;
}

// Export the actual experience data
export const workExperience: Experience[] = [
  {
    id: 1,
    company: 'Robonic Infotech',
    position: 'Junior Software Developer',
    duration: 'Aug 2025 – Present',
    type: 'Full-time',
    location: 'Mumbai, India',
    description:
      'Developing and maintaining ERP and CRM modules. Focused on automation, reporting, and full-stack web interface optimization.',
    technologies: ['C#', 'ASP.NET', 'SQL Server', 'SSIS', 'HTML', 'CSS', 'JavaScript'],
    achievements: [
      'Enhanced automation and reporting efficiency for ERP and CRM modules.',
      'Designed and deployed automated data migration and synchronization pipelines.',
      'Implemented data export systems with integrated QR codes and photo management.',
      'Optimized attendance, sales, and HR reporting through advanced SQL queries.',
      'Built responsive web interfaces improving usability across modules.',
    ],
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQGSN0dagP6DYQ/company-logo_200_200/B4DZYestHtHIAI-/0/1744271758311?e=1762387200&v=beta&t=RWvB3o0g0R9eSNRwuHiELM1Cc3AQvKIv9jv778oGITw', // Using a placeholder, replace with your actual logo URL
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 2,
    company: 'MCM BPO',
    position: 'Python AI Developer',
    duration: 'Jul 2025 – Aug 2025',
    type: 'Contract',
    location: 'Mumbai, India',
    description:
      'Designed AI-driven automation workflows and content generation systems. Focused on integrating multiple APIs and orchestrating AI solutions.',
    technologies: ['Python', 'AI', 'n8n', 'OpenAI API', 'Google Sheets API', 'Bing Search API'],
    achievements: [
      'Developed AI workflows for content automation and email generation.',
      'Built keyword–website matching and emotion-based content pipelines.',
      'Integrated voice assistant functionality for calendar and sheet automation.',
      'Orchestrated data synchronization and API-based automation across platforms.',
    ],
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQH1JYy1lXmxgQ/company-logo_200_200/B56ZYaQ21CH0AM-/0/1744197349555/mcm_bpo_logo?e=1762387200&v=beta&t=HehR3SpRYPVqK2HANWElFDhpeG97slDyrOrZUpzZ4-E', // Using a placeholder, replace with your actual logo URL
    gradient: 'from-orange-500 to-red-600',
  },
];