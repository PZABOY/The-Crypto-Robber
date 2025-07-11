# The Crypto Robber 🦹‍♂️

A whimsical, interactive web app for tracking and visualizing the latest cryptocurrency prices. Select up to five coins, reveal their current USD/EUR/ILS prices, and watch their enchanted price trajectories in real time.

---

## 🚀 Features

* **Hideout (index.html)**

  * Fetches market data from the CoinGecko API (`js/main.js`).
  * Search coins by name or symbol.
  * Track up to **5** coins simultaneously (persists in `localStorage`).
  * Reveal a coin's current price in USD, EUR, and ILS.
  * Popup flow to replace a tracked coin when the 5-coin limit is reached.

* **Loot Watch (reports.html)**

  * Interactive line chart powered by **ApexCharts** (`js/reports.js`).
  * Real-time price updates every **2 seconds** via CryptoCompare API.
  * Displays only if you’ve summoned (tracked) at least one coin.

* **The Legend (about.html)**

  * Background story and thematic design to immerse you in the Crypto Forest.

* **Responsive Design**

  * Mobile-first layout with CSS grid & flexbox.
  * Parallax headers, dark/light gradients, and floating animations.

---

## 📁 Project Structure

```
The-Crypto-Robber/
├─ index.html         # Hideout: main coin dashboard
├─ reports.html       # Loot Watch: real-time chart
├─ about.html         # The Legend: about page
├─ style.css          # Global styles & responsive rules
├─ js/
│  ├─ main.js         # Fetching, rendering, and selection logic
│  └─ reports.js      # Chart initialization & live updates
└─ assets/
   ├─ beck.png        # Parallax background image
   └─ eliav-getaway.png # About page hero image
```

---

## ⚙️ Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/The-Crypto-Robber.git
   cd The-Crypto-Robber
   ```

2. **Open locally**

   * **Option A**: Double-click `index.html` in your file manager.
   * **Option B**: Serve via a simple HTTP server (recommended for API CORS):

     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then visit http://localhost:8000 in your browser
     ```

3. **Navigate**

   * **Hideout** (`index.html`): Search and track coins.
   * **Loot Watch** (`reports.html`): View live price chart of tracked coins.
   * **The Legend** (`about.html`): Read the backstory.

---

## 🛠 Tech Stack

* **HTML5** & **CSS3** (Flexbox, Grid, responsive media queries)
* **Vanilla JavaScript** (ES6 modules, `fetch`, DOM manipulation)
* **CoinGecko API** for market data
* **CryptoCompare API** for live price updates
* **ApexCharts** for interactive charts

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**

---

*Crafted with 💜 by Eliav the Crypto Robber 🦹‍♂️*
