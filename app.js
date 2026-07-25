const scenarios = {
  outbound: {
    title: "Outbound Agent",
    video: "https://youtu.be/25lwHeO-j5E",
    preview: "https://www.youtube-nocookie.com/embed/25lwHeO-j5E?rel=0&modestbranding=1&playsinline=1",
    chat: [
      ["user", "Can you remind customers about their upcoming appointment?"],
      ["ai", "Yes. I can call or message them with the appointment time and next steps."],
      ["user", "Please handle reschedules too."],
      ["ai", "Done. I will offer open slots and confirm the new time automatically."]
    ]
  },
  health: {
    title: "Health",
    video: "https://youtube.com/shorts/WTDezouFwoI?feature=share",
    preview: "https://www.youtube-nocookie.com/embed/WTDezouFwoI?rel=0&modestbranding=1&playsinline=1",
    chat: [
      ["user", "I need to book a follow-up visit."],
      ["ai", "I can help. Would you prefer the earliest slot or your usual clinic?"],
      ["user", "Earliest slot, please."],
      ["ai", "I found an opening tomorrow morning and can send the intake forms now."]
    ]
  },
  travel: {
    title: "Travel",
    video: "https://youtube.com/shorts/CXtupoB-kNg?feature=share",
    preview: "https://www.youtube-nocookie.com/embed/CXtupoB-kNg?rel=0&modestbranding=1&playsinline=1",
    chat: [
      ["user", "My flight was delayed. Can I still make the hotel check-in?"],
      ["ai", "Yes. I updated the hotel with your arrival time and found a later shuttle."],
      ["user", "Can you add the shuttle details to my itinerary?"],
      ["ai", "Done. I also flagged your connection so you get alerts as it changes."]
    ]
  },
  account: {
    title: "Account Management",
    video: "https://youtube.com/shorts/-mqj4PKYJo8?feature=share",
    preview: "https://www.youtube-nocookie.com/embed/-mqj4PKYJo8?rel=0&modestbranding=1&playsinline=1",
    chat: [
      ["user", "Can you brief me before the renewal call?"],
      ["ai", "The account expanded usage by 32%, but two support issues remain open."],
      ["user", "What should I prioritize?"],
      ["ai", "Start with the open issues, then offer the team analytics add-on."]
    ]
  },
  home: {
    title: "Home Service",
    video: "https://youtube.com/shorts/ayM1ihCiXR8?feature=share",
    preview: "https://www.youtube-nocookie.com/embed/ayM1ihCiXR8?rel=0&modestbranding=1&playsinline=1",
    chat: [
      ["user", "Can someone come by to fix my service issue?"],
      ["ai", "I found a technician window tomorrow between 10:00 AM and noon."],
      ["user", "Can you text me when they are nearby?"],
      ["ai", "Yes. I will send arrival updates and follow up after the visit."]
    ]
  }
};

const cards = document.querySelectorAll(".scenario-card");
const phoneTitle = document.querySelector("#phoneTitle");
const videoTitle = document.querySelector("#videoTitle");
const video = document.querySelector("#scenarioVideo");
const openVideo = document.querySelector("#openVideo");
const videoFallback = document.querySelector("#videoFallback");
const videoFallbackLink = document.querySelector("#videoFallback a");
const emptyVideo = document.querySelector("#emptyVideo");
const chatFeed = document.querySelector("#chatFeed");

function setScenario(name) {
  const scenario = scenarios[name];
  if (!scenario) return;

  cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.scenario === name);
    card.setAttribute("aria-selected", String(card.dataset.scenario === name));
  });

  phoneTitle.textContent = scenario.title;
  videoTitle.textContent = scenario.title;
  video.title = `${scenario.title} scenario video`;
  openVideo.href = scenario.video || "#";
  openVideo.textContent = scenario.video ? "Open video" : "No video";
  openVideo.toggleAttribute("aria-disabled", !scenario.video);

  if (videoFallback) {
    videoFallback.hidden = Boolean(scenario.preview);
  }

  if (videoFallbackLink) {
    videoFallbackLink.href = scenario.video || "#";
    videoFallbackLink.textContent = scenario.video ? "Open in YouTube" : "No video";
  }

  if (scenario.preview) {
    video.hidden = false;
    emptyVideo.hidden = true;
    if (video.src !== scenario.preview) {
      video.src = scenario.preview;
    }
  } else {
    video.hidden = true;
    emptyVideo.hidden = false;
    video.removeAttribute("src");
  }

  chatFeed.replaceChildren(
    ...scenario.chat.map(([sender, text]) => {
      const bubble = document.createElement("div");
      bubble.className = `bubble ${sender}`;
      bubble.textContent = text;
      return bubble;
    })
  );
}

cards.forEach((card) => {
  card.addEventListener("click", () => setScenario(card.dataset.scenario));
});

setScenario("outbound");
