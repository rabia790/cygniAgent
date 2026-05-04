import {
  BUSINESS_CATEGORIES,
  CAMPAIGN_DURATIONS,
  CAMPAIGN_GOALS,
  COMPANY_DETAILS,
  CONTENT_TYPES,
  MARKET_INDUSTRIES,
  PLANNER_SERVICES,
  RESEARCH_FOCUS_OPTIONS,
  TARGET_AUDIENCES,
} from "./constants.js";

const form = document.querySelector("#generatorForm");
const contentTypeSelect = document.querySelector("#contentType");
const categorySelect = document.querySelector("#category");
const userRequestInput = document.querySelector("#userRequest");
const output = document.querySelector("#output");
const generateButton = document.querySelector("#generateButton");
const copyButton = document.querySelector("#copyButton");
const resetButton = document.querySelector("#resetButton");
const statusMessage = document.querySelector("#statusMessage");
const sourceBadge = document.querySelector("#sourceBadge");

const knowledgeForm = document.querySelector("#knowledgeForm");
const knowledgeUrls = document.querySelector("#knowledgeUrls");
const knowledgeButton = document.querySelector("#knowledgeButton");
const knowledgeStatus = document.querySelector("#knowledgeStatus");
const knowledgeOutput = document.querySelector("#knowledgeOutput");
const profileBadge = document.querySelector("#profileBadge");
const copyKnowledgeButton = document.querySelector("#copyKnowledgeButton");
const editKnowledgeButton = document.querySelector("#editKnowledgeButton");
const saveKnowledgeButton = document.querySelector("#saveKnowledgeButton");
const clearKnowledgeButton = document.querySelector("#clearKnowledgeButton");
const knowledgeUseBadge = document.querySelector("#knowledgeUseBadge");

const reviewForm = document.querySelector("#reviewForm");
const reviewUrl = document.querySelector("#reviewUrl");
const reviewButton = document.querySelector("#reviewButton");
const reviewStatus = document.querySelector("#reviewStatus");
const reviewOutput = document.querySelector("#reviewOutput");
const reviewBadge = document.querySelector("#reviewBadge");
const copyReviewButton = document.querySelector("#copyReviewButton");

const competitorForm = document.querySelector("#competitorForm");
const cygnisoftCompareUrls = document.querySelector("#cygnisoftCompareUrls");
const competitorUrls = document.querySelector("#competitorUrls");
const competitorButton = document.querySelector("#competitorButton");
const competitorStatus = document.querySelector("#competitorStatus");
const competitorOutput = document.querySelector("#competitorOutput");
const competitorBadge = document.querySelector("#competitorBadge");
const copyCompetitorButton = document.querySelector("#copyCompetitorButton");

const marketForm = document.querySelector("#marketForm");
const marketIndustry = document.querySelector("#marketIndustry");
const researchFocus = document.querySelector("#researchFocus");
const marketRegion = document.querySelector("#marketRegion");
const marketNotes = document.querySelector("#marketNotes");
const marketButton = document.querySelector("#marketButton");
const resetMarketButton = document.querySelector("#resetMarketButton");
const marketStatus = document.querySelector("#marketStatus");
const marketOutput = document.querySelector("#marketOutput");
const marketBadge = document.querySelector("#marketBadge");
const copyMarketButton = document.querySelector("#copyMarketButton");
const marketKnowledgeBadge = document.querySelector("#marketKnowledgeBadge");

const plannerForm = document.querySelector("#plannerForm");
const plannerService = document.querySelector("#plannerService");
const targetAudience = document.querySelector("#targetAudience");
const campaignGoal = document.querySelector("#campaignGoal");
const campaignDuration = document.querySelector("#campaignDuration");
const plannerRegion = document.querySelector("#plannerRegion");
const plannerNotes = document.querySelector("#plannerNotes");
const plannerButton = document.querySelector("#plannerButton");
const resetPlannerButton = document.querySelector("#resetPlannerButton");
const plannerStatus = document.querySelector("#plannerStatus");
const plannerOutput = document.querySelector("#plannerOutput");
const plannerBadge = document.querySelector("#plannerBadge");
const copyPlannerButton = document.querySelector("#copyPlannerButton");
const plannerKnowledgeBadge = document.querySelector("#plannerKnowledgeBadge");

function fillSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function setStatus(element, message, type = "neutral") {
  element.textContent = message;
  element.dataset.type = type;
}

function setLoading(button, isLoading, loadingText, idleText) {
  button.disabled = isLoading;
  button.querySelector(".button-text").textContent = isLoading ? loadingText : idleText;
  button.querySelector(".spinner").hidden = !isLoading;
}

function validateRequest() {
  const request = userRequestInput.value.trim();
  if (!request) {
    setStatus(statusMessage, "Please describe what you want to create.", "error");
    userRequestInput.focus();
    return false;
  }

  if (request.length < 10) {
    setStatus(statusMessage, "Add a little more detail so the content is useful.", "error");
    userRequestInput.focus();
    return false;
  }

  return true;
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}

async function deleteJson(url) {
  const response = await fetch(url, { method: "DELETE" });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}

async function generateContent(event) {
  event.preventDefault();

  if (!validateRequest()) return;

  setLoading(generateButton, true, "Generating...", "Generate Marketing Content");
  setStatus(statusMessage, "Creating ready-to-use content using the latest CygniSoft knowledge profile...", "neutral");
  sourceBadge.textContent = "Working";

  try {
    const data = await postJson("/api/generate", {
      contentType: contentTypeSelect.value,
      category: categorySelect.value,
      userRequest: userRequestInput.value,
    });

    output.value = data.content;
    sourceBadge.textContent = data.source === "openai" ? "AI generated" : "Local generator";
    updateKnowledgeUseBadge(data.usingProfile);
    setStatus(statusMessage, "Content generated. You can edit it below before copying.", "success");
    copyButton.disabled = false;
  } catch (error) {
    setStatus(statusMessage, error.message, "error");
    sourceBadge.textContent = "Error";
  } finally {
    setLoading(generateButton, false, "Generating...", "Generate Marketing Content");
  }
}

async function buildKnowledge(event) {
  event.preventDefault();

  if (!knowledgeUrls.value.trim()) {
    setStatus(knowledgeStatus, "Please enter at least one CygniSoft website URL.", "error");
    knowledgeUrls.focus();
    return;
  }

  setLoading(knowledgeButton, true, "Reading pages...", "Build Knowledge Profile");
  setStatus(knowledgeStatus, "Fetching pages and extracting CygniSoft website knowledge...", "neutral");
  profileBadge.textContent = "Working";

  try {
    const data = await postJson("/api/build-knowledge", { urls: knowledgeUrls.value });
    knowledgeOutput.value = data.output;
    profileBadge.textContent = "Saved";
    knowledgeOutput.readOnly = true;
    saveKnowledgeButton.disabled = true;
    updateKnowledgeUseBadge(true);
    setStatus(knowledgeStatus, "Company knowledge profile built and saved for future content generation.", "success");
  } catch (error) {
    setStatus(knowledgeStatus, error.message, "error");
    profileBadge.textContent = "Error";
  } finally {
    setLoading(knowledgeButton, false, "Reading pages...", "Build Knowledge Profile");
  }
}

function editKnowledge() {
  knowledgeOutput.readOnly = false;
  knowledgeOutput.focus();
  saveKnowledgeButton.disabled = false;
  setStatus(knowledgeStatus, "Profile editing is enabled. Save manual updates when finished.", "neutral");
}

async function saveManualKnowledge() {
  if (!knowledgeOutput.value.trim() || knowledgeOutput.value.includes("No company knowledge profile has been built yet.")) {
    setStatus(knowledgeStatus, "Please enter profile content before saving.", "error");
    knowledgeOutput.focus();
    return;
  }

  saveKnowledgeButton.disabled = true;
  setStatus(knowledgeStatus, "Saving manual company profile updates...", "neutral");

  try {
    const data = await postJson("/api/company-profile", { output: knowledgeOutput.value });
    knowledgeOutput.value = data.output;
    knowledgeOutput.readOnly = true;
    profileBadge.textContent = "Saved";
    updateKnowledgeUseBadge(true);
    setStatus(knowledgeStatus, "Manual profile updates saved. Future generations will use this profile.", "success");
  } catch (error) {
    saveKnowledgeButton.disabled = false;
    setStatus(knowledgeStatus, error.message, "error");
  }
}

async function clearKnowledge() {
  setStatus(knowledgeStatus, "Clearing saved company knowledge...", "neutral");

  try {
    const data = await deleteJson("/api/company-profile");
    knowledgeOutput.value = data.output;
    knowledgeOutput.readOnly = true;
    profileBadge.textContent = "Not built";
    saveKnowledgeButton.disabled = true;
    updateKnowledgeUseBadge(false);
    setStatus(knowledgeStatus, "Saved company knowledge has been cleared.", "success");
  } catch (error) {
    setStatus(knowledgeStatus, error.message, "error");
  }
}

async function reviewWebsite(event) {
  event.preventDefault();

  if (!reviewUrl.value.trim()) {
    setStatus(reviewStatus, "Please enter a CygniSoft page URL to review.", "error");
    reviewUrl.focus();
    return;
  }

  setLoading(reviewButton, true, "Reviewing...", "Review Website");
  setStatus(reviewStatus, "Fetching the page and preparing a marketing review...", "neutral");
  reviewBadge.textContent = "Working";

  try {
    const data = await postJson("/api/website-review", { url: reviewUrl.value });
    reviewOutput.value = data.output;
    reviewBadge.textContent = "Complete";
    setStatus(reviewStatus, "Website review complete.", "success");
  } catch (error) {
    setStatus(reviewStatus, error.message, "error");
    reviewBadge.textContent = "Error";
  } finally {
    setLoading(reviewButton, false, "Reviewing...", "Review Website");
  }
}

async function reviewCompetitors(event) {
  event.preventDefault();

  if (!competitorUrls.value.trim()) {
    setStatus(competitorStatus, "Please enter at least one competitor URL.", "error");
    competitorUrls.focus();
    return;
  }

  setLoading(competitorButton, true, "Comparing...", "Run Competitor Review");
  setStatus(competitorStatus, "Fetching competitor pages and comparing positioning...", "neutral");
  competitorBadge.textContent = "Working";

  try {
    const data = await postJson("/api/competitor-review", {
      cygnisoftUrls: cygnisoftCompareUrls.value,
      competitorUrls: competitorUrls.value,
    });
    competitorOutput.value = data.output;
    competitorBadge.textContent = "Complete";
    setStatus(competitorStatus, "Competitor review complete.", "success");
  } catch (error) {
    setStatus(competitorStatus, error.message, "error");
    competitorBadge.textContent = "Error";
  } finally {
    setLoading(competitorButton, false, "Comparing...", "Run Competitor Review");
  }
}

async function generateMarketTrends(event) {
  event.preventDefault();

  if (!marketRegion.value.trim()) {
    setStatus(marketStatus, "Please enter a region for the research.", "error");
    marketRegion.focus();
    return;
  }

  setLoading(marketButton, true, "Researching...", "Generate Trend Research");
  setStatus(marketStatus, "Preparing AI-generated market and hiring trend research...", "neutral");
  marketBadge.textContent = "Working";

  try {
    const data = await postJson("/api/market-trends", {
      industry: marketIndustry.value,
      region: marketRegion.value,
      researchFocus: researchFocus.value,
      notes: marketNotes.value,
    });
    marketOutput.value = data.output;
    marketBadge.textContent = data.source === "openai" ? "AI generated" : "Local generator";
    updateKnowledgeUseBadge(data.usingProfile);
    setStatus(marketStatus, "Market and hiring trend research generated.", "success");
  } catch (error) {
    setStatus(marketStatus, error.message, "error");
    marketBadge.textContent = "Error";
  } finally {
    setLoading(marketButton, false, "Researching...", "Generate Trend Research");
  }
}

async function generateCampaignPlan(event) {
  event.preventDefault();

  if (!plannerRegion.value.trim()) {
    setStatus(plannerStatus, "Please enter a region for the campaign.", "error");
    plannerRegion.focus();
    return;
  }

  setLoading(plannerButton, true, "Planning...", "Generate Campaign Plan");
  setStatus(plannerStatus, "Preparing safe lead generation and campaign strategy...", "neutral");
  plannerBadge.textContent = "Working";

  try {
    const data = await postJson("/api/lead-campaign-plan", {
      service: plannerService.value,
      targetAudience: targetAudience.value,
      region: plannerRegion.value,
      campaignGoal: campaignGoal.value,
      campaignDuration: campaignDuration.value,
      notes: plannerNotes.value,
    });
    plannerOutput.value = data.output;
    plannerBadge.textContent = data.source === "openai" ? "AI generated" : "Local generator";
    updateKnowledgeUseBadge(data.usingProfile);
    setStatus(plannerStatus, "Lead and campaign plan generated.", "success");
  } catch (error) {
    setStatus(plannerStatus, error.message, "error");
    plannerBadge.textContent = "Error";
  } finally {
    setLoading(plannerButton, false, "Planning...", "Generate Campaign Plan");
  }
}

async function copyText(textarea, statusElement) {
  const text = textarea.value.trim();
  if (!text) {
    setStatus(statusElement, "There is no output to copy yet.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setStatus(statusElement, "Copied to clipboard.", "success");
  } catch {
    textarea.select();
    document.execCommand("copy");
    setStatus(statusElement, "Copied to clipboard.", "success");
  }
}

function resetForm() {
  form.reset();
  contentTypeSelect.value = CONTENT_TYPES[0];
  categorySelect.value = BUSINESS_CATEGORIES[0];
  output.value = "";
  copyButton.disabled = true;
  sourceBadge.textContent = "Ready";
  setStatus(statusMessage, "Choose a content type, pick a category, and describe the goal.", "neutral");
}

function resetMarketForm() {
  marketForm.reset();
  marketIndustry.value = MARKET_INDUSTRIES[0];
  researchFocus.value = RESEARCH_FOCUS_OPTIONS[0];
  marketOutput.value = "";
  marketBadge.textContent = "Ready";
  setStatus(marketStatus, "Select an industry, region, and research focus.", "neutral");
}

function resetPlannerForm() {
  plannerForm.reset();
  plannerService.value = PLANNER_SERVICES[0];
  targetAudience.value = TARGET_AUDIENCES[0];
  campaignGoal.value = CAMPAIGN_GOALS[0];
  campaignDuration.value = CAMPAIGN_DURATIONS[0];
  plannerOutput.value = "";
  plannerBadge.textContent = "Ready";
  setStatus(plannerStatus, "Choose a service, audience, region, goal, and duration.", "neutral");
}

function setupTabs() {
  const buttons = Array.from(document.querySelectorAll(".tab-button"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));

  function showTab(tabId) {
    buttons.forEach((button) => {
      const isActive = button.dataset.tab === tabId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === tabId));
  }

  buttons.forEach((button) => button.addEventListener("click", () => showTab(button.dataset.tab)));
  showTab("generate");
}

async function loadSavedProfile() {
  try {
    const response = await fetch("/api/company-profile");
    const data = await response.json();
    knowledgeOutput.value = data.output || "";
    knowledgeOutput.readOnly = true;
    profileBadge.textContent = data.profile ? "Saved" : "Not built";
    updateKnowledgeUseBadge(Boolean(data.profile));
  } catch {
    profileBadge.textContent = "Not loaded";
    updateKnowledgeUseBadge(false);
  }
}

function updateKnowledgeUseBadge(isUsing) {
  knowledgeUseBadge.textContent = isUsing ? "Using saved CygniSoft knowledge" : "No saved company knowledge";
  knowledgeUseBadge.dataset.active = String(Boolean(isUsing));
  marketKnowledgeBadge.textContent = knowledgeUseBadge.textContent;
  marketKnowledgeBadge.dataset.active = knowledgeUseBadge.dataset.active;
  plannerKnowledgeBadge.textContent = knowledgeUseBadge.textContent;
  plannerKnowledgeBadge.dataset.active = knowledgeUseBadge.dataset.active;
}

function init() {
  document.querySelector("#subtitle").textContent = COMPANY_DETAILS.subtitle;
  document.querySelector("#positioning").textContent = COMPANY_DETAILS.positioning;
  fillSelect(contentTypeSelect, CONTENT_TYPES);
  fillSelect(categorySelect, BUSINESS_CATEGORIES);
  fillSelect(marketIndustry, MARKET_INDUSTRIES);
  fillSelect(researchFocus, RESEARCH_FOCUS_OPTIONS);
  fillSelect(plannerService, PLANNER_SERVICES);
  fillSelect(targetAudience, TARGET_AUDIENCES);
  fillSelect(campaignGoal, CAMPAIGN_GOALS);
  fillSelect(campaignDuration, CAMPAIGN_DURATIONS);

  setupTabs();

  form.addEventListener("submit", generateContent);
  resetButton.addEventListener("click", resetForm);
  copyButton.addEventListener("click", () => copyText(output, statusMessage));

  knowledgeForm.addEventListener("submit", buildKnowledge);
  copyKnowledgeButton.addEventListener("click", () => copyText(knowledgeOutput, knowledgeStatus));
  editKnowledgeButton.addEventListener("click", editKnowledge);
  saveKnowledgeButton.addEventListener("click", saveManualKnowledge);
  clearKnowledgeButton.addEventListener("click", clearKnowledge);

  reviewForm.addEventListener("submit", reviewWebsite);
  copyReviewButton.addEventListener("click", () => copyText(reviewOutput, reviewStatus));

  competitorForm.addEventListener("submit", reviewCompetitors);
  copyCompetitorButton.addEventListener("click", () => copyText(competitorOutput, competitorStatus));

  marketForm.addEventListener("submit", generateMarketTrends);
  resetMarketButton.addEventListener("click", resetMarketForm);
  copyMarketButton.addEventListener("click", () => copyText(marketOutput, marketStatus));

  plannerForm.addEventListener("submit", generateCampaignPlan);
  resetPlannerButton.addEventListener("click", resetPlannerForm);
  copyPlannerButton.addEventListener("click", () => copyText(plannerOutput, plannerStatus));

  resetForm();
  resetMarketForm();
  resetPlannerForm();
  setStatus(knowledgeStatus, "Enter public CygniSoft URLs to build a reusable company profile.", "neutral");
  setStatus(reviewStatus, "Enter a page URL to get a focused content and SEO review.", "neutral");
  setStatus(competitorStatus, "Enter competitor URLs to compare positioning, CTAs, trust signals, and gaps.", "neutral");
  loadSavedProfile();
}

init();
