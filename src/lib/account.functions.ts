import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// GDPR right to erasure: deletes the signed-in user's files, documents and account.
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const uid = context.userId;
    const { data: files } = await supabaseAdmin.storage.from("client-documents").list(uid);
    if (files?.length) {
      await supabaseAdmin.storage.from("client-documents").remove(files.map((f) => `${uid}/${f.name}`));
    }
    await supabaseAdmin.from("client_documents").delete().eq("client_id", uid);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(uid);
    if (error) throw new Error("Could not delete account");
    return { ok: true };
  });
