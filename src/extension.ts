'use strict';
import { window, ExtensionContext } from 'vscode';
import { JenkinsConfigError } from "./exceptions";
import { WorkspaceConfigurator } from "./conf/configurators";
import { JenkinsProvider } from "./explorer/providers";

var jenkins = require('jenkins');

export function activate(context: ExtensionContext) {
    const configuration = WorkspaceConfigurator.getConfiguration();

    const url = configuration.get<string>("url");
    const token = configuration.get<string>("token");

    if (!url)
        throw new JenkinsConfigError(
            "Jenkins URL not provided. Specify url in settings.");

    if (!token)
        throw new JenkinsConfigError(
            "Jenkins user token not provided. Specify token in settings.");

    const client = jenkins({ baseUrl: url, promisify: true, crumbIssuer: true });

    const provider = new JenkinsProvider(context, client, token);
    window.registerTreeDataProvider("jenkins", provider);

}

export function deactivate() {
}
