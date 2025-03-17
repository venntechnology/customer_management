class NotesController < ApplicationController
  before_action :set_customer
  before_action :set_note, only: %i[show edit update destroy]

  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

  def show
    authorize @note
  end

  def new
    @note = @customer.notes.build
    authorize @note
  end

  def edit; end

  def create
    @note = @customer.notes.build(note_params)
    @note.user = current_user

    authorize @note

    if @note.save
      render json: {
        success: true,
        note: {
          id: @note.id,
          content: @note.content,
          user_email: @note.user.email,
          created_at: @note.created_at,
        }
      }
    else
      render json: { success: false, errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize @note

    if @note.update_attribute(:content, params[:note][:content])
      render json: {
        success: true,
        note: {
          id: @note.id,
          content: @note.content,
          user_email: @note.user.email,
          created_at: @note.created_at
        }
      }
    else
      render json: { success: false, errors: ["Failed to update note"] }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @note

    @note.destroy

    render json: { success: true }
  end

  private

  def set_customer
    @customer = Customer.find(params[:customer_id])
  end

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:content)
  end
end
