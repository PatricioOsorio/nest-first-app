export interface IActivityLogEntity {
  id: string;
  action: string;
  taskId: string;
  actorId: string;
  details: string;
  createdAt: Date;
}
