expressions は、対象となるフィルタ条件をリスト形式で記述する際に使用します。

Filter の種類
StringFilter

文字列関連のフィルタ。

例）
{
  "matchType": CONTAINS,
  "value": organic,
  "caseSensitive": false
}
matchType では文字列値と値のマッチング方法を指定します。 以下、マッチタイプの種類です。

タイプ	説明
MATCH_TYPE_UNSPECIFIED	指定なし
EXACT	文字列値と完全一致
BEGINS_WITH	文字列値で始まる
ENDS_WITH	文字列値で終わる
CONTAINS	文字列値に含まれる
FULL_REGEXP	正規表現と文字列値の完全一致
PARTIAL_REGEXP	正規表現と文字列値の部分一致。
value では文字列値を指定します。 caseSensitive では文字列値で大文字と小文字を区別するかどうかを指定します。true の場合、区別されます。

inListFilter

文字列関連のフィルタ。複数の文字列値を指定できます。

例）
{
  "values": ["Japan", "China"],
  "caseSensitive": false
}
values には複数の文字列値を配列形式で指定します。配列の中身は空でない必要があります。 caseSensitive では文字列値で大文字と小文字を区別するかどうかを指定します。true の場合、区別されます。

numericFilter

数値または日付の値のフィルタ。

例）
{
  "operation": "GREATER_THAN_OR_EQUAL",
  "value": {
    "int64Value":700
  }
}
operation には、数値を比較する演算子を指定します。 以下、比較演算子の種類です。

比較演算子	説明
OPERATION_UNSPECIFIED	指定なし
EQUAL	等しい
LESS_THAN	値より小さい
LESS_THAN_OR_EQUAL	値以下
GREATER_THAN	値より大きい
GREATER_THAN_OR_EQUAL	値以上
value には数値または日付を指定します。 int64Value の部分には数値のタイプを指定します。以下、数値のタイプの種類です。

タイプ	説明
int64Value	整数値
doubleValue	double 値
betweenFilter フィルタ

2 つの値のフィルタ。結果は 2 つの数値の間にあることを表します。

例）
{
  "fromValue": {
    "int64Value":700
  },
  "toValue": {
    "int64Value":800
  }
}
fromValue には始まりの値を指定します。中身は numericFilter の value と同様です。 toValue には終わりの値を指定します。中身は numericFilter の value と同様です。

入力例

例1）Organic を含むチャネルグループの1日ごとのセッションを取得
