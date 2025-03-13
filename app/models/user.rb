class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :notes, dependent: :destroy
  
  ROLES = %w[admin advanced basic].freeze
  
  validates :role, inclusion: { in: ROLES }
  
  ROLES.each do |role_name|
    define_method("#{role_name}?") { role == role_name }
  end
end
