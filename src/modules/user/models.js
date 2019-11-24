import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'user'

export const ENDPOINTS = {
  getUser: `${DEFAULT_URL}/user/me`,
  login: `${DEFAULT_URL}/user/login`,
  getUsers: `${DEFAULT_URL}/user`,
  createUser: `${DEFAULT_URL}/user`
}

export const LIMIT = 20

export const STATUS = {
  0: 'common.delete',
  1: 'common.new',
  2: 'common.approve',
  3: 'common.banned',
  4: 'common.reject'
}

export const STATUS_COLORS = {
  0: 'red',
  1: 'green',
  2: 'blue',
  3: '#2db7f5',
  4: 'orange',
  5: 'gray',
  6: '#d46b08'
}
