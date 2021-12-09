declare namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      SCRAP_URI: string;
    }
  }
