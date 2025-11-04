// HeartScript Love Letter - Vanilla JS Engine
// Author: Your Name
// Version: 2.0 (Upgraded Edition)
// Date: November 04, 2025
// Description: Modular JavaScript for handling interactivity, animations, audio, themes, and personalization.

// Utility Function: Debounce for performance optimization
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Class: Core ValentineConfession Manager
class ValentineConfession {
  constructor() {
    // DOM Elements
    this.toggle = document.getElementById("messageToggle");
    this.messageCard = document.getElementById("messageCard");
    this.heartToggle = document.querySelector(".heart-toggle");
    this.container = document.querySelector(".interactive-container");
    this.instruction = document.querySelector(".instruction");
    this.muteToggle = document.getElementById("muteToggle");
    this.recipientName = document.getElementById("recipientName");
    this.senderName = document.getElementById("senderName");
    this.messagePara1 = document.getElementById("messagePara1");
    this.messagePara2 = document.getElementById("messagePara2");

    // State Variables
    this.isMuted = false;
    this.currentTheme = "valentine";
    this.audioContext = null;

    // Initialization
    this.init();
  }

  init() {
    // Event Listeners
    this.toggle.addEventListener("change", this.handleToggle.bind(this));
    this.muteToggle.addEventListener("change", this.handleMute.bind(this));
    this.setupAccessibility();
    this.loadFromLocalStorage();
    this.setupThemeSwitcher();

    // Debounced Resize Listener for Responsiveness
    window.addEventListener(
      "resize",
      debounce(this.handleResize.bind(this), 200)
    );
  }

  // Handler: Toggle Change
  handleToggle(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.openCard();
    } else {
      this.closeCard();
    }
  }

  // Method: Open Card with Animations
  openCard() {
    // Hide Instruction
    this.instruction.classList.add("animate-fadeOut");
    this.instruction.style.opacity = "0";

    // Move Heart
    this.heartToggle.classList.add("moved");

    // Open Card with Delay
    setTimeout(() => {
      this.messageCard.classList.add("open");
      this.container.classList.add("active");
      this.messageCard.classList.add("animate-slideIn");
    }, 300);

    // Confetti Effect
    this.createConfetti(50);

    // Play Sound if not Muted
    if (!this.isMuted) {
      this.playHeartSound();
    }

    // Update ARIA
    this.messageCard.setAttribute("aria-hidden", "false");
  }

  // Method: Close Card with Animations
  closeCard() {
    // Close Card
    this.messageCard.classList.remove("open");
    this.container.classList.remove("active");
    this.messageCard.classList.add("animate-slideOut");

    // Move Heart Back
    this.heartToggle.classList.remove("moved");

    // Show Instruction
    setTimeout(() => {
      this.instruction.style.opacity = "1";
      this.instruction.classList.remove("animate-fadeOut");
    }, 500);

    // Update ARIA
    this.messageCard.setAttribute("aria-hidden", "true");
  }

  // Method: Create Confetti Particles
  createConfetti(count = 50) {
    const colors = ["#ff6b8b", "#ffa7ba", "#ff4757", "#ff3742"];
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.top = "-10px";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "1000";

      document.body.appendChild(confetti);

      // Animate
      const animation = confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(${window.innerHeight}px) rotate(${
              360 * Math.random()
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 2000 + Math.random() * 3000,
          easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
        }
      );

      animation.onfinish = () => confetti.remove();
    }
  }

  // Method: Play Heart Sound using Web Audio API
  playHeartSound() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(
        523.25,
        this.audioContext.currentTime
      ); // C5 Note
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.5);
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  }

  // Handler: Mute Toggle
  handleMute(event) {
    this.isMuted = event.target.checked;
    localStorage.setItem("isMuted", this.isMuted);
  }

  // Method: Setup Accessibility Features
  setupAccessibility() {
    // ARIA Attributes
    this.toggle.setAttribute("aria-label", "Toggle love letter");
    this.toggle.setAttribute("aria-expanded", "false");
    this.messageCard.setAttribute("aria-hidden", "true");
    this.messageCard.setAttribute("role", "dialog");

    // Update on Toggle
    this.toggle.addEventListener("change", () => {
      const isExpanded = this.toggle.checked;
      this.toggle.setAttribute("aria-expanded", isExpanded.toString());
      this.messageCard.setAttribute("aria-hidden", (!isExpanded).toString());
    });

    // Keyboard Navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.toggle.checked) {
        this.toggle.checked = false;
        this.handleToggle({ target: this.toggle });
      }
      if (
        (event.key === "Enter" || event.key === " ") &&
        document.activeElement === this.toggle
      ) {
        event.preventDefault();
        this.toggle.checked = !this.toggle.checked;
        this.handleToggle({ target: this.toggle });
      }
    });

    // Focus Management
    this.messageCard.addEventListener("transitionend", () => {
      if (this.toggle.checked) {
        this.messageCard.focus();
      }
    });
  }

  // Method: Load Settings from Local Storage
  loadFromLocalStorage() {
    const savedMute = localStorage.getItem("isMuted");
    if (savedMute !== null) {
      this.isMuted = JSON.parse(savedMute);
      this.muteToggle.checked = this.isMuted;
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.changeTheme(savedTheme);
    }

    const savedRecipient = localStorage.getItem("recipientName");
    if (savedRecipient) {
      this.recipientName.textContent = savedRecipient;
    }

    const savedSender = localStorage.getItem("senderName");
    if (savedSender) {
      this.senderName.textContent = savedSender;
    }

    const savedPara1 = localStorage.getItem("messagePara1");
    if (savedPara1) {
      this.messagePara1.textContent = savedPara1;
    }

    const savedPara2 = localStorage.getItem("messagePara2");
    if (savedPara2) {
      this.messagePara2.textContent = savedPara2;
    }
  }

  // Method: Setup Theme Switcher (Global Function for onclick)
  setupThemeSwitcher() {
    window.changeTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      this.currentTheme = theme;
      localStorage.setItem("theme", theme);
    };
  }

  // Method: Personalize Message (Global for onclick)
  personalizeMessage() {
    const newRecipient = prompt(
      "Enter the recipient's name:",
      this.recipientName.textContent
    );
    if (newRecipient) {
      this.recipientName.textContent = newRecipient;
      localStorage.setItem("recipientName", newRecipient);
    }

    const newPara1 = prompt(
      "Edit first paragraph:",
      this.messagePara1.textContent
    );
    if (newPara1) {
      this.messagePara1.textContent = newPara1;
      localStorage.setItem("messagePara1", newPara1);
    }

    const newPara2 = prompt(
      "Edit second paragraph:",
      this.messagePara2.textContent
    );
    if (newPara2) {
      this.messagePara2.textContent = newPara2;
      localStorage.setItem("messagePara2", newPara2);
    }

    const newSender = prompt(
      "Enter your name/signature:",
      this.senderName.textContent
    );
    if (newSender) {
      this.senderName.textContent = newSender;
      localStorage.setItem("senderName", newSender);
    }
  }

  // Handler: Window Resize for Dynamic Adjustments
  handleResize() {
    // Example: Adjust heart size based on viewport (if needed)
    console.log("Window resized - adjusting layouts if necessary");
  }
}

// Global Function for Personalization (Exposed for HTML onclick)
window.personalizeMessage = () => {
  const instance = document.valentineInstance;
  if (instance) {
    instance.personalizeMessage();
  }
};

// Initialization on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  const instance = new ValentineConfession();
  document.valentineInstance = instance; // For global access
});

// Service Worker Registration for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Additional Utility Functions for Expansion

// Function: Error Handler Wrapper
function withErrorHandling(fn) {
  return (...args) => {
    try {
      fn(...args);
    } catch (error) {
      console.error("Error in function:", error);
      // Optional: Show user-friendly message
      alert("An error occurred. Please try again.");
    }
  };
}

// Function: Animate Element
function animateElement(element, animationClass) {
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, 1000); // Assuming 1s duration
}

// Function: Check Device Type
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Function: Log Usage Stats (for Analytics)
function logEvent(eventName) {
  console.log(`Event logged: ${eventName}`);
  // Could integrate with GA or custom analytics
}

// More Modular Classes for Future Expansion

// Class: Audio Manager
class AudioManager {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  playTone(frequency, duration) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.3;
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }
}

// Class: Animation Orchestrator
class AnimationOrchestrator {
  constructor(element) {
    this.element = element;
  }

  startAnimation(keyframes, options) {
    this.element.animate(keyframes, options);
  }
}

// Class: Storage Manager
class StorageManager {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

// Class: Accessibility Auditor
class AccessibilityAuditor {
  static checkARIA(element) {
    if (!element.getAttribute("aria-label")) {
      console.warn("Missing ARIA label on element");
    }
  }
}

// Example Usage Extensions (Commented for Now)
// const audioMgr = new AudioManager();
// audioMgr.playTone(440, 500);

// End of Script - Expanded with classes, functions, and comments for professionalism
