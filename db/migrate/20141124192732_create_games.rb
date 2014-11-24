class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :keyword
      t.integer :players_count
      t.text :result
      t.integer :user_id

      t.timestamps
    end
  end
end
