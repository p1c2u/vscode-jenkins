'use strict';
import { JenkinsExecutor } from "../jenkins/executors";
import { Result } from "./enums";
import { BallColor } from "../jobs/enums";

export class Build {

    constructor(public readonly build: any, private executor: JenkinsExecutor) {}

    getName = (): string => this.build.fullDisplayName;

    getResult = (): Result => <Result>this.build.result;

    getColor = (): BallColor => {
        var map: { [result: string]: BallColor; } = { };
        map[Result.Success] = BallColor.Blue;
        map[Result.Unstable] = BallColor.Yellow;
        map[Result.Failure] = BallColor.Red;
        map[Result.NotBuilt] = BallColor.Notbuilt;
        map[Result.Aborted] = BallColor.Aborted;
        return map[this.getResult()];
    }

    getIconPath = (): string => 'resources/job/' + this.getColor() + '.png';

}

export class Builds {

    constructor(public readonly name: string, public readonly builds: any[], private executor: JenkinsExecutor) { }

    getBuild = (name: string, build_number: number): Promise<Build> => this.executor.getBuild(name, build_number)
        .then(build => new Build(build, this.executor));

    getBuildsList = (): Promise<Build[]> => Promise.all(this.builds.map(build => this.getBuild(this.name, build.build.number)));

}
