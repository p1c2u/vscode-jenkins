'use strict';
import { JenkinsExecutor } from "../jenkins/executors";
import { Job } from "../jobs/models";
import { IView } from "./typing";

export class View {

    constructor(public readonly view: IView, private executor: JenkinsExecutor) {}

    async getJobs(): Promise<Job[]> {
        return this.executor.getView(this.view.name)
            .then(view => view.jobs.map(job => new Job(job, this.executor)));
    }

    getJob = (name: string): Promise<Job> => this.executor.getJob(name)
        .then(job => new Job(job, this.executor));

    getJobsList = (): Promise<Job[]> => {
        var jobsPromises: any[] = this.view.jobs.map(job => this.getJob(job.name));
        return Promise.all(jobsPromises);
    };

    getName = (): string => this.view.name;

}

export class Views {

    constructor(public readonly views: any[], private executor: JenkinsExecutor) { }

    getView = (name: string): Promise<View> => this.executor.getView(name)
        .then(view => new View(view, this.executor));

    getViewsList = (): Promise<View[]> => Promise.all(this.views.map(view => this.getView(view.name)));

}
