import { supabase } from '../supabase.client'

export const insertNewCategory = async category => {
	const { data, error } = await supabase.from('category').insert(category)
	if (data) return data
	if (error) return error
}
