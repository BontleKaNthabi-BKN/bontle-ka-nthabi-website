// Duplicate submission checker for the beauty academy website

interface SubmissionCache {
  [key: string]: {
    timestamp: Date;
    email: string;
    ip: string;
  };
}

// In-memory cache for recent submissions (in production, use Redis or database)
let submissionCache: SubmissionCache = {};

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // 10 minutes in milliseconds
  
  submissionCache = Object.fromEntries(
    Object.entries(submissionCache).filter(([, entry]) => entry.timestamp > tenMinutesAgo)
  );
}, 600000); // 10 minutes in milliseconds

/**
 * Checks if a submission is a duplicate based on email and time window
 * @param email The email address of the submission
 * @param ip The IP address of the request (for additional validation)
 * @returns Promise<boolean> indicating if the submission is a duplicate
 */
export async function isDuplicateSubmission(email: string, ip: string): Promise<boolean> {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // 10 minutes in milliseconds

  // Check for recent submissions with the same email
  for (const [key, entry] of Object.entries(submissionCache)) {
    if (
      entry.email.toLowerCase() === email.toLowerCase() &&
      entry.timestamp > tenMinutesAgo
    ) {
      // Additional check: same IP address within the time window
      if (entry.ip === ip) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Records a submission in the cache to prevent duplicates
 * @param submissionId The unique ID of the submission
 * @param email The email address of the submission
 * @param ip The IP address of the request
 */
export async function recordSubmission(submissionId: string, email: string, ip: string): Promise<void> {
  submissionCache[submissionId] = {
    timestamp: new Date(),
    email,
    ip
  };
}

/**
 * Checks if a submission ID already exists (for idempotency)
 * @param submissionId The submission ID to check
 * @returns Promise<boolean> indicating if the submission ID already exists
 */
export async function hasSubmissionId(submissionId: string): Promise<boolean> {
  return submissionId in submissionCache;
}