class CreatePresets < ActiveRecord::Migration[6.0]
  def change
    create_table :presets do |t|
      t.string :name, null: false
      t.text :input, null: false
      t.string :description, null: false
      t.string :author, null: false
      t.string :category, null: false
      t.timestamps
    end
  end
end
