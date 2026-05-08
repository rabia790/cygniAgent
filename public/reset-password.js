import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const form = document.querySelector("#resetForm");
const newPassword = document.querySelector("#newPassword");
const confirmNewPassword = document.querySelector("#confirmNewPassword");
const button = document.querySelector("#resetPasswordButton");
const status = document.querySelector("#resetStatus");
let supabase = null;

function setStatus(message, type = "neutral") {
  status.textContent = message;
  status.dataset.type = type;
}

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.querySelector(".button-text").textContent = isLoading ? "Updating..." : "Update Password";
  button.querySelector(".spinner").hidden = !isLoading;
}

async function init() {
  try {
    const response = await fetch("/api/auth/config");
    const config = await response.json();
    if (!config.supabaseConfigured) {
      setStatus("Supabase is not configured. Please add Supabase environment variables.", "error");
      return;
    }
    supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
    await supabase.auth.getSession();
  } catch (error) {
    setStatus(`Reset page could not load: ${error.message}`, "error");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!supabase) return;
  const password = newPassword.value;
  const confirm = confirmNewPassword.value;
  if (!password) return setStatus("Password is required.", "error");
  if (password.length < 6) return setStatus("Password must be at least 6 characters.", "error");
  if (password !== confirm) return setStatus("Passwords must match.", "error");
  setLoading(true);
  const { error } = await supabase.auth.updateUser({ password });
  setLoading(false);
  if (error) {
    setStatus(error.message, "error");
    return;
  }
  setStatus("Password updated successfully. Opening dashboard...", "success");
  window.setTimeout(() => window.location.replace("/"), 1200);
});

init();
