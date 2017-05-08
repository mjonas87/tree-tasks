class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.integer :parent_id
      t.string :name
      t.string :description
      t.datetime :due_by
      t.integer :category_id

      t.timestamps
    end
  end
end
