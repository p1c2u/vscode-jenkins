'use strict';

export class JenkinsExecutor {

    constructor(protected client) { }

    getInfo = (): Promise<any> => this.client.info();

    getView = (name: string): Promise<any> => this.client.view.get(name);

    getJob = (name: string): Promise<any> => this.client.job.get(name);

    getBuildList = (name: string, limit: number = 10): Promise<any> => {
        return new Promise((resolve, reject) => {
            return this.client.job.get(name, (err, job: any) => {
                if (err) reject(err);
                var buildPromises = job.builds.map(build => this.getBuild(name, build.number));
                resolve(Promise.all(buildPromises));
            });
        });
    }

    getBuild = (name: string, build_number: number): Promise<any> => this.client.build.get(name, build_number);

    getNodeList = (): Promise<any> => this.client.node.list();

}
