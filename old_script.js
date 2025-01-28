document.getElementById("ytdlp-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const url = document.getElementById("url").value;
  const outputDir = document.getElementById("output-dir").value;

  if (!outputDir) {
    alert("Please select an output directory.");
    return;
  }

  let command = `yt-dlp -x --embed-metadata --force-overwrites`;

  if (outputDir) {
    command += ` -P "${outputDir}"`;
  }

  command += ` -o "%(title)s.%(ext)s"`;

  command += ` "${url}"`;

  document.getElementById("command-output").textContent = command;
  document.querySelector(".command-explanation").style.display = "block";

  // Show the copy button after command is generated
  document.getElementById("copy-command-button").style.display = "inline-block";

  executeCommand(command);
});

function executeCommand(command) {
  // This function would be implemented on the server side
  // Here, we're simulating the process
  checkPermissions(command)
    .then((response) => {
      if (response.success) {
        return runCommand(command);
      } else {
        throw new Error(response.message);
      }
    })
    .then((output) => {
      // Simulate download by creating an <a> tag and clicking it.
      const downloadLink = document.createElement("a");
      downloadLink.href =
        "data:text/plain;charset=utf-8," + encodeURIComponent(output);
      downloadLink.download = "command-output.txt"; // Set the download filename

      // Append the link to the body and trigger the download.
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      document.getElementById("execution-result").textContent =
        "Command Executed. Check your browser's download folder for the output.";
    })
    .catch((error) => {
      document.getElementById(
        "execution-result"
      ).textContent = `Error: ${error.message}\n\nSuggestions:\n1. Choose a different output directory\n2. Run the application with elevated privileges\n3. Ensure you have write permissions in the selected directory`;
    });
}

function checkPermissions(command) {
  // This would be a server-side check
  // Here, we're simulating the process
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating a permission denied error
      resolve({
        success: false,
        message:
          "Permission denied. Unable to write to the specified directory.",
      });
    }, 1000);
  });
}

function runCommand(command) {
  // This would execute the command on the server
  // Here, we're simulating the process
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Executing: ${command}\nDownloading video information...\nExtracting audio...\nDownload completed successfully!`
      );
    }, 2000);
  });
}

// This event handler is for showing the directory picker
// Simulate directory picker for CodeSandbox
document.getElementById("select-dir").addEventListener("click", function () {
  const simulatedPath = "/simulated/output/directory";
  document.getElementById("output-dir").value = simulatedPath;
});

// Theme Toggle Logic
const themeToggleButton = document.getElementById("theme-toggle-button");
const body = document.body;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>`;
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>`;

function updateThemeIcon() {
  if (body.classList.contains("dark-theme")) {
    themeToggleButton.innerHTML = sunIcon;
  } else {
    themeToggleButton.innerHTML = moonIcon;
  }
}

themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  updateThemeIcon();
});
updateThemeIcon();

// Copy to Clipboard Logic
const copyCommandButton = document.getElementById("copy-command-button");
const commandOutput = document.getElementById("command-output");

copyCommandButton.addEventListener("click", () => {
  const commandText = commandOutput.textContent;
  navigator.clipboard
    .writeText(commandText)
    .then(() => {
      // Update button text to indicate successful copy.
      copyCommandButton.textContent = "Copied!";

      // Reset button text after a brief delay (optional)
      setTimeout(() => {
        copyCommandButton.textContent = "Copy Code";
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy command: ", err);
      copyCommandButton.textContent = "Copy Error";
      setTimeout(() => {
        copyCommandButton.textContent = "Copy Code";
      }, 1500);
    });
});

// Hide the copy button initially
document.getElementById("copy-command-button").style.display = "none";

// Set default value of output directory based on OS
document.addEventListener("DOMContentLoaded", function () {
  const outputDirInput = document.getElementById("output-dir");

  // Determine user's home directory
  const defaultDir = (function () {
    if (navigator.platform.startsWith("Win")) {
      return (
        "C:\\Users\\" + new URL(window.location.href).username + "\\Downloads"
      );
    } else if (navigator.platform.startsWith("Mac")) {
      return "/Users/" + new URL(window.location.href).username + "/Downloads";
    } else if (navigator.platform.startsWith("Linux")) {
      return "/home/" + new URL(window.location.href).username + "/Downloads";
    }
    return "/simulated/output/directory";
  })();

  outputDirInput.value = defaultDir;
});

// Show app explanation on info icon click
document.getElementById("info-icon").addEventListener("click", function () {
  const explanation = document.getElementById("app-explanation");
  if (explanation.style.display === "block") {
    explanation.style.display = "none";
  } else {
    explanation.style.display = "block";
  }
});
