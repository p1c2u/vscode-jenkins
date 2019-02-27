'use strict';
import { JenkinsExecutor } from "../jenkins/executors";
import { Build } from "../builds/models";

export class Job {

    constructor(public readonly job: any, private executor: JenkinsExecutor) {}

    getBuild = (name: string, build_number: number): Promise<Build> => this.executor.getBuild(name, build_number)
        .then(build => new Build(build, this.executor));

    getBuildsList = (limit: number = 10): Promise<Build[]> => {
        var latestbuilds = this.job.builds.slice(0, limit + 1)
        var buildsPromises: any[] = latestbuilds.map(build => this.getBuild(this.job.name, build.number));
        return Promise.all(buildsPromises);
    };

    getName = (): string => this.job.displayName;

    getColor = (): string => this.job.color;

}
