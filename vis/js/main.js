let iris;

async function loadData() {
  iris = await d3.csv('../../data/iris.csv');
  iris.forEach(d => {
    d['sepal.length'] = +d['sepal.length'];
    d['sepal.width'] = +d['sepal.width'];
    d['petal.length'] = +d['petal.length'];
    d['petal.width'] = +d['petal.width'];
  });
}

async function main() {
  await loadData();
  const scene = d3.select("a-scene");

  // set up color range
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  color.domain(new Set(iris.map(d => d['variety'])));
  
  // add iris data
  scene.selectAll("a-sphere")
    .data(iris)
    .join("a-sphere")
      .attr("position", d => `${d['sepal.length']} ${d['sepal.width']} ${d['petal.length']}`)
      .attr("radius", 0.03)
      .attr("color", d => color(d['variety']));

  // add axes
  const sceneElement = document.querySelector('a-scene');
  const yAxis = document.createElement('a-cylinder');
  yAxis.setAttribute('material', {color: "#333"});
  yAxis.setAttribute('geometry', {radius: 0.05, height: 100});
  sceneElement.appendChild(yAxis);

  const xAxis = document.createElement('a-cylinder');
  xAxis.setAttribute('material', {'color': "#333"});
  xAxis.setAttribute('geometry', {radius: 0.05, height: 100});
  xAxis.setAttribute('rotation', {x: 90});
  sceneElement.appendChild(xAxis);

  const zAxis = document.createElement('a-cylinder');
  zAxis.setAttribute('material', {'color': "#333"});
  zAxis.setAttribute('geometry', {radius: 0.05, height: 100});
  zAxis.setAttribute('rotation', {z: 90});
  sceneElement.appendChild(zAxis);


  // gridlines -- way too slow, and they don't look great
  // for (let x = 1; x < 50; x++) {
  //   for (let z = 1; z < 50; z++) {
  //     const yTick = document.createElement('a-cylinder');
  //     yTick.setAttribute('material', {color: "#777", opacity: 0.1});
  //     yTick.setAttribute('geometry', {radius: 0.01, height: 100});
  //     yTick.setAttribute('position', {x: x, z: z});
  //     sceneElement.appendChild(yTick);
  //   }
  // }
}

main();
