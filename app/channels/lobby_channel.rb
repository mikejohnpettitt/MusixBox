class LobbyChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @group = Group.find(params[:group_id])
    stream_from "lobby_#{@group.id}"


    user = User.find(params[:user_id])

    ActionCable.server.broadcast(
      "lobby_#{@group.id}",
      {
        type: "user_joined",
        user_id: params[:user_id],
        html: ApplicationController.render(partial: 'groups/players', locals: { user: user })
      }
    )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast(
      "lobby_#{@group.id}",
      {
        type: "user_left",
        user_id: params[:user_id],
      }
    )
  end
end
