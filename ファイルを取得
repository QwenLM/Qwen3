# ファイルを取得
+get_file_1:
  action>: GetFile
  display_name>: 'ファイルを取得'
  provider: local
  filename: rc_36b0011677688bf489d7
  private: false
  meta:
    display:
      filename:
        label: 'sample-card.png'
        icon: text
        type: chip
    action:
      disabled: false
# Document Forceでドキュメントを解析
+d_f_analyze_document_1:
  action>: DFAnalyzeDocument
  display_name>: 'Document Forceでドキュメントを解析'
  provider_id: documentforce_03f3151d6f9accddcffa
  endpoint: 'https://app.aipuncher.com/api/v2/analyse/****************'
  file: +get_file_1
  tags:
    AUTORO DevOps:
      - '開発テストタグ'
  wait_for_result: false
  private: false
  meta:
    display:
      provider_id:
        type: chip
        label: 'Documentforce (AUTORO連携用)'
        icon: documentforce
    action:
      disabled: false
# {
#   "document_id": 1027
# }
