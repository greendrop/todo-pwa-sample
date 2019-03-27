# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::UsersController, type: :request do
  let(:user) { create(:user) }
  let(:doorkeeper_application) { create_doorkeeper_application }
  let(:access_token) { create_doorkeeper_access_token(doorkeeper_application, user) }

  describe 'GET api_v1_me_url' do
    describe 'アクセストークンあり' do
      before do
        params = { format: :json }
        headers = { 'Authorization' => "Bearer #{access_token.token}" }
        get api_v1_me_url, params: params, headers: headers
      end

      it '正常に取得できること' do
        expect(response.response_code).to eq 200
        body = user.as_json
        expect(response.body).to match_json_expression body
      end
    end

    describe 'アクセストークンなし' do
      before do
        params = { format: :json }
        get api_v1_me_url, params: params
      end

      it 'エラーコードが取得できること' do
        expect(response.response_code).to eq 401
      end
    end
  end
end
