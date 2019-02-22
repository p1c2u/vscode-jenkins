'use strict';
import { TreeItem, TreeItemCollapsibleState, ExtensionContext } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { Job } from "../jobs/models";
import { BuildNode } from "../builds/views";

export class JobNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected job: Job) {
        super(context);
    }

    getBuilds = (): Promise<BuildNode[]> => new Promise((resolve, reject) => {
        var builds = this.job.getBuilds()
            .then(builds => builds.map(build => new BuildNode(this.context, build)));
        resolve(builds);
    });

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        this.children = this.getBuilds();
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.job.getName(), TreeItemCollapsibleState.Collapsed);
        item.contextValue = ResourceType.Job;
        const color = this.job.getColor();
        if (color !== undefined)
            item.iconPath = this.context.asAbsolutePath(
                'resources/job/' + color + '.png');
        return item;
    }
}
