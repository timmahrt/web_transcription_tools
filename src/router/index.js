import Vue from 'vue'
import Router from 'vue-router'
import TextgridProcessor from '@/components/TextgridProcessor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TextgridProcessor',
      component: TextgridProcessor
    }
  ]
})
