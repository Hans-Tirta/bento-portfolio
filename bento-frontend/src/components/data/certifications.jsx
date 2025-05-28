import sqlBasic from "../../assets/sql_basic certificate.png";
import sqlIntermediate from "../../assets/sql_intermediate certificate.png";
import icimcis from "../../assets/icimcis_paper certificate.png";
import sic1 from "../../assets/sic_stage 1 certificate.png";

const certifications = [
  {
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "March 2025",
    description: "Covers basic SQL concepts like SELECT, WHERE, and JOIN.",
    link: "https://www.hackerrank.com/certificates/iframe/24ecb7089b6d",
    image: sqlBasic,
  },
  {
    title: "SQL (Intermediate) Certificate",
    issuer: "HackerRank",
    date: "March 2025",
    description:
      "Focuses on advanced SQL topics like subqueries and window functions.",
    link: "https://www.hackerrank.com/certificates/iframe/fc2b727621cc",
    image: sqlIntermediate,
  },
  {
    title: "Certificate of Publication",
    issuer: "ICIMCIS",
    date: "November 2024",
    description: "Published a paper on the impact of CV technology on traffic.",
    link: "",
    image: icimcis,
  },
  {
    title: "SIC Stage 1 Certificate",
    issuer: "HackerRank",
    date: "March 2024",
    description: "Covers Python basics, algorithms, and data structures.",
    link: "",
    image: sic1,
  },
];

export default certifications;
