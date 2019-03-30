# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::UsersController, type: :request do
  let(:user) { create(:user) }
  let(:doorkeeper_application) { create_doorkeeper_application }
  let(:access_token) { create_doorkeeper_access_token(doorkeeper_application, user) }

  describe 'GET api_v1_me_url' do
    describe '認証あり' do
      before do
        headers = { 'Authorization' => "Bearer #{access_token.token}" }
        get api_v1_me_url, headers: headers
      end

      it '正常に取得できること' do
        expect(response.status).to eq(200)
        body = user.as_json
        expect(response.body).to match_json_expression body
      end
    end

    describe '認証なし' do
      before do
        get api_v1_me_url
      end

      it 'エラーコードが取得できること' do
        expect(response.status).to eq(401)
      end
    end
  end
end
