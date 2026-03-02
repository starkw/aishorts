import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // 基本校验
    if (!username || !email || !password) {
      return NextResponse.json({ error: "请填写所有字段" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "密码至少需要 6 位" }, { status: 400 });
    }

    // 检查邮箱是否已注册
    const { data: existing } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 });
    }

    // 哈希密码
    const password_hash = await bcrypt.hash(password, 10);

    // 插入用户
    const { data, error } = await supabaseAdmin
      .from("users")
      .insert({ username, email, password_hash })
      .select("id, username, email")
      .single();

    if (error) {
      console.error("注册失败:", error);
      return NextResponse.json({ error: "注册失败，请稍后重试" }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error("注册异常:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
