import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import myRequest from './service'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store).use(router).mount('#app')

//全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

myRequest
  .request<DataType>({
    url: 'home/multidata',
    method: 'GET',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        if (config && config.headers) {
          config.headers['token'] = '123'
        }
        return config
      },
      responseInterceptor: (res) => {
        console.log('单独响应的response')
        return res
      }
    }
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
