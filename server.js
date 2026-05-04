const http = require("http");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const PROFILE_PATH = path.join(DATA_DIR, "company-profile.json");

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
let latestCompanyProfile = loadCompanyProfile();

const companyDetails = {
  name: "CygniSoft",
  positioning: "CygniSoft helps businesses grow with the right people and the right software.",
  summary:
    "CygniSoft is both a staffing solutions and software solutions company.",
  staffing:
    "Healthcare staffing, IT and technical hiring, general staffing, candidate sourcing, and recruitment support.",
  software:
    "Websites, web apps, dashboards, portals, automation, AI tools, resume parser, healthcare staffing software, snow removal management system, and custom software projects.",
};

const contentTypes = [
  "LinkedIn Post",
  "Cold Email",
  "Website Copy",
  "Service Page Content",
  "Product Description",
  "Proposal Draft",
  "Campaign Idea",
  "Social Media Calendar",
];

const categories = [
  "Staffing Services",
  "Healthcare Staffing",
  "IT / Technical Staffing",
  "General Staffing",
  "Software Development",
  "Resume Parser",
  "Healthcare Staffing Software",
  "Snow Removal Management System",
  "Custom Web App",
  "AI Automation",
];

const marketIndustries = [
  "Healthcare",
  "IT / Technology",
  "Staffing & Recruitment",
  "Small Business",
  "Logistics / Warehouse",
  "Snow Removal / Local Services",
  "General Market",
];

const researchFocusOptions = [
  "Hiring trends",
  "In-demand job roles",
  "Software needs",
  "Automation opportunities",
  "Marketing opportunities",
  "Service demand",
  "Full market summary",
];

const plannerServices = [
  "Healthcare Staffing",
  "IT / Technical Staffing",
  "General Staffing",
  "Custom Software Development",
  "Website Development",
  "Web App Development",
  "Resume Parser",
  "Candidate Registration System",
  "Healthcare Staffing Software",
  "Snow Removal Management System",
  "AI Automation",
];

const targetAudiences = [
  "Clinics",
  "Healthcare agencies",
  "Long-term care facilities",
  "IT companies",
  "Startups",
  "Small businesses",
  "Staffing agencies",
  "Recruitment agencies",
  "Snow removal companies",
  "Warehouses / logistics companies",
  "Local service businesses",
];

const campaignGoals = [
  "Book consultation calls",
  "Get staffing clients",
  "Sell software project",
  "Promote product/demo",
  "Build brand awareness",
  "Generate LinkedIn leads",
  "Email outreach campaign",
];

const campaignDurations = ["7 days", "14 days", "30 days"];

const categorySentencePhrases = {
  "Staffing Services": "staffing services",
  "Healthcare Staffing": "healthcare staffing",
  "IT / Technical Staffing": "IT and technical staffing",
  "General Staffing": "general staffing",
  "Software Development": "software development",
  "Resume Parser": "a resume parser",
  "Healthcare Staffing Software": "healthcare staffing software",
  "Snow Removal Management System": "a snow removal management system",
  "Custom Web App": "a custom web app",
  "AI Automation": "AI automation",
};

const categoryGuidance = {
  "Staffing Services": {
    audience: "Business owners, hiring managers, and operations leaders",
    problem: "Finding reliable people takes time away from running the business.",
    solution: "CygniSoft supports the hiring process with candidate sourcing, screening support, and organized recruitment coordination.",
    benefits: ["Save hiring time", "Improve candidate flow", "Support business growth with clearer staffing plans"],
    details: ["role requirements", "candidate sourcing", "screening support", "shortlist coordination"],
    cta: "Talk to CygniSoft about your current hiring needs.",
  },
  "Healthcare Staffing": {
    audience: "Clinics, care providers, healthcare offices, and staffing coordinators",
    problem: "Clinics and care teams often need dependable staff without slowing down patient care or overloading managers.",
    solution: "CygniSoft helps healthcare teams source candidates, organize recruitment steps, and support staffing conversations for care environments.",
    benefits: ["Support clinic coverage", "Reduce pressure on internal managers", "Keep hiring communication organized"],
    details: ["clinic coverage", "care team support", "candidate availability", "schedule-sensitive roles"],
    cta: "Connect with CygniSoft to discuss healthcare staffing support.",
  },
  "IT / Technical Staffing": {
    audience: "Technology leaders, founders, and teams hiring technical talent",
    problem: "Technical roles can stay open when teams do not have enough time to source, screen, and compare candidates with the right skills.",
    solution: "CygniSoft helps with IT candidate sourcing, technical screening coordination, and recruitment support for software, web, and business technology roles.",
    benefits: ["Reach more relevant technical candidates", "Reduce time spent sorting mismatched resumes", "Support clearer hiring conversations"],
    details: ["developer roles", "technical skill fit", "project timelines", "screening conversations"],
    cta: "Share the technical role you need to fill with CygniSoft.",
  },
  "General Staffing": {
    audience: "Small businesses and teams hiring for operations, admin, service, or support roles",
    problem: "Small businesses often need reliable people for daily operations but cannot pause the business to manage every hiring step.",
    solution: "CygniSoft helps small teams define the role, source candidates, and keep the recruitment process moving.",
    benefits: ["Fill day-to-day roles with less internal strain", "Reduce hiring admin", "Keep business operations moving"],
    details: ["front office roles", "operations support", "admin hiring", "small business staffing"],
    cta: "Tell CygniSoft what role your business needs next.",
  },
  "Software Development": {
    audience: "Business owners and teams that need custom digital tools",
    problem: "Manual spreadsheets, disconnected tools, and repeated data entry make daily work slower than it needs to be.",
    solution: "CygniSoft builds websites, web apps, dashboards, portals, and custom tools that match how the business operates.",
    benefits: ["Reduce repetitive manual work", "Centralize important information", "Give staff and clients a clearer digital experience"],
    details: ["workflow mapping", "custom portals", "dashboards", "client-facing or internal tools"],
    cta: "Book a conversation with CygniSoft about your software idea.",
  },
  "Resume Parser": {
    audience: "Recruiters, staffing agencies, and HR teams",
    problem: "Recruiters can lose hours opening resumes, copying details, and comparing candidate information by hand.",
    solution: "CygniSoft can build a resume parser that extracts key candidate details into a structured, easier-to-review format.",
    benefits: ["Reduce manual resume data entry", "Organize candidate profiles consistently", "Help recruiters review applications faster"],
    details: ["resume uploads", "candidate fields", "structured profiles", "recruiter review"],
    cta: "Ask CygniSoft how a resume parser could fit your recruitment workflow.",
  },
  "Healthcare Staffing Software": {
    audience: "Healthcare staffing agencies and care organizations",
    problem: "Healthcare staffing teams can struggle to manage registrations, shift requests, candidate status, and client updates in separate files or messages.",
    solution: "CygniSoft builds healthcare staffing software for candidate registration, staffing workflows, dashboards, portals, and operational tracking.",
    benefits: ["Keep staffing information in one place", "Improve visibility across requests and candidates", "Support repeatable staffing workflows"],
    details: ["candidate registration", "shift tracking", "client requests", "staffing dashboards"],
    cta: "Discuss a healthcare staffing software workflow with CygniSoft.",
  },
  "Snow Removal Management System": {
    audience: "Snow removal companies and field service operators",
    problem: "During busy snow events, crews, routes, job status, and customer requests can become difficult to track in calls, texts, and spreadsheets.",
    solution: "CygniSoft can build a snow removal management system for route tracking, crew dispatch, job updates, customer requests, and reporting.",
    benefits: ["See job status more clearly", "Coordinate crews with less back-and-forth", "Reduce manual route and service tracking"],
    details: ["route tracking", "crew dispatch", "job status", "customer requests"],
    cta: "Talk to CygniSoft about organizing your snow removal operations.",
  },
  "Custom Web App": {
    audience: "Businesses that need a custom online workflow, portal, or internal tool",
    problem: "Off-the-shelf software often forces teams to adjust their process instead of supporting how they already work.",
    solution: "CygniSoft builds custom web apps, portals, forms, admin panels, and dashboards for client-facing and internal workflows.",
    benefits: ["Create a tool that fits the process", "Reduce repeated manual steps", "Improve the experience for staff, clients, or partners"],
    details: ["user portals", "admin panels", "forms", "workflow automation"],
    cta: "Share your web app idea with CygniSoft.",
  },
  "AI Automation": {
    audience: "Businesses looking to reduce repetitive work with practical AI tools",
    problem: "Many teams spend valuable time on repeat admin tasks, follow-ups, document handling, and internal requests.",
    solution: "CygniSoft builds AI-powered tools and automation workflows that support specific business tasks without adding unnecessary complexity.",
    benefits: ["Reduce repetitive admin work", "Improve consistency in routine tasks", "Free up time for higher-value work"],
    details: ["document handling", "lead follow-up", "internal assistants", "repeatable workflows"],
    cta: "Ask CygniSoft where AI automation could help your team first.",
  },
};

const contentTypeFormats = {
  "LinkedIn Post": `Generate only a natural LinkedIn post.
Write it as final post copy only.
Requirements:
- Start with a strong opening hook.
- Use short paragraphs with natural LinkedIn pacing.
- Mention the selected business category clearly.
- Focus on the client problem first.
- Explain how CygniSoft helps.
- Include exactly 3 practical benefits, either in a short sentence or bullets.
- End with a clear CTA.
- Do not show labels such as "Hook", "Business value", or "CTA" unless the user asks for structured output.
- Make it ready to copy and post directly.`,
  "Cold Email": `Generate a cold email.
Format:
Subject Line
Email Body
CTA
Keep it concise, specific, polite, and easy to reply to. Include placeholders like [First Name] only where useful.`,
  "Website Copy": `Generate website copy.
Format:
Hero Headline
Hero Subheading
Service Section
Benefits
CTA
Make it suitable for a service landing page and specific to the selected category.`,
  "Service Page Content": `Generate service page content.
Format:
Page Headline
Intro Copy
Who It Helps
Common Challenges
How CygniSoft Helps
Key Benefits
CTA
Keep it clear for business owners and avoid technical clutter.`,
  "Product Description": `Generate a product description.
Format:
Product Overview
Problem Solved
Features
Benefits
Ideal Users
CTA
Make the product feel practical and specific without inventing unproven claims.`,
  "Proposal Draft": `Generate a professional proposal draft.
Format:
Objective
Scope
Recommended Solution
Benefits
Timeline Placeholder
Next Steps
Use placeholders where client-specific details are needed.`,
  "Campaign Idea": `Generate a campaign idea.
Format:
Campaign Theme
Target Audience
Core Message
Content Angles
Suggested Channels
CTA
Make the campaign practical and easy for CygniSoft to execute.`,
  "Social Media Calendar": `Generate a 7-day content calendar.
Format:
Day 1 through Day 7
Each day must include:
Post Topic
Caption Idea
CTA
Vary the angles across problem, education, service value, and outreach.`,
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function buildPrompt({ contentType, category, userRequest }) {
  const guide = categoryGuidance[category] || categoryGuidance["Staffing Services"];
  const format = contentTypeFormats[contentType] || contentTypeFormats["LinkedIn Post"];
  const profileText = formatKnowledgeProfileForPrompt(latestCompanyProfile);

  return `You are the AI Marketing Agent for CygniSoft.

CygniSoft is both a staffing solutions and software solutions company.
Core message: ${companyDetails.positioning}

Create marketing content based on:
Content Type: ${contentType}
Business Category: ${category}
User Request: ${userRequest}

Company details:
Staffing includes healthcare staffing, IT and technical hiring, general staffing, candidate sourcing, and recruitment support.
Software includes websites, web apps, dashboards, portals, automation, AI tools, resume parser, healthcare staffing software, snow removal management system, and custom software projects.

Latest CygniSoft website knowledge profile:
${profileText}

Selected category guidance:
Audience: ${guide.audience}
Typical problem: ${guide.problem}
CygniSoft solution: ${guide.solution}
Useful details to reference when relevant: ${guide.details.join(", ")}
Benefits to adapt naturally: ${guide.benefits.join(", ")}

Use a professional, clear, friendly, and confident tone.

Rules:
Do not overpromise.
Do not make fake claims.
Do not invent clients, case studies, locations, guarantees, certifications, or statistics.
If the knowledge profile does not contain a detail, do not pretend it does.
Keep the language simple.
Focus on the client's problem, solution, and business benefit.
Make the output ready to use.
Make the language specific to ${category}.
Avoid filler and generic phrases such as "looking at the actual workflow", "practical support", "business needs", "right solution", and "next step easier" unless the phrase is made specific and meaningful.
Avoid repeating the same sentence structure.
Do not use heavy technical jargon.
Do not mention being an AI.

Required output format for ${contentType}:
${format}`;
}

function buildFallbackContent({ contentType, category, userRequest }) {
  const guide = categoryGuidance[category] || categoryGuidance["Staffing Services"];
  const categoryPhrase = categorySentencePhrases[category] || category.toLowerCase();
  const benefits = guide.benefits.map((benefit) => `- ${benefit}`).join("\n");
  const detailList = guide.details.map((detail) => `- ${detail}`).join("\n");
  const benefitBullets = guide.benefits.map((benefit) => `- ${benefit}`).join("\n");
  const userNeed = cleanUserNeed(userRequest);
  const requestContext = userNeed ? `\n\nThis is especially relevant for ${userNeed}.` : "";
  const linkedinRequestContext = userNeed
    ? `\n\nThis matters for ${userNeed}. The problem is not just filling a gap. It is protecting time, service quality, and day-to-day momentum.`
    : "";
  const profileContext = getProfileCopyContext();

  const templates = {
    "LinkedIn Post": `When ${categoryPhrase} becomes hard to manage, the impact shows up quickly.

${guide.problem} That can lead to delayed decisions, more admin work, and less time for the work clients or patients actually depend on.

CygniSoft helps businesses grow with the right people and the right software. For ${categoryPhrase}, CygniSoft helps with focused staffing support, custom software, or both depending on what the business needs.${linkedinRequestContext}
${profileContext}

The goal is simple:
${benefitBullets}

${guide.cta}`,

    "Cold Email": `Subject Line
Support with ${category} for [Company Name]

Email Body
Hi [First Name],

I am reaching out because ${categoryPhrase} can become difficult to manage when teams are already busy. ${guide.problem}

CygniSoft helps businesses grow with the right people and the right software. ${guide.solution}${requestContext}
${profileContext}

CTA
Would you be open to a short conversation next week to see if this could help [Company Name]?`,

    "Website Copy": `Hero Headline
${category} for Businesses That Need Clearer Operations

Hero Subheading
${companyDetails.positioning}

Service Overview
${guide.problem} ${guide.solution}
${profileContext}

For ${categoryPhrase}, this can include:
${detailList}

Benefits
${benefits}

CTA
${guide.cta}`,

    "Service Page Content": `Page Headline
${category} Services for Growing Businesses

Intro Copy
${guide.problem} CygniSoft helps businesses address that challenge with staffing services, software solutions, or custom systems that fit the situation.

Who It Helps
${guide.audience}

Common Challenges
- Unclear requirements
- Time spent on manual coordination
- Difficulty keeping people, tools, or information organized

How CygniSoft Helps
${guide.solution}

Relevant areas can include:
${detailList}

Key Benefits
${benefits}

CTA
${guide.cta}`,

    "Product Description": `Product Overview
The ${category} offering from CygniSoft helps ${lowerFirst(guide.audience)} manage work that is often slowed down by manual steps, scattered information, or limited internal capacity.

Problem Solved
${guide.problem}

Key Features
${detailList}
- Simple screens for daily users
- Dashboard or reporting view where useful
- Custom setup based on the client's process and goals

Benefits
${benefits}

Ideal Users
${guide.audience}

CTA
${guide.cta}`,

    "Proposal Draft": `Objective
Support [Client Name] with ${categoryPhrase} by addressing the business need described here: ${userRequest}

Scope
- Review the current process and goals
- Confirm the users, roles, data, or staffing requirements involved
- Define the recommended approach
- Deliver staffing support, software planning, or implementation support based on the agreed scope

Recommended Solution
${guide.solution}

The proposed work can focus on ${guide.details.join(", ")} where they are relevant to the client need.

Benefits
${benefits}

Timeline Placeholder
- Discovery: [Insert timeline]
- Planning and confirmation: [Insert timeline]
- Delivery or implementation: [Insert timeline]
- Review and next steps: [Insert timeline]

Next Steps
1. Confirm the main business goal.
2. Review current challenges and requirements.
3. Agree on scope, timeline, and responsibilities.
4. Begin the first phase of work.`,

    "Campaign Idea": `Campaign Theme
Make ${categoryPhrase} easier to manage before it slows the business down.

Target Audience
${guide.audience}

Core Message
${companyDetails.positioning}

Content Angles
- The common challenge: ${guide.problem}
- The process angle: how ${guide.details[0]} and ${guide.details[1]} can be organized better
- The business value: ${guide.benefits[0]} and ${guide.benefits[1]}
- The action step: invite business owners to discuss one current bottleneck

Suggested Channels
- LinkedIn posts
- Direct outreach emails
- Website service page updates
- Short client follow-up messages

CTA
${guide.cta}`,

    "Social Media Calendar": buildCalendar(category, guide, userRequest),
  };

  return templates[contentType] || templates["LinkedIn Post"];
}

function buildCalendar(category, guide, userRequest) {
  const categoryPhrase = categorySentencePhrases[category] || category.toLowerCase();
  const audiencePhrase = lowerFirst(guide.audience);
  const useCaseCaption = userRequest
    ? `Describe a realistic use case for ${categoryPhrase} based on this angle: ${userRequest}`
    : `Describe a realistic use case for ${categoryPhrase} that shows the problem, the support needed, and the business value.`;
  const days = [
    [
      "Day 1",
      "Problem Awareness",
      `${guide.problem} Share a short post that names the issue clearly and shows why it matters for ${audiencePhrase}.`,
      guide.cta,
    ],
    [
      "Day 2",
      "Service Education",
      `Explain how CygniSoft supports ${categoryPhrase}: ${guide.solution}`,
      "Invite readers to send one challenge they want to solve.",
    ],
    [
      "Day 3",
      "Benefit Spotlight",
      `Focus on this business benefit: ${guide.benefits[0]}. Connect it to time, clarity, or smoother operations.`,
      guide.cta,
    ],
    [
      "Day 4",
      "Process Tip",
      `Share a simple tip about improving ${guide.details[0]} before starting a hiring search, software project, or operational change.`,
      "Ask readers what part of the process takes the most time.",
    ],
    [
      "Day 5",
      "Behind the Service",
      `Explain why ${guide.details[1]} matters and how it can reduce confusion for ${audiencePhrase}.`,
      "Encourage businesses to message CygniSoft with their current situation.",
    ],
    [
      "Day 6",
      "Use Case",
      useCaseCaption,
      "Offer a short discovery conversation.",
    ],
    [
      "Day 7",
      "CTA Recap",
      `${companyDetails.positioning} Recap the week with a direct invitation to discuss staffing, software, or both.`,
      guide.cta,
    ],
  ];

  return days
    .map(
      ([day, topic, caption, cta]) => `${day}
Post Topic: ${topic}
Caption Idea: ${caption}
CTA: ${cta}`
    )
    .join("\n\n");
}

function lowerFirst(value) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function cleanUserNeed(value) {
  if (!value) return "";

  return String(value)
    .trim()
    .replace(/\.$/, "")
    .replace(/^create\s+(a|an)?\s*/i, "")
    .replace(/^(linkedin\s+)?post\s+for\s+/i, "")
    .replace(/^email\s+for\s+/i, "")
    .replace(/^website\s+copy\s+for\s+/i, "")
    .replace(/^describe\s+/i, "")
    .replace(/^plan\s+posts\s+for\s+/i, "")
    .replace(/^reach\s+out\s+to\s+/i, "")
    .trim();
}

function loadCompanyProfile() {
  try {
    if (!fs.existsSync(PROFILE_PATH)) return null;
    return JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function saveCompanyProfile(profile) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2));
  latestCompanyProfile = profile;
}

function clearCompanyProfile() {
  if (fs.existsSync(PROFILE_PATH)) {
    fs.unlinkSync(PROFILE_PATH);
  }
  latestCompanyProfile = null;
}

function formatKnowledgeProfileForPrompt(profile) {
  if (!profile) {
    return "No website knowledge profile has been built yet. Use only the default CygniSoft context and clearly avoid unsupported details.";
  }

  return [
    profile.output ? `Full Saved Profile:\n${profile.output}` : "",
    `Company Overview: ${profile.companyOverview || "Not found"}`,
    `Staffing Services: ${joinOrMissing(profile.staffingServices)}`,
    `Software/IT Services: ${joinOrMissing(profile.softwareItServices)}`,
    `Healthcare Services: ${joinOrMissing(profile.healthcareServices)}`,
    `Technology Services: ${joinOrMissing(profile.technologyServices)}`,
    `Target Industries: ${joinOrMissing(profile.targetIndustries)}`,
    `Existing Website Messaging: ${joinOrMissing(profile.existingWebsiteMessaging)}`,
    `Contact/Location Info: ${joinOrMissing(profile.contactLocationInfo)}`,
    `Current CTAs: ${joinOrMissing(profile.existingCtas)}`,
    `SEO Keywords: ${joinOrMissing(profile.seoKeywords)}`,
    `Trust Signals: ${joinOrMissing(profile.trustSignals)}`,
    `Missing or Weak Areas: ${joinOrMissing(profile.missingInformation)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function getProfileCopyContext() {
  if (!latestCompanyProfile) return "";

  const services = [
    ...(latestCompanyProfile.staffingServices || []),
    ...(latestCompanyProfile.softwareItServices || []),
    ...(latestCompanyProfile.healthcareServices || []),
    ...(latestCompanyProfile.technologyServices || []),
  ].slice(0, 5);
  const ctas = (latestCompanyProfile.existingCtas || []).slice(0, 2);

  if (!services.length && !ctas.length) return "";

  return `\n\nWebsite context to reflect where relevant: ${[
    services.length ? `services found include ${services.join(", ")}` : "",
    ctas.length ? `current CTA language includes ${ctas.join(" / ")}` : "",
  ]
    .filter(Boolean)
    .join("; ")}.`;
}

async function generateWithOpenAI(payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You write ready-to-use marketing content for CygniSoft. Follow the requested content format exactly, make every answer specific to the selected business category, use simple business language, avoid fake claims, and never overpromise.",
        },
        { role: "user", content: buildPrompt(payload) },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function generateAnalysisWithOpenAI({ task, context, format }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You analyze public website text for marketing strategy. Use only the provided page text. Do not invent facts, clients, statistics, guarantees, locations, certifications, or case studies. If something is missing, say it is missing.",
        },
        {
          role: "user",
          content: `${task}\n\nContext:\n${context}\n\nRequired format:\n${format}`,
        },
      ],
      temperature: 0.35,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function handleBuildKnowledge(req, res) {
  try {
    const { urls } = JSON.parse((await readBody(req)) || "{}");
    const urlList = parseUrlList(urls);

    if (!urlList.length) {
      sendJson(res, 400, { error: "Please enter at least one CygniSoft website URL." });
      return;
    }

    const pages = await fetchPages(urlList);
    const successfulPages = pages.filter((page) => page.ok);

    if (!successfulPages.length) {
      sendJson(res, 400, {
        error: "None of the provided pages could be fetched. Please check the URLs and try again.",
        pages,
      });
      return;
    }

    const extracted = extractKnowledgeFromPages(successfulPages);
    const profile = {
      generatedAt: new Date().toISOString(),
      sourceUrls: successfulPages.map((page) => page.url),
      failedUrls: pages.filter((page) => !page.ok).map((page) => ({ url: page.url, error: page.error })),
      ...extracted,
    };

    const aiProfile = await generateKnowledgeProfileWithOpenAI(successfulPages, profile);
    if (aiProfile) {
      profile.aiProfile = aiProfile;
    }

    profile.output = formatCompanyKnowledgeProfile(profile);
    saveCompanyProfile(profile);
    sendJson(res, 200, { profile, output: profile.output, pages });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to build the company knowledge profile." });
  }
}

async function handleUpdateCompanyProfile(req, res) {
  try {
    const { output } = JSON.parse((await readBody(req)) || "{}");
    const profileText = String(output || "").trim();

    if (!profileText) {
      sendJson(res, 400, { error: "Please enter company profile content before saving." });
      return;
    }

    const profile = {
      ...(latestCompanyProfile || {}),
      ...parseManualProfile(profileText),
      updatedAt: new Date().toISOString(),
      source: "manual",
      output: profileText,
    };

    saveCompanyProfile(profile);
    sendJson(res, 200, { profile, output: profile.output });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to save the company profile." });
  }
}

async function handleClearCompanyProfile(_req, res) {
  try {
    clearCompanyProfile();
    sendJson(res, 200, { profile: null, output: "No company knowledge profile has been built yet." });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to clear the company profile." });
  }
}

async function handleWebsiteReview(req, res) {
  try {
    const { url } = JSON.parse((await readBody(req)) || "{}");
    const urlList = parseUrlList(url);

    if (!urlList.length) {
      sendJson(res, 400, { error: "Please enter a website page URL to review." });
      return;
    }

    const [page] = await fetchPages([urlList[0]]);
    if (!page.ok) {
      sendJson(res, 400, { error: `Could not fetch the page: ${page.error}`, page });
      return;
    }

    const aiReview = await generateAnalysisWithOpenAI({
      task: "Review this CygniSoft website page for marketing clarity, content quality, CTAs, and SEO.",
      context: formatPagesForPrompt([page]),
      format: websiteReviewFormat,
    });
    const output = aiReview || formatWebsiteReview(page, extractKnowledgeFromPages([page]));
    sendJson(res, 200, { output, page });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to review the website page." });
  }
}

async function handleCompetitorReview(req, res) {
  try {
    const { cygnisoftUrls, competitorUrls } = JSON.parse((await readBody(req)) || "{}");
    const cygniUrls = parseUrlList(cygnisoftUrls);
    const compUrls = parseUrlList(competitorUrls);

    if (!cygniUrls.length && !latestCompanyProfile) {
      sendJson(res, 400, {
        error:
          "Please enter at least one CygniSoft URL or build the company knowledge profile before running competitor review.",
      });
      return;
    }

    if (!compUrls.length) {
      sendJson(res, 400, { error: "Please enter at least one competitor website URL." });
      return;
    }

    const cygniPages = cygniUrls.length ? await fetchPages(cygniUrls) : [];
    const competitorPages = await fetchPages(compUrls);
    const goodCygniPages = cygniPages.filter((page) => page.ok);
    const goodCompetitorPages = competitorPages.filter((page) => page.ok);

    if (!goodCompetitorPages.length) {
      sendJson(res, 400, {
        error: "None of the competitor pages could be fetched. Please check the URLs and try again.",
        pages: competitorPages,
      });
      return;
    }

    const context = [
      latestCompanyProfile ? `Existing CygniSoft knowledge profile:\n${formatKnowledgeProfileForPrompt(latestCompanyProfile)}` : "",
      goodCygniPages.length ? `CygniSoft pages:\n${formatPagesForPrompt(goodCygniPages)}` : "",
      `Competitor pages:\n${formatPagesForPrompt(goodCompetitorPages)}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const aiReview = await generateAnalysisWithOpenAI({
      task:
        "Compare CygniSoft with the competitor website pages. Use only the provided text and clearly identify missing information instead of inventing it.",
      context,
      format: competitorReviewFormat,
    });
    const output = aiReview || formatCompetitorReview(goodCygniPages, goodCompetitorPages);
    sendJson(res, 200, { output, cygnisoftPages: cygniPages, competitorPages });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to complete competitor review." });
  }
}

async function handleMarketTrends(req, res) {
  try {
    const payload = JSON.parse((await readBody(req)) || "{}");
    const { industry, region, researchFocus, notes } = payload;

    if (!marketIndustries.includes(industry)) {
      sendJson(res, 400, { error: "Please select a valid industry." });
      return;
    }

    if (!researchFocusOptions.includes(researchFocus)) {
      sendJson(res, 400, { error: "Please select a valid research focus." });
      return;
    }

    if (!region || !String(region).trim()) {
      sendJson(res, 400, { error: "Please enter a region for the market research." });
      return;
    }

    const cleanPayload = {
      industry,
      region: String(region).trim(),
      researchFocus,
      notes: String(notes || "").trim(),
    };

    const aiOutput = await generateAnalysisWithOpenAI({
      task:
        "Create Version 4 market and hiring trend research for CygniSoft. No live web search is available unless sources are explicitly provided. Use the saved company profile when present, avoid exact live claims, and keep the output practical for staffing and software marketing decisions.",
      context: buildMarketResearchPromptContext(cleanPayload),
      format: marketResearchFormat,
    });
    const output = aiOutput || buildMarketTrendsFallback(cleanPayload);
    sendJson(res, 200, { output, source: aiOutput ? "openai" : "local", usingProfile: Boolean(latestCompanyProfile) });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to generate market and hiring trend research." });
  }
}

async function handleLeadCampaignPlan(req, res) {
  try {
    const payload = JSON.parse((await readBody(req)) || "{}");
    const { service, targetAudience, region, campaignGoal, campaignDuration, notes } = payload;

    if (!plannerServices.includes(service)) {
      sendJson(res, 400, { error: "Please select a valid service or product." });
      return;
    }

    if (!targetAudiences.includes(targetAudience)) {
      sendJson(res, 400, { error: "Please select a valid target audience." });
      return;
    }

    if (!campaignGoals.includes(campaignGoal)) {
      sendJson(res, 400, { error: "Please select a valid campaign goal." });
      return;
    }

    if (!campaignDurations.includes(campaignDuration)) {
      sendJson(res, 400, { error: "Please select a valid campaign duration." });
      return;
    }

    if (!region || !String(region).trim()) {
      sendJson(res, 400, { error: "Please enter a campaign region." });
      return;
    }

    const cleanPayload = {
      service,
      targetAudience,
      region: String(region).trim(),
      campaignGoal,
      campaignDuration,
      notes: String(notes || "").trim(),
    };

    const aiOutput = await generateAnalysisWithOpenAI({
      task:
        "Create Version 5 lead generation and campaign planning output for CygniSoft. Do not scrape personal data, do not create private contact lists, do not promise guaranteed leads or sales, and keep outreach professional with personalization placeholders.",
      context: buildLeadPlannerPromptContext(cleanPayload),
      format: leadPlannerFormat,
    });
    const output = aiOutput || buildLeadPlannerFallback(cleanPayload);
    sendJson(res, 200, { output, source: aiOutput ? "openai" : "local", usingProfile: Boolean(latestCompanyProfile) });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: error.message || "Unable to generate lead and campaign plan." });
  }
}

async function fetchPages(urls) {
  const pages = [];

  for (const url of urls) {
    try {
      const normalizedUrl = normalizeUrl(url);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(normalizedUrl, {
        headers: {
          "User-Agent": "CygniSoftMarketingAgent/2.0",
          Accept: "text/html,application/xhtml+xml,text/plain;q=0.8,*/*;q=0.5",
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        pages.push({ url: normalizedUrl, ok: false, error: `HTTP ${response.status}` });
        continue;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
        pages.push({ url: normalizedUrl, ok: false, error: `Unsupported content type: ${contentType}` });
        continue;
      }

      const html = await response.text();
      const extracted = extractPageText(html);
      pages.push({ url: normalizedUrl, ok: true, ...extracted });
    } catch (error) {
      pages.push({
        url,
        ok: false,
        error: error.name === "AbortError" ? "Request timed out" : error.message,
      });
    }
  }

  return pages;
}

function extractPageText(html) {
  const title = decodeEntities((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim());
  const description =
    getMetaContent(html, "description") ||
    getMetaContent(html, "og:description") ||
    getMetaContent(html, "twitter:description");
  const headings = Array.from(html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi))
    .map((match) => cleanText(match[1]))
    .filter(Boolean)
    .slice(0, 30);
  const links = Array.from(html.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi))
    .map((match) => cleanText(match[1]))
    .filter((text) => text && text.length <= 80)
    .slice(0, 80);
  const visibleText = cleanText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );

  return {
    title,
    description: cleanText(description || ""),
    headings,
    links,
    text: visibleText.slice(0, 24000),
  };
}

function extractKnowledgeFromPages(pages) {
  const allText = pages.map((page) => `${page.title} ${page.description} ${page.headings.join(" ")} ${page.text}`).join(" ");
  const allLinks = pages.flatMap((page) => page.links || []);

  return {
    companyOverview: extractSummary(pages),
    staffingServices: findMatches(allText, staffingTerms),
    softwareItServices: findMatches(allText, softwareTerms),
    healthcareServices: findMatches(allText, healthcareTerms),
    technologyServices: findMatches(allText, technologyTerms),
    targetIndustries: findMatches(allText, industryTerms),
    existingWebsiteMessaging: extractMessaging(pages),
    contactLocationInfo: extractContactInfo(allText),
    existingCtas: extractCtas(allLinks.concat(extractCtaSentences(allText))),
    seoKeywords: extractKeywords(allText),
    trustSignals: findMatches(allText, trustTerms),
    missingInformation: detectMissingAreas(allText),
    recommendedImprovements: buildRecommendedImprovements(allText),
  };
}

async function generateKnowledgeProfileWithOpenAI(pages, profile) {
  return generateAnalysisWithOpenAI({
    task:
      "Create a structured CygniSoft company knowledge profile from the provided public website text. Use only extracted facts and call out missing information clearly.",
    context: `${formatPagesForPrompt(pages)}\n\nHeuristic extraction:\n${formatCompanyKnowledgeProfile(profile)}`,
    format: companyKnowledgeFormat,
  });
}

function formatCompanyKnowledgeProfile(profile) {
  return `Company Overview
${profile.companyOverview || "Not found in the provided pages."}

Services Found
- Staffing services: ${joinOrMissing(profile.staffingServices)}
- Software/IT services: ${joinOrMissing(profile.softwareItServices)}
- Healthcare services: ${joinOrMissing(profile.healthcareServices)}
- Technology services: ${joinOrMissing(profile.technologyServices)}

Industries Found
${bulletList(profile.targetIndustries)}

Products/Solutions Found
${bulletList([...(profile.softwareItServices || []), ...(profile.technologyServices || [])])}

Target Clients
${inferTargetClients(profile)}

Locations/Contact Info
${bulletList(profile.contactLocationInfo)}

Existing CTAs
${bulletList(profile.existingCtas)}

SEO Keywords
${bulletList(profile.seoKeywords)}

Trust Signals
${bulletList(profile.trustSignals)}

Missing Information
${bulletList(profile.missingInformation)}

Recommended Improvements
${bulletList(profile.recommendedImprovements)}`;
}

function formatWebsiteReview(page, profile) {
  return `Page Summary
${page.title || "Untitled page"}: ${page.description || profile.companyOverview || "The page content was fetched, but a clear summary was not found."}

What Is Good
${bulletList(profile.existingWebsiteMessaging.length ? profile.existingWebsiteMessaging : ["The page provides some visible company or service messaging."])}

What Is Unclear
${bulletList(profile.missingInformation)}

Missing Sections
${bulletList(profile.missingInformation)}

CTA Improvements
${bulletList([
    profile.existingCtas.length
      ? "Make the main CTA more specific to the page goal and repeat it near the top and bottom of the page."
      : "Add a clear primary CTA such as Contact CygniSoft, Request staffing support, or Discuss a software project.",
    "Add a secondary CTA for visitors who are not ready to contact yet, such as View services or Share your requirements.",
  ])}

SEO Suggestions
${bulletList(profile.seoKeywords.length ? profile.seoKeywords.map((keyword) => `Use "${keyword}" in headings, meta text, or supporting copy where accurate.`) : ["Add clearer service keywords in headings and page titles."])}

Content Improvement Suggestions
${bulletList(profile.recommendedImprovements)}`;
}

function formatCompetitorReview(cygniPages, competitorPages) {
  const cygniProfile = cygniPages.length ? extractKnowledgeFromPages(cygniPages) : latestCompanyProfile;
  const compProfile = extractKnowledgeFromPages(competitorPages);

  return `Executive Summary
Competitor pages were reviewed against the available CygniSoft website knowledge. This local review uses visible page text only and does not infer proof that was not present.

CygniSoft Positioning
${companyDetails.positioning}

Competitor Positioning
${compProfile.companyOverview || "Competitor positioning was not clearly found in the fetched pages."}

What Competitors Do Better
${bulletList(compProfile.trustSignals.length ? ["Competitors show visible trust signals that CygniSoft should evaluate.", ...compProfile.trustSignals] : ["No clear competitor trust signals were extracted from the fetched pages."])}

What CygniSoft Does Better
${bulletList(cygniProfile ? [cygniProfile.companyOverview, ...((cygniProfile.staffingServices || []).slice(0, 3)), ...((cygniProfile.softwareItServices || []).slice(0, 3))].filter(Boolean) : ["Build a CygniSoft knowledge profile to identify strengths more clearly."])}

Marketing Gaps
${bulletList(cygniProfile?.missingInformation || ["CygniSoft gaps could not be fully assessed without fetched CygniSoft pages or a saved knowledge profile."])}

Website Improvements
${bulletList(cygniProfile?.recommendedImprovements || ["Build the CygniSoft company knowledge profile first, then rerun this review."])}

SEO Suggestions
${bulletList((compProfile.seoKeywords || []).slice(0, 10).map((keyword) => `Review whether "${keyword}" is relevant to CygniSoft pages.`))}

CTA Suggestions
${bulletList(compProfile.existingCtas.length ? compProfile.existingCtas.map((cta) => `Competitor CTA observed: ${cta}`) : ["Add direct CTAs for staffing, software projects, and consultation requests."])}

Priority Action Plan
${bulletList([
    "Clarify CygniSoft's main service categories on key pages.",
    "Add proof only where real evidence exists, such as testimonials, certifications, or project examples.",
    "Strengthen CTAs by matching them to each page's intent.",
    "Add service-specific SEO headings for staffing, healthcare staffing, software development, and automation.",
  ])}`;
}

function buildMarketResearchPromptContext({ industry, region, researchFocus, notes }) {
  return `CygniSoft profile:
${formatKnowledgeProfileForPrompt(latestCompanyProfile)}

Market research inputs:
Industry: ${industry}
Region: ${region}
Research Focus: ${researchFocus}
Notes: ${notes || "None provided"}

Important label:
If no verified sources are included, start the output with: AI-generated research based on provided context and general market knowledge.

Rules:
- Do not invent exact statistics, job counts, company names, or live claims.
- Keep recommendations tied to CygniSoft staffing and software services.
- Include Sources / Notes for future web search citations.`;
}

function buildLeadPlannerPromptContext({ service, targetAudience, region, campaignGoal, campaignDuration, notes }) {
  return `CygniSoft profile:
${formatKnowledgeProfileForPrompt(latestCompanyProfile)}

Lead and campaign inputs:
Service/Product: ${service}
Target Audience: ${targetAudience}
Region: ${region}
Campaign Goal: ${campaignGoal}
Campaign Duration: ${campaignDuration}
Notes: ${notes || "None provided"}

Safety rules:
- Do not scrape personal data.
- Do not generate private contact lists.
- Use safe lead source categories only.
- Do not promise guaranteed leads or sales.
- Include placeholders such as [Company Name], [Contact Name], [Industry], [Pain Point].
- Make outputs ready to copy and use.`;
}

function buildMarketTrendsFallback({ industry, region, researchFocus, notes }) {
  const industryPlan = marketPlaybooks[industry] || marketPlaybooks["General Market"];
  const profileNote = latestCompanyProfile
    ? "Saved CygniSoft knowledge was considered when shaping these recommendations."
    : "No saved CygniSoft company profile is available yet, so this uses the default CygniSoft context.";
  const notesLine = notes ? `User notes considered: ${notes}` : "No additional notes were provided.";

  return `AI-generated research based on provided context and general market knowledge.

Executive Summary
For ${industry} in ${region}, the safest opportunity is to promote services that solve visible business pressure: staffing gaps, manual admin work, disconnected systems, and clearer client or candidate communication. ${profileNote} Focus requested: ${researchFocus}. ${notesLine}

Current Hiring Trends
${bulletList(industryPlan.hiringTrends)}

In-Demand Roles
${bulletList(industryPlan.roles)}

Industries Showing Demand
${bulletList(industryPlan.demandIndustries)}

Software / Automation Needs
${bulletList(industryPlan.softwareNeeds)}

Opportunities for CygniSoft Staffing Services
${bulletList(industryPlan.staffingOpportunities)}

Opportunities for CygniSoft Software Services
${bulletList(industryPlan.softwareOpportunities)}

Recommended Services to Promote
${bulletList(industryPlan.servicesToPromote)}

Suggested Marketing Angles
${bulletList(industryPlan.marketingAngles)}

Suggested LinkedIn Content Ideas
${bulletList(industryPlan.linkedinIdeas)}

Suggested Outreach Targets
${bulletList(industryPlan.outreachTargets)}

Risks / Uncertainties
${bulletList([
    "No live web search or verified source feed is connected in this app output.",
    "Do not mention exact job counts, growth rates, or employer names unless separately verified.",
    "Regional demand can change quickly, especially in seasonal services and healthcare staffing.",
  ])}

Sources / Notes
- No live sources were used in this generated output.
- Add verified job board, labor market, industry association, or government sources here if web search is added later.`;
}

function buildLeadPlannerFallback({ service, targetAudience, region, campaignGoal, campaignDuration, notes }) {
  const plan = campaignPlaybooks[service] || campaignPlaybooks["Custom Software Development"];
  const profileNote = latestCompanyProfile
    ? "Use the saved CygniSoft knowledge profile to keep service descriptions aligned with current company messaging."
    : "Build the CygniSoft company knowledge profile for more company-specific language.";
  const cadence = buildCampaignCadence(campaignDuration);
  const notesLine = notes ? `Campaign notes: ${notes}` : "No extra campaign notes provided.";

  return `Ideal Customer Profile
${targetAudience} in ${region} that are likely dealing with ${plan.painPoints[0].toLowerCase()} and need a professional, practical partner. ${profileNote}

Lead Targeting Strategy
${bulletList([
    `Focus on ${targetAudience} by industry category, service need, and public company fit.`,
    `Prioritize organizations where ${service} connects directly to ${campaignGoal.toLowerCase()}.`,
    "Use public business directories, LinkedIn company searches, association websites, event pages, and inbound website inquiries.",
  ])}

Where to Find Leads
${bulletList(plan.leadSources)}

Campaign Positioning
${companyDetails.positioning} For this campaign, position ${service} as a way for ${targetAudience} to reduce operational pressure without overcomplicating the process.

Main Pain Points
${bulletList(plan.painPoints)}

Value Proposition
CygniSoft helps ${targetAudience} in ${region} address [Pain Point] through ${service}, with clear communication, simple next steps, and solutions shaped around real business needs.

Outreach Message
Hi [Contact Name], I noticed [Company Name] works in [Industry]. If [Pain Point] is taking time away from your team, CygniSoft may be able to help with ${service}. Would it be useful to have a short conversation about what you are trying to improve?

Cold Email Sequence
${buildColdEmailSequence(service, targetAudience, campaignGoal)}

LinkedIn Message Sequence
${buildLinkedInSequence(service)}

LinkedIn Post Ideas
${bulletList(plan.postIdeas)}

Follow-Up Plan
${bulletList(cadence)}

Call-to-Action
Would you be open to a short consultation to discuss whether ${service} fits [Company Name]'s current needs?

Success Metrics
${bulletList([
    "Number of relevant companies identified by category, not private personal data collected",
    "Connection acceptance or reply rate",
    "Consultation calls booked",
    "Qualified opportunities created",
    "Content engagement from target audience categories",
  ])}

Next Steps
${bulletList([
    `Create a small list of target company categories in ${region}.`,
    "Write one email version and one LinkedIn message version using the placeholders.",
    `Run the campaign for ${campaignDuration} and review replies before expanding.`,
    "Update messaging based on real objections and questions.",
  ])}

Notes
${notesLine}

Safety Reminder
- Do not scrape personal data or generate private contact lists.
- Use public company-level research and professional outreach only.
- Do not promise guaranteed leads or sales.`;
}

function buildCampaignCadence(duration) {
  if (duration === "7 days") {
    return ["Day 1: Send first outreach message.", "Day 3: Send a short value-based follow-up.", "Day 6 or 7: Send a final polite check-in."];
  }

  if (duration === "14 days") {
    return [
      "Day 1: Send first outreach message.",
      "Day 4: Follow up with one practical pain point.",
      "Day 8: Share a short service or product angle.",
      "Day 13 or 14: Send a final polite check-in.",
    ];
  }

  return [
    "Week 1: Send first outreach and publish awareness content.",
    "Week 2: Follow up with pain-point messaging and service education.",
    "Week 3: Share product/service use cases and invite conversations.",
    "Week 4: Send final follow-up and review campaign performance.",
  ];
}

function buildColdEmailSequence(service, targetAudience, campaignGoal) {
  return `Email 1 - Introduction
Subject: Quick question about ${service}
Hi [Contact Name],

I am reaching out because many ${targetAudience.toLowerCase()} are looking for better ways to handle [Pain Point]. CygniSoft helps businesses grow with the right people and the right software, and ${service} may be relevant for [Company Name].

Would you be open to a short conversation?

Email 2 - Follow-up
Subject: Re: ${service} for [Company Name]
Hi [Contact Name],

Just following up. If [Pain Point] is currently creating delays, extra admin work, or missed opportunities, CygniSoft can help you explore a practical next step.

Is this worth discussing next week?

Email 3 - Final Check-in
Subject: Should I close the loop?
Hi [Contact Name],

I do not want to crowd your inbox. If ${service} is not a priority right now, no problem. If ${campaignGoal.toLowerCase()} is something you are considering, I would be happy to share a simple starting point.

Best,
[Your Name]`;
}

function buildLinkedInSequence(service) {
  return `Message 1 - Connection Request
Hi [Contact Name], I work with CygniSoft on staffing and software solutions. I would be glad to connect and follow what [Company Name] is building.

Message 2 - After Connection
Thanks for connecting, [Contact Name]. If [Company Name] is looking at [Pain Point], CygniSoft may be able to help with ${service}. Happy to share a quick idea if useful.

Message 3 - Follow-up
I wanted to follow up with one practical thought: teams usually get better results when the problem is defined clearly before choosing a staffing or software path. Would a short conversation be useful?`;
}

function parseUrlList(value) {
  const raw = Array.isArray(value) ? value.join("\n") : String(value || "");
  return raw
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map(normalizeUrl);
}

function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
}

function cleanText(value) {
  return decodeEntities(String(value || ""))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function getMetaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
  return cleanText(html.match(pattern)?.[1] || "");
}

function findMatches(text, terms) {
  const lower = text.toLowerCase();
  return terms.filter((term) => lower.includes(term.toLowerCase()));
}

function extractSummary(pages) {
  const candidates = pages
    .flatMap((page) => [page.description, ...(page.headings || []), page.text.split(". ").find((sentence) => /cygnisoft|staffing|software|solution/i.test(sentence))])
    .filter(Boolean)
    .map((item) => cleanText(item))
    .filter((item) => item.length > 30);
  return candidates[0] || companyDetails.summary;
}

function extractMessaging(pages) {
  return unique(
    pages
      .flatMap((page) => [page.title, page.description, ...(page.headings || [])])
      .filter(Boolean)
      .map(cleanText)
      .filter((item) => item.length > 8)
  ).slice(0, 12);
}

function extractContactInfo(text) {
  const emails = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  const phones = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/g) || [];
  const locationHints = findMatches(text, ["Canada", "Toronto", "Ontario", "United States", "USA", "Remote", "Mississauga", "Brampton"]);
  return unique([...emails, ...phones.map(cleanText), ...locationHints]).slice(0, 12);
}

function extractCtas(values) {
  return unique(
    values
      .map(cleanText)
      .filter((text) => /contact|call|book|schedule|apply|get started|request|learn more|talk|hire|submit|register/i.test(text))
  ).slice(0, 12);
}

function extractCtaSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => /contact|book|request|apply|get started|talk to|schedule/i.test(sentence))
    .slice(0, 20);
}

function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 4 && !stopWords.has(word));
  const counts = new Map();
  words.forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18)
    .map(([word]) => word);
}

function detectMissingAreas(text) {
  const checks = [
    ["Clear service proof or case studies", /case stud|portfolio|project example|testimonial/i],
    ["Specific industries served", /industr|healthcare|clinic|small business|enterprise|snow/i],
    ["Contact details", /contact|phone|email|address/i],
    ["Locations served", /location|toronto|ontario|canada|usa|remote/i],
    ["Trust signals", /certified|partner|years|award|client|testimonial|review/i],
    ["Clear primary CTA", /contact|book|schedule|request|get started/i],
  ];

  return checks.filter(([, pattern]) => !pattern.test(text)).map(([label]) => label);
}

function buildRecommendedImprovements(text) {
  const improvements = [
    "Add clearer service sections for staffing, software development, healthcare, and technology services.",
    "Use page-specific CTAs that match the visitor's intent.",
    "Add real trust signals only if CygniSoft can verify them.",
    "Clarify target industries and ideal clients on service pages.",
    "Add concise proof points, project examples, or process steps where available.",
  ];

  if (/healthcare/i.test(text)) {
    improvements.push("Separate healthcare staffing services from healthcare software so each audience can find the right path.");
  }

  return improvements;
}

function inferTargetClients(profile) {
  const clients = [];
  if ((profile.staffingServices || []).length) clients.push("Businesses hiring healthcare, technical, or general staff");
  if ((profile.softwareItServices || []).length) clients.push("Businesses that need websites, web apps, dashboards, portals, or automation");
  if ((profile.healthcareServices || []).length) clients.push("Clinics, healthcare staffing teams, and care organizations");
  return bulletList(clients.length ? clients : ["Target clients were not clearly found in the provided pages."]);
}

function parseManualProfile(output) {
  const sectionMap = extractSections(output);
  const products = splitList(sectionMap["Products/Solutions Found"]);
  const services = splitList(sectionMap["Services Found"]);

  return {
    companyOverview: sectionMap["Company Overview"] || "",
    staffingServices: unique([...filterByTerms(services, staffingTerms), ...splitList(sectionMap["Staffing services"])]),
    softwareItServices: unique([
      ...filterByTerms(services, softwareTerms),
      ...splitList(sectionMap["Software services"]),
      ...products,
    ]),
    healthcareServices: unique(filterByTerms(services.concat(products), healthcareTerms)),
    technologyServices: unique(filterByTerms(services.concat(products), technologyTerms)),
    targetIndustries: splitList(sectionMap["Industries Found"] || sectionMap["Industries"]),
    targetClients: splitList(sectionMap["Target Clients"]),
    contactLocationInfo: splitList(sectionMap["Locations/Contact Info"] || sectionMap["Locations/contact details"]),
    existingCtas: splitList(sectionMap["Existing CTAs"] || sectionMap["Current CTAs"]),
    seoKeywords: splitList(sectionMap["SEO Keywords"] || sectionMap["Keywords"]),
    trustSignals: splitList(sectionMap["Trust Signals"]),
    missingInformation: splitList(sectionMap["Missing Information"]),
    recommendedImprovements: splitList(sectionMap["Recommended Improvements"]),
  };
}

function extractSections(output) {
  const knownHeadings = [
    "Company Overview",
    "Services Found",
    "Staffing services",
    "Software services",
    "Industries Found",
    "Industries",
    "Products/Solutions Found",
    "Target Clients",
    "Locations/Contact Info",
    "Locations/contact details",
    "Existing CTAs",
    "Current CTAs",
    "SEO Keywords",
    "Keywords",
    "Trust Signals",
    "Missing Information",
    "Recommended Improvements",
  ];
  const lines = output.split(/\r?\n/);
  const sections = {};
  let currentHeading = "";

  lines.forEach((line) => {
    const trimmed = line.trim();
    const matchedHeading = knownHeadings.find((heading) => heading.toLowerCase() === trimmed.toLowerCase());
    if (matchedHeading) {
      currentHeading = matchedHeading;
      sections[currentHeading] = "";
      return;
    }

    if (currentHeading) {
      sections[currentHeading] = `${sections[currentHeading]}\n${line}`.trim();
    }
  });

  return sections;
}

function splitList(value) {
  if (!value) return [];
  return unique(
    String(value)
      .split(/\n|,/)
      .map((item) => item.replace(/^-\s*/, "").trim())
      .filter((item) => item && !/^not found/i.test(item))
  );
}

function filterByTerms(items, terms) {
  return items.filter((item) => terms.some((term) => item.toLowerCase().includes(term.toLowerCase())));
}

function formatPagesForPrompt(pages) {
  return pages
    .map(
      (page) => `URL: ${page.url}
Title: ${page.title || "Not found"}
Description: ${page.description || "Not found"}
Headings: ${(page.headings || []).join(" | ") || "Not found"}
Visible Text:
${page.text.slice(0, 12000)}`
    )
    .join("\n\n---\n\n");
}

function joinOrMissing(items) {
  return items && items.length ? items.join(", ") : "Not found in the provided pages";
}

function bulletList(items) {
  return items && items.length ? items.map((item) => `- ${item}`).join("\n") : "- Not found in the provided pages";
}

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

const staffingTerms = [
  "Healthcare staffing",
  "IT staffing",
  "Technical staffing",
  "General staffing",
  "Candidate sourcing",
  "Recruitment support",
  "Hiring",
  "Careers",
];

const softwareTerms = [
  "Website development",
  "Web app development",
  "Dashboard",
  "Portal",
  "Business automation",
  "AI tools",
  "Resume parser",
  "Custom software",
  "ERP",
  "Snow removal management system",
];

const healthcareTerms = ["Healthcare staffing", "Healthcare software", "Clinic", "Care", "Nursing", "Medical"];
const technologyTerms = ["Cybersecurity", "ERP", "Cloud", "AI", "Automation", "Dashboard", "Portal", "Web app"];
const industryTerms = ["Healthcare", "Small business", "Staffing", "Snow removal", "Technology", "IT", "Recruitment"];
const trustTerms = ["Testimonials", "Case studies", "Certified", "Partner", "Clients", "Years", "Reviews", "Portfolio"];

const stopWords = new Set([
  "about",
  "after",
  "again",
  "being",
  "business",
  "click",
  "company",
  "contact",
  "could",
  "every",
  "from",
  "have",
  "help",
  "helps",
  "home",
  "learn",
  "more",
  "other",
  "page",
  "right",
  "services",
  "their",
  "there",
  "these",
  "through",
  "with",
  "your",
]);

const companyKnowledgeFormat = `Company Overview
Services Found
Industries Found
Products/Solutions Found
Target Clients
Locations/Contact Info
Existing CTAs
SEO Keywords
Trust Signals
Missing Information
Recommended Improvements`;

const websiteReviewFormat = `Page Summary
What is good
What is unclear
Missing sections
CTA improvements
SEO suggestions
Content improvement suggestions`;

const competitorReviewFormat = `Executive Summary
CygniSoft Positioning
Competitor Positioning
What Competitors Do Better
What CygniSoft Does Better
Marketing Gaps
Website Improvements
SEO Suggestions
CTA Suggestions
Priority Action Plan`;

const marketResearchFormat = `Executive Summary
Current Hiring Trends
In-Demand Roles
Industries Showing Demand
Software / Automation Needs
Opportunities for CygniSoft Staffing Services
Opportunities for CygniSoft Software Services
Recommended Services to Promote
Suggested Marketing Angles
Suggested LinkedIn Content Ideas
Suggested Outreach Targets
Risks / Uncertainties
Sources / Notes`;

const leadPlannerFormat = `Ideal Customer Profile
Lead Targeting Strategy
Where to Find Leads
Campaign Positioning
Main Pain Points
Value Proposition
Outreach Message
Cold Email Sequence
LinkedIn Message Sequence
LinkedIn Post Ideas
Follow-Up Plan
Call-to-Action
Success Metrics
Next Steps`;

const marketPlaybooks = {
  Healthcare: {
    hiringTrends: ["Demand often centers on dependable clinical, admin, and support coverage.", "Healthcare teams may need help reducing manager workload during recruitment.", "Scheduling and candidate communication remain common operational pressure points."],
    roles: ["Nurses and care support roles", "Clinic administrators", "Medical office assistants", "Healthcare staffing coordinators"],
    demandIndustries: ["Clinics", "Healthcare staffing agencies", "Long-term care and community care", "Private healthcare offices"],
    softwareNeeds: ["Candidate registration systems", "Staffing dashboards", "Shift or request tracking", "Healthcare staffing software"],
    staffingOpportunities: ["Promote healthcare staffing support for clinics and care providers.", "Offer candidate sourcing and recruitment coordination.", "Position CygniSoft as a practical partner for staffing conversations."],
    softwareOpportunities: ["Promote healthcare staffing software and candidate portals.", "Offer dashboards for requests, candidate status, and client communication.", "Package resume parsing with healthcare recruitment workflows."],
    servicesToPromote: ["Healthcare Staffing", "Healthcare Staffing Software", "Candidate Registration System", "Resume Parser"],
    marketingAngles: ["Reliable staffing starts with organized recruiting.", "Reduce admin pressure while keeping care teams focused.", "Connect staffing services with software workflows."],
    linkedinIdeas: ["Post about clinics struggling with reliable coverage.", "Explain why candidate registration workflows matter.", "Share a simple healthcare staffing checklist."],
    outreachTargets: ["Clinics", "Healthcare staffing agencies", "Long-term care facilities", "Care coordinators and healthcare operations leaders"],
  },
  "IT / Technology": {
    hiringTrends: ["Teams often need technical talent for web, software, support, automation, and cybersecurity-related work.", "Hiring can slow when roles require specific skills and screening.", "Businesses may compare staffing support with software outsourcing depending on project needs."],
    roles: ["Web developers", "Software developers", "IT support roles", "Automation and AI workflow specialists", "Cybersecurity analysts"],
    demandIndustries: ["IT companies", "Startups", "Software teams", "Businesses modernizing internal systems"],
    softwareNeeds: ["Custom web apps", "Dashboards", "Automation tools", "AI assistants", "Cybersecurity or ERP service pages"],
    staffingOpportunities: ["Promote IT and technical staffing for hard-to-fill roles.", "Offer sourcing support for project-specific technical needs.", "Create outreach for startups that need flexible hiring support."],
    softwareOpportunities: ["Promote custom web apps, dashboards, AI tools, and automation.", "Offer discovery calls for manual workflow replacement.", "Position software builds as practical business tools."],
    servicesToPromote: ["IT / Technical Staffing", "Custom Software Development", "Web App Development", "AI Automation"],
    marketingAngles: ["Hiring and software decisions both start with clarity.", "Technical roles need better screening and sharper requirements.", "Automation can reduce repetitive work before teams add headcount."],
    linkedinIdeas: ["Post about technical hiring bottlenecks.", "Explain when to hire versus build software.", "Share examples of admin tasks that can be automated."],
    outreachTargets: ["Startups", "IT companies", "Small technology teams", "Operations leaders with software backlogs"],
  },
  "Staffing & Recruitment": {
    hiringTrends: ["Recruitment teams often need better candidate flow and cleaner applicant information.", "Resume review, candidate registration, and client updates can become manual bottlenecks.", "Staffing firms may need both sourcing support and software workflows."],
    roles: ["Recruiters", "Staffing coordinators", "Candidate sourcers", "Account managers", "Operations assistants"],
    demandIndustries: ["Staffing agencies", "Recruitment agencies", "Healthcare staffing", "General staffing"],
    softwareNeeds: ["Resume parser", "Candidate registration system", "Client portals", "Recruitment dashboards"],
    staffingOpportunities: ["Promote candidate sourcing support.", "Offer recruitment coordination for agencies with overflow needs.", "Position CygniSoft for healthcare, IT, and general staffing support."],
    softwareOpportunities: ["Promote resume parser and registration tools.", "Offer portals for candidate and client workflows.", "Build dashboards for pipeline visibility."],
    servicesToPromote: ["Staffing Services", "Resume Parser", "Candidate Registration System", "Healthcare Staffing Software"],
    marketingAngles: ["Better staffing starts with better candidate information.", "Reduce resume review time and candidate admin.", "Combine recruiting support with software workflows."],
    linkedinIdeas: ["Post about resume parsing for busy recruiters.", "Share candidate registration workflow tips.", "Explain how staffing agencies can reduce manual follow-up."],
    outreachTargets: ["Staffing agencies", "Recruitment agencies", "Healthcare staffing agencies", "HR service providers"],
  },
  "Small Business": {
    hiringTrends: ["Small businesses often need flexible hiring help for admin, operations, service, and technical work.", "Owners may need software support to reduce manual tracking.", "Budgets often favor practical, phased improvements."],
    roles: ["Administrative assistants", "Operations coordinators", "Customer support roles", "Web or software contractors", "General staff"],
    demandIndustries: ["Local service businesses", "Professional services", "Retail and operations teams", "Small healthcare offices"],
    softwareNeeds: ["Websites", "Web apps", "Dashboards", "Automation", "Client portals"],
    staffingOpportunities: ["Promote general staffing for small teams.", "Offer candidate sourcing for owner-led hiring.", "Position hiring support as time-saving for operators."],
    softwareOpportunities: ["Promote websites and simple web apps.", "Offer automation for repeat admin tasks.", "Build dashboards for owner visibility."],
    servicesToPromote: ["General Staffing", "Website Development", "Custom Web App", "AI Automation"],
    marketingAngles: ["Small teams need simple support that saves time.", "The right person and the right software can both unlock growth.", "Start with one process that slows the business down."],
    linkedinIdeas: ["Post about small business hiring stress.", "Share automation ideas for owners.", "Explain the value of a practical website or portal."],
    outreachTargets: ["Small businesses", "Local service businesses", "Owner-operated companies", "Professional service firms"],
  },
  "Logistics / Warehouse": {
    hiringTrends: ["Operational teams may need reliable general staffing and clearer shift coordination.", "Manual scheduling and job tracking can create delays.", "Warehouse and logistics businesses often value practical process visibility."],
    roles: ["Warehouse associates", "Dispatch coordinators", "Operations assistants", "Inventory support roles", "General labor"],
    demandIndustries: ["Warehouses", "Logistics companies", "Distribution teams", "Local operations businesses"],
    softwareNeeds: ["Scheduling dashboards", "Operations portals", "Job tracking tools", "Automation for routine updates"],
    staffingOpportunities: ["Promote general staffing for warehouse and operations roles.", "Offer recruitment support for seasonal or recurring hiring needs.", "Support small logistics teams with candidate sourcing."],
    softwareOpportunities: ["Promote dashboards and portals for operational visibility.", "Offer automation for follow-ups and status updates.", "Build internal tools for job or shift tracking."],
    servicesToPromote: ["General Staffing", "Custom Web App", "Dashboards", "AI Automation"],
    marketingAngles: ["Operational delays often start with staffing and tracking gaps.", "Reduce manual coordination before it affects customers.", "Give teams clearer visibility into daily work."],
    linkedinIdeas: ["Post about warehouse staffing coordination.", "Share a dashboard use case for operations teams.", "Explain how automation can reduce repeated updates."],
    outreachTargets: ["Warehouse operators", "Logistics companies", "Distribution centers", "Operations managers"],
  },
  "Snow Removal / Local Services": {
    hiringTrends: ["Seasonal and weather-driven businesses often need dependable crews and fast coordination.", "Service demand can spike quickly, making manual tracking harder.", "Local service companies benefit from clear route, job, and customer visibility."],
    roles: ["Crew members", "Dispatch coordinators", "Seasonal operators", "Customer service support", "Operations assistants"],
    demandIndustries: ["Snow removal companies", "Landscaping companies", "Local service businesses", "Property service firms"],
    softwareNeeds: ["Snow removal management system", "Route tracking", "Crew dispatch", "Customer request tracking", "Job status dashboards"],
    staffingOpportunities: ["Promote general staffing for seasonal crews and operations support.", "Offer candidate sourcing before peak season.", "Position support around dependable local service staffing."],
    softwareOpportunities: ["Promote snow removal management software.", "Offer route, crew, and job tracking workflows.", "Build customer request and service reporting tools."],
    servicesToPromote: ["Snow Removal Management System", "General Staffing", "Custom Web App", "AI Automation"],
    marketingAngles: ["Busy weather events expose weak tracking systems.", "Crews need clear routes, job status, and communication.", "Prepare staffing and software before peak service periods."],
    linkedinIdeas: ["Post about snow event coordination challenges.", "Share a route tracking software use case.", "Explain why seasonal staffing should start early."],
    outreachTargets: ["Snow removal companies", "Landscaping businesses", "Local service operators", "Property maintenance companies"],
  },
  "General Market": {
    hiringTrends: ["Businesses continue to look for reliable people, clearer processes, and tools that reduce manual work.", "Staffing and software needs often overlap when teams are trying to grow with limited capacity.", "Practical automation and better digital workflows remain useful positioning themes."],
    roles: ["Administrative roles", "Operations roles", "Technical roles", "Recruitment roles", "Customer support roles"],
    demandIndustries: ["Healthcare", "Technology", "Staffing and recruitment", "Small business", "Local services"],
    softwareNeeds: ["Websites", "Web apps", "Dashboards", "Automation", "Resume parsing", "Candidate registration"],
    staffingOpportunities: ["Promote healthcare, IT, and general staffing by audience segment.", "Build campaigns around hiring time, candidate flow, and recruitment admin.", "Use simple business language for owners and operators."],
    softwareOpportunities: ["Promote web apps, dashboards, and automation for manual workflows.", "Connect software messaging to real operational pain.", "Package products around staffing workflows where relevant."],
    servicesToPromote: ["Healthcare Staffing", "IT / Technical Staffing", "General Staffing", "Custom Software Development", "AI Automation"],
    marketingAngles: ["Grow with the right people and the right software.", "Solve the bottleneck before it slows the business.", "Make staffing and software easier to understand."],
    linkedinIdeas: ["Post about when a business needs hiring support versus automation.", "Share CygniSoft's staffing and software positioning.", "Create a service spotlight series."],
    outreachTargets: ["Business owners", "Operations leaders", "Hiring managers", "Staffing agencies", "Local service companies"],
  },
};

const campaignPlaybooks = {
  "Healthcare Staffing": {
    painPoints: ["Finding reliable staff without overloading clinic managers", "Keeping patient care moving while recruiting", "Coordinating candidate availability"],
    leadSources: ["Clinic directories", "Healthcare association member directories", "LinkedIn company search by healthcare category", "Public websites for clinics and care providers"],
    postIdeas: ["Why clinic staffing issues affect daily operations", "Three ways to make healthcare hiring more organized", "How CygniSoft supports healthcare staffing conversations"],
  },
  "IT / Technical Staffing": {
    painPoints: ["Finding technical candidates with the right skill fit", "Sorting mismatched resumes", "Keeping projects moving while hiring"],
    leadSources: ["LinkedIn company search for startups and IT companies", "Technology directories", "Startup community pages", "Public job posts as market signals, not contact scraping"],
    postIdeas: ["Why technical hiring slows down", "What to clarify before hiring a developer", "How IT staffing support can reduce screening pressure"],
  },
  "General Staffing": {
    painPoints: ["Owner-led hiring taking too much time", "Filling admin, operations, and service roles", "Keeping business operations moving"],
    leadSources: ["Local business directories", "Chamber of commerce listings", "LinkedIn company pages", "Public websites for small businesses"],
    postIdeas: ["Hiring support for small businesses", "How general staffing helps owner-operated teams", "Why clear role requirements matter"],
  },
  "Custom Software Development": {
    painPoints: ["Manual spreadsheets and disconnected systems", "Internal processes that do not fit off-the-shelf tools", "Lack of visibility across daily operations"],
    leadSources: ["LinkedIn company search by operations-heavy industries", "Local business websites with manual forms", "Industry directories", "Inbound website inquiries"],
    postIdeas: ["Signs a business needs custom software", "How dashboards reduce manual reporting", "When a portal is better than another spreadsheet"],
  },
  "Website Development": {
    painPoints: ["Outdated websites", "Unclear service pages", "Weak CTAs and lead capture"],
    leadSources: ["Local business directories", "Public websites with outdated service pages", "Industry associations", "LinkedIn company pages"],
    postIdeas: ["What a service page should explain", "Website CTAs that help business owners", "How clearer website copy supports sales"],
  },
  "Web App Development": {
    painPoints: ["Client or staff workflows stuck in email and spreadsheets", "Manual approvals or registrations", "No single place to track work"],
    leadSources: ["Businesses with client portals needs", "Operations-heavy companies", "Staffing and service businesses", "LinkedIn company search"],
    postIdeas: ["When a business needs a web app", "Portal ideas for service businesses", "How web apps reduce repeat admin"],
  },
  "Resume Parser": {
    painPoints: ["Manual resume review", "Repeated candidate data entry", "Hard-to-compare applicant details"],
    leadSources: ["Staffing agency directories", "Recruitment agency websites", "HR service providers", "LinkedIn company search for recruiters"],
    postIdeas: ["Resume parser benefits for busy recruiters", "How structured candidate data speeds review", "Reducing resume admin without overpromising"],
  },
  "Candidate Registration System": {
    painPoints: ["Candidate intake scattered across forms and email", "Manual follow-up", "Incomplete candidate information"],
    leadSources: ["Staffing agencies", "Healthcare staffing firms", "Recruitment agencies", "Public career pages"],
    postIdeas: ["Why candidate registration should be simple", "How staffing teams can organize intake", "What to include in a candidate portal"],
  },
  "Healthcare Staffing Software": {
    painPoints: ["Managing candidate registration, shifts, requests, and client updates manually", "Limited visibility across staffing workflows", "Repeated admin across separate tools"],
    leadSources: ["Healthcare staffing agency directories", "Care organization websites", "LinkedIn company search", "Healthcare operations groups"],
    postIdeas: ["Healthcare staffing software workflow ideas", "Why visibility matters in staffing operations", "Reducing manual updates for staffing teams"],
  },
  "Snow Removal Management System": {
    painPoints: ["Tracking crews, routes, jobs, and customer requests during busy weather", "Too much back-and-forth communication", "Limited job status visibility"],
    leadSources: ["Snow removal company directories", "Landscaping and property maintenance websites", "Local service business directories", "LinkedIn company pages"],
    postIdeas: ["Snow event coordination challenges", "Route tracking for snow removal companies", "Why job status visibility matters"],
  },
  "AI Automation": {
    painPoints: ["Repeat admin tasks", "Manual follow-ups", "Document handling and internal requests taking too much time"],
    leadSources: ["Small business directories", "Operations-heavy companies", "LinkedIn company search", "Inbound website inquiries"],
    postIdeas: ["AI automation ideas for small businesses", "Start with one repetitive task", "How automation supports teams without replacing strategy"],
  },
};

function serveStatic(req, res) {
  const urlPath = req.url === "/" ? "/index.html" : decodeURIComponent(req.url);
  const filePath = path.normalize(path.join(PUBLIC_DIR, urlPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const contentType =
      {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".svg": "image/svg+xml",
      }[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

async function handleGenerate(req, res) {
  try {
    const body = await readBody(req);
    const payload = JSON.parse(body || "{}");
    const { contentType, category, userRequest } = payload;

    if (!contentTypes.includes(contentType)) {
      sendJson(res, 400, { error: "Please select a valid content type." });
      return;
    }

    if (!categories.includes(category)) {
      sendJson(res, 400, { error: "Please select a valid business category." });
      return;
    }

    if (!userRequest || !String(userRequest).trim()) {
      sendJson(res, 400, { error: "Please describe what you want to create." });
      return;
    }

    const cleanPayload = {
      contentType,
      category,
      userRequest: String(userRequest).trim(),
    };

    const openAiContent = await generateWithOpenAI(cleanPayload);
    const content = openAiContent || buildFallbackContent(cleanPayload);
    sendJson(res, 200, { content, source: openAiContent ? "openai" : "local", usingProfile: Boolean(latestCompanyProfile) });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, {
      error:
        "Sorry, the marketing content could not be generated right now. Please try again or check the server configuration.",
    });
  }
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/generate") {
    handleGenerate(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/build-knowledge") {
    handleBuildKnowledge(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/website-review") {
    handleWebsiteReview(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/competitor-review") {
    handleCompetitorReview(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/market-trends") {
    handleMarketTrends(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/lead-campaign-plan") {
    handleLeadCampaignPlan(req, res);
    return;
  }

  if (req.method === "GET" && req.url === "/api/company-profile") {
    sendJson(res, 200, {
      profile: latestCompanyProfile,
      output: latestCompanyProfile?.output || "No company knowledge profile has been built yet.",
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/company-profile") {
    handleUpdateCompanyProfile(req, res);
    return;
  }

  if (req.method === "DELETE" && req.url === "/api/company-profile") {
    handleClearCompanyProfile(req, res);
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, () => {
  console.log(`CygniSoft AI Marketing Agent running at http://localhost:${PORT}`);
});
