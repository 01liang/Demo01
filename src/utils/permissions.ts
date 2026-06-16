import type { UserRole } from '../types/workOrder'

export function getRoleByUsername(username: string): UserRole {
  return username.trim() === 'admin' ? 'admin' : 'user'
}

export function canDeleteWorkOrder(role: UserRole): boolean {
  return role === 'admin'
}
