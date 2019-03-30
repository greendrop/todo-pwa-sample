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
$ cp config/application.yml.example config/application.yml
$ cp config/database.yml.example config/database.yml
$ bundle install
$ yarn install
$ rake db:create
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
