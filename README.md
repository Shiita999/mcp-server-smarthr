# mcp-server-smarthr

[English](#english) | [日本語](#日本語)

---

## English

MCP (Model Context Protocol) server for [SmartHR](https://smarthr.jp) API integration.  
Allows Claude and other MCP-compatible AI assistants to interact with SmartHR HR data.

### Features

- List and retrieve employees (with pagination)
- Get a specific employee by ID
- List departments (with pagination)
- List employment types
- List job titles (with pagination)
- List custom field templates

### Prerequisites

- Node.js 18+
- A SmartHR account with API access enabled

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/mcp-server-smarthr.git
cd mcp-server-smarthr
npm install
npm run build
```

### Configuration

Copy `.env.example` to `.env` and fill in your credentials.  
**Never commit `.env` to version control.**

```bash
cp .env.example .env
# Edit .env with your actual values
```

| Variable | Description |
|----------|-------------|
| `SMARTHR_SUBDOMAIN` | Your SmartHR subdomain (e.g. `acme` for `acme.smarthr.jp`) |
| `SMARTHR_ACCESS_TOKEN` | SmartHR API Bearer token |

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "smarthr": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server-smarthr/dist/index.js"],
      "env": {
        "SMARTHR_SUBDOMAIN": "your-company",
        "SMARTHR_ACCESS_TOKEN": "your_token"
      }
    }
  }
}
```

### Available Tools

| Tool | Description |
|------|-------------|
| `list_employees` | List employees with pagination |
| `get_employee` | Get a specific employee by ID |
| `list_departments` | List departments with pagination |
| `list_employment_types` | List all employment types |
| `list_job_titles` | List job titles with pagination |
| `list_custom_field_templates` | List custom employee field definitions |

### Security

- Never commit `.env` files or tokens to git
- Use environment variables for all credentials
- `.gitignore` excludes `.env`, `*.pem`, `*.key`, and other sensitive files

---

## 日本語

[SmartHR](https://smarthr.jp) APIと連携するMCP（Model Context Protocol）サーバーです。  
ClaudeなどMCP対応AIアシスタントからSmartHRの人事データを操作できます。

### 機能

- 従業員一覧の取得（ページネーション対応）
- 従業員IDによる個別取得
- 部署一覧の取得（ページネーション対応）
- 雇用形態一覧の取得
- 役職一覧の取得（ページネーション対応）
- カスタム項目テンプレート一覧の取得

### 前提条件

- Node.js 18以上
- SmartHR APIアクセスが有効なアカウント

### インストール

```bash
git clone https://github.com/YOUR_USERNAME/mcp-server-smarthr.git
cd mcp-server-smarthr
npm install
npm run build
```

### 設定

`.env.example` を `.env` にコピーし、実際の値を入力してください。  
**`.env` ファイルは絶対にバージョン管理にコミットしないでください。**

```bash
cp .env.example .env
# .env を編集して実際の値を入力
```

| 環境変数 | 説明 |
|----------|------|
| `SMARTHR_SUBDOMAIN` | SmartHRのサブドメイン（例：`acme.smarthr.jp` の場合は `acme`） |
| `SMARTHR_ACCESS_TOKEN` | SmartHR APIのBearerトークン |

### Claude Desktop 設定

`claude_desktop_config.json` に以下を追加してください：

```json
{
  "mcpServers": {
    "smarthr": {
      "command": "node",
      "args": ["/絶対パス/mcp-server-smarthr/dist/index.js"],
      "env": {
        "SMARTHR_SUBDOMAIN": "your-company",
        "SMARTHR_ACCESS_TOKEN": "your_token"
      }
    }
  }
}
```

### 利用可能なツール

| ツール名 | 説明 |
|----------|------|
| `list_employees` | 従業員一覧を取得（ページネーション対応） |
| `get_employee` | IDで特定の従業員を取得 |
| `list_departments` | 部署一覧を取得（ページネーション対応） |
| `list_employment_types` | 雇用形態一覧を取得 |
| `list_job_titles` | 役職一覧を取得（ページネーション対応） |
| `list_custom_field_templates` | カスタム項目テンプレート一覧を取得 |

### セキュリティ

- `.env` ファイルやトークンは絶対にgitにコミットしない
- 認証情報はすべて環境変数で管理する
- `.gitignore` に `.env`、`*.pem`、`*.key` などの機密ファイルを除外設定済み

## License / ライセンス

[MIT](LICENSE)
