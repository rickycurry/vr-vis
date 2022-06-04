let iris;

async function loadData() {
  iris = await d3.csv('../../data/output.csv');
  iris.forEach(d => {
    d['0'] = +d['0'];
    d['1'] = +d['1'];
    d['2'] = +d['2'];
  });
}

async function main() {
  await loadData();
  const scene = d3.select("a-scene");

  // set up color range
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  color.domain(new Set(iris.map(d => d['labels'])));
  
  // add iris data
  scene.selectAll("a-sphere")
    .data(iris)
    .join("a-sphere")
      .attr("position", d => `${d['0']} ${d['1']} ${d['2']}`)
      .attr("radius", 0.03)
      .attr("color", d => color(d['labels']));

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
