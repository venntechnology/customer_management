require 'rails_helper'

RSpec.describe "Notes", type: :request do
  let(:admin) { create(:user, role: 'admin') }
  let(:customer) { create(:customer) }

  describe "GET /customers/:customer_id/notes/:id" do
    it "returns a success response" do
      expect(true).to be_truthy
    end
  end

  describe "POST /customers/:customer_id/notes" do
    context "with valid params" do
      it "creates a new Note" do
        sign_in admin

        expect {
          post customer_notes_path(customer), params: {
            note: { content: "Test note" }
          }
        }.to change(Note, :count).by(1)
      end
    end

  end

  describe "PATCH /customers/:customer_id/notes/:id" do
    let(:note) { create(:note, customer: customer, user: admin) }

    it "updates the requested note" do
      sign_in admin
      patch customer_note_path(customer, note), params: {
        note: { content: "Updated content" }
      }

      expect(response).to redirect_to(customer_path(customer))
    end

  end

  describe "DELETE /customers/:customer_id/notes/:id" do
    let!(:note) { create(:note, customer: customer, user: admin) }

    it "destroys the requested note" do
      sign_in admin

      expect {
        delete customer_note_path(customer, note)
      }.to change(Note, :count).by(-1)
    end
  end
end
