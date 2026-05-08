import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  BUSINESS_CATEGORIES,
  CAMPAIGN_DURATIONS,
  CAMPAIGN_GOALS,
  COMPANY_DETAILS,
  CONTENT_STATUSES,
  CONTENT_TONES,
  CONTENT_TYPES,
  MARKET_INDUSTRIES,
  PLANNER_SERVICES,
  RESEARCH_FOCUS_OPTIONS,
  TARGET_AUDIENCES,
  VARIATION_COUNTS,
} from "./constants.js";

const authView = document.querySelector("#authView");
const appShell = document.querySelector("#appShell");
const authForm = document.querySelector("#authForm");
const authIntro = document.querySelector("#authIntro");
const authMessage = document.querySelector("#authMessage");
const authMessageText = document.querySelector("#authMessageText");
const resendConfirmationButton = document.querySelector("#resendConfirmationButton");
const goToSignInButton = document.querySelector("#goToSignInButton");
const signInModeButton = document.querySelector("#signInModeButton");
const signUpModeButton = document.querySelector("#signUpModeButton");
const forgotModeButton = document.querySelector("#forgotModeButton");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const confirmPasswordLabel = document.querySelector("#confirmPasswordLabel");
const authConfirmPassword = document.querySelector("#authConfirmPassword");
const authSubmitButton = document.querySelector("#authSubmitButton");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
const authStatus = document.querySelector("#authStatus");
const userEmail = document.querySelector("#userEmail");
const adminBadge = document.querySelector("#adminBadge");
const logoutButton = document.querySelector("#logoutButton");

const form = document.querySelector("#generatorForm");
const contentTypeSelect = document.querySelector("#contentType");
const categorySelect = document.querySelector("#category");
const generateTargetAudience = document.querySelector("#generateTargetAudience");
const generateRegion = document.querySelector("#generateRegion");
const generateCampaignGoal = document.querySelector("#generateCampaignGoal");
const generateTone = document.querySelector("#generateTone");
const marketAwareMode = document.querySelector("#marketAwareMode");
const suggestBestService = document.querySelector("#suggestBestService");
const variationCount = document.querySelector("#variationCount");
const useLiveSearch = document.querySelector("#useLiveSearch");
const userRequestInput = document.querySelector("#userRequest");
const output = document.querySelector("#output");
const recommendationPanel = document.querySelector("#recommendationPanel");
const recommendationOutput = document.querySelector("#recommendationOutput");
const qualityPanel = document.querySelector("#qualityPanel");
const qualityOutput = document.querySelector("#qualityOutput");
const searchNote = document.querySelector("#searchNote");
const generateButton = document.querySelector("#generateButton");
const copyButton = document.querySelector("#copyButton");
const saveContentButton = document.querySelector("#saveContentButton");
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
const updateKnowledgeButton = document.querySelector("#updateKnowledgeButton");
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

const libraryFilterForm = document.querySelector("#libraryFilterForm");
const libraryContentType = document.querySelector("#libraryContentType");
const libraryBusinessCategory = document.querySelector("#libraryBusinessCategory");
const loadLibraryButton = document.querySelector("#loadLibraryButton");
const resetLibraryButton = document.querySelector("#resetLibraryButton");
const libraryStatus = document.querySelector("#libraryStatus");
const libraryBadge = document.querySelector("#libraryBadge");
const libraryList = document.querySelector("#libraryList");

const companySelect = document.querySelector("#companySelect");
const createCompanyButton = document.querySelector("#createCompanyButton");
const editCompanyButton = document.querySelector("#editCompanyButton");
const deleteCompanyButton = document.querySelector("#deleteCompanyButton");
const selectedCompanyBadge = document.querySelector("#selectedCompanyBadge");
const companyVisibilityBadge = document.querySelector("#companyVisibilityBadge");
const companyForm = document.querySelector("#companyForm");
const companyNameInput = document.querySelector("#companyNameInput");
const companyIndustryInput = document.querySelector("#companyIndustryInput");
const companyWebsiteUrlsInput = document.querySelector("#companyWebsiteUrlsInput");
const companyServicesInput = document.querySelector("#companyServicesInput");
const companyProductsInput = document.querySelector("#companyProductsInput");
const companyAudienceInput = document.querySelector("#companyAudienceInput");
const companyCompetitorsInput = document.querySelector("#companyCompetitorsInput");
const companyToneInput = document.querySelector("#companyToneInput");
const companyVisibilityInput = document.querySelector("#companyVisibilityInput");
const companyNotesInput = document.querySelector("#companyNotesInput");
const saveCompanyButton = document.querySelector("#saveCompanyButton");
const cancelCompanyButton = document.querySelector("#cancelCompanyButton");
const companyStatus = document.querySelector("#companyStatus");

const COMPANY_KNOWLEDGE_KEY = "cygnisoft_company_knowledge";
const SELECTED_COMPANY_KEY = "cygnisoft_selected_company_id";
const EMPTY_KNOWLEDGE_MESSAGE = "No company knowledge profile has been built yet.";
// Local storage remains a browser fallback when Supabase is not configured.
let companies = [];
let selectedCompany = null;
let editingCompanyId = "";
let lastGenerationMeta = null;
let supabaseAuth = null;
let currentSession = null;
let currentUserProfile = null;
let authConfigError = "";
let authMode = "signin";
let pendingConfirmationEmail = "";
let authMessageState = { type: "info", message: "" };
let resetEmailCooldownTimer = null;
let resetEmailCooldownRemaining = 0;
let resetEmailRequestInFlight = false;
let resendConfirmationCooldownTimer = null;
let resendConfirmationCooldownRemaining = 0;
let resendConfirmationRequestInFlight = false;

function fillSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function fillSelectWithAll(select, values, allLabel) {
  const option = document.createElement("option");
  option.value = "";
  option.textContent = allLabel;
  select.appendChild(option);
  fillSelect(select, values);
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

function isEmailRateLimitError(error) {
  return /rate limit|too many|email rate/i.test(error?.message || "");
}

function getFriendlyAuthError(error) {
  if (isEmailRateLimitError(error)) {
    return "Too many email requests. Please wait a few minutes before trying again.";
  }
  return error?.message || "Something went wrong. Please try again.";
}

function setResendConfirmationButtonLoading(isLoading) {
  resendConfirmationButton.disabled = isLoading;
  resendConfirmationButton.textContent = isLoading ? "Sending..." : "Resend confirmation email";
}

function startResetEmailCooldown(seconds = 60) {
  clearInterval(resetEmailCooldownTimer);
  resetEmailCooldownRemaining = seconds;
  authSubmitButton.disabled = true;
  authSubmitButton.querySelector(".spinner").hidden = true;
  authSubmitButton.querySelector(".button-text").textContent = `Send Reset Email (${resetEmailCooldownRemaining}s)`;
  resetEmailCooldownTimer = setInterval(() => {
    resetEmailCooldownRemaining -= 1;
    if (resetEmailCooldownRemaining <= 0) {
      clearInterval(resetEmailCooldownTimer);
      resetEmailCooldownTimer = null;
      resetEmailCooldownRemaining = 0;
      if (authMode === "forgot") {
        authSubmitButton.disabled = false;
        authSubmitButton.querySelector(".button-text").textContent = "Send Reset Email";
      }
      return;
    }
    if (authMode === "forgot") {
      authSubmitButton.disabled = true;
      authSubmitButton.querySelector(".button-text").textContent = `Send Reset Email (${resetEmailCooldownRemaining}s)`;
    }
  }, 1000);
}

function startResendConfirmationCooldown(seconds = 60) {
  clearInterval(resendConfirmationCooldownTimer);
  resendConfirmationCooldownRemaining = seconds;
  resendConfirmationButton.disabled = true;
  resendConfirmationButton.textContent = `Resend confirmation email (${resendConfirmationCooldownRemaining}s)`;
  resendConfirmationCooldownTimer = setInterval(() => {
    resendConfirmationCooldownRemaining -= 1;
    if (resendConfirmationCooldownRemaining <= 0) {
      clearInterval(resendConfirmationCooldownTimer);
      resendConfirmationCooldownTimer = null;
      resendConfirmationCooldownRemaining = 0;
      resendConfirmationButton.disabled = false;
      resendConfirmationButton.textContent = "Resend confirmation email";
      return;
    }
    resendConfirmationButton.disabled = true;
    resendConfirmationButton.textContent = `Resend confirmation email (${resendConfirmationCooldownRemaining}s)`;
  }, 1000);
}

function authHeaders(extra = {}) {
  return {
    ...extra,
    ...(currentSession?.access_token ? { Authorization: `Bearer ${currentSession.access_token}` } : {}),
  };
}

async function initializeAuth() {
  try {
    const response = await fetch("/api/auth/config");
    const config = await response.json();
    if (!config.supabaseConfigured) {
      authConfigError = "Supabase is not configured. Add Supabase env variables before logging in.";
      setAuthMessage({ type: "error", message: authConfigError });
      return;
    }
    authConfigError = "";
    supabaseAuth = createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data } = await supabaseAuth.auth.getSession();
    currentSession = data.session;
    supabaseAuth.auth.onAuthStateChange((_event, session) => {
      currentSession = session;
      handleSessionChange();
    });
    await handleSessionChange();
  } catch (error) {
    authConfigError = `Auth setup could not load: ${error.message}`;
    setAuthMessage({ type: "error", message: authConfigError });
  }
}

function requireAuthClient() {
  if (supabaseAuth) return true;
  setAuthMessage({
    type: "error",
    message: authConfigError || "Supabase Auth is not ready yet. Check the Supabase environment variables.",
  });
  return false;
}

function setAuthMessage({ type = "info", message = "", showResend = false, showGoToSignIn = false } = {}) {
  authMessageState = { type, message };
  if (!message) {
    authMessage.hidden = true;
    authMessageText.textContent = "";
    resendConfirmationButton.hidden = true;
    goToSignInButton.hidden = true;
    return;
  }
  authMessage.hidden = false;
  authMessage.dataset.type = type;
  authMessageText.textContent = message;
  resendConfirmationButton.hidden = !showResend;
  if (showResend && resendConfirmationCooldownRemaining > 0) {
    resendConfirmationButton.disabled = true;
    resendConfirmationButton.textContent = `Resend confirmation email (${resendConfirmationCooldownRemaining}s)`;
  }
  goToSignInButton.hidden = !showGoToSignIn;
}

function setAuthMode(mode, { preserveMessage = false } = {}) {
  authMode = mode;
  const isSignIn = mode === "signin";
  const isSignUp = mode === "signup";
  const isForgot = mode === "forgot";
  signInModeButton.classList.toggle("is-active", isSignIn);
  signUpModeButton.classList.toggle("is-active", isSignUp);
  forgotModeButton.classList.toggle("is-active", isForgot);
  authIntro.textContent = isSignUp ? "Create your account." : isForgot ? "Reset your password." : "Sign in to your workspace.";
  authPassword.parentElement.hidden = isForgot;
  confirmPasswordLabel.hidden = !isSignUp;
  forgotPasswordButton.hidden = !isSignIn;
  authSubmitButton.querySelector(".button-text").textContent = isSignUp ? "Sign Up" : isForgot ? "Send Reset Email" : "Sign In";
  if (isForgot && resetEmailCooldownRemaining > 0) {
    authSubmitButton.disabled = true;
    authSubmitButton.querySelector(".button-text").textContent = `Send Reset Email (${resetEmailCooldownRemaining}s)`;
  } else if (!isForgot || resetEmailCooldownRemaining <= 0) {
    authSubmitButton.disabled = false;
  }
  authPassword.autocomplete = isSignUp ? "new-password" : "current-password";
  setStatus(authStatus, "", "neutral");
  if (!preserveMessage) setAuthMessage();
}

function validateAuthForm() {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  const confirmPassword = authConfirmPassword.value;
  if (!email) return "Email is required.";
  if (authMode === "forgot") return "";
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (authMode === "signup" && !confirmPassword) return "Confirm password is required.";
  if (authMode === "signup" && password !== confirmPassword) return "Password and confirm password must match.";
  return "";
}

async function handleSessionChange() {
  if (!currentSession) {
    appShell.hidden = true;
    authView.hidden = false;
    currentUserProfile = null;
    return;
  }
  authView.hidden = true;
  appShell.hidden = false;
  try {
    console.log("[auth] current user id after login:", currentSession.user?.id || "unknown");
    await loadCurrentUser();
    await fetchUserCompanies(currentSession.user?.id);
  } catch (error) {
    userEmail.textContent = currentSession.user?.email || "Signed in";
    adminBadge.hidden = true;
    setStatus(companyStatus, `Dashboard opened, but account data could not be loaded: ${error.message}`, "error");
    await fetchUserCompanies(currentSession.user?.id);
  }
}

async function loadCurrentUser() {
  const response = await fetch("/api/me", { headers: authHeaders() });
  const data = await response.json();
  if (!response.ok) {
    setStatus(authStatus, data.error || "Unable to load your account.", "error");
    throw new Error(data.error || "Unable to load your account.");
  }
  currentUserProfile = data.profile;
  userEmail.textContent = data.user?.email || currentSession.user?.email || "Signed in";
  adminBadge.hidden = !data.isAdmin;
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (!requireAuthClient()) return;
  const validationError = validateAuthForm();
  if (validationError) {
    setAuthMessage({ type: "error", message: validationError });
    return;
  }
  if (authMode === "signup") {
    await signUpWithPassword();
    return;
  }
  if (authMode === "forgot") {
    await sendPasswordReset();
    return;
  }
  await signInWithPassword();
}

async function signInWithPassword() {
  const email = authEmail.value.trim();
  setLoading(authSubmitButton, true, "Signing in...", "Sign In");
  setAuthMessage({ type: "info", message: "Signing in..." });
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password: authPassword.value,
  });
  setLoading(authSubmitButton, false, "Signing in...", "Sign In");
  if (error) {
    if (/confirm|verified|email/i.test(error.message)) {
      pendingConfirmationEmail = email;
      setAuthMessage({
        type: "error",
        message: "Your account exists, but your email is not confirmed yet. Please check your inbox and click the confirmation link.",
        showResend: true,
      });
      return;
    }
    setAuthMessage({ type: "error", message: error.message });
    return;
  }
  if (!data.session) {
    pendingConfirmationEmail = email;
    setAuthMessage({
      type: "error",
      message: "Please confirm your email before signing in. Check your inbox for the confirmation link.",
      showResend: true,
    });
    return;
  }
  currentSession = data.session;
  setAuthMessage({ type: "success", message: "Logged in. Opening dashboard..." });
  await handleSessionChange();
}

async function signUpWithPassword() {
  const email = authEmail.value.trim();
  setLoading(authSubmitButton, true, "Creating account...", "Sign Up");
  setAuthMessage({ type: "info", message: "Creating account..." });
  const { data, error } = await supabaseAuth.auth.signUp({
    email,
    password: authPassword.value,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  setLoading(authSubmitButton, false, "Creating account...", "Sign Up");
  if (error) {
    setAuthMessage({ type: "error", message: error.message });
    return;
  }
  if (data?.session) {
    await supabaseAuth.auth.signOut();
    currentSession = null;
  }
  pendingConfirmationEmail = email;
  setAuthMode("signin", { preserveMessage: true });
  setAuthMessage({
    type: "success",
    message: `Account created successfully. Please check your email to confirm your account before signing in. We sent a confirmation link to ${email}.`,
    showResend: true,
  });
  authPassword.value = "";
  authConfirmPassword.value = "";
}

async function sendPasswordReset() {
  if (resetEmailCooldownRemaining > 0 || resetEmailRequestInFlight) return;
  resetEmailRequestInFlight = true;
  setLoading(authSubmitButton, true, "Sending...", "Send Reset Email");
  setAuthMessage({ type: "info", message: "Sending..." });
  let error = null;
  try {
    ({ error } = await supabaseAuth.auth.resetPasswordForEmail(authEmail.value.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    }));
  } catch (requestError) {
    error = requestError;
  } finally {
    resetEmailRequestInFlight = false;
    setLoading(authSubmitButton, false, "Sending...", "Send Reset Email");
  }
  if (error) {
    if (isEmailRateLimitError(error)) startResetEmailCooldown();
    setAuthMessage({ type: "error", message: getFriendlyAuthError(error) });
    return;
  }
  setAuthMessage({ type: "success", message: "Email sent. Please check your inbox and spam folder." });
  startResetEmailCooldown();
}

async function sendForgotPasswordFromSignIn() {
  setAuthMode("forgot");
  if (authEmail.value.trim()) {
    await sendPasswordReset();
  }
}

async function resendConfirmationEmail() {
  if (!requireAuthClient()) return;
  if (resendConfirmationCooldownRemaining > 0 || resendConfirmationRequestInFlight) return;
  const email = pendingConfirmationEmail || authEmail.value.trim();
  if (!email) {
    setAuthMessage({ type: "error", message: "Enter your email so we can resend the confirmation link." });
    return;
  }
  resendConfirmationRequestInFlight = true;
  setResendConfirmationButtonLoading(true);
  let error = null;
  try {
    ({ error } = await supabaseAuth.auth.resend({ type: "signup", email }));
  } catch (requestError) {
    error = requestError;
  } finally {
    resendConfirmationRequestInFlight = false;
    setResendConfirmationButtonLoading(false);
  }
  if (error) {
    if (isEmailRateLimitError(error)) startResendConfirmationCooldown();
    setAuthMessage({ type: "error", message: getFriendlyAuthError(error), showResend: true });
    return;
  }
  setAuthMessage({
    type: "success",
    message: "Email sent. Please check your inbox and spam folder.",
    showResend: true,
  });
  startResendConfirmationCooldown();
}

async function logout() {
  if (supabaseAuth) await supabaseAuth.auth.signOut();
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
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}

async function patchJson(url, payload) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

async function deleteJson(url) {
  const response = await fetch(url, { method: "DELETE", headers: authHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

function showSaveWarning(statusElement, data, successMessage) {
  if (data.saveError) {
    setStatus(statusElement, `${successMessage}, but saving failed: ${data.saveError}`, "error");
    return;
  }
  setStatus(statusElement, successMessage, "success");
}

function requireSelectedCompany(statusElement) {
  if (selectedCompany) return true;
  setStatus(statusElement, "Please create or select a company profile first.", "error");
  return false;
}

function getCompanyRequestContext() {
  return {
    selectedCompany,
    companyId: selectedCompany?.id || null,
    companyKnowledge: getSavedKnowledge(),
  };
}

function getFirstKnowledgeUrl() {
  return knowledgeUrls.value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)[0] || "";
}

function getCompanyNameFromUrl(rawUrl) {
  try {
    const url = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
    const host = url.hostname.replace(/^www\./i, "");
    const label = host.split(".")[0] || "Company";
    return label
      .split(/[-_]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Company";
  } catch {
    return "Company";
  }
}

async function ensureCompanyForKnowledgeBuild() {
  if (selectedCompany) return selectedCompany;

  const firstUrl = getFirstKnowledgeUrl();
  const companyName = getCompanyNameFromUrl(firstUrl);
  setStatus(knowledgeStatus, `Creating ${companyName} company profile from the website URL...`, "neutral");

  const data = await postJson("/api/companies", {
    company_name: companyName,
    website_urls: knowledgeUrls.value,
    industry: "",
    services: "",
    products: "",
    target_audience: "",
    competitors: "",
    brand_tone: "",
    visibility: "private",
    notes: "Created automatically from the Build Company Profile tab.",
  });

  const createdCompany = data.company;
  if (!createdCompany?.id) throw new Error("Company profile was created, but no company id was returned.");
  await fetchUserCompanies(currentSession?.user?.id, { selectedCompanyId: createdCompany.id });
  const matchedCompany = companies.find((company) => company.id === createdCompany.id) || createdCompany;
  selectCompany(matchedCompany);
  return matchedCompany;
}

function renderRecommendation(recommendation) {
  if (!recommendation) {
    recommendationPanel.hidden = true;
    recommendationOutput.textContent = "";
    return;
  }
  recommendationPanel.hidden = false;
  recommendationOutput.textContent = [
    `Promotion Match Score: ${recommendation.promotionMatchScore}/100`,
    `Recommended service/product: ${recommendation.recommendedService}`,
    `Best marketing angle: ${recommendation.bestMarketingAngle}`,
    `Target audience: ${recommendation.targetAudience}`,
    `Main pain point: ${recommendation.mainPainPoint}`,
    `Recommended CTA: ${recommendation.recommendedCta}`,
    `Reasoning: ${recommendation.reasoning}`,
  ].join("\n");
}

function renderQualityScore(score) {
  if (!score) {
    qualityPanel.hidden = true;
    qualityOutput.textContent = "";
    return;
  }
  qualityPanel.hidden = false;
  qualityOutput.textContent = [
    `Overall content score: ${score.overall}/100`,
    `Clarity score: ${score.clarity}/100`,
    `Audience fit score: ${score.audienceFit}/100`,
    `CTA strength score: ${score.ctaStrength}/100`,
    `Brand fit score: ${score.brandFit}/100`,
    "Improvement suggestions:",
    ...(score.improvementSuggestions || []).map((item) => `- ${item}`),
  ].join("\n");
}

async function generateContent(event) {
  event.preventDefault();

  if (!validateRequest()) return;
  if (!requireSelectedCompany(statusMessage)) return;

  setLoading(generateButton, true, "Generating...", "Generate Marketing Content");
  setStatus(statusMessage, "Creating ready-to-use content using the selected company profile...", "neutral");
  sourceBadge.textContent = "Working";

  try {
    const data = await postJson("/api/generate", {
      contentType: contentTypeSelect.value,
      category: categorySelect.value,
      targetAudience: generateTargetAudience.value,
      region: generateRegion.value,
      campaignGoal: generateCampaignGoal.value,
      tone: generateTone.value,
      marketAwareMode: marketAwareMode.checked,
      suggestBestService: suggestBestService.checked,
      variationCount: variationCount.value,
      useLiveSearch: useLiveSearch.checked,
      userRequest: userRequestInput.value,
      ...getCompanyRequestContext(),
    });

    output.value = data.content;
    lastGenerationMeta = {
      recommendation: data.recommendation,
      qualityScore: data.qualityScore,
      selectedCompanyProfile: selectedCompany,
      strategy: data.strategy,
      searchNote: data.searchNote,
      liveSearchResults: data.liveSearchResults || [],
    };
    renderRecommendation(data.recommendation);
    renderQualityScore(data.qualityScore);
    searchNote.textContent = data.searchNote || "";
    searchNote.dataset.type = data.liveSearchUsed ? "success" : "neutral";
    sourceBadge.textContent = data.source === "openai" ? "AI generated" : "Local generator";
    updateKnowledgeUseBadge(data.usingProfile);
    setStatus(statusMessage, "Content generated. You can edit it below before copying or saving.", "success");
    copyButton.disabled = false;
    saveContentButton.disabled = false;
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
    setStatus(knowledgeStatus, "Please enter at least one company website URL.", "error");
    knowledgeUrls.focus();
    return;
  }

  setLoading(knowledgeButton, true, "Reading pages...", "Build Knowledge Profile");
  setStatus(knowledgeStatus, "Preparing the company profile and reading website pages...", "neutral");
  profileBadge.textContent = "Working";

  try {
    await ensureCompanyForKnowledgeBuild();
    setStatus(knowledgeStatus, "Fetching pages and extracting the selected company's website profile...", "neutral");
    const data = await postJson("/api/build-knowledge", { urls: knowledgeUrls.value, ...getCompanyRequestContext() });
    saveKnowledgeToLocalStorage(data.output);
    if (selectedCompany) {
      selectedCompany.profile = data.profile || { output: data.output };
      selectedCompany.profile.output = data.output;
    }
    knowledgeOutput.value = data.output;
    profileBadge.textContent = "Saved";
    knowledgeOutput.readOnly = true;
    saveKnowledgeButton.disabled = true;
    updateKnowledgeButton.disabled = true;
    updateKnowledgeUseBadge(true);
    showSaveWarning(knowledgeStatus, data, "Company knowledge profile built and saved for future content generation");
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
  updateKnowledgeButton.disabled = false;
  setStatus(knowledgeStatus, "Profile editing is enabled. Save manual updates when finished.", "neutral");
}

async function saveManualKnowledge() {
  if (!knowledgeOutput.value.trim() || knowledgeOutput.value.includes("No company knowledge profile has been built yet.")) {
    setStatus(knowledgeStatus, "Please enter profile content before saving.", "error");
    knowledgeOutput.focus();
    return;
  }

  try {
    const data = await postJson("/api/company-knowledge", { output: knowledgeOutput.value, ...getCompanyRequestContext() });
    saveKnowledgeToLocalStorage(data.output || knowledgeOutput.value);
    if (selectedCompany) {
      selectedCompany.profile = data.profile || { output: data.output || knowledgeOutput.value };
      selectedCompany.profile.output = data.output || knowledgeOutput.value;
    }
    knowledgeOutput.value = data.output || knowledgeOutput.value;
    knowledgeOutput.readOnly = true;
    profileBadge.textContent = "Saved";
    saveKnowledgeButton.disabled = true;
    updateKnowledgeButton.disabled = true;
    updateKnowledgeUseBadge(true);
    setStatus(knowledgeStatus, "Company knowledge saved to Supabase. Future generations will use this profile.", "success");
  } catch (error) {
    saveKnowledgeToLocalStorage(knowledgeOutput.value);
    knowledgeOutput.readOnly = true;
    profileBadge.textContent = "Saved locally";
    saveKnowledgeButton.disabled = true;
    updateKnowledgeButton.disabled = true;
    updateKnowledgeUseBadge(true);
    setStatus(knowledgeStatus, `Saved in this browser, but Supabase save failed: ${error.message}`, "error");
  }
}

async function clearKnowledge() {
  try {
    const suffix = selectedCompany?.id ? `?companyId=${encodeURIComponent(selectedCompany.id)}` : "";
    await deleteJson(`/api/company-knowledge${suffix}`);
    setStatus(knowledgeStatus, "Saved company knowledge has been cleared from Supabase and this browser.", "success");
  } catch (error) {
    setStatus(knowledgeStatus, `Cleared from this browser, but Supabase clear failed: ${error.message}`, "error");
  }
  localStorage.removeItem(COMPANY_KNOWLEDGE_KEY);
  if (selectedCompany) selectedCompany.profile = {};
  knowledgeOutput.value = EMPTY_KNOWLEDGE_MESSAGE;
  knowledgeOutput.readOnly = true;
  profileBadge.textContent = "Not built";
  saveKnowledgeButton.disabled = true;
  updateKnowledgeButton.disabled = true;
  updateKnowledgeUseBadge(false);
}

async function reviewWebsite(event) {
  event.preventDefault();
  if (!requireSelectedCompany(reviewStatus)) return;

  if (!reviewUrl.value.trim()) {
    setStatus(reviewStatus, "Please enter a company page URL to review.", "error");
    reviewUrl.focus();
    return;
  }

  setLoading(reviewButton, true, "Reviewing...", "Review Website");
  setStatus(reviewStatus, "Fetching the page and preparing a marketing review...", "neutral");
  reviewBadge.textContent = "Working";

  try {
    const data = await postJson("/api/website-review", { url: reviewUrl.value, ...getCompanyRequestContext() });
    reviewOutput.value = data.output;
    reviewBadge.textContent = "Complete";
    showSaveWarning(reviewStatus, data, "Website review complete");
  } catch (error) {
    setStatus(reviewStatus, error.message, "error");
    reviewBadge.textContent = "Error";
  } finally {
    setLoading(reviewButton, false, "Reviewing...", "Review Website");
  }
}

async function reviewCompetitors(event) {
  event.preventDefault();
  if (!requireSelectedCompany(competitorStatus)) return;

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
      ...getCompanyRequestContext(),
    });
    competitorOutput.value = data.output;
    competitorBadge.textContent = "Complete";
    showSaveWarning(competitorStatus, data, "Competitor review complete");
  } catch (error) {
    setStatus(competitorStatus, error.message, "error");
    competitorBadge.textContent = "Error";
  } finally {
    setLoading(competitorButton, false, "Comparing...", "Run Competitor Review");
  }
}

async function generateMarketTrends(event) {
  event.preventDefault();
  if (!requireSelectedCompany(marketStatus)) return;

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
      ...getCompanyRequestContext(),
    });
    marketOutput.value = data.output;
    marketBadge.textContent = data.source === "openai" ? "AI generated" : "Local generator";
    updateKnowledgeUseBadge(data.usingProfile);
    showSaveWarning(marketStatus, data, "Market and hiring trend research generated");
  } catch (error) {
    setStatus(marketStatus, error.message, "error");
    marketBadge.textContent = "Error";
  } finally {
    setLoading(marketButton, false, "Researching...", "Generate Trend Research");
  }
}

async function generateCampaignPlan(event) {
  event.preventDefault();
  if (!requireSelectedCompany(plannerStatus)) return;

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
      ...getCompanyRequestContext(),
    });
    plannerOutput.value = data.output;
    plannerBadge.textContent = data.source === "openai" ? "AI generated" : "Local generator";
    updateKnowledgeUseBadge(data.usingProfile);
    showSaveWarning(plannerStatus, data, "Lead and campaign plan generated");
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

async function saveGeneratedContent() {
  if (!output.value.trim()) {
    setStatus(statusMessage, "There is no generated content to save yet.", "error");
    return;
  }

  saveContentButton.disabled = true;
  setStatus(statusMessage, "Saving generated content to Supabase...", "neutral");

  try {
    await postJson("/api/saved-marketing-content", {
      title: `${contentTypeSelect.value} - ${categorySelect.value}`,
      contentType: contentTypeSelect.value,
      businessCategory: categorySelect.value,
      targetAudience: generateTargetAudience.value,
      region: generateRegion.value,
      campaignGoal: generateCampaignGoal.value,
      tone: generateTone.value,
      recommendation: lastGenerationMeta?.recommendation || null,
      qualityScore: lastGenerationMeta?.qualityScore || null,
      selectedCompanyProfile: lastGenerationMeta?.selectedCompanyProfile || selectedCompany || null,
      userRequest: userRequestInput.value,
      generatedOutput: output.value,
      status: "draft",
      companyId: selectedCompany?.id || null,
    });
    setStatus(statusMessage, "Saved to Content Library.", "success");
    loadLibrary();
  } catch (error) {
    setStatus(statusMessage, `Generated successfully, but saving failed: ${error.message}`, "error");
  } finally {
    saveContentButton.disabled = false;
  }
}

async function loadLibrary(event) {
  if (event) event.preventDefault();

  setLoading(loadLibraryButton, true, "Loading...", "Load Saved Content");
  setStatus(libraryStatus, "Loading saved marketing content...", "neutral");
  libraryBadge.textContent = "Working";

  try {
    const params = new URLSearchParams();
    if (libraryContentType.value) params.set("contentType", libraryContentType.value);
    if (libraryBusinessCategory.value) params.set("businessCategory", libraryBusinessCategory.value);
    if (selectedCompany?.id) params.set("companyId", selectedCompany.id);
    const response = await fetch(`/api/saved-marketing-content?${params.toString()}`, { headers: authHeaders() });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to load saved content.");

    renderLibrary(data.items || []);
    libraryBadge.textContent = `${(data.items || []).length} saved`;
    setStatus(libraryStatus, "Content Library loaded.", "success");
  } catch (error) {
    libraryList.innerHTML = "";
    libraryBadge.textContent = "Error";
    setStatus(libraryStatus, error.message, "error");
  } finally {
    setLoading(loadLibraryButton, false, "Loading...", "Load Saved Content");
  }
}

function renderLibrary(items) {
  if (!items.length) {
    libraryList.innerHTML = `<p class="empty-state">No saved content found.</p>`;
    return;
  }

  libraryList.innerHTML = items
    .map(
      (item) => `<article class="library-item" data-id="${item.id}">
        <div class="library-item-header">
          <div>
            <h3>${escapeHtml(item.title || "Saved Marketing Content")}</h3>
            <p>${escapeHtml(item.content_type || "Content")} • ${escapeHtml(item.business_category || "Category")}</p>
          </div>
          <select class="library-status" aria-label="Status">
            ${CONTENT_STATUSES.map((status) => `<option value="${status}" ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </div>
        <textarea rows="8" readonly>${escapeHtml(item.generated_output || "")}</textarea>
        <div class="output-actions">
          <button class="secondary-button copy-library" type="button">Copy</button>
          <button class="danger-button delete-library" type="button">Delete</button>
        </div>
      </article>`
    )
    .join("");

  libraryList.querySelectorAll(".copy-library").forEach((button) => {
    button.addEventListener("click", async () => {
      const textarea = button.closest(".library-item").querySelector("textarea");
      await navigator.clipboard.writeText(textarea.value);
      setStatus(libraryStatus, "Copied saved content.", "success");
    });
  });

  libraryList.querySelectorAll(".library-status").forEach((select) => {
    select.addEventListener("change", async () => {
      const id = select.closest(".library-item").dataset.id;
      try {
        await patchJson(`/api/saved-marketing-content/${encodeURIComponent(id)}`, { status: select.value });
        setStatus(libraryStatus, "Status updated.", "success");
      } catch (error) {
        setStatus(libraryStatus, error.message, "error");
      }
    });
  });

  libraryList.querySelectorAll(".delete-library").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.closest(".library-item").dataset.id;
      try {
        await deleteJson(`/api/saved-marketing-content/${encodeURIComponent(id)}`);
        button.closest(".library-item").remove();
        setStatus(libraryStatus, "Saved content deleted.", "success");
      } catch (error) {
        setStatus(libraryStatus, error.message, "error");
      }
    });
  });
}

function resetLibraryFilters() {
  libraryFilterForm.reset();
  libraryContentType.value = "";
  libraryBusinessCategory.value = "";
  loadLibrary();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resetForm() {
  form.reset();
  contentTypeSelect.value = CONTENT_TYPES[0];
  categorySelect.value = BUSINESS_CATEGORIES[0];
  generateTargetAudience.value = TARGET_AUDIENCES[0];
  generateCampaignGoal.value = CAMPAIGN_GOALS[0];
  generateTone.value = CONTENT_TONES[0];
  variationCount.value = VARIATION_COUNTS[0];
  marketAwareMode.checked = true;
  suggestBestService.checked = true;
  useLiveSearch.checked = false;
  generateRegion.value = "";
  output.value = "";
  lastGenerationMeta = null;
  renderRecommendation(null);
  renderQualityScore(null);
  searchNote.textContent = "";
  copyButton.disabled = true;
  saveContentButton.disabled = true;
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

function updateKnowledgeUseBadge(isUsing) {
  knowledgeUseBadge.textContent = selectedCompany
    ? isUsing
      ? `Using selected company profile: ${selectedCompany.company_name}`
      : EMPTY_KNOWLEDGE_MESSAGE
    : "Please create or select a company profile first.";
  knowledgeUseBadge.dataset.active = String(Boolean(isUsing));
  marketKnowledgeBadge.textContent = knowledgeUseBadge.textContent;
  marketKnowledgeBadge.dataset.active = knowledgeUseBadge.dataset.active;
  plannerKnowledgeBadge.textContent = knowledgeUseBadge.textContent;
  plannerKnowledgeBadge.dataset.active = knowledgeUseBadge.dataset.active;
}

function getSavedKnowledge() {
  return localStorage.getItem(COMPANY_KNOWLEDGE_KEY) || "";
}

function saveKnowledgeToLocalStorage(profileText) {
  localStorage.setItem(COMPANY_KNOWLEDGE_KEY, profileText);
}

async function fetchUserCompanies(userId, { selectedCompanyId = "" } = {}) {
  if (!userId) {
    companies = [];
    renderCompanySelect(selectedCompanyId);
    setStatus(companyStatus, "Please log in before loading company profiles.", "error");
    return [];
  }

  try {
    console.log("[companies] fetch for user:", userId);
    const response = await fetch("/api/companies", { headers: authHeaders() });
    const data = await response.json();
    console.log("[companies] fetch response:", data);
    if (!response.ok) throw new Error(data.error || "Unable to load company profiles.");
    companies = data.companies || [];
    if (!companies.length) {
      setStatus(companyStatus, "No companies found for this account. Create your first company profile.", "neutral");
    }
  } catch (error) {
    console.error("[companies] fetch companies error:", error);
    companies = [];
    setStatus(companyStatus, "Company profiles could not be loaded. Please try again.", "error");
  }
  renderCompanySelect(selectedCompanyId);
  return companies;
}

function renderCompanySelect(preferredId = "") {
  const previousId = preferredId || localStorage.getItem(SELECTED_COMPANY_KEY);
  companySelect.innerHTML = `<option value="">Select a company profile</option>`;
  companies.forEach((company, index) => {
    const option = document.createElement("option");
    option.value = company.id || `local-${index}`;
    option.textContent = company.company_name || "Untitled Company";
    companySelect.appendChild(option);
  });
  const match = companies.find((company, index) => (company.id || `local-${index}`) === previousId) || companies[0] || null;
  selectCompany(match);
}

function selectCompany(company) {
  selectedCompany = company || null;
  if (selectedCompany) {
    const selectedId = selectedCompany.id || `local-${companies.indexOf(selectedCompany)}`;
    companySelect.value = selectedId;
    localStorage.setItem(SELECTED_COMPANY_KEY, selectedId);
    selectedCompanyBadge.textContent = `Using selected company profile: ${selectedCompany.company_name}`;
    selectedCompanyBadge.dataset.active = "true";
    const visibility = selectedCompany.visibility || "private";
    companyVisibilityBadge.textContent =
      visibility === "public_demo" ? "Demo company" : visibility === "shared" ? "Shared company" : "Private company";
    const canManage = canManageSelectedCompany();
    editCompanyButton.disabled = !canManage;
    deleteCompanyButton.disabled = !canManage;
    updateKnowledgeUseBadge(true);
    const brain = selectedCompany.profile?.output || getSavedKnowledge();
    if (brain) {
      saveKnowledgeToLocalStorage(brain);
      knowledgeOutput.value = brain;
      profileBadge.textContent = "Saved";
    } else {
      knowledgeOutput.value = EMPTY_KNOWLEDGE_MESSAGE;
      profileBadge.textContent = "Not built";
    }
  } else {
    selectedCompanyBadge.textContent = "Please create or select a company profile first.";
    selectedCompanyBadge.dataset.active = "false";
    companyVisibilityBadge.textContent = "Private company";
    editCompanyButton.disabled = true;
    deleteCompanyButton.disabled = true;
    updateKnowledgeUseBadge(false);
  }
}

function canManageSelectedCompany() {
  if (!selectedCompany) return false;
  if (currentUserProfile?.role === "admin") return true;
  return selectedCompany.owner_id && selectedCompany.owner_id === currentSession?.user?.id;
}

function openCompanyForm(company = null) {
  editingCompanyId = company?.id || "";
  companyForm.hidden = false;
  companyNameInput.value = company?.company_name || "";
  companyIndustryInput.value = company?.industry || "";
  companyWebsiteUrlsInput.value = (company?.website_urls || []).join("\n");
  companyServicesInput.value = (company?.services || []).join("\n");
  companyProductsInput.value = (company?.products || []).join("\n");
  companyAudienceInput.value = (company?.target_audience || []).join("\n");
  companyCompetitorsInput.value = Array.isArray(company?.competitors) ? company.competitors.join("\n") : "";
  companyToneInput.value = company?.brand_tone || "";
  companyVisibilityInput.value = company?.visibility || "private";
  companyNotesInput.value = company?.notes || "";
  setStatus(companyStatus, editingCompanyId ? "Edit the selected company profile." : "Create a new company profile.", "neutral");
}

function closeCompanyForm() {
  companyForm.hidden = true;
  editingCompanyId = "";
}

async function saveCompanyProfile(event) {
  event.preventDefault();
  const payload = {
    company_name: companyNameInput.value,
    industry: companyIndustryInput.value,
    website_urls: companyWebsiteUrlsInput.value,
    services: companyServicesInput.value,
    products: companyProductsInput.value,
    target_audience: companyAudienceInput.value,
    competitors: companyCompetitorsInput.value,
    brand_tone: companyToneInput.value,
    visibility: companyVisibilityInput.value,
    notes: companyNotesInput.value,
  };
  if (!payload.company_name.trim()) {
    setStatus(companyStatus, "Company name is required.", "error");
    return;
  }
  setLoading(saveCompanyButton, true, "Saving...", "Save Company Profile");
  try {
    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser();
    if (userError || !user?.id) throw new Error("Your login session could not be verified. Please log in again.");
    console.log("[companies] current user id before save:", user.id);

    const url = editingCompanyId ? `/api/companies/${encodeURIComponent(editingCompanyId)}` : "/api/companies";
    const method = editingCompanyId ? "PATCH" : "POST";
    const response = await fetch(url, { method, headers: authHeaders({ "Content-Type": "application/json" }), body: JSON.stringify(payload) });
    const data = await response.json();
    console.log("[companies] company insert/update response:", data);
    if (!response.ok) {
      console.error("[companies] company insert/update error:", data.error);
      throw new Error(data.error || "Unable to save company.");
    }
    await fetchUserCompanies(user.id, { selectedCompanyId: data.company?.id || editingCompanyId });
    const savedCompany = companies.find((company) => company.id === data.company?.id) || data.company;
    selectCompany(savedCompany);
    closeCompanyForm();
    setStatus(
      companyStatus,
      data.localFallback
        ? "Company profile saved locally. Run the Supabase schema later to enable cloud database storage."
        : "Company profile saved.",
      "success"
    );
  } catch (error) {
    console.error("[companies] company insert error:", error);
    setStatus(companyStatus, error.message || "Company could not be saved. Please try again.", "error");
  } finally {
    setLoading(saveCompanyButton, false, "Saving...", "Save Company Profile");
  }
}

async function deleteSelectedCompany() {
  if (!selectedCompany) {
    setStatus(companyStatus, "Please create or select a company profile first.", "error");
    return;
  }
  if (selectedCompany.id && !String(selectedCompany.id).startsWith("local-")) {
    try {
      await deleteJson(`/api/companies/${encodeURIComponent(selectedCompany.id)}`);
    } catch (error) {
      setStatus(companyStatus, `Database delete failed: ${error.message}`, "error");
      return;
    }
  }
  await fetchUserCompanies(currentSession?.user?.id);
  setStatus(companyStatus, "Company profile deleted from this workspace.", "success");
}

function createDefaultCompany() {
  return {
    id: "local-cygnisoft",
    company_name: "CygniSoft",
    website_urls: ["https://cygnisoft.com"],
    industry: "Staffing solutions and software solutions",
    services: ["Healthcare staffing", "IT and technical hiring", "General staffing", "Custom software development", "Web app development", "AI automation"],
    products: ["Resume parser", "Candidate registration system", "Healthcare staffing software", "Snow removal management system"],
    target_audience: ["Clinics", "Healthcare agencies", "Small businesses", "Staffing agencies", "Recruitment agencies", "Snow removal companies"],
    brand_tone: "Professional, clear, confident, friendly, simple, and not too salesy",
    competitors: [],
    notes: "Default example company profile.",
    profile: { output: getSavedKnowledge() },
  };
}

function parseCompanyPayloadLocally(payload) {
  return {
    company_name: payload.company_name,
    industry: payload.industry,
    website_urls: splitLines(payload.website_urls),
    services: splitLines(payload.services),
    products: splitLines(payload.products),
    target_audience: splitLines(payload.target_audience),
    competitors: splitLines(payload.competitors),
    brand_tone: payload.brand_tone,
    visibility: payload.visibility || "private",
    notes: payload.notes,
    profile: {},
  };
}

function splitLines(value) {
  return String(value || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function init() {
  document.querySelector("#subtitle").textContent = COMPANY_DETAILS.subtitle;
  document.querySelector("#positioning").textContent = COMPANY_DETAILS.positioning;
  fillSelect(contentTypeSelect, CONTENT_TYPES);
  fillSelect(categorySelect, BUSINESS_CATEGORIES);
  fillSelect(generateTargetAudience, TARGET_AUDIENCES);
  fillSelect(generateCampaignGoal, CAMPAIGN_GOALS);
  fillSelect(generateTone, CONTENT_TONES);
  fillSelect(variationCount, VARIATION_COUNTS);
  fillSelect(marketIndustry, MARKET_INDUSTRIES);
  fillSelect(researchFocus, RESEARCH_FOCUS_OPTIONS);
  fillSelect(plannerService, PLANNER_SERVICES);
  fillSelect(targetAudience, TARGET_AUDIENCES);
  fillSelect(campaignGoal, CAMPAIGN_GOALS);
  fillSelect(campaignDuration, CAMPAIGN_DURATIONS);
  fillSelectWithAll(libraryContentType, CONTENT_TYPES, "All content types");
  fillSelectWithAll(libraryBusinessCategory, BUSINESS_CATEGORIES, "All categories");

  setupTabs();

  authForm.addEventListener("submit", handleAuthSubmit);
  signInModeButton.addEventListener("click", () => setAuthMode("signin"));
  signUpModeButton.addEventListener("click", () => setAuthMode("signup"));
  forgotModeButton.addEventListener("click", () => setAuthMode("forgot"));
  forgotPasswordButton.addEventListener("click", sendForgotPasswordFromSignIn);
  resendConfirmationButton.addEventListener("click", resendConfirmationEmail);
  goToSignInButton.addEventListener("click", () => setAuthMode("signin"));
  logoutButton.addEventListener("click", logout);

  companySelect.addEventListener("change", () => {
    const selected = companies.find((company, index) => (company.id || `local-${index}`) === companySelect.value);
    selectCompany(selected || null);
  });
  createCompanyButton.addEventListener("click", () => openCompanyForm());
  editCompanyButton.addEventListener("click", () => {
    if (!requireSelectedCompany(companyStatus)) return;
    openCompanyForm(selectedCompany);
  });
  deleteCompanyButton.addEventListener("click", deleteSelectedCompany);
  companyForm.addEventListener("submit", saveCompanyProfile);
  cancelCompanyButton.addEventListener("click", closeCompanyForm);

  form.addEventListener("submit", generateContent);
  resetButton.addEventListener("click", resetForm);
  copyButton.addEventListener("click", () => copyText(output, statusMessage));
  saveContentButton.addEventListener("click", saveGeneratedContent);

  knowledgeForm.addEventListener("submit", buildKnowledge);
  copyKnowledgeButton.addEventListener("click", () => copyText(knowledgeOutput, knowledgeStatus));
  editKnowledgeButton.addEventListener("click", editKnowledge);
  saveKnowledgeButton.addEventListener("click", saveManualKnowledge);
  updateKnowledgeButton.addEventListener("click", saveManualKnowledge);
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

  libraryFilterForm.addEventListener("submit", loadLibrary);
  resetLibraryButton.addEventListener("click", resetLibraryFilters);

  resetForm();
  resetMarketForm();
  resetPlannerForm();
  setAuthMode("signin");
  setStatus(knowledgeStatus, "Enter public company URLs to build a reusable Company Business Brain.", "neutral");
  setStatus(reviewStatus, "Enter a page URL to get a focused content and SEO review.", "neutral");
  setStatus(competitorStatus, "Enter competitor URLs to compare positioning, CTAs, trust signals, and gaps.", "neutral");
  setStatus(libraryStatus, "Load saved generated content from Supabase.", "neutral");
  initializeAuth();
}

init();
