Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  resources :playlists, only:[:index]

  resources :sessions, only:[:create, :new]
  # below, , as: :play_sessions, path: "play_sessions" is added because otherwise it conflicts with devise
  resources :user_sessions, only:[:show], as: :play_sessions, path: "play_sessions"
  post "update_song_count", to: "sessions#update_count"
end
