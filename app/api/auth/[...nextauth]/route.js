// app/api/auth/[...nextauth]/route.js
import { handlers } from "../../../../auth.js";

// App Router attend exactement ces exports
export const { GET, POST } = handlers;
