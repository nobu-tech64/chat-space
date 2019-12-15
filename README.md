# README
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false| 
|name|string|null: false, unique: true, index: true|
|email|string|null: false|
|password|char|null: false|

### Association
- has_many :comments
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false| 
|name|string|null: false, unique: true|

### Association
- has_many :users, through: :groups_users
- has_many :comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|text|text|null:false|
|users_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user