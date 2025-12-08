class GroupsController < ApplicationController
  def show
    # @user_session = UserSession.find(params[:user_session])
    @group = Group.find(params[:id])
  end
end
