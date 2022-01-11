class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
    #   t.belongs_to :greeniter, null: false, foreign_key: true
      t.integer :greeniter_id
      t.string :title
      t.text :blog_post
      t.text :image_url
      t.integer :likes, null: false, default: 0
      t.integer :dislikes, null: false, default: 0

      t.timestamps
    end
  end
end
