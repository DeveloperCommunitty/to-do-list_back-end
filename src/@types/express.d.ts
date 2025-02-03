import { Role } from "src/casl/dto/casl.dto";


declare module 'express' {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
  }