const fs = require('fs');

const fileData = JSON.parse(fs.readFileSync('figma_file.json', 'utf8'));
const document = fileData.document;

let aboutNode = null;
function findNode(node) {
  if (node.id === '344:8' || node.id === '344-8') {
    aboutNode = node;
    return;
  }
  if (node.children) {
    for (const child of node.children) {
      findNode(child);
      if (aboutNode) return;
    }
  }
}
findNode(document);

// Find nodes that overlap with the y range [1600, 2400]
const results = [];
function findOverlapping(node) {
  if (node.absoluteBoundingBox) {
    const box = node.absoluteBoundingBox;
    // CoreValues section y is 1500 (render x=7050 y=1500 w=1440 h=726)
    // Let's find nodes inside the x/y range of section 344:84
    if (box.y >= 1400 && box.y <= 2300 && box.width > 200) {
      results.push({
        id: node.id,
        name: node.name,
        type: node.type,
        box: box,
        fills: node.fills ? node.fills.map(f => ({ type: f.type, color: f.color })) : []
      });
    }
  }
  if (node.children) {
    node.children.forEach(findOverlapping);
  }
}

findOverlapping(aboutNode);
console.log('Overlapping nodes in CoreValues range:');
console.log(JSON.stringify(results, null, 2));
