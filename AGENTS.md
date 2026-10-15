<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Roles live in public.user_roles checked via has_role(); a signup trigger grants admin only to the first user — avoids privilege escalation via profile data.
- Contact inquiries insert directly from the browser under an anon INSERT policy with DB length checks; reads are admin-only.
- Client documents live in the private `client-documents` bucket under `<client_id>/...` folders; RLS keys off the folder name.
