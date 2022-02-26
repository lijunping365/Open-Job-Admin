export interface OpenJob {
  id: number;
  jobName: string;
  handlerName: string;
  cronExpression: string;
  status: number;
  createTime: Date;
  createUser: number;
}
