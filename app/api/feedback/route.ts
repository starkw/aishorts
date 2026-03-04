import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { type, title, content, contact, user_email } = await req.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "请填写标题和内容" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("feedback").insert([
      {
        type,
        title: title.trim(),
        content: content.trim(),
        contact: contact?.trim() || null,
        user_email: user_email || null,
      },
    ]);

    if (error) {
      console.error("Supabase feedback error:", error);
      return NextResponse.json({ error: "提交失败，请稍后重试" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json({ error: "服务器错误，请稍后重试" }, { status: 500 });
  }
}
