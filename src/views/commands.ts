'use strict';
import { env, Uri } from 'vscode';
import { ViewNode } from "./nodes";

export class CopyViewUrlCommand {

    execute = async (node: ViewNode) => {
        var url = node.getURL();
        await env.clipboard.writeText(url);
    }

}

export class OpenViewUrlCommand {

    execute = async (node: ViewNode) => {
        var url = node.getURL();
        var parsedUrl = Uri.parse(url);
        await env.openExternal(parsedUrl);
    }

}
