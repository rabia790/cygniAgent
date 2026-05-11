import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const status = document.querySelector("#linkedinCallbackStatus");

function setStatus(message, type = "neutral") {
  status.textContent = message;
  status.dataset.type = type;
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code") || "";
  const state = params.get("state") || "";
  const oauthError = params.get("error") || "";

  if (oauthError) {
    setStatus("LinkedIn connection was cancelled or denied.", "error");
    window.setTimeout(() => window.location.replace("/#generate"), 1800);
    return;
  }

  if (!code || !state) {
    setStatus("LinkedIn did not return the required connection details. Please try again.", "error");
    window.setTimeout(() => window.location.replace("/#generate"), 1800);
    return;
  }

  try {
    const response = await fetch("/api/auth/config");
    const config = await response.json();
    if (!config.supabaseConfigured) {
      setStatus("Supabase is not configured. Please add Supabase environment variables.", "error");
      return;
    }

    const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) {
      setStatus("Please sign in again before connecting LinkedIn.", "error");
      window.setTimeout(() => window.location.replace("/#generate"), 1800);
      return;
    }

    const callbackResponse = await fetch("/api/linkedin/oauth/callback", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, state }),
    });
    const callbackData = await callbackResponse.json();
    if (!callbackResponse.ok) throw new Error(callbackData.error || "LinkedIn could not be connected.");

    setStatus("LinkedIn connected. Returning to Strategic Outputs...", "success");
    window.setTimeout(() => window.location.replace("/#generate"), 900);
  } catch (error) {
    setStatus(error.message || "LinkedIn connection could not be completed. Please try again.", "error");
    window.setTimeout(() => window.location.replace("/#generate"), 2200);
  }
}

init();
