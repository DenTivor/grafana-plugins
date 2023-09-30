# **Grafana plugins monorepo** #
Build plugins for grafana with npm workspaces

## Prerequisites
1) Builded with npm workspaces: use command `nvm install 16.13.1`
2) npm config set strict-ssl=false command will fix certificates problem with npm

## Commands
1) `npm install cool-lib --save -w=@grafana-plugins/simple-module` will install cool-lib into simple-module folder
2) `npm install -w=@grafana-plugins/simple-module` will install deps for simple-module folder
3) `npm run build -w=@grafana-plugins/simple-module` will build simple-module 
4) Build:
  * `npm run build` will build all plugins for prod. Don't forget to check setting.js for neccesary plugin list
  * `npm run grafanawatch` will build with --watch option to target plugins folder in grafana instance. 

## Project structure
- docker-compose consists of two images: grafana and mysql database. Containers were tuned for usage and visibility mysql in grafana with connection string `mysql_workshop:3306`
- place your module in packages folder:
  - **assets** contains files for grafana: favicon, plugin.json and README.md
  - **options** contains options for right options panel
  - **panel** contains Controller(plugin ui entry point), module class and styles
  - **index.ts** is entry point for grafana
  - **consts** contains constants 
  - **enums** contains enums
  - **interfaces** contains types and interfaces
  - **utils** contains utilites
- **build** folder stores webpack build files and settings
- **environment-entities** stores grafana.ini and /lib/grafana folder. It used in mounting for environment

## Features
1) **Hot style load for grafana theme** There is two plugins for themes in webpack's config: panel.panelDarkStyle and panel.panelLightStyle
    Use absolute path in loadPluginCss method
    ```js
    import './styles/panel.panelDarkStyle.scss'
    import './styles/panel.panelLightStyle.scss'

    loadPluginCss({
      dark: 'plugins/simple-module/css/panelDarkStyle.css'
      light: 'plugins/simple-module/css/panelLightStyle.css'
    })
    ```

## Bugs
> [!WARNING]
> Be careful with dependencies of different versions of library is used among packages

## TODO
- [ ] Local playground for develop plugin ui without grafana and mysql docker instances
- [ ] Custom admin plugin workspace for usage in plugins