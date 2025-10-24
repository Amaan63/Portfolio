// src/data/certificate.ts

// Assuming your image is correctly located at 'src/assets/Images/Data-Analytic-Certificate.jpg'
// Adjust the path if your assets folder is elsewhere relative to 'src/data'
import certificateImage from '@/assets/Images/Data-Analytic-Certificate.jpg';

// Define an interface for type safety (optional but recommended)
interface CertificateData {
  title: string;
  issuer: string;
  description: string;
  imageUrl: any; // Using 'any' because the type of imported image can vary (StaticImageData)
  verifyUrl: string;
  imageWidth: number;
  imageHeight: number;
  certificationId: string;
  dateIssued: string;
  category: string;
}

export const certificateData: CertificateData = {
  // Title from the certificate
  title: 'Fundamentals of Data Analytics',

  // Issuing bodies mentioned on the certificate
  issuer: 'IT-ITeS Sector Skills Council NASSCOM & FutureSkills Prime',

  // Description derived from the certificate text
  description:
    'Successfully cleared the assessment aligned to Competency Standards developed by IT-ITeS Sector Skills Council NASSCOM in collaboration with Industry and approved by Government.',

  // Image import
  imageUrl: certificateImage,

  // --- Verification Link ---
  verifyUrl: 'https://inspiration-fun-7467.my.salesforce-sites.com/CDACcertificatePage2?id=a02Vy00000Fm5knIAB',

  // Actual dimensions (double-check these against your image file)
  imageWidth: 1754,
  imageHeight: 1240,

  // --- Additional details ---
  certificationId: 'FSP/2025/3/10199548', //
  dateIssued: '19/03/2025', //
  category: 'Gold Category: 70% and above score', //
};