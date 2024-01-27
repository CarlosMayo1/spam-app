import { supabase } from '../supabase.client'

export const searchCategory = async category => {
	const { data } = await supabase
		.from('category')
		.select('name')
		.eq('name', category)
	if (data) return data
}

export const fetchCategories = async () => {
	const { data, error } = await supabase
		.from('category')
		.select('category_id, name')
	if (data) return data
	if (error) return error
}

export const insertNewCategory = async category => {
	const { data, error } = await supabase.from('category').insert(category)
	if (data) return data
	if (error) return error
}
