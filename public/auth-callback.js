import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const status = document.querySelector("#callbackStatus");

function setStatus(message, type = "neutral") {
  status.textContent = message;
  status.dataset.type = type;
}

async function init() {
  try {
    const response = await fetch("/api/auth/config");
    const config = await response.json();
    if (!config.supabaseConfigured) {
      setStatus("Supabase is not configured. Please add Supabase environment variables.", "error");
      return;
    }
    const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setStatus("Email confirmed. Opening dashboard...", "success");
      window.location.replace("/");
      return;
    }
    setStatus("Email confirmed. Please log in.", "success");
    window.setTimeout(() => window.location.replace("/"), 1600);
  } catch (error) {
    setStatus(`Email confirmation could not be completed: ${error.message}`, "error");
  }
}

init();
