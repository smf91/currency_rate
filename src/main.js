import { createApp } from 'vue';
import {Cascader, Menu, Layout, Table, Button, Spin} from 'ant-design-vue';
import App from './App';
import Store from './store/index'

const app = createApp(App);
app.config.productionTip = false
app.use(Spin)
app.use(Button)
app.use(Table)
app.use(Layout)
app.use(Cascader)
app.use(Menu)
app.use(Store)
app.mount('#app')