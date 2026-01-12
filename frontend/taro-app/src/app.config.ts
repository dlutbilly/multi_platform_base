export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/explore/index',
    'pages/profile/index',
    'pages/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Multi Platform App',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8c8c8c',
    selectedColor: '#1890ff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'Home',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/explore/index',
        text: 'Explore',
        iconPath: 'assets/icons/explore.png',
        selectedIconPath: 'assets/icons/explore-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: 'Profile',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile-active.png'
      }
    ]
  }
})

function defineAppConfig(config: any) {
  return config
}
