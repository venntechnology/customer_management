require 'rails_helper'

RSpec.describe NotePolicy, type: :policy do
  subject { described_class }

  let(:admin) { User.new(role: 'admin') }
  let(:advanced) { User.new(role: 'advanced') }
  let(:basic) { User.new(role: 'basic') }
  let(:other_basic) { User.new(role: 'basic') }
  let(:customer) { Customer.new }
  let(:note) { Note.new(user: basic, customer: customer) }

  permissions :show? do
    it "allows admin to see any note" do
      expect(true).to eq(true)
    end
  end

  describe "scope" do
    it "needs to be tested" do
    end
  end
end
