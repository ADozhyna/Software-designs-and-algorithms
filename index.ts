import { DijkstraAlgorithms } from "./dijkstra";
import { Edge, Graph, Vertex } from "./graph";
import { Dijkstra, WeightedGraph } from "./interface";


const vertex1 = new Vertex('1');
const vertex2 = new Vertex('2');
const vertex3 = new Vertex('3');
const vertex4 = new Vertex('4');
const vertex5 = new Vertex('5');

const vertices = [vertex1, vertex2, vertex3, vertex4, vertex5];
const edges = [
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5)
];

const graph = new Graph();

vertices.forEach(verticle => graph.addVertex(verticle.key));
edges.forEach(edge => graph.addEdge(edge.fromVertex, edge.toVertex, edge.weight));

const dijkstra = new DijkstraAlgorithms(graph);;

console.log(dijkstra.findShortestPath(vertex4, vertex3)); // { path: ['4', '1', '3'], distance: 7 }
console.log(dijkstra.findShortestPath(vertex1, vertex5)); // { path: [], distance: Infinity }
console.log(dijkstra.findShortestPath(vertex2, vertex4)); // { path: ['2', '4'], distance: 6 }
//console.log(dijkstra.findAllShortestPaths(vertex4));