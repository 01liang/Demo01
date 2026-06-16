import { describe, expect, it } from 'vitest'
import { canDeleteWorkOrder, getRoleByUsername } from '../src/utils/permissions'

describe('permissions', () => {
  it('treats admin username as administrator', () => {
    expect(getRoleByUsername('admin')).toBe('admin')
    expect(canDeleteWorkOrder('admin')).toBe(true)
  })

  it('treats every other username as regular user', () => {
    expect(getRoleByUsername('alice')).toBe('user')
    expect(getRoleByUsername(' admin ')).toBe('admin')
    expect(canDeleteWorkOrder('user')).toBe(false)
  })
})
