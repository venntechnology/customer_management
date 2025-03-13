class Customer < ApplicationRecord
  has_many :notes, dependent: :destroy
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
