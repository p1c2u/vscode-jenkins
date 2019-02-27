import { IJob } from "../jobs/typing";


export interface IView {
    description: string,
    jobs: IJob[],
    name: string,
    property: any[],
    url: string
}
