'use strict';
import { JenkinsExecutor } from "../jenkins/executors";
import { Build, Builds } from "../builds/models";
import { View, Views } from "../views/models";
import { BallColor } from "./enums";

export class Job {

    constructor(public readonly job: any, private executor: JenkinsExecutor) {}

    hasBuilds = (): boolean => ("builds" in this.job)

    hasViews = (): boolean => ("views" in this.job)

    getBuild = (name: string, build_number: number): Promise<Build> => this.executor.getBuild(name, build_number)
        .then(build => new Build(build, this.executor));

    getBuildsList = (limit: number = 10): Promise<Build[]> => {
        var latestbuilds = this.job.builds.slice(0, limit + 1)
        var buildsPromises: any[] = latestbuilds.map(build => this.getBuild(this.job.name, build.number));
        return Promise.all(buildsPromises);
    };

    getBuilds = (): Promise<Builds> => this.getBuildsList()
        .then(builds => new Builds(this.job.name, builds, this.executor));

    getViewsList = (limit: number = 10): Promise<View[]> => {
        // @todo
        return Promise.all([]);
    }

    getViews = (): Promise<Views> => this.getViewsList()
        .then(views => new Views(views, this.executor));

    getName = (): string => this.job.displayName;

    getColor = (): BallColor => <BallColor>this.job.color;

    getIconPath = (): string => 'resources/job/' + this.getColor() + '.png';

}
