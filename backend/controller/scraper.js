import axios from "axios";
import * as cheerio from "cheerio";

// List of colleges to scrape
const collegeList = [
  {
    url: "https://nmcollege.in/admissions/under-graduate",
    name: "Narsee Monjee College of Commerce and Economics",
  },
  {
    url: "https://mithibai.ac.in/ug-admissions-2024-25/",
    name: "Mithibai College",
  },
  {
    url: "https://www.ruparel.edu/pages/admission",
    name: "D.G. Ruparel College",
  },

  {
    url: "https://siesascs.edu.in/admissions/fee_structure",
    name: "SIES College of Arts, Science, and Commerce",
  },
  {
    url: "https://www.rjcollege.edu.in/",
    name: "Ramniranjan Jhunjhunwala College",
  },
];

export const scrapeColleges = async () => {
  const results = [];

  for (const college of collegeList) {
    try {
      const { data } = await axios.get(college.url);
      const $ = cheerio.load(data);

      let pdfLinks = [];

      // For Mithibai College, look for the specific Fee Structure link
      if (college.url === "https://mithibai.ac.in/ug-admissions-2024-25/") {
        $("a").each((_, element) => {
          const link = $(element).attr("href");
          const text = $(element).text().trim();

          if (link && link.includes("Fee-Chart")) {
            pdfLinks.push({
              courses: [text],
              pdfLink: link,
            });
          }
        });
      }

      // For Ruparel College, look for anchor tags with PDF links
      if (college.url === "https://www.ruparel.edu/pages/admission") {
        $("a").each((_, element) => {
          const link = $(element).attr("href");
          const text = $(element).text().trim();

          if (
            link &&
            link.includes("drive.google.com") &&
            text.includes("Fee Structure")
          ) {
            const courses = text.split(",").map((course) => course.trim());
            pdfLinks.push({ courses, pdfLink: link });
          }
        });
      }

      // For RJ College, look for the Prospectus PDF link and append #page=36
      if (college.url === "https://www.rjcollege.edu.in/") {
        $("a").each((_, element) => {
          const link = $(element).attr("href");
          const text = $(element).text().trim();

          if (link && link.includes("Prospectus") && link.endsWith(".pdf")) {
            const pdfLinkWithPage = link + "#page=36";
            pdfLinks.push({
              courses: [text],
              pdfLink: pdfLinkWithPage,
            });
          }
        });
      }

      // For SIES College, look for the Fee Structure PDF link
      if (college.url === "https://siesascs.edu.in/admissions/fee_structure") {
        $("a").each((_, element) => {
          const link = $(element).attr("href");
          const text = $(element).text().trim();

          if (
            link &&
            link.includes("FEES STRUCTURE") &&
            link.endsWith(".pdf")
          ) {
            const fullLink = link.startsWith("http")
              ? link
              : `https://siesascs.edu.in${link}`;
            pdfLinks.push({
              courses: [text],
              pdfLink: fullLink,
            });
          }
        });
      }

      // For NM College, pass the URL directly as courses and pdfLink as a fixed link
      if (college.url === "https://nmcollege.in/admissions/under-graduate") {
        pdfLinks.push({
          courses: ["ALL Courses"], // Directly passing "URL" as the course name
          pdfLink: "https://nmcollege.in/admissions/under-graduate", // Direct link as pdfLink
        });
      }

      results.push({
        name: college.name,
        pdfLinks: pdfLinks.length > 0 ? pdfLinks : null,
      });
    } catch (error) {
      console.error(`Error scraping ${college.name}:`, error.message);
    }
  }

  return results;
};
