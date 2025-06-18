function updateGraph() {
    const links = svg.selectAll(".link")
        .data(graphData.links);
    
    links.enter().append("line")
        .attr("class", "link")
        .merge(links);
    
    links.exit().remove();
    
    const nodes = svg.selectAll(".node")
        .data(graphData.nodes);
    
    const nodeEnter = nodes.enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    nodeEnter.append("circle")
        .attr("r", 12)
        .attr("fill", d => `var(--${d.type}-node)`); //nodeColors[d.type]);
        //.attr("fill", d => nodeColors[d.type]);
    
    nodeEnter.append("text")
        .attr("class", "node-label")
        .attr("dy", 4)
        .text(d => d.name.length > 8 ? d.name.substring(0, 8) + "..." : d.name);
    
    nodeEnter.on("click", showNodeInfo);
    
    nodes.exit().remove();
    
    // Add link labels
    const linkLabels = svg.selectAll(".link-label")
        .data(graphData.links);
    
    linkLabels.enter().append("text")
        .attr("class", "link-label")
        .text(d => d.type)
        .merge(linkLabels);
    
    linkLabels.exit().remove();
    
    simulation.nodes(graphData.nodes);
    simulation.force("link").links(graphData.links);
    simulation.alpha(1).restart();
    
    simulation.on("tick", () => {
        svg.selectAll(".link")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        svg.selectAll(".node")
            .attr("transform", d => `translate(${d.x},${d.y})`);
        
        svg.selectAll(".link-label")
            .attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2);
    });
}

function showNodeInfo(event, d) {
    const nodeInfo = document.getElementById("nodeInfo");
    const nodeDetails = document.getElementById("nodeDetails");
    
    nodeDetails.innerHTML = `
        <strong>Name:</strong> ${d.name}<br>
        <strong>Type:</strong> ${d.type}<br>
        <strong>Notes:</strong> ${d.notes || 'No notes'}<br>
        <strong>Connections:</strong> ${getConnections(d.id)}
    `;
    
    nodeInfo.style.display = "block";
}

function getConnections(nodeId) {
    const connections = graphData.links.filter(link => 
        link.source.id === nodeId || link.target.id === nodeId
    ).length;
    return connections;
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function setupDOM(nodeTypes) {
  const legend = document.getElementById("node-legend")
     
  const title = document.createElement('h3')
  title.textContent = "Node Types"
  legend.append(title)
  for (const type of nodeTypes) {
    // Add legend entries
    const name = document.createElement('div')
    name.className = "node-legend"
    name.innerHTML = `<div class="legend-item"><div class="legend-color" style="background-color: var(--${type}-node);"></div><span>${type}</span></div>`
    legend.append(name)
  }
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1) 
}

function toggleSidebar () {
  const container = document.getElementById("container")
  if (container.className.includes('collapse')) container.className = ''
  else container.className = 'collapse'
}
