import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LuckyTurntable from '@/components/LuckyTurntable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/',
      path: 'helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      // path: 'luckyTurntable',
      name: 'LuckyTurntable',
      component: LuckyTurntable
    }
  ]
})
