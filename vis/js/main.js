let iris;

async function loadData() {
  iris = await d3.csv('../../data/output.csv');
  iris.forEach(d => {
    d['0'] = +d['0'];
    d['1'] = +d['1'];
    d['2'] = +d['2'];
  });
}

function setupVis() {
  // add axes
  const axes = [];
  const sceneElement = document.querySelector('a-scene');

  const yAxis = document.createElement('a-cylinder');
  axes.push(yAxis);

  const xAxis = document.createElement('a-cylinder');
  xAxis.setAttribute('rotation', {x: 90});
  axes.push(xAxis);

  const zAxis = document.createElement('a-cylinder');
  zAxis.setAttribute('rotation', {z: 90});
  axes.push(zAxis);

  axes.forEach(a => {
    a.setAttribute('material', {'color': "#333"});
    a.setAttribute('geometry', {radius: 0.02, height: 100});
    sceneElement.appendChild(a);
  });
}

function renderVis(category) {
  const scene = d3.select("a-scene");

  // set up color range
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  color.domain(new Set(iris.map(d => d[category])));
  
  // add iris data
  scene.selectAll("a-sphere")
    .data(iris)
    .join("a-sphere")
      .attr("position", d => `${d['0']} ${d['1']} ${d['2']}`)
      .attr("radius", 0.03)
      .attr("color", d => {
        const val = d[category];
        return val === "-1" ? "#444" : color(val)
      });
}

async function main() {
  await loadData();
  setupVis();
  renderVis("labels");

  d3.select("#data-dropdown")
    .on("change", () => {
      const selectedOption = this.value;
      renderVis(selectedOption);
    });
}

main();
