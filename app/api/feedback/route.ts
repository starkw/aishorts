import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// 获取所有反馈（公开）
export async function GET() {
  try {
    const supabase = supabaseAdmin;
    const { data, error } = await supabase
      .from("feedback")
      .select("id, username, content, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase fetch feedback error:", error);
      return NextResponse.json({ feedbacks: [] }, { status: 200 });
    }

    return NextResponse.json({ feedbacks: data || [] }, { status: 200 });
  } catch (err) {
    console.error("Feedback GET error:", err);
    return NextResponse.json({ feedbacks: [] }, { status: 200 });
  }
}

// 提交反馈
export async function POST(req: Request) {
  try {
    const { username, content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: "请填写反馈内容" }, { status: 400 });
    }

    const supabase = supabaseAdmin;
    const { error } = await supabase.from("feedback").insert([
      {
        username: username?.trim() || "匿名用户",
        content: content.trim(),
      },
    ]);

    if (error) {
      console.error("Supabase insert feedback error:", error);
      return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Feedback POST error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
