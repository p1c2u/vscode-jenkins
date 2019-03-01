import { TreeDataProvider, ExtensionContext, window, TreeItem } from "vscode";
import { BaseExplorerNode } from "../explorer/views";
import { ViewsNode } from "./nodes";

export class ViewsProvider implements TreeDataProvider<BaseExplorerNode> {
    
    private _loading: Promise<void> | undefined;

    constructor(protected context: ExtensionContext, protected node: Promise<ViewsNode>) { }

    async getChildren(node?:BaseExplorerNode): Promise<BaseExplorerNode[]> {
        if (this._loading !== undefined) {
            await this._loading;
            this._loading = undefined;
        }

        if (node === undefined) node = await this.node;

        try {
            return await node.getChildren();
        } catch (err) {
            window.showErrorMessage("Jenkins Error: " + err.message);
            return node.handleError(err);
        }
    }

    async getTreeItem(node: BaseExplorerNode): Promise<TreeItem> {
        return node.getTreeItem();
    }

}
