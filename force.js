// This is adapted from https://bl.ocks.org/mbostock/2675ff61ea5e063ede2b5d63c08020c7

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) {
        return d.id;
    }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

var mydata = {"directed": false, "multigraph": false, "graph": {}, "nodes": [{"name": 0, "id": 0}, {"name": 1, "id": 1}, {"name": 2, "id": 2}, {"name": 3, "id": 3}, {"name": 4, "id": 4}, {"name": 5, "id": 5}, {"name": 6, "id": 6}, {"name": 7, "id": 7}, {"name": 8, "id": 8}, {"name": 9, "id": 9}, {"name": 10, "id": 10}, {"name": 11, "id": 11}, {"name": 12, "id": 12}, {"name": 13, "id": 13}, {"name": 14, "id": 14}], "links": [{"source": 0, "target": 1}, {"source": 0, "target": 2}, {"source": 0, "target": 3}, {"source": 0, "target": 4}, {"source": 0, "target": 5}, {"source": 1, "target": 2}, {"source": 1, "target": 3}, {"source": 1, "target": 4}, {"source": 1, "target": 5}, {"source": 2, "target": 3}, {"source": 2, "target": 4}, {"source": 2, "target": 5}, {"source": 3, "target": 4}, {"source": 3, "target": 5}, {"source": 4, "target": 5}, {"source": 5, "target": 6}, {"source": 6, "target": 7}, {"source": 7, "target": 8}, {"source": 8, "target": 9}, {"source": 9, "target": 10}, {"source": 9, "target": 11}, {"source": 9, "target": 12}, {"source": 9, "target": 13}, {"source": 9, "target": 14}, {"source": 10, "target": 11}, {"source": 10, "target": 12}, {"source": 10, "target": 13}, {"source": 10, "target": 14}, {"source": 11, "target": 12}, {"source": 11, "target": 13}, {"source": 11, "target": 14}, {"source": 12, "target": 13}, {"source": 12, "target": 14}, {"source": 13, "target": 14}]};

d3.data(mydata, function (error, graph) {
    if (error) throw error;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function (d) {
            return d.id;
        });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
