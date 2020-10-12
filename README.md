# Ghost On Heroku

## 初始化并添加相关服务

在 Heroku 上“Create New App”，设置好应用名等东西后，添加 “JawsDB MySQL” 和 “Mailgun” 两个服务。

## 环境变量配置

配置完服务后，需要在Heroku的“Settings”的“Config Vars”中配置下面的环境变量。

- `APP_PUBLIC_URL`：对外访问Ghost的地址（如果没有绑定自定义域名，就用Heroku的地址）
- `QN_BUCKET`：七牛的bucket
- `QN_DOMAIN`：七牛的CDN地址（http://cdn.view.yourtion.com）
- `QN_KEY`：七牛的AccessKey
- `QN_SEC`：七牛的SecretKey

## 项目目录结构

```tree
├── .gitignore
├── .profile            // 启动前触发生成配置
├── Procfile            // 启动脚本
├── bin
│   ├── copy-themes.sh  // 拷贝主题
│   └── create-config   // 根据环境变量生成配置
├── config.development.json     //开发配置
├── content             // 默认content文件夹（必须有）
│   ├── adapters
│   │   └── storage     // 七牛存储适配器
│   │       └── qiniu -> ../../../node_modules/qiniu-store/
│   ├── data            // 默认数据文件夹（必须有）
│   │   └── .gitkeep
│   └── themes          // 默认主题文件夹（必须有）
│       └── .gitkeep
├── package.json
└── server.js           // 启动脚本
```