# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::UserBaseController
      # サインインユーザを出力する
      def me
        render json: current_resource_owner.as_json
      end
    end
  end
end
