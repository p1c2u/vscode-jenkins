'use strict';
import { JenkinsExecutor } from "../jenkins/executors";
import { Build } from "../builds/models";

export class Job {

    constructor(public readonly job: any, private executor: JenkinsExecutor) {}

    async getBuilds(): Promise<Build[]> {
        return new Promise((resolve, reject) => {
            var builds = this.executor.getBuildList(this.job.name)
                .then(builds => {
                    return builds.map(build => new Build(build, this.executor))
                });
            resolve(builds);
        });
    }

    getName = (): string => this.job.name;

    getColor = (): string => this.job.color;

}
