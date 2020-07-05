module Api::V1
  class PresetsController < ApplicationController
    def index
      @presets = Preset.where(:category => params[:category]).all

      render json: { status: 'done', presets: @presets }
    end

    def create
      @preset = Preset.new(preset_params)

      if @preset.save
        render json: { status: 'done', preset: @preset }
      else
        render json: { status: 'failed', error: @preset.errors }, status: :unprocessable_entity
      end
    end

    def categories
      @categories = [
        'Classification',
        'Cleanup data',
        'Code',
        'Extract data',
        'Fiction'
      ]

      render json: { status: 'done', categories: @categories }
    end

    protected

    # Only allow a list of trusted parameters through.
    def preset_params
      params.fetch(:preset, {}).permit(:name, :description, :input, :author, :category)
    end
  end
end