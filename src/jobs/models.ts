'use strict';
import { JenkinsExecutor } from "../jenkins/executors";

export class Job {

    constructor(
        public readonly job: any,
        private executor: JenkinsExecutor
    ) {
    }

    getName(): string {
        return this.job.name;
    }

    getColor(): string {
        return this.job.color;
    }

}
