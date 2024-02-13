import { supabase } from '../supabase.client'

export const fetchTags = async () => {
	const { data, error } = await supabase
		.from('tag')
		.select('tag_id, name, status')
		.eq('status', 1)
	if (data) return data
	if (error) return error
}
