class CreateGreeniters < ActiveRecord::Migration[6.1]
  def change
    create_table :greeniters do |t|
      t.string :username

      t.timestamps
    end
  end
end