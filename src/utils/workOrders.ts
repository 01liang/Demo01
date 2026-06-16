import type { UserRole, WorkOrder } from '../types/workOrder'
import { canDeleteWorkOrder } from './permissions'

export interface ProjectHours {
  project: string
  hours: number
}

export function summarizeHoursByProject(records: WorkOrder[]): ProjectHours[] {
  const totals = records.reduce<Record<string, number>>((acc, record) => {
    acc[record.project] = (acc[record.project] ?? 0) + record.hours
    return acc
  }, {})

  return Object.entries(totals).map(([project, hours]) => ({
    project,
    hours: Number(hours.toFixed(2)),
  }))
}

export function deleteWorkOrder(records: WorkOrder[], id: string, role: UserRole): WorkOrder[] {
  if (!canDeleteWorkOrder(role)) {
    return records
  }

  return records.filter((record) => record.id !== id)
}
