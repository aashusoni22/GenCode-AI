const RAPID_API_KEY = import.meta.env.VITE_APPWRITE_RAPIDAPI_KEY;
const RAPID_API_HOST = "jsearch.p.rapidapi.com";

// Base options for API requests
const getBaseOptions = () => ({
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST,
  },
});

export const getEstimatedSalary = async (
  jobTitle = "web developer",
  location = "canada",
  locationType = "ANY",
  yearsOfExperience = "ALL"
) => {
  try {
    const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${encodeURIComponent(
      jobTitle
    )}&location=${encodeURIComponent(
      location
    )}&location_type=${locationType}&years_of_experience=${yearsOfExperience}`;

    const response = await fetch(url, getBaseOptions());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching estimated salary data:", error);
    throw error;
  }
};

export const searchJobs = async (
  query = "Frontend developer",
  location = "Canada",
  page = 1,
  pageSize = 10,
  remoteJobsOnly = "no"
) => {
  try {
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      query
    )}%20in%20${encodeURIComponent(
      location
    )}&page=${page}&num_pages=${pageSize}&remote_jobs_only=${remoteJobsOnly}`;

    const response = await fetch(url, getBaseOptions());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job search data:", error);
    throw error;
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${encodeURIComponent(
      jobId
    )}`;

    const response = await fetch(url, getBaseOptions());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};

export const fetchJobListings = async (
  query = "Frontend Developer",
  location = "Canada",
  remoteOnly = false
) => {
  try {
    const response = await searchJobs(
      query,
      location,
      1,
      20,
      remoteOnly ? "yes" : "no"
    );

    if (!response.data || response.status !== "OK") {
      throw new Error("Invalid response from job API");
    }

    // Transform the API response to match our application's job format
    return response.data.map((job) => {
      const {
        job_id,
        job_title,
        employer_name,
        job_city,
        job_state,
        job_country,
        job_employment_type,
        job_apply_link,
        job_description,
        job_is_remote,
        job_posted_at_datetime_utc,
        employer_logo,
        job_min_salary,
        job_max_salary,
        job_required_skills,
        job_required_experience,
      } = job;

      // Format location string
      let location = "";
      if (job_city) location += job_city;
      if (job_state) location += location ? `, ${job_state}` : job_state;
      if (job_country && !job_city && !job_state) location = job_country;
      if (job_is_remote) location = "Remote";

      // Format job type
      let type = "fulltime";
      if (job_employment_type) {
        const jobType = job_employment_type.toLowerCase();
        if (jobType.includes("part")) type = "parttime";
        if (jobType.includes("contract")) type = "contract";
        if (jobType.includes("intern")) type = "internship";
      }

      // Determine experience level based on required experience
      let experienceLevel = "junior";
      if (
        job_required_experience &&
        job_required_experience.required_experience_in_months
      ) {
        const months = job_required_experience.required_experience_in_months;
        if (months < 12) experienceLevel = "entry";
        else if (months >= 12 && months < 36) experienceLevel = "junior";
        else if (months >= 36 && months < 60) experienceLevel = "mid";
        else experienceLevel = "senior";
      }

      // Format salary
      let salary = "Not specified";
      if (job_min_salary && job_max_salary) {
        salary = `$${Math.round(
          job_min_salary
        ).toLocaleString()} - $${Math.round(job_max_salary).toLocaleString()}`;
      } else if (job_min_salary) {
        salary = `From $${Math.round(job_min_salary).toLocaleString()}`;
      } else if (job_max_salary) {
        salary = `Up to $${Math.round(job_max_salary).toLocaleString()}`;
      }

      // Format posted date
      const postedDate = job_posted_at_datetime_utc
        ? getRelativeTimeString(new Date(job_posted_at_datetime_utc))
        : "Recently";

      // Extract requirements from description
      const requirements = job_required_skills
        ? job_required_skills.slice(0, 5)
        : extractRequirementsFromDescription(job_description);

      return {
        id: job_id,
        title: job_title,
        company: employer_name,
        location: location || "Location not specified",
        type,
        experienceLevel,
        salary,
        postedDate,
        description: job_description || "No description provided",
        requirements,
        remote: job_is_remote,
        applyUrl: job_apply_link,
        logo: employer_logo || "/api/placeholder/100/100",
      };
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    // Return empty array in case of error
    return [];
  }
};

function getRelativeTimeString(date) {
  const now = new Date();
  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 30) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

function extractRequirementsFromDescription(description) {
  if (!description) return ["No requirements specified"];

  // Look for common patterns in job descriptions that indicate requirements
  const keywords = [
    "requirements",
    "qualifications",
    "skills",
    "you will need",
    "you should have",
    "what you'll need",
    "what we're looking for",
  ];

  // Basic extraction - find sentences that might contain requirements
  let sentences = description.split(/[.!?]+/);
  let requirements = [];

  // Look for sentences that contain technology keywords or qualification patterns
  const techKeywords = [
    "react",
    "javascript",
    "html",
    "css",
    "node",
    "typescript",
    "express",
    "git",
    "sql",
    "nosql",
    "mongodb",
    "aws",
    "api",
  ];

  sentences.forEach((sentence) => {
    const normalized = sentence.toLowerCase().trim();

    // Check for sentences containing tech terms
    if (
      techKeywords.some((tech) => normalized.includes(tech)) &&
      normalized.length > 20 &&
      normalized.length < 120
    ) {
      requirements.push(sentence.trim());
    }

    // Check for sentences that indicate requirements
    if (
      keywords.some((keyword) => normalized.includes(keyword)) &&
      normalized.length > 20 &&
      normalized.length < 120
    ) {
      requirements.push(sentence.trim());
    }
  });

  // If we found too many, trim the list
  if (requirements.length > 5) {
    requirements = requirements.slice(0, 5);
  }

  // If we didn't find any, provide a default
  if (requirements.length === 0) {
    requirements = [
      "Experience with relevant frontend technologies",
      "Understanding of web development principles",
      "Problem-solving skills",
      "Ability to work in a team environment",
      "Good communication skills",
    ];
  }

  return requirements;
}

export default {
  getEstimatedSalary,
  searchJobs,
  getJobDetails,
  fetchJobListings,
};
