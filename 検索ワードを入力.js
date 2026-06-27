検索ワードを入力
ドキュメント
Release Note
Overview
ログイン
ロボットを動かしてみる
実行要求とキュー
ワークフロー
エラー処理
トリガー
ログ画面
ロボットタイプ
カスタムアクション
パッケージ
クッキー
変数セット
プライベートログ機能
ストレージ
利用状況アラート
コンテキストメニュー
Task
タスクの Yaml での記述
アクションタスク
コントロールタスク
Actions
ArtificialIntelligence
BigData
Browser
Cloudsign
ComputerVision
Control
Data
Desktop
Document Force
Excel
ExcelOnline
Fujifilm
General
Github
Google Calendar
Google Docs
Google Spreadsheet
HubSpot
HumanIntelligence
kintone
Marketing
Message
Outlook Calendar
Salesforce
SerpApi
Shopify
SmartHR
Storage
Text
Trello
Twilio
WebService
Zohocrm
Search
セッションの検索
Connections
Apple Search Ads
BigQuery
box
ChatGPT
Chatwork
Cloudsign
Document Force
Dropbox
Dropbox Full Access
Facebook Ads
Fujifilm IWpro
Gemini Pro
Github
Gmail
Gmail for Google Workspace
Google Ads
Google AI
Google Analytics
Google Calendar
Google Chat
Google Cloud Storage
Google Docs
Google Drive
Google Spreadsheet
HubSpot
Kintone With Password
kintone
LINE WORKS
Line Ads
Microsoft Ads
Microsoft Teams Message
OneDrive
Outlook
Outlook Calendar
S3
Salesforce
Search Console
SerpApi
Shopify
Slack
SmartHR
TikTok Ads
Trello
Twilio
Twitter Ads
Yahoo Ads
Zohocrm
Integrations
GitHub
SSO
Azure AD
GMOトラスト・ログイン
OneLogin
トリガー
Gmail
Outlook
Slack イベント
Webhook
ユーザーと権限
組織ユーザー
サポート
補足情報
モバイルデバイス
Security
セキュリティ仕様
セキュリティ機能
AUTORO Assistant
インストール方法
CSS セレクタの取得
連続した操作を記録
サイト上の情報を CSV に抽出
繰り返し作業を記録
既存のワークフローを実行
AUTORO Sheets Addon
インストール方法
トリガーの作成・編集・削除
設定メニュー
アドオンのアンインストール
スプレッドシートが更新された時に AUTORO を起動する
AUTORO Desktop
インストール方法
デバイスの共有設定
システム要件・動作環境
ODBCQueryアクションの利用例
Zapier
セットアップ方法
Zapier から AUTORO を起動する
Marketing
マーケティングに関するアクション一覧です。

GetGA4Report
概要
GetGA4Report は、Google Analytics4 からレポートを取得するアクションです。パラメーターを設定することで、カスタマイズされたレポートを作成することができます。レポートの対象期間は、startDate、endDate で設定します。取得したい値は、metrics で選択します。ページ別、ブラウザ別などの分析軸を設定したい場合は、dimensions で指定します。リクエストで返されるディメンションまたは指標を制限したい場合は、metricFilter または dimensionFilter で指定します。返却されるレスポンスはデフォルトで最大1000行です。

パラメーター
*は、必須パラメーター

名前	型	概要	例
provider*	文字列	google analytics4 からデータを取得するのに必要なプロバイダーID	ga_e7502c3b8b8147410ce2
propertyId*	数値	プロパティID	12345678
startDate*	文字列	リクエスト期間の開始日付	2023-04-01
endDate*	文字列	リクエスト期間の終了日付	2023-04-30
metrics	文字列	指標(定量化されたデータ)。カンマ区切りで10個まで指定可能。入力可能な値については こちら をご参照ください。	sessions, newUsers
dimensions	文字列	ディメンション(データの属性)。カンマ区切りで5個まで指定可能。入力可能な値については こちら をご参照ください。	date, sessionDefaultChannelGroup
metricFilter	オブジェクト	リクエストで返されるデータを制限する指標のフィルタ	※ フィルタについての説明参照
dimensionFilter	オブジェクト	リクエストで返されるデータを制限するディメンションのフィルタ	※ フィルタについての説明参照
pageSize	数値	リクエストで返されるデータの数。最大で、100,000行。	1000 (デフォルト値)
フィルタについての説明
フィルタの作成方法

metricFilter や dimensionFilter を設定することで取得するデータの値を制限することができます。以下の手順によって 公式ドキュメント からフィルタを作成してください。

公式ドキュメントの「Try this method」の「Request body」から metricFilter または dimensionFilter を選択し、フィルタオブジェクトを作成する。


作成したフィルタの metricFilter または dimensionFilter の内側のオブジェクトをコピーする


GetGA4Report アクションの metricFilter または dimensionFilter パラメータに貼り付ける


フィルタの書き方

metricFilter, dimensionFilter の書き方についての説明。 詳しくは公式ドキュメントをご参照ください。

基本のフィルタ
キーに filter 、値に条件を設定します。
