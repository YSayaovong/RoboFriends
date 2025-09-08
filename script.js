const API_URL = "https://jsonplaceholder.typicode.com/users";
const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

let robots = [];
let filtered = [];

// Debounce helper
function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), ms);
  };
}

// Card template
function cardTemplate({ id, name, username, email }) {
  const img = `https://robohash.org/${encodeURIComponent(
    username || name || id
  )}?size=200x200&set=set2`;

  return `
    <article class="card" tabindex="0">
      <img src="${img}" alt="${name} avatar" loading="lazy" />
      <h3>${name}</h3>
      <p class="sub">${username}</p>
      <p class="muted">${email}</p>
    </article>
  `;
}

// Render
function render(list) {
  if (!list.length) {
    grid.innerHTML = "";
    statusEl.textContent = "No matches.";
    statusEl.classList.remove("hidden");
    return;
  }
  statusEl.classList.add("hidden");
  grid.innerHTML = list.map(cardTemplate).join("");
}

// Filter
function applyFilter(q) {
  const query = q.trim().toLowerCase();
  if (!query) {
    filtered = robots.slice();
  } else {
    filtered = robots.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.username.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query)
    );
  }
  render(filtered);
}

// Load robots
async function loadRobots() {
  try {
    statusEl.textContent = "Loading robots…";
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Network error");
    robots = await res.json();
    filtered = robots.slice();
    statusEl.classList.add("hidden");
    render(filtered);
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Unable to load data. Check your internet and refresh.";
  }
}

// Events
searchInput.addEventListener(
  "input",
  debounce((e) => applyFilter(e.target.value), 150)
);

// Init
document.addEventListener("DOMContentLoaded", loadRobots);
