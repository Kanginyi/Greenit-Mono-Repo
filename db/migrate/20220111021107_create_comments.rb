class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
    #   t.belongs_to :blog, null: false, foreign_key: true
    #   t.belongs_to :user, null: false, foreign_key: true
      t.integer :blog_id
		t.integer :user_id
      t.text :comment_text

      t.timestamps
    end
  end
end
