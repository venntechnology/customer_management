class Note < ApplicationRecord
  belongs_to :user
  belongs_to :customer

  validates :content, presence: true

  scope :created_by_user, ->(user_id) { where(user_id: user_id) }
  scope :last_7_days, ->(date) { where('created_at > ? AND created_at < ?', date - 7.days.ago, date) }
end
