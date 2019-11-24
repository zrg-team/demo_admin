import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Avatar, Layout, Menu, Icon, notification, Switch } from 'antd'
import storeAccessible from '../utils/storeAccessible'
import { setCookie } from '../utils/cookies'
import { clearAll, setUserLanguage } from '../actions/common'
import { FRONT_PAGE_URL } from '../../configs'
import I18n from 'i18n-js'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

notification.config({
  placement: 'bottomLeft'
})

const FULL_PAGES = ['/login']

class MenuPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      flag: false
    }
    this.MENUS = []
    if (props.user && props.user.user_type_id === 3 && props.user.jobSeekerOfUser) {
      this.setMenus(props.mode, props.user.jobSeekerOfUser.type)
    } else {
      this.setMenus(props.mode)
    }
    this.breakPoint = {
      xs: 480,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.changePage = this.changePage.bind(this)
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this)
  }

  handleChangeLanguage (value) {
    storeAccessible.dispatch(setUserLanguage(value ? 'vi' : 'en'))
    setCookie('language', value ? 'vi' : 'en')
  }

  setMenus (mode, type) {
    switch (mode) {
      case '1':
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <span>
                <Icon type='home' />
                <span>{I18n.t('menu.dashboard')}</span>
              </span>
            )
          },
          {
            key: 'user',
            title: (
              <span>
                <Icon type='user' />
                <span>{I18n.t('menu.user')}</span>
              </span>
            )
          }
        ]
        break
      case '2':
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <span>
                <Icon type='home' />
                <span>{I18n.t('menu.dashboard')}</span>
              </span>
            )
          }
        ]
        break
      default:
        this.MENUS = []
    }
  }

  componentWillReceiveProps (nextProps) {
    const { language, user, mode } = nextProps
    if (language !== this.props.language) {
      if (user && user.user_type_id === 3 && user.jobSeekerOfUser) {
        this.setMenus(mode, user.jobSeekerOfUser.type)
      } else {
        this.setMenus(mode)
      }
      this.setState({
        flag: true
      }, () => {
        setTimeout(() => {
          this.setState({
            flag: false
          })
        }, 0)
      })
    }
  }

  changePage (e) {
    const { history } = this.props
    const item = this.MENUS.find(data => data.key === e.key)
    history.push(item.redirect)
  }

  handleToggle () {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed
    })
  }

  handleOnClick (value) {
    const isMobile = window.innerWidth <= this.breakPoint.lg
    const { history } = this.props
    switch (value.key) {
      case 'logout':
        storeAccessible.dispatch(clearAll())
        setCookie('user', '')
        setCookie('token', '')
        setCookie('reference', '')
        setCookie('reference_type', '')
        setTimeout(() => {
          window.location.href = FRONT_PAGE_URL
        }, 200)
        break
      default:
        isMobile && this.handleToggle()
        history.push(`/${value.key}`)
        break
    }
  }

  render () {
    const { collapsed, flag } = this.state
    const { children, history: { location }, userName, language } = this.props
    if (FULL_PAGES.includes(location.pathname)) {
      return children
    }
    const childrenNode = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        index,
        language
      })
    })
    return (
      <Layout className='menu-page'>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          theme='dark'
          style={{ backgroundColor: '#1b2033', height: '100vh', overflow: 'auto' }}
          collapsed={collapsed}
          onCollapse={this.handleToggle}
        >
          <div style={{
            display: 'flex',
            justifyContent: !collapsed ? 'space-between' : 'center',
            alignItems: 'center',
            height: 55,
            padding: '0px 15px',
            borderBottom: '1px solid #303546'
          }}
          >
            {!collapsed
              ? (
                <>
                  <a href={FRONT_PAGE_URL}>
                    <img alt='logo' src={require('../../assets/images/logo-ccp2x.png')} className='logo' />
                  </a>
                  <div style={{ fontSize: '1.4em', color: 'white', cursor: 'pointer', padding: 6 }} onClick={this.handleToggle}>
                    <Icon type='menu' />
                  </div>
                </>
              )
              : (
                <div
                  style={{
                    position: 'fixed',
                    zIndex: 999,
                    top: 0,
                    left: 0,
                    color: 'black',
                    cursor: 'pointer',
                    fontSize: '1.4em',
                    padding: 12,
                    borderRadius: '0 10px 10px 0'
                  }}
                  onClick={this.handleToggle}
                >
                  <Icon type='menu' />
                </div>
              )}

          </div>
          <Menu
            onClick={this.handleOnClick}
            defaultSelectedKeys={['dashboard']}
            selectedKeys={[this.props.location.pathname.replace('/', '')]}
            theme='dark'
            mode='inline'
          >
            {this.MENUS.map(item => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.key}
                    title={item.title}
                  >
                    {item.children.map(child => {
                      return <Menu.Item key={child.key}>{child.title}</Menu.Item>
                    })}
                  </SubMenu>
                )
              }
              return (
                <Menu.Item key={item.key}>
                  {item.title}
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#f3f6fd',
              padding: 0,
              paddingLeft: 20,
              paddingRight: 20,
              height: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderBottom: '1px solid #d1d7e2',
              minWidth: '70vw'
            }}
          >
            <div className={this.state.collapsed === true ? '' : 'switch-avatar'} style={{ padding: '0px 10px' }}>
              <Switch
                className={this.state.collapsed === true ? '' : 'switch'}
                onChange={this.handleChangeLanguage}
                checkedChildren='VI'
                unCheckedChildren='EN'
                style={{
                  background: 'rgb(44, 62, 80)',
                  marginRight: 10
                }}
                defaultChecked={language === 'vi'}
              />
              <Avatar
                className={this.state.collapsed === true ? '' : 'switch'}
                icon='user'
                style={{ backgroundColor: '#2c3e50', verticalAlign: 'middle', height: '100%' }}
                size='default'
              >
                {userName || ''}
              </Avatar>
            </div>
          </Header>
          <Content
            className='mainLayout-content'
            style={{
              minWidth: 300
            }}
          >
            {!flag ? childrenNode : null}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect((state) => {
  return {
    balance: state.common.balance || {},
    user: state.user.user,
    userName: state.user.user
      ? state.user.user.user_name
      : 'N',
    language: state.common
      ? state.common.language
      : 'en'
  }
})(withRouter(MenuPage))
