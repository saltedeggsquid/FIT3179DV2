/*
  Many Stories, One Australia
  ----------------------------------------
  The page layout and chart containers are ready.
  Add each Vega-Lite specification to the matching chart ID below.

  Example:
  const bumpSpec = { ... };
  vegaEmbed("#chart-bump", bumpSpec, { actions: false, renderer: "svg" });

  Keep chart specifications in this file or move each one into a separate
  human-readable .json file in the same repository, as required by the brief.
*/

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

/*
  Planned chart container IDs:
  Section 1 — Macro shift
    chart-bump
    chart-streamgraph

  Section 2 — Modern mosaic
    chart-choropleth map
    chart-dot-density map
    chart-lollipop chart

  Section 3 — Generational bridge
    chart-sankey
    chart-
    chart-radar

  Section 4 — Cohesion
    chart-
    chart-settlement-map

  Add calls once the specifications and cleaned data are ready, for example:
  renderChart("chart-bump", bumpSpec);
*/

// Keep the current page scaffold easy to test before chart integration.
document.addEventListener("DOMContentLoaded", () => {
  renderChart("chart-bump", "charts/bump_chart.json");
  renderChart("chart-streamgraph", "charts/streamgraph.json");

  renderChart("chart-lollipop_chart", "charts/lollipop_chart.json");

  renderChart("chart-sankey", "charts/sankey.json");
  renderChart("chart-butterfly", "charts/butterfly.json")
});
