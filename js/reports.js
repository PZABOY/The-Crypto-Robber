"use strict";

(function () {
  const API_URL = "https://min-api.cryptocompare.com/data/pricemulti?tsyms=usd&fsyms=";
  const chartElement = document.getElementById("cryptoChart");
  const noDataMsg = document.getElementById("noDataMsg");

  let selectedCoins = JSON.parse(localStorage.getItem("selectedCoins")) || [];
  let chart = null;
  let chartOptions = null;

  if (!selectedCoins || selectedCoins.length === 0) {
    noDataMsg.style.display = "block";
    chartElement.style.display = "none";
    return;
  }

  noDataMsg.style.display = "none";
  chartElement.style.display = "block";
  initChart();
  setInterval(updateChart, 2000);

  function initChart() {
    chartOptions = {
      chart: {
        type: 'line',
        height: 350,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: { speed: 1000 }
        }
      },
      series: selectedCoins.map(c => ({
        name: c.symbol,
        data: []
      })),
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false
        }
      },
      yaxis: {
        title: { text: 'Enchanted Price (USD)' }
      },
      legend: {
        position: 'bottom'
      },
      noData: {
        text: 'Summoning coin magic... 🔮'
      }
    };

    chart = new ApexCharts(chartElement, chartOptions);
    chart.render();
  }

  async function updateChart() {
    try {
      const symbols = selectedCoins.map(c => c.symbol).join(",");
      const res = await fetch(API_URL + symbols);
      const data = await res.json();
      const now = new Date().getTime();

      const updatedSeries = chartOptions.series.map(series => {
        const symbol = series.name.toUpperCase();
        const price = data[symbol]?.USD;

        if (!price) return series;

        const newData = [...series.data, { x: now, y: price }];
        if (newData.length > 20) newData.shift();

        return { name: series.name, data: newData };
      });

      chart.updateSeries(updatedSeries, true);
      chartOptions.series = updatedSeries;

    } catch (err) {
      alert("🛑 Oops! Something went wrong while updating prices.");
    }
  }
})();
