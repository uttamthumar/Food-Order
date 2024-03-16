// types.ts

export interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[];
  }
  
  // Define other custom types used in your application
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Action {
    type: string;
    payload?: any;
  }
  
  // Other type definitions...
  