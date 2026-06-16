import { describe, expect, it } from 'vitest'
import { initialWorkOrders } from '../src/data/workOrders'
import { deleteWorkOrder, summarizeHoursByProject } from '../src/utils/workOrders'

describe('work order logic', () => {
  it('summarizes total hours by project', () => {
    expect(summarizeHoursByProject(initialWorkOrders)).toEqual([
      { project: 'Road Project A', hours: 3.5 },
      { project: 'Bridge Maintenance B', hours: 5 },
      { project: 'Pipeline Fix C', hours: 4.5 },
      { project: 'Tunnel Cleaning D', hours: 8.1 },
    ])
  })

  it('allows admins to delete records', () => {
    const nextRecords = deleteWorkOrder(initialWorkOrders, '002', 'admin')

    expect(nextRecords).toHaveLength(4)
    expect(nextRecords.some((record) => record.id === '002')).toBe(false)
    expect(summarizeHoursByProject(nextRecords).find((item) => item.project === 'Bridge Maintenance B')?.hours).toBe(3)
  })

  it('keeps records unchanged when a regular user tries to delete', () => {
    const nextRecords = deleteWorkOrder(initialWorkOrders, '002', 'user')

    expect(nextRecords).toBe(initialWorkOrders)
  })
})
