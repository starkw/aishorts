import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase";

// 获取用户收藏列表
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ favorites: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("favorites")
    .select("prompt_id")
    .eq("user_id", session.user.id);

  if (error) {
    return NextResponse.json({ error: "获取收藏失败" }, { status: 500 });
  }

  return NextResponse.json({ favorites: data.map((f) => f.prompt_id) });
}

// 添加或取消收藏
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const { promptId, action } = await req.json();
  if (!promptId) {
    return NextResponse.json({ error: "缺少 promptId" }, { status: 400 });
  }

  if (action === "remove") {
    // 取消收藏
    const { error } = await supabaseAdmin
      .from("favorites")
      .delete()
      .eq("user_id", session.user.id)
      .eq("prompt_id", promptId);

    if (error) {
      return NextResponse.json({ error: "取消收藏失败" }, { status: 500 });
    }
    return NextResponse.json({ success: true, action: "removed" });
  } else {
    // 添加收藏（忽略重复）
    const { error } = await supabaseAdmin
      .from("favorites")
      .upsert({ user_id: session.user.id, prompt_id: promptId });

    if (error) {
      return NextResponse.json({ error: "收藏失败" }, { status: 500 });
    }
    return NextResponse.json({ success: true, action: "added" });
  }
}
