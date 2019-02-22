'use strict';
import { TreeItem, TreeItemCollapsibleState, Uri, ExtensionContext, window, ColorInformation } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { Job } from "../jobs/models";

export class JobNode extends ExplorerNode {

    constructor(
        context: ExtensionContext,
        protected job: Job
    ) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        return [];
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.job.getName());
        item.contextValue = ResourceType.Job;
        const color = this.job.getColor();
        if (color !== undefined)
            item.iconPath = this.context.asAbsolutePath(
                'resources/job/' + color + '.png');
        return item;
    }
}
