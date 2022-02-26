export interface ScheduleTask {
  id: number;
  spiderId: string;
  cronExpression: string;
  status: number;
  createTime: Date;
  createUser: number;
}
