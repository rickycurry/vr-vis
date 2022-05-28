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
  
  scene.selectAll("a-sphere")
    .data(iris)
    .join("a-sphere")
      .attr("position", d => `${d['sepal.length']} ${d['sepal.width']} ${d['petal.length']}`)
      .attr("radius", 0.03)
      .attr("color", d => color(d['variety']));
}

main();
