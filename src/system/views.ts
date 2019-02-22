'use strict';
import { ExtensionContext, TreeItem, TreeItemCollapsibleState } from 'vscode';

import { ResourceType } from '../explorer/enums';
import { ExplorerNode } from '../explorer/views';
import { NodesNode } from '../nodes/views';
import { System } from '../system/models';
import { ViewsNode } from '../views/nodes';

export class SystemNode extends ExplorerNode {
    children: Promise<[NodesNode, ViewsNode]>;

    constructor(context: ExtensionContext, protected system: System) {
        super(context);
    }

    getViews = (): Promise<ViewsNode> => this.system.getViews()
        .then(views => new ViewsNode(this.context, views));

    getNodes = (): Promise<NodesNode> => this.system.getNodes()
        .then(nodes => new NodesNode(this.context, nodes));

    getSystem = (): Promise<[NodesNode, ViewsNode]> => new Promise((resolve, reject) => {
        resolve(Promise.all([this.getNodes(), this.getViews()]));
    });

    getChildren(): Promise<[NodesNode, ViewsNode]> {
        this.resetChildren();

        this.children = this.getSystem();
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(`System`, TreeItemCollapsibleState.Expanded);
        item.contextValue = ResourceType.System;
        return item;
    }
}