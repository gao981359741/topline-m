// 加载注册 Vant组件模块

import Vue from 'vue'

// 加载
import {
  Button,
  Cell,
  CellGroup,
  Icon,
  NavBar,
  Field,
  Toast,
  CountDown,
  Tabbar,
  TabbarItem,
  Image,
  Grid, // 宫格组件
  GridItem,
  Dialog// 弹出框
} from 'vant'

// 注册
Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar)
  .use(Field)
  .use(Toast)
  .use(CountDown)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Image)
  .use(Grid)
  .use(GridItem)
  .use(Dialog)
