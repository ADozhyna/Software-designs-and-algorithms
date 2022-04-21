import { WeightedGraph } from "./interface";

export class Vertex {
  public key: string;

  constructor(key: string) {
    this.key = key;
  }
}

export class Edge {
  public fromVertex: Vertex;
  public toVertex: Vertex;
  public weight: number;

  constructor(vertex1: Vertex, vertex2: Vertex, weight: number) {
    this.fromVertex = vertex1;
    this.toVertex = vertex2;
    this.weight = weight;
  }
}

export class Graph implements WeightedGraph<Vertex> {
  public adjList = new Map();

  public addVertex(key: string): void {
    this.adjList.set(key, {});
  }

  public addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
    this.adjList.get(vertex1.key)[vertex2.key] = weight;
    this.adjList.get(vertex2.key)[vertex1.key] = weight;
  }
}