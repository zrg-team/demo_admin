import React from 'react'
import moment from 'moment'
import I18n from 'i18n-js'
import {
  Table,
  Card,
  Button,
  Menu,
  Dropdown,
  Icon,
  Input
} from 'antd'
import { LIMIT } from '../models'

class UserList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      page: 1,
      total: 0,
      limit: LIMIT
    }
    this.rowKey = this.rowKey.bind(this)
    this.getData = this.getData.bind(this)
    this.handleNewUser = this.handleNewUser.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: `${I18n.t('user.username')}`,
        dataIndex: 'user_name',
        key: 'name'
      },
      {
        title: `${I18n.t('common.created_date')}`,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value) => <span>{moment(value).format('YYYY-MM-DD HH:mm')}</span>
      },
      {
        title: `${I18n.t('common.update_date')}`,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value) => <span>{moment(value).format('YYYY-MM-DD HH:mm')}</span>
      },
      {
        title: `${I18n.t('common.action')}`,
        key: 'operation',
        render: (values) => {
          const menu = (
            <Menu />
          )
          return (
            <div>
              <Dropdown overlay={menu} placement='bottomLeft'>
                <Button><Icon type='ellipsis' /></Button>
              </Dropdown>
            </div>
          )
        }
      }
    ]
  }

  handleNewUser () {
    const { history } = this.props
    history.push('/create-user')
  }

  rowKey (item) {
    return item.id
  }

  async getData (input) {
    const { page } = this.state
    const { getUserList } = this.props
    const next = input !== undefined ? input : { page }
    const result = await getUserList(next)
    if (result) {
      return this.setState({
        page: next.page,
        limit: result.limit,
        total: result.total
      })
    }
  }

  handleTableChange (pagination, filters, sorter) {
    const { role, user } = this.state
    this.getData({
      page: pagination.current,
      search: {
        role_id: role > 0 ? role : undefined,
        'userOfAdministrator.user_name': user
      }
    })
  }

  handleChangeText (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch () {
    const { user } = this.state
    this.getData({
      page: 1,
      search: {
        user_name: user
      }
    })
  }

  async componentDidMount () {
    this.getData()
  }

  render () {
    const { user, page, total, limit } = this.state
    const { data } = this.props
    return (
      <Card
        title={I18n.t('user.users')}
        bordered={false}
        className='adminitrator'
      >
        <div
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              justifyContent: 'flex-start'
            }}
            className='card-admin-job'
          >
            <Button
              className='button'
              onClick={this.handleNewUser}
              type='primary'
              icon='user-add'
            >
              {I18n.t('common.add')}
            </Button>
            <Input
              name='user'
              value={user || ''}
              onChange={this.handleChangeText}
              className='search-username'
              style={{ marginLeft: 10, marginRight: 10 }}
              placeholder={I18n.t('user.search_by_username')}
            />
            <Button
              className='button'
              onClick={this.handleSearch}
              type='primary'
              icon='search'
            >
              {I18n.t('common.search')}
            </Button>
          </div>
          <Table
            pagination={{
              current: page,
              total,
              pageSize: limit
            }}
            onChange={this.handleTableChange}
            rowKey={this.rowKey}
            scroll={{ x: '100%' }}
            columns={this.columns}
            dataSource={data || []}
          />
        </div>
      </Card>
    )
  }
}

export default UserList
