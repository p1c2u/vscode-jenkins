'use strict';
import { JenkinsExecutor } from "../jenkins/executors";
import { Job } from "../jobs/models";

export class View {

    constructor(public readonly view: any, private executor: JenkinsExecutor) {}

    async getJobs(): Promise<Job[]> {
        return new Promise((resolve, reject) => {
            var jobs = this.executor.getView(this.view.name)
                .then(view => view.jobs.map(job => new Job(job, this.executor)));
            resolve(jobs);
        });
    }

    getName = (): string => this.view.name;

}

export class Views {

    constructor(public readonly views: any, private executor: JenkinsExecutor) {}

    getViewsList = (): View[] => this.views.map(view => new View(view, this.executor));

}
