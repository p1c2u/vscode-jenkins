'use strict';
import { env, Uri } from 'vscode';
import { JobNode } from "./nodes";

export class CopyJobUrlCommand {

    execute = async (node: JobNode) => {
        var url = node.getURL();
        await env.clipboard.writeText(url);
    }

}

export class OpenJobUrlCommand {

    execute = async (node: JobNode) => {
        var url = node.getURL();
        var parsedUrl = Uri.parse(url);
        await env.openExternal(parsedUrl);
    }

}
