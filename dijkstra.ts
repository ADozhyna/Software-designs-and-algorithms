import { Graph, Vertex } from "./graph";
import { Dijkstra, Path } from "./interface";

export class DijkstraAlgorithms implements Dijkstra<Vertex> {
  public graph: Map<string, {[key: string]: number }>;

  constructor(graph: Graph) {
    this.graph = graph.adjList;
  }

  private findLowestWeightNode(costs: { [key: string]: number }, processed: Array<string>) {
    let result = null;

    for (let cost in costs) {
      const isLowest = !result || costs[cost] < costs[result];
      if (isLowest && !processed.includes(cost)) {
        result = cost;
      }
    }
    
    return result;
    
  }

  public findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
    console.log(this.graph);
    const from = vertex1.key;
    const to = vertex2.key;

    if (from === to) {
      return { distance: 0, path: [from] };
    }

    const costs = {
      [to]: Infinity, 
      ...this.graph.get(from)
    };

    const processed: Array<string> = [];
    const parents: { [key: string]: any } = { [to]: null, [from]: null };

    let node = this.findLowestWeightNode(costs, processed);

    while(node) { //1
      const cost = costs[node]; //3
      const neighbors = this.graph.get(node); //{ 2: 5, 3: 4, 4: 3 }
      
      for (let n in neighbors) { //4
        if (n === from) {
          continue
        }
        
        const newCost = cost + neighbors[n]; //6

        if (!costs[n]  || costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }

      processed.push(node);

      node = this.findLowestWeightNode(costs, processed);
    }

    let parent = parents[to];
    let shortestPath = [to];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
      
    }
    shortestPath = [from, ...shortestPath.reverse()];

    return {
      distance: costs[to],
      path: shortestPath,
    };
  }

  public findAllShortestPaths(vertex: Vertex): Record<string, Path> {
    const from = vertex.key
    const allPaths: Record<string, Path> = {}

    allPaths[from] = { distance: 0, path: [from] };

    while (true) {
      let parent = null;
      let neighbor = null;
      let distance = Infinity;

      for (const node in allPaths) {
        if (!allPaths[node]) continue;
        const nodeDistance = allPaths[node].distance;
        const adjacentNodes = this.graph.get(node);

        for (const adjacentNode in adjacentNodes) {
          if (allPaths[adjacentNode]) continue;

          const adjacentNodeDistance = adjacentNodes[adjacentNode] + nodeDistance;
          if (adjacentNodeDistance < distance) {
              parent = allPaths[node];
              neighbor = adjacentNode;
              distance = adjacentNodeDistance;
          }
        }
      }

      if (distance === Infinity) {
          break;
      }

      if (neighbor && parent) {
        if (!allPaths[neighbor]) allPaths[neighbor] = { distance: 0, path: [] };
        allPaths[neighbor].path = parent.path.concat(neighbor);
        allPaths[neighbor].distance = distance;
      }
    }

    return allPaths;
  }
      
}