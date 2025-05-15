import type { Config } from "@tinacms/cli";
declare module "@tinacms/cli" {
  interface TinaConfig {
    admin?: {
      auth?: {
        useLocalAuth?: boolean;
        adminUser?: string;
        adminPassword?: string;
      }
    }
  }
}