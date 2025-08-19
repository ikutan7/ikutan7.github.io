// By ikutan7 :D

// Catches save logic

let catchHistory = [];

function loadCatchLog() {
  const saved = localStorage.getItem('caughtFishList');
  if (saved) {
    catchHistory = JSON.parse(saved);
  }
}

function saveCatchLog() {
  localStorage.setItem('caughtFishList', JSON.stringify(catchHistory));
}

loadCatchLog();

let gameTime;

// Time saving logic

function loadTime() {
  const stime = localStorage.getItem('gameTime');
  if (stime) {
    gameTime = JSON.parse(stime);
  } else {
    gameTime = 360; // Default to 6:00 AM
  }
}

function saveTime() {
  localStorage.setItem('gameTime', JSON.stringify(gameTime));
}

loadTime()

const avatar = document.getElementById('avatar');
const staticAvatar = 'https://avatars.githubusercontent.com/u/201024699?v=4';
const animatedAvatar = 'https://raw.githubusercontent.com/ikutan7/fishinggame-asset/main/profileik.gif';

avatar.addEventListener('click', () => {
  // Force reload by appending a unique query string
  const timestamp = new Date().getTime();
  avatar.src = `${animatedAvatar}?t=${timestamp}`;

  // Reset to static after GIF duration
  setTimeout(() => {
    avatar.src = staticAvatar;
  }, 2000); // GIF duration
});

function getCurrentHour() {
  return Math.floor(gameTime / 60);
}

let isDay = true;

function updateGameTime() {
  gameTime = (gameTime + 10) % 1440; // 1440 minutes in a day
  const hour = Math.floor(gameTime / 60);
  isDay = hour >= 6 && hour < 18;
  updateTimeVisual(hour);
  saveTime();
}
updateTimeVisual(getCurrentHour());
setInterval(updateGameTime, 10000); // 10s = 10 in-game minutes

function updateTimeVisual(hour) {
  const body = document.body;
  body.classList.toggle('day', isDay);
  body.classList.toggle('night', !isDay);

  const minutes = gameTime % 60;
  const formatted = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  document.getElementById('clockDisplay').textContent = formatted;
}


const fishPool = [
  { name: 'Bluegill',   rarity: 'common',    weightRange: [0.1,   0.9],   activeWindows: [[4, 18]]          },
  { name: 'Trout',      rarity: 'common',    weightRange: [0.5,   2.0],   activeWindows: [[0, 6], [18, 23]] },
  { name: 'R. Trout',   rarity: 'common',    weightRange: [0.5,   2.5],   activeWindows: [[0, 7], [18, 23]] },
  { name: 'Bass',       rarity: 'common',    weightRange: [0.8,   3.0],   activeWindows: [[1, 6], [18, 23]] },
  { name: 'Y. Perch',   rarity: 'common',    weightRange: [1.1,   1.9],   activeWindows: [[0, 6], [18, 22]] },
  { name: 'Roach',      rarity: 'common',    weightRange: [0.05,  1.0],   activeWindows: [[0, 20]]          },
  { name: 'Warmouth',   rarity: 'common',    weightRange: [0.01,  1.1],   activeWindows: [[6, 18]]          },
  { name: 'Crappie',    rarity: 'common',    weightRange: [0.11,  1.5],   activeWindows: [[1, 20]]          },
  { name: 'S. Bass',    rarity: 'common',    weightRange: [0.5,   2.5],   activeWindows: [[0, 24]]          },
  { name: 'C. Pleco',   rarity: 'common',    weightRange: [0.1,   3.0],   activeWindows: [[18, 7]]          },
  { name: 'Walleye',    rarity: 'uncommon',  weightRange: [1.4,   3.2],   activeWindows: [[0, 6], [19, 23]] },
  { name: 'Catfish',    rarity: 'uncommon',  weightRange: [1.0,   5.0],   activeWindows: [[0, 24]]          },
  { name: 'C. Catfish', rarity: 'uncommon',  weightRange: [1.0,   5.0],   activeWindows: [[0, 20]]          },
  { name: 'Salmon',     rarity: 'uncommon',  weightRange: [2.0,   6.0],   activeWindows: [[5, 6], [18, 20]] },
  { name: 'Carp',       rarity: 'uncommon',  weightRange: [2.0,  14.0],   activeWindows: [[19, 20], [1, 5]] },
  { name: 'Panfish',    rarity: 'uncommon',  weightRange: [0.15, 0.22],   activeWindows: [[5, 6], [18, 20]] },
  { name: 'B. Tilapia', rarity: 'uncommon',  weightRange: [2.3,   2.7],   activeWindows: [[0, 24]]          },
  { name: 'Snook',      rarity: 'uncommon',  weightRange: [1.5,   6.5],   activeWindows: [[0, 6], [19, 24]] },
  { name: 'Bullhead',   rarity: 'rare',      weightRange: [0.45,  4.5],   activeWindows: [[11, 19]]         },
  { name: 'L. Bass',    rarity: 'rare',      weightRange: [0.5,  10.0],   activeWindows: [[3, 24]]          },
  { name: 'Pike',       rarity: 'rare',      weightRange: [2.3,   4.5],   activeWindows: [[3, 6], [19, 23]] },
  { name: 'Goldfish',   rarity: 'rare',      weightRange: [0.1,   0.5],   activeWindows: [[5, 19]]          },
  { name: 'Eel',        rarity: 'rare',      weightRange: [0.1,   8.0],   activeWindows: [[19, 4]]          },
  { name: "Flathead",   rarity: 'rare',      weightRange: [3.0,  20.0],   activeWindows: [[18, 7]]          },
  { name: 'Muskie',     rarity: 'legendary', weightRange: [6.8,  16.0],   activeWindows: [[2, 5], [19, 24]] },
  { name: 'Koi',        rarity: 'legendary', weightRange: [7.0,  14.0],   activeWindows: [[8, 22]]          },
  { name: 'Shark',      rarity: 'legendary', weightRange: [8.0,  25.0],   activeWindows: [[3, 6], [19, 23]] }
];

const baitConfigs = {
  Worm: {
    minWait: 5, maxWait: 15,
    rarityWeights: { common: 90, uncommon: 10, rare: 1, legendary: 1 }
  },
  Shrimp: {
    minWait: 10, maxWait: 25,
    rarityWeights: { common: 30, uncommon: 50, rare: 10, legendary: 2 }
  },
  Jig: {
    minWait: 20, maxWait: 50,
    rarityWeights: { common: 45, uncommon: 30, rare: 50, legendary: 5 }
  }
};

const raritySettings = {
  common:    { buttons: 5, time: 3500 },
  uncommon:  { buttons: 7, time: 5000 },
  rare:      { buttons: 10, time: 6000 },
  legendary: { buttons: 25, time: 8000 }
};

const precisionSettings = {
  requiredHits: 3,
  totalTime: 10000,
  sliderSpeed: 2000
};

let selectedBait = 'Worm';
let currentFish = null;
let isCasting = false;

function updateBait() {
  selectedBait = document.getElementById('baitSelect').value;
}

function castLine() {
  if (isCasting) return logText('Already clicked button.');
  isCasting = true;
  document.getElementById('summary').style.display = 'none';
  document.getElementById('baitSelect').disabled = true;
  logText('Casting your line...');
  clearShakeArea();
  setTimeout(startWaiting, 2000);
}

function startWaiting() {
  const cfg = baitConfigs[selectedBait];
  logText('Waiting for bite...');
  let waitMs = randomRange(cfg.minWait, cfg.maxWait) * 1000;

  if (selectedBait === 'Jig') {
    startJigMechanic(waitMs);
  } else {
    setTimeout(onBite, waitMs);
  }
}

let jigTimer, shakeSpawner, remainingMs;
function startJigMechanic(initialMs) {
  clearInterval(jigTimer);
  clearInterval(shakeSpawner);
  remainingMs = initialMs;
  jigTimer = setInterval(() => {
    remainingMs -= 200;
    if (remainingMs <= 0) {
      clearInterval(jigTimer);
      clearInterval(shakeSpawner);
      clearShakeArea();
      onBite();
    }
  }, 200);
  spawnShake();
  shakeSpawner = setInterval(spawnShake, randomRange(1, 3) * 1000);
}

function spawnShake() {
  const area = document.getElementById('shakeArea');
  const btn = document.createElement('button');
  btn.className = 'action-btn shake-btn';
  btn.textContent = 'Shake';
  btn.style.position = 'absolute';
  btn.style.top = `${randomRange(10, 80)}%`;
  btn.style.left = `${randomRange(10, 80)}%`;
  btn.onclick = () => {
    remainingMs = Math.max(0, remainingMs - 4000);
    btn.style.opacity = '0';
    btn.textContent = '- 4s!';
    setTimeout(() => btn.remove(), 300);
  };
  area.appendChild(btn);
  setTimeout(() => { if (btn.parentNode) btn.remove(); }, 3000);
}

function clearShakeArea() {
  document.getElementById('shakeArea').innerHTML = '';
}

function onBite() {
  currentFish = getRandomFish();
  logText(`A fish is on the hook! Reel it in!`);
  startReelChallenge();
  isCasting = false;
}

function isActiveNow(fish, hour) {
  if (!fish.activeWindows) return true;
  return fish.activeWindows.some(([start, end]) =>
    start <= end ? hour >= start && hour < end : hour >= start || hour < end
  );
}

function getRandomFish() {
  const hour = getCurrentHour();
  const weights = baitConfigs[selectedBait].rarityWeights;

  const pool = fishPool.filter(fish => isActiveNow(fish, hour)).flatMap(fish => {
    const weight = weights[fish.rarity] || 0;
    return Array(weight).fill(fish);
  });

  const pickFrom = pool.length > 0 ? pool : fishPool;
  const pick = pickFrom[Math.floor(Math.random() * pickFrom.length)];
  const [minW, maxW] = pick.weightRange;
  const weight = (Math.random() * (maxW - minW) + minW).toFixed(2);
  return { ...pick, weight };
}

let reelInterval;
function startReelChallenge() {
  const reelDiv = document.getElementById('reelChallenge');
  const timerBar = document.getElementById('timerBar');
  const timerFill = document.getElementById('timerFill');

  const { buttons, time } = raritySettings[currentFish.rarity];
  let buttonsLeft = buttons;
  let timeLeft = time;

  reelDiv.innerHTML = '';
  reelDiv.style.display = 'block';
  timerBar.style.display = 'block';
  timerFill.style.width = '100%';

  for (let i = 0; i < buttons; i++) {
    const btn = document.createElement('button');
    btn.className = 'action-btn reel-btn';
    btn.textContent = 'Reel!';
    btn.style.top = `${randomRange(10, 80)}%`;
    btn.style.left = `${randomRange(10, 80)}%`;
    btn.onclick = () => {
      btn.remove();
      buttonsLeft--;
      if (buttonsLeft === 0) successReel();
    };
    reelDiv.appendChild(btn);
  }

  reelInterval = setInterval(() => {
    timeLeft -= 100;
    timerFill.style.width = `${(timeLeft / time) * 100}%`;
    if (timeLeft <= 0) {
      clearInterval(reelInterval);
      if (buttonsLeft > 0) failReel();
    }
  }, 100);
}

function successReel() {
  clearInterval(reelInterval);
  catchHistory.push({ ...currentFish, bait: selectedBait });
  logCatch(currentFish);
  cleanupChallenge();
  saveCatchLog();
}

function failReel() {
  clearInterval(reelInterval);
  logText('The fish got away!');
  cleanupChallenge();
}

function cleanupChallenge() {
  document.getElementById('reelChallenge').style.display = 'none';
  document.getElementById('timerBar').style.display = 'none';
  document.getElementById('baitSelect').disabled = false;
  currentFish = null;
}

function logText(msg) {
  const log = document.getElementById('log');
  log.innerHTML = `<p>${msg}</p>`;
}

function logCatch(fish) {
  const log = document.getElementById('log');
  const entry = document.createElement('p');
  entry.textContent = `🎉 You caught a [${fish.rarity}] ${fish.name} weighing ${fish.weight} kg!`;
  log.appendChild(entry);
}

function showSummary() {
  const summaryDiv = document.getElementById('summary');
  if (summaryDiv.style.display === 'block') {
    summaryDiv.style.display = 'none';
    return;
  }
  summaryDiv.innerHTML = '<h3>Your Catch Summary</h3>';

  if (catchHistory.length === 0) {
    summaryDiv.innerHTML += '<p>You haven’t caught any fish yet!</p>';
    summaryDiv.style.display = 'block';
    return;
  }

  const stats = catchHistory.reduce((acc, f) => {
    if (!acc[f.name]) acc[f.name] = { count: 0, total: 0, baits: {} };
    acc[f.name].count++;
    acc[f.name].total += parseFloat(f.weight);
    acc[f.name].baits[f.bait] = (acc[f.name].baits[f.bait] || 0) + 1;
    return acc;
  }, {});

  Object.entries(stats).forEach(([name, { count, total, baits }]) => {
    const p = document.createElement('p');
    const baitInfo = Object.entries(baits)
      .map(([bait, amt]) => `${bait} x${amt}`)
      .join(', ');
    p.textContent = `${name}: ${count} caught (Total ${total.toFixed(2)} kg) — Baits: ${baitInfo}`;
    summaryDiv.appendChild(p);
  });

  summaryDiv.style.display = 'block';
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function jumpFish(fishId) {
  const fish = document.getElementById(fishId);
  const startX = Math.random() * 80 + 10;
  fish.style.left = `${startX}%`;

  fish.style.animation = 'none';
  fish.offsetHeight;
  fish.style.animation = 'jump 1s ease-out';
  fish.style.opacity = '1';

  fish.addEventListener('animationend', () => {
    fish.style.animation = '';
    fish.style.opacity = '0';
    activeFish.delete(fishId);
  }, { once: true });
}

const activeFish = new Set();

function jumpRandomFish() {
  const fishCount = 3;
  let availableFish = [];

  for (let i = 1; i <= fishCount; i++) {
    if (!activeFish.has(`fish${i}`)) {
      availableFish.push(`fish${i}`);
    }
  }

  if (availableFish.length === 0) return;

  const fishId = availableFish[Math.floor(Math.random() * availableFish.length)];
  activeFish.add(fishId);
  jumpFish(fishId);
}

function randomJumpLoop() {
  const delay = Math.random() * 3000;
  setTimeout(() => {
    if (Math.random() < 0.8) {
      jumpRandomFish();
    }
    randomJumpLoop(); // repeat
  }, delay);
}

randomJumpLoop();

const cloudTexts = [
  'Hey!', 'Tight lines!', '🐟 incoming...', 
  'Hook it!', 'Gone fishin’', 'Hello from above',
  'Oh yeah', 'Catch it!', 'Uhh', ':3',
  'cloud inbound', 'woah!!', 'fishfish',
  'Seems fishy..', 'ikutan :)', 'Get them!'
];

const cloudContainer = document.getElementById('cloudContainer');

class CloudManager {
  constructor(container, texts, sprites, spawnRate = 5000) {
    this.container   = container;
    this.texts       = texts;
    this.sprites     = sprites;
    this.spawnRate   = spawnRate;
    this.spawnHandle = null;

    this.sprites.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  spawnCloud() {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');

    // Randomize image sprite
    const sprite = this.sprites[
      Math.floor(Math.random() * this.sprites.length)
    ];
    cloud.style.backgroundImage = `url('${sprite}')`;

    // Random vertical position
    const topPct = Math.random() * 40 + 5;
    cloud.style.top = `${topPct}%`;

    // Random speed
    const duration = Math.random() * 20 + 20;
    cloud.style.animationDuration = `${duration}s`;

    // Day/night tint
    cloud.classList.toggle('day-cloud', isDay);
    cloud.classList.toggle('night-cloud', !isDay);

    if (Math.random() < 0.1) {
      const span = document.createElement('span');
      span.className = 'cloud-text';
      span.textContent = this.texts[
        Math.floor(Math.random() * this.texts.length)
      ];
      cloud.appendChild(span);
    }

    cloud.addEventListener('animationend', () => cloud.remove());
    this.container.appendChild(cloud);
  }

  start() {
    this.spawnCloud();
    this.spawnHandle = setInterval(() => this.spawnCloud(), this.spawnRate);
  }

  stop() {
    clearInterval(this.spawnHandle);
  }
}

const cloudSprites = [
  'https://raw.githubusercontent.com/ikutan7/fishinggame-asset/main/cloud1.png',
  'https://raw.githubusercontent.com/ikutan7/fishinggame-asset/main/cloud2.png',
  'https://raw.githubusercontent.com/ikutan7/fishinggame-asset/main/cloud3.png',
  'https://raw.githubusercontent.com/ikutan7/fishinggame-asset/main/cloud4.png'
];

const clouds = new CloudManager(
  document.getElementById('cloudContainer'),
  cloudTexts,
  cloudSprites,
  3000
);
clouds.start();

