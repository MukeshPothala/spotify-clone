import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const middleWare =async (req: NextRequest) => {
    const response = NextResponse.next();
    const supabase = createMiddlewareClient({
        req:req,
        res: response
    });
    await supabase.auth.getSession();
    return response;
}