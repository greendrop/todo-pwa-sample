# todo-pwa-sample

Rails(API) + Nuxt.js/Vue.js(FRONT)を使用したSPA/PWAのサンプルです。

## 使用言語・ライブラリ

- Server side
  - Ruby on Rails
  - Devise
  - Doorkeeper
- Front end
  - Vue.js
  - Nuxt.js
  - Vuetify

## API
  - https://petstore.swagger.io/?url=https%3a%2f%2fraw%2egithubusercontent%2ecom%2fgreendrop%2ftodo%2dpwa%2dsample%2fmaster%2fserver%2fdocs%2fapi%2fschema%2eyml

## 環境構築アプリケーション

- Docker
- Docker Compose
- direnv
- git

## セットアップ

```shell
$ git clone git@github.com:greendrop/todo-pwa-sample.git
$ cd todo-pwa-sample
$ vi .envrc
$ direnv allow
$ docker-compose pull
$ docker-compose build
$ docker-compose run --rm server-web bash
$ cp .env.example .env
$ bundle install
$ yarn install
$ rake db:create
$ rake db:migrate
$ exit
$ docker-compose run --rm front bash
$ cp .env.example .env
$ yarn install
$ exit
$ docker-compose up
```

### .envrc

```
export USER_ID=`id -u`
export GROUP_ID=`id -g`
```
