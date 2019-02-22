'use strict';
import { JenkinsExecutor } from "../jenkins/executors";

export class Node {

    constructor(public readonly node: any, private executor: JenkinsExecutor) {}

    getName = (): string => this.node.displayName;

}

export class Nodes {

    constructor(public readonly nodes: any, private executor: JenkinsExecutor) {}

    getNodesList = (): Node[] => this.nodes.map(node => new Node(node, this.executor));

}
