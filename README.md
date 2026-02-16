Portfolio Site (js-online-editer)

このリポジトリは、Vite + Vue 3（TypeScript）で構築されたポートフォリオ／作品サイトです。エディタやマークダウン表示機能を含むフロントエンド中心の静的サイトです。

**技術スタック**
- Vue 3
- TypeScript
- Vite
- Monaco Editor, PrismJS, marked, DOMPurify

**前提**
- Node.js 20.x 以降（package.json の `engines` を参照）
- npm

## クイックスタート

ローカルで開発サーバーを立ち上げる:

```bash
npm install
npm run dev
```

本番ビルドとプレビュー:

```bash
npm run build
npm run preview
```

型チェック、Lint、フォーマット:

```bash
npm run type-check
npm run lint
npm run format
```

## package.json スクリプト
- `dev`: 開発用 Vite サーバーを起動します。
- `build`: 型チェック後に `vite build` を実行します。
- `build-only`: 直接 `vite build` を実行します。
- `preview`: ビルド結果をプレビューします。
- `type-check`: `vue-tsc` による型チェック。
- `lint`: ESLint を実行して自動修正します。
- `format`: Prettier で `src/` を整形します。

## Docker
ルートにある `docker/Dockerfile` を使って静的ファイルをビルドして配信します。

イメージ作成・実行例:

```bash
docker build -t chrom-works:local -f docker/Dockerfile .
docker run --rm -p 8080:8080 chrom-works:local
```

コンテナは `http-server` で `dist/` を 8080 ポートにて公開します。

## Kubernetes（簡易）
`k8s/` 配下にデプロイ用マニフェストがあります。ローカルで試す場合は `imagePullPolicy: Never` のため、クラスターにビルド済みイメージをロードするか、適切なイメージ名に置き換えてください。

例:

```bash
# イメージをビルドして kind/minikube にロードする（環境に合わせて）
docker build -t chrom-works:v0.1.3 -f docker/Dockerfile .
# kind を使う場合
kind load docker-image chrom-works:v0.1.3

# デプロイ
kubectl apply -f k8s/
```

## フォルダ構成（主要）
- `src/` : アプリ本体（`App.vue`, `main.ts`, `components/`, `views/`）
- `public/` : 公開静的資産
- `docker/` : Dockerfile
- `k8s/` : Kubernetes マニフェスト

## 貢献
バグ報告や改善提案は Issue を開いてください。プルリクエスト歓迎です。

## ライセンス
リポジトリに明示的なライセンスファイルが含まれていません。必要に応じて `LICENSE` を追加してください。

---

必要ならこの README を英語化したり、デプロイ手順をより詳細に書き足します。ご希望を教えてください。
# JS_online-editer

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
