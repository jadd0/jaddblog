import { SupabaseFeatures } from "../../classes/supabaseFeatures.js";
import { Features } from "../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../supabaseClient.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

/** @type {import('./$types').Load} */
export async function load({ request }) {
  const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw redirect(307, "/login");
	}

	const auth = await supabaseClass.checkKey(cookie.key)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

	return {
		username: auth
	}
}