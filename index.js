'use strict'
const fs = require('fs');
const EDGE_TYPES = [
    'Start',
    'HumanTask',
    'ServiceTask',
    'Gateway',
    'End'
];

function readFile() {
    let file;
    try {
        file = JSON.parse(fs.readFileSync('./diagram.json'));
    } catch (e) {
        throw new Error(e);
    }
    return file;
}

function findHumanTasks(edge, processedData) {
    let edges = processedData.edges[edge];
    let humanTasks = new Set();
    edges.forEach(edge => {
        var tasks = [];
        (function getHumanTasks(edge, processedData) {
            if (processedData.nodes[edge].type === 'HumanTask' || processedData.nodes[edge].type === 'End' ) {
                tasks.push(edge);
                return;
            } else {
                let edges = processedData.edges[edge];
                edges.forEach(edge1 => {
                    return getHumanTasks(edge1, processedData);
                });
            }
        })(edge, processedData);
        humanTasks.add(tasks);
    });
    return humanTasks;
}

function printGraph(graph) {
    console.log('Graph');
    for(let item of graph) {
        console.log(item);
    }
}

function buildGraph(data, processedData) {
    let graph = [];
    let edges = data.edges
    while(edges.length > 0) {
        const edge = edges.splice(0, 1)[0];
        if (!processedData.edges[edge.from]) {
            throw new Error('Edge id does not exist from: ' +  edge.from);
        }
        const fromType = processedData.nodes[edge.from].type;
        const toType = processedData.nodes[edge.to].type;
        if (fromType === 'ServiceTask' || fromType === 'Gateway') {
            continue;
        }
        if (toType === 'HumanTask' || toType === 'End') {
            graph.push({
               from: edge.from,
               to: edge.to,
               fromType: fromType,
               fromName: processedData.nodes[edge.from].name,
               toType: toType,
               toName: processedData.nodes[edge.to].name,
            });
        } else if(toType === 'Gateway' || toType === 'ServiceTask') {
            const humanTasks = Array.from(findHumanTasks(edge.to, processedData))[0];
            // Pushes formatted node-edge pair to graph
            graph.push({
               from: edge.from,
               to: humanTasks.length > 1 ? humanTasks : humanTasks[0],
               fromType: fromType,
               fromName: processedData.nodes[edge.from].name,
               toType: humanTasks.length > 1 ? humanTasks.map((task) => {
                   return processedData.nodes[task].type
               }) : processedData.nodes[humanTasks[0]].type,
               toName: humanTasks.length > 1 ? humanTasks.map((task) => {
                   return processedData.nodes[task].name
               }) : processedData.nodes[humanTasks[0]].name,
            });
        } else if(EDGE_TYPES.indexOf(toType) === -1) {
            throw new Error('Edge type ' + toType + ' does not exist');
        }
    }
    return graph;
}

function preprocessNodes(nodeArray) {
    const nodes = {};
    Array.isArray(nodeArray) && nodeArray.forEach(node => {
        nodes[node.id] = {
            name: node.name,
            type: node.type
        }
    });
    return nodes;
}

function preprocessEdges(edgeArray) {
    const edges = {};
    Array.isArray(edgeArray) && edgeArray.forEach(edge => {
        if(edges[edge.from]) {
            edges[edge.from].push(edge.to);
        } else {
            edges[edge.from] = [edge.to];
        }
    });
    return edges;
}

function preprocess(data) {
    const nodes = preprocessNodes(data.nodes);
    const edges = preprocessEdges(data.edges);
    return {
        nodes, edges
    }
}

(function main() {
    const data = readFile();
    const processedData = preprocess(data);
    const graph = buildGraph(data, processedData);
    printGraph(graph);
})();

module.exports = {
    preprocess, preprocessEdges, preprocessNodes, buildGraph, printGraph, findHumanTasks, readFile
}