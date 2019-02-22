'use strict';

import { ColorInformation } from "vscode";
import { setFlagsFromString } from "v8";

export class JenkinsExecutor {

    constructor(protected client) { }

    async getInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.client.info((err, info: any) => {
                if (err) reject(err);
                resolve(info);
            });
        });
    }

    async getView(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.client.view.get(name, (err, info: any) => {
                if (err) reject(err);
                resolve(info);
            });
        });
    }

    async getNodeList(): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.client.node.list((err, nodes: any) => {
                if (err) reject(err);
                resolve(nodes);
            });
        });
    }

}
