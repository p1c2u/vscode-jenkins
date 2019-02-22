'use strict';
import { TreeItem, TreeItemCollapsibleState, Uri, ExtensionContext, window, ColorInformation } from 'vscode';
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { Build } from "../builds/models";

export class BuildNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected build: Build) {
        super(context);
    }

    async getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        return [];
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.build.getName());
        item.contextValue = ResourceType.Build;
        return item;
    }
}
