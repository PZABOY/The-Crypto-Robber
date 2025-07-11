"use strict";

(function () {
  const COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
  let allCoins = [];
  let selectedCoins = JSON.parse(localStorage.getItem("selectedCoins")) || [];

  window.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cardsContainer");
    const searchInput = document.getElementById("search");
    const popupOverlay = document.getElementById("popup");
    const popupOptions = document.getElementById("popup-options");
    const popupClose = document.getElementById("popup-close");

    try {
      const res = await fetch(COINGECKO_API);
      allCoins = await res.json();
      render(allCoins);

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = allCoins.filter(coin =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
        );
        render(filtered);
      });

      popupClose.addEventListener("click", () => {
        popupOverlay.style.display = "none";
      });

    } catch (err) {
      alert("Something went wrong while fetching coin data. Please try again later. 🌿");
    }
  });

  function render(coins) {
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";

    selectedCoins = JSON.parse(localStorage.getItem("selectedCoins")) || [];

    for (const coin of coins) {
      const card = document.createElement("div");
      card.className = "card";

      const symbol = coin.symbol.toUpperCase();
      const isTracked = selectedCoins.some(c => c.symbol === symbol);

      const revealBtn = document.createElement("button");
      revealBtn.className = "reveal-btn";
      revealBtn.textContent = "Reveal Coin's Destiny ✨";

      const extraInfo = document.createElement("div");
      extraInfo.className = "extra-info";

      revealBtn.addEventListener("click", () => getMoreInfo(coin.id, revealBtn, extraInfo));

      const toggleWrapper = document.createElement("div");
      toggleWrapper.className = "toggle-switch";

      const label = document.createElement("label");
      label.classList.add("switch");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = isTracked;
      input.addEventListener("change", () => handleToggle(input, coin.id, symbol));

      const slider = document.createElement("span");
      slider.className = "slider round";

      label.appendChild(input);
      label.appendChild(slider);

      const labelText = document.createElement("span");
      labelText.className = "toggle-label";
      labelText.textContent = "Track this treasure";

      toggleWrapper.appendChild(label);
      toggleWrapper.appendChild(labelText);

      card.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}" style="width: 80px; height: 80px; border-radius: 12px; margin-bottom: 1rem;"/>
        <h3>${coin.name}</h3>
        <p class="symbol">${symbol}</p>
      `;

      const infoDiv = document.createElement("div");
      infoDiv.className = "more-info";
      infoDiv.appendChild(revealBtn);
      infoDiv.appendChild(extraInfo);

      card.appendChild(infoDiv);
      card.appendChild(toggleWrapper);
      cardsContainer.appendChild(card);
    }
  }

  function handleToggle(checkbox, id, symbol) {
    selectedCoins = JSON.parse(localStorage.getItem("selectedCoins")) || [];

    if (checkbox.checked) {
      if (selectedCoins.length >= 5) {
        checkbox.checked = false;
        showPopupOptions({ id, symbol });
        return;
      }
      if (!selectedCoins.some(c => c.symbol === symbol)) {
        selectedCoins.push({ id, symbol });
      }
    } else {
      selectedCoins = selectedCoins.filter(c => c.symbol !== symbol);
    }

    localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
  }

  function showPopupOptions(newCoin) {
    const popupOverlay = document.getElementById("popup");
    const popupOptions = document.getElementById("popup-options");
    popupOptions.innerHTML = "";

    const warning = document.createElement("div");
    warning.className = "popup-warning";
    warning.innerHTML = `
      <p><strong>🧙 Magic limit reached:</strong> You can only track 5 enchanted coins.</p>
      <p>Choose one to release before bonding with <strong>${newCoin.symbol}</strong>:</p>
    `;
    popupOptions.appendChild(warning);

    selectedCoins.forEach(c => {
      const btn = document.createElement("button");
      btn.textContent = `❌ ${c.symbol}`;
      btn.onclick = () => {
        selectedCoins = selectedCoins.filter(s => s.symbol !== c.symbol);
        selectedCoins.push(newCoin);
        localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
        popupOverlay.style.display = "none";
        render(allCoins);
      };
      popupOptions.appendChild(btn);
    });

    popupOverlay.style.display = "flex";
  }

  async function getMoreInfo(coinId, button, extraDiv) {
    if (extraDiv.classList.contains("show")) {
      extraDiv.classList.remove("show");
      button.textContent = "Reveal Coin's Destiny ✨";
      return;
    }

    button.textContent = "Conceal the magic...";

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await res.json();

      const ils = data.market_data.current_price.ils;
      const usd = data.market_data.current_price.usd;
      const eur = data.market_data.current_price.eur;

      extraDiv.innerHTML = `
        <p>USD: $${usd}</p>
        <p>EUR: €${eur}</p>
        <p>ILS: ₪${ils}</p>
      `;
      extraDiv.classList.add("show");
    } catch (err) {
      extraDiv.innerHTML = "<p>The coin is shy today. No info for now 🌫️</p>";
      extraDiv.classList.add("show");
    }
  }
})();
