Rails.application.routes.draw do
  devise_for :users
  
  resources :customers do
    resources :notes, except: [:index]
  end
  
  # Set root path
  root to: 'customers#index'
end
