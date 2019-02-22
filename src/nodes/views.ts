'use strict';
import { TreeItem, TreeItemCollapsibleState, Uri, ExtensionContext, window, ColorInformation } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { Nodes, Node } from "../nodes/models";

export class NodeNode extends ExplorerNode {

    constructor(
        context: ExtensionContext,
        protected node: Node
    ) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        return [];
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.node.getName());
        item.contextValue = ResourceType.Node;
        return item;
    }
}

export class NodesNode extends ExplorerNode {

    constructor(
        context: ExtensionContext,
        protected nodes: Nodes
    ) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        this.children = this.nodes.getNodesList()
            .map(view => new NodeNode(this.context, view));
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem("Nodes", TreeItemCollapsibleState.Collapsed);
        item.contextValue = ResourceType.Nodes;
        return item;
    }
}
