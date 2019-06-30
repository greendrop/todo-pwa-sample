# frozen_string_literal: true

require_relative 'routes_api'

Rails.application.routes.draw do
  # Auth
  scope :auth do
    devise_for :users
    use_doorkeeper
  end

  # Api
  namespace :api, path: :api, as: :api do
    extend RoutesApi
  end

  get '/home', to: 'homes#index'
  root to: 'homes#index'

  # Docs
  get '/docs/*path', to: 'docs#show' if Rails.env.development?

  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
