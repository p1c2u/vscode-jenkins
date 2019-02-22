'use strict';
import { JenkinsExecutor } from "../jenkins/executors";

export class Build {

    constructor(public readonly build: any, private executor: JenkinsExecutor) {}

    getName = (): string => this.build.fullDisplayName;

}
