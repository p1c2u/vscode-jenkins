'use strict';
import { window, commands, ExtensionContext } from 'vscode';
import { JenkinsConfigError } from "./exceptions";
import { WorkspaceConfigurator } from "./conf/configurators";
import { SystemProvider } from "./system/providers";
import { CopyJobUrlCommand, OpenJobUrlCommand } from "./jobs/commands";
import { CopyViewUrlCommand, OpenViewUrlCommand } from "./views/commands";
import { JenkinsExecutor } from "./jenkins/executors";
import { SystemNode } from "./system/views";
import { System } from "./system/models";
import { NodesProvider } from "./nodes/providers";
import { ViewsProvider } from "./views/providers";

var jenkins = require('jenkins');

export function activate(context: ExtensionContext) {
    const configuration = WorkspaceConfigurator.getConfiguration();

    const url = configuration.get<string>("url");

    if (!url)
        throw new JenkinsConfigError(
            "Jenkins URL not provided. Specify url in settings.");

    const openJobUrlCommand = new OpenJobUrlCommand();
    const openViewUrlCommand = new OpenViewUrlCommand();
    const copyJobUrlCommand = new CopyJobUrlCommand();
    const copyViewUrlCommand = new CopyViewUrlCommand();

    let openJob = commands.registerCommand(
        "jenkins.openJobUrlToClipboard", openJobUrlCommand.execute);
    let openView = commands.registerCommand(
        "jenkins.openViewUrlToClipboard", openViewUrlCommand.execute);
    let jobCopy = commands.registerCommand(
        "jenkins.copyJobUrlToClipboard", copyJobUrlCommand.execute);
    let viewCopy = commands.registerCommand(
        "jenkins.copyViewUrlToClipboard", copyViewUrlCommand.execute);

    context.subscriptions.push(openJob);
    context.subscriptions.push(openView);
    context.subscriptions.push(jobCopy);
    context.subscriptions.push(viewCopy);

    const client = jenkins({ baseUrl: url, promisify: true, crumbIssuer: true });

    const executor = new JenkinsExecutor(client)
    const systemNode = new SystemNode(context, new System(executor));
    const nodesNode = systemNode.getNodes();
    const viewsNode = systemNode.getViews();

    const systemProvider = new SystemProvider(context, systemNode);
    const nodesProvider = new NodesProvider(context, nodesNode);
    const viewsProvider = new ViewsProvider(context, viewsNode);
    window.registerTreeDataProvider("jenkins.views.system", systemProvider);
    window.registerTreeDataProvider("jenkins.views.nodes", nodesProvider);
    window.registerTreeDataProvider("jenkins.views.views", viewsProvider);

}

export function deactivate() {
}
