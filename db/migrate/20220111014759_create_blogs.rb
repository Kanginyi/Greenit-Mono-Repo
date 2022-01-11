class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.belongs_to :greeniter, null: false, foreign_key: true
      t.string :title
      t.text :blog_post
      t.text :image_url
      t.integer :likes
      t.integer :dislikes

      t.timestamps
    end
  end
end
