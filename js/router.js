export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    console.log(route)

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })

    this.backgroundColor(pathname)
  }

  controlHome() {
    document.body.classList.add('bgHome')
    document.body.classList.remove('bgUniverse')
    document.body.classList.remove('bgExplorer')
    document.querySelector('.homefocus').classList.add('focus')
    document.querySelector('.universefocus').classList.remove('focus')
    document.querySelector('.explorerfocus').classList.remove('focus')
  }

  controlUniverse() {
    document.body.classList.add('bgUniverse')
    document.body.classList.remove('bgHome')
    document.body.classList.remove('bgExplorer')
    document.querySelector('.homefocus').classList.remove('focus')
    document.querySelector('.universefocus').classList.add('focus')
    document.querySelector('.explorerfocus').classList.remove('focus')
  }

  controlExplore() {
    document.body.classList.add('bgExplorer')
    document.body.classList.remove('bgHome')
    document.body.classList.remove('bgUniverse')
    document.querySelector('.homefocus').classList.remove('focus')
    document.querySelector('.universefocus').classList.remove('focus')
    document.querySelector('.explorerfocus').classList.add('focus')
  }

  backgroundColor(bgWall) {
    if (bgWall == '/') {
      this.controlHome()
    } else if (bgWall == '/universe') {
      this.controlUniverse()
    } else if (bgWall == '/explorer') {
      this.controlExplore()
    }
  }
}
