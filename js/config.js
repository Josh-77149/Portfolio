import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";

// Clé publishable : faite pour être visible côté navigateur.
// La sécurité vient des règles RLS dans Supabase. Ne mets JAMAIS la clé "secret" ici.
const SUPABASE_URL = "https://pgsvrtdowtsegxxkzqaf.supabase.co";
const SUPABASE_KEY = "sb_publishable_Sf3erKAOqj3oX5RZ8E12kw_TuR3SEPq";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
