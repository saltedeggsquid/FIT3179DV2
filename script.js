const chartConfig = {
  actions: false,
  renderer: "svg",
  tooltip: { theme: "light" }
};

// Helper function for replacing a placeholder with a Vega-Lite chart.
async function renderChart(containerId, specificationPath) {
  const selector = `#${containerId}`;
  const container = document.querySelector(selector);

  if (!container) {
    console.warn(`Chart container not found: ${selector}`);
    return;
  }

  try {
    const response = await fetch(specificationPath);
    if (!response.ok) {
      throw new Error(`Could not load ${specificationPath}: HTTP ${response.status}`);
    }

    const specification = await response.json();
    container.innerHTML = "";
    await vegaEmbed(selector, specification, chartConfig);
  } catch (error) {
    console.error(`Could not render ${containerId}:`, error);
    container.innerHTML = `
      <div class="chart-placeholder">
        <strong>Chart could not be rendered</strong>
        <small>Check the Vega-Lite specification and data path in the browser console.</small>
      </div>`;
  }
}

// Keep the current page scaffold easy to test before chart integration.
document.addEventListener("DOMContentLoaded", () => {
  renderChart("chart-01", "charts/chart-01.json");
  renderChart("chart-02", "charts/chart-02.json");

  renderChart("chart-03", "charts/chart-03.json")
  renderChart("chart-04", "charts/chart-04.json")
  renderChart("chart-05", "charts/chart-05.json");

  renderChart("chart-06", "charts/chart-06.json");
  renderChart("chart-07", "charts/chart-07.json")
  renderChart("chart-08", "charts/chart-08.json")

  renderChart("chart-09", "charts/chart-09.json")
  renderChart("chart-10", "charts/chart-10.json")
});
