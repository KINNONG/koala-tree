//引入项目中的全局组件'
import SvgIcon from "../components/SvgIcon/index.vue"

// 定义一个接口来描述全局组件对象的结构
interface GlobalComponents {
  [key: string]: any; // 使用 any 或具体的组件类型
}

const allGlobalComponents: GlobalComponents = {
  SvgIcon,
  // ...其他全局组件
};

//对外暴露插件对象
export default {
  install(app: any) {
    // 遍历 allGlobalComponents 对象并注册组件
    for (const key in allGlobalComponents) {
      app.component(key, allGlobalComponents[key]);
    }
  },
}
