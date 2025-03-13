class CustomerPolicy < ApplicationPolicy
  def index?
    true # All roles can see the list of customers
  end

  def show?
    true # All roles can view customer details
  end

  def create?
    user.admin? # Only admins can create
  end

  def update?
    user.admin? # Only admins can edit
  end

  def destroy?
    user.admin? # Only admins can delete
  end

  class Scope < Scope
    def resolve
      scope.all # All users can see all customers
    end
  end
end
