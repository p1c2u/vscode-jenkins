'use strict';
import { TreeItem, TreeItemCollapsibleState, ExtensionContext } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { JobNode } from '../jobs/nodes';
import { Views, View } from "../views/models";

export class ViewNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected view: View) {
        super(context);
    }

    getURL = (): string => this.view.getURL();

    getJobs = (): Promise<JobNode[]> => this.view.getJobsList()
        .then(jobs => jobs.map(job => new JobNode(this.context, job)));

    getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        this.children = this.getJobs();
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.view.getName(), TreeItemCollapsibleState.Collapsed);
        item.contextValue = ResourceType.View;
        return item;
    }
}

export class ViewsNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected views: Views) {
        super(context);
    }

    getViews = (): Promise<ViewNode[]> => this.views.getViewsList()
        .then(views => views.map(view => new ViewNode(this.context, view)));

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        this.children = this.getViews();
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem("Views", TreeItemCollapsibleState.Expanded);
        item.contextValue = ResourceType.Views;
        return item;
    }
}
