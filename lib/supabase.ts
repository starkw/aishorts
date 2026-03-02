import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 客户端（浏览器用，权限受限）
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 服务端（API 路由用，拥有完整权限）
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
