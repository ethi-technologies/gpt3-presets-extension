Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :presets do
        collection do
          get :categories
        end
      end
    end
  end
end
