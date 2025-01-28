// ==============================================
// DOM Element Cache
// ==============================================
const elements = {
  form: document.getElementById("ytdlp-form"),
  urlInput: document.getElementById("url"),
  outputDirInput: document.getElementById("output-dir"),
  commandOutput: document.getElementById("command-output"),
  commandExplanation: document.querySelector(".command-explanation"),
  copyButton: document.getElementById("copy-command-button"),
  selectDirButton: document.getElementById("select-dir"),
  themeToggleButton: document.getElementById("theme-toggle-button"),
  infoIcon: document.getElementById("info-icon"),
  appExplanation: document.getElementById("app-explanation"),
};

// ==============================================
// Theme Management
// ==============================================
const THEME_ICONS = {
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>`,
};

function updateThemeIcon() {
  const isDarkTheme = document.body.classList.contains("dark-theme");
  elements.themeToggleButton.innerHTML = isDarkTheme
    ? THEME_ICONS.sun
    : THEME_ICONS.moon;
}

// ==============================================
// Utility Functions
// ==============================================
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input.replace(/[;&|`$()]/g, "");
};

const getDefaultOutputDirectory = () => {
  return "C:\\Downloads";
};

// ==============================================
// Command Generation and Execution
// ==============================================
const generateCommand = (url, outputDir) => {
  const sanitizedUrl = sanitizeInput(url);
  const sanitizedDir = sanitizeInput(outputDir).replace(/\\/g, "/");

  return [
    "yt-dlp -x",
    "--embed-metadata",
    "--force-overwrites",
    `-P "${sanitizedDir}"`,
    '-o "%(title)s.%(ext)s"',
    `"${sanitizedUrl}"`,
  ].join(" ");
};

// ==============================================
// Error Handling
// ==============================================
const showError = (message) => {
  alert(
    `Error: ${message}\n\n` +
      "Suggestions:\n" +
      "1. Choose a different output directory\n" +
      "2. Run the application with elevated privileges\n" +
      "3. Ensure you have write permissions in the selected directory"
  );
};

// ==============================================
// Event Handlers
// ==============================================
// Form submission handler
elements.form.addEventListener("submit", function (e) {
  e.preventDefault();

  const url = elements.urlInput.value;
  const outputDir = elements.outputDirInput.value;

  if (!outputDir) {
    showError("Please select an output directory.");
    return;
  }

  const command = generateCommand(url, outputDir);

  try {
    elements.commandOutput.textContent = command;
    elements.commandExplanation.style.display = "block";
    elements.copyButton.style.display = "inline-block";
  } catch (error) {
    showError(error.message);
  }
});

// Copy button handler
elements.copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(elements.commandOutput.textContent);
    elements.copyButton.textContent = "Copied!";

    setTimeout(() => {
      elements.copyButton.textContent = "Copy Code";
    }, 1500);
  } catch (error) {
    showError("Failed to copy to clipboard. Please copy manually.");
  }
});

// Directory selection handler
elements.selectDirButton.addEventListener("click", () => {
  const simulatedPath = "/simulated/output/directory";
  elements.outputDirInput.value = simulatedPath;
});

// Theme toggle handler
elements.themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  updateThemeIcon();
});

// Info icon handler
elements.infoIcon.addEventListener("click", () => {
  elements.appExplanation.style.display =
    elements.appExplanation.style.display === "block" ? "none" : "block";
});

// ==============================================
// Initialization
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  // Set default output directory
  elements.outputDirInput.value = getDefaultOutputDirectory();

  // Hide copy button initially
  elements.copyButton.style.display = "none";

  // Initialize theme icon
  updateThemeIcon();
});
