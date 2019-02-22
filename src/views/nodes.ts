'use strict';
import { TreeItem, TreeItemCollapsibleState, Uri, ExtensionContext, window, ColorInformation } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { JobNode } from '../jobs/nodes';
import { Views, View } from "../views/models";

export class ViewNode extends ExplorerNode {

    constructor(
        context: ExtensionContext,
        protected view: View
    ) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        return new Promise((resolve, reject) => {
            var views = this.view.getJobs()
                .then(jobs => {
                    return jobs.map(job => new JobNode(this.context, job))
                });
            resolve(views);
        });
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.view.getName(), TreeItemCollapsibleState.Collapsed);
        item.contextValue = ResourceType.Views;
        return item;
    }
}

export class ViewsNode extends ExplorerNode {

    constructor(
        context: ExtensionContext,
        protected views: Views
    ) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        this.children = this.views.getViewsList()
            .map(view => new ViewNode(this.context, view));
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem("Views", TreeItemCollapsibleState.Expanded);
        item.contextValue = ResourceType.Views;
        return item;
    }
}
