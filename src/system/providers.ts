import { TreeDataProvider, ExtensionContext, window, TreeItem } from "vscode";
import { BaseExplorerNode } from "../explorer/views";
import { SystemNode } from "./views";
import { ViewNode } from "../views/nodes";

export class SystemProvider implements TreeDataProvider<BaseExplorerNode> {
    
    private _root?: BaseExplorerNode;
    private _loading: Promise<void> | undefined;

    constructor(protected context: ExtensionContext, protected node: SystemNode) {
        this._root = node;
    }

    async getChildren(node?:BaseExplorerNode): Promise<BaseExplorerNode[]> {
        if (this._loading !== undefined) {
            await this._loading;
            this._loading = undefined;
        }
    
        if (node === undefined) node = this._root;

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

    async copyViewURL(node: ViewNode): Promise<void> {
        var url = node.getURL();
    }

}
