'use strict';
import { TreeItem, TreeItemCollapsibleState, Uri, ExtensionContext, window, ColorInformation } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { JenkinsExecutor } from '../jenkins/executors';
import { Views } from "../views/models";
import { ViewsNode } from "../views/nodes";
import { NodesNode } from '../nodes/views';
import { Nodes } from '../nodes/models';

export class SystemNode extends ExplorerNode {

    constructor(
        context: ExtensionContext,
        protected executor: JenkinsExecutor
    ) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        return new Promise((resolve, reject) => {
            var views = this.executor.getInfo()
                .then(info => {
                    return new ViewsNode(this.context, new Views(info.views, this.executor));
                });
            var nodes = this.executor.getNodeList()
                .then(nodes => {
                    return new NodesNode(this.context, new Nodes(nodes, this.executor));
                });
            var children = Promise.all([nodes, views]).then(values => values);
            resolve(children);
        });
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(`System`, TreeItemCollapsibleState.Expanded);
        item.contextValue = ResourceType.System;
        return item;
    }
}