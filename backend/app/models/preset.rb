class Preset < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :author, presence: true
  validates :input, presence: true
  validates :description, presence: true
  validates :category, presence: true
end
