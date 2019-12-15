# README
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false| 
|name|string|null: false, unique: true|
|email|string|null: false|
|password|char|null: false|

### Association
- has_many :comments
- has_many :chatgroups

## chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false| 
|name|string|null: false, unique: true|
|users_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :users
- has_many :comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|text|text|null:false|
|users_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :users
- belongs_to :chatgroups
