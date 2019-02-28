'use strict';
import { TreeItem, TreeItemCollapsibleState, ExtensionContext } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { Nodes, Node } from "../nodes/models";

export class NodeNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected node: Node) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        return [];
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.node.getName());
        item.contextValue = ResourceType.Node;
        const icon = this.node.getIcon();
        if (icon !== undefined)
            item.iconPath = this.context.asAbsolutePath(this.node.getIconPath());
        return item;
    }
}

export class NodesNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected nodes: Nodes) {
        super(context);
    }

    getNodeNodes = (): NodeNode[] => this.nodes.getNodesList()
        .map(view => new NodeNode(this.context, view));

    getChildren(): ExplorerNode[] {
        this.resetChildren();

        this.children = this.getNodeNodes();
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem("Nodes", TreeItemCollapsibleState.Collapsed);
        item.contextValue = ResourceType.Nodes;
        return item;
    }
}
