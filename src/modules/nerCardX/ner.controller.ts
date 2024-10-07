import { PrismaClient } from "@prisma/client";
import AWS from 'aws-sdk';
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();

AWS.config.update({
  accessKeyId: config.aws_access_key,
  secretAccessKey: config.aws_secret_key,
  region: config.aws_region
});



// Initialize AWS Comprehend client
const comprehend = new AWS.Comprehend();

const serviceRegex = /\b(E[-\s]*commerce|Mobile[-\s]*Apps|Cloud|Software|IoT|AI|Digital[-\s]*Marketing|Web[-\s]*Development|SEO|Cyber[-\s]*security|Block[-\s]*chain|Machine[-\s]*Learning|Data[-\s]*Science|Big[-\s]*Data|Dev[-\s]*Ops|Networking|IT[-\s]*Consulting|SaaS|PaaS|IaaS|AR[-\s]*VR|Automation|CRM|ERP|IT[-\s]*Support|Database[-\s]*Management|UI[-\s]*UX[-\s]*Design|Game[-\s]*Development|Cloud[-\s]*Migration|Cloud[-\s]*Security|Data[-\s]*Analytics|Robotics|Business[-\s]*Intelligence|System[-\s]*Integration|AI[-\s]*Chatbots|Virtualization|IT[-\s]*Auditing|Managed[-\s]*Services|Technical[-\s]*Support|Digital[-\s]*Transformation)\b/gi;


// Improved regex to handle spaces at various points in an email
const emailRegex = /\b[A-Z0-9._%+-]+\s*@\s*[A-Z0-9.-]+\s*\.\s*[A-Z]{2,}\b/gi;
const phoneRegex = /\+?([0-9]{1,4})[-.\s]?([0-9]{1,4})[-.\s]?([0-9]{1,4})[-.\s]?([0-9]{1,9})/g;
const urlRegex = /\b(?:https?:\/\/|www\.)[^\s]+/g;

// Regex to capture name and designation
const nameDesignationRegex = /([A-Z][a-zA-Z\s]+)\s*,?\s*(Managing Director & CEO|Director|CEO|Manager|President|Chairman|Founder|CTO|COO|CFO|Engineer)/gi;

// Function to clean up emails by removing unnecessary spaces
function cleanUpEmail(email: string) {
  return email.replace(/\s+/g, ''); // Remove all spaces within the email
}

// Function to extract emails, phone numbers, URLs, and name-designations using regex
function extractCustomEntities(text: string) {
  // Match emails, phone numbers, and URLs
  const rawEmails = text.match(emailRegex);
  const phoneNumbers = text.match(phoneRegex);
  const urls = text.match(urlRegex);

  // Clean up the emails by removing any unwanted spaces
  const emails = rawEmails ? rawEmails.map(cleanUpEmail) : [];

  // Match name and designation pairs
  const nameDesignationMatches = [...text.matchAll(nameDesignationRegex)];

  // Extract name-designation pairs
  const nameDesignations = nameDesignationMatches.map((match) => ({
    name: match[1].trim(),
    designation: match[2].trim(),
  }));

  // Extract services based on predefined keywords
  const services = text.match(serviceRegex) || [];

  return {
    emails: emails || [],
    phoneNumbers: phoneNumbers || [],
    urls: urls || [],
    nameDesignations: nameDesignations || [],
    services: services || [], // Extracted services
  };
}

// Use AWS Comprehend to detect entities
async function detectEntities(text: string): Promise<any> {
  const params = {
    Text: text,
    LanguageCode: 'en'
  };

  try {
    const result = await comprehend.detectEntities(params).promise();
    return result.Entities || [];
  } catch (error) {
    console.error('Error detecting entities:', error);
    throw error;
  }
}

// Process the text using both AWS Comprehend and regex-based extraction
async function processText(text: string) {
  const awsEntities = await detectEntities(text); // AWS Comprehend entities
  const customEntities = extractCustomEntities(text); // Custom entities from regex

  return {
    awsEntities,
    customEntities,
  };
}

// Controller function to handle the request
const extractData = catchAsync(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send({ message: 'Text is required for NER' });
  }

  try {
    const result = await processText(text);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to detect entities' });
  }
});

export const NerController = {
  extractData
};
