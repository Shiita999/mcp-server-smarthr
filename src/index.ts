#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SMARTHR_BASE_URL = "https://api.smarthr.jp/api/v1";

interface SmartHRConfig {
  subdomain: string;
  accessToken: string;
}

function getConfig(): SmartHRConfig {
  const subdomain = process.env.SMARTHR_SUBDOMAIN;
  const accessToken = process.env.SMARTHR_ACCESS_TOKEN;

  if (!subdomain || !accessToken) {
    throw new Error(
      "Missing required environment variables: SMARTHR_SUBDOMAIN, SMARTHR_ACCESS_TOKEN"
    );
  }

  return { subdomain, accessToken };
}

async function smarthrFetch(
  config: SmartHRConfig,
  path: string,
  options: RequestInit = {}
): Promise<unknown> {
  const url = `https://${config.subdomain}.smarthr.jp/api/v1${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SmartHR API error ${response.status}: ${text}`);
  }

  return response.json();
}

const server = new McpServer({
  name: "mcp-server-smarthr",
  version: "0.1.0",
});

// Tool: List employees
server.tool(
  "list_employees",
  "Retrieve a list of employees from SmartHR",
  {
    per_page: z.number().optional().describe("Number of results per page (default: 25, max: 100)"),
    page: z.number().optional().describe("Page number (default: 1)"),
  },
  async ({ per_page = 25, page = 1 }) => {
    const config = getConfig();
    const params = new URLSearchParams({
      per_page: String(per_page),
      page: String(page),
    });
    const data = await smarthrFetch(config, `/employees?${params}`);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool: Get employee by ID
server.tool(
  "get_employee",
  "Retrieve a specific employee's details by their ID",
  {
    employee_id: z.string().describe("The SmartHR employee ID"),
  },
  async ({ employee_id }) => {
    const config = getConfig();
    const data = await smarthrFetch(config, `/employees/${employee_id}`);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool: List departments
server.tool(
  "list_departments",
  "Retrieve a list of departments from SmartHR",
  {
    per_page: z.number().optional().describe("Number of results per page (default: 25, max: 100)"),
    page: z.number().optional().describe("Page number (default: 1)"),
  },
  async ({ per_page = 25, page = 1 }) => {
    const config = getConfig();
    const params = new URLSearchParams({
      per_page: String(per_page),
      page: String(page),
    });
    const data = await smarthrFetch(config, `/departments?${params}`);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool: List employment types
server.tool(
  "list_employment_types",
  "Retrieve a list of employment types from SmartHR",
  {},
  async () => {
    const config = getConfig();
    const data = await smarthrFetch(config, "/employment_types");
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool: List job titles
server.tool(
  "list_job_titles",
  "Retrieve a list of job titles from SmartHR",
  {
    per_page: z.number().optional().describe("Number of results per page (default: 25, max: 100)"),
    page: z.number().optional().describe("Page number (default: 1)"),
  },
  async ({ per_page = 25, page = 1 }) => {
    const config = getConfig();
    const params = new URLSearchParams({
      per_page: String(per_page),
      page: String(page),
    });
    const data = await smarthrFetch(config, `/job_titles?${params}`);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool: List crew custom fields (custom employee attributes)
server.tool(
  "list_custom_field_templates",
  "Retrieve custom field templates (custom employee attribute definitions) from SmartHR",
  {},
  async () => {
    const config = getConfig();
    const data = await smarthrFetch(config, "/crew_custom_field_templates");
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SmartHR MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
