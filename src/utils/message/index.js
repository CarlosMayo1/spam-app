import { supabase } from '../supabase.client'

export const searchMessage = async message => {
	const { data } = await supabase
		.from('message')
		.select('message')
		.ilike('message', `%${message}%`)
	if (data) return data
}

export const fetchMessage = async () => {
	const { data, error } = supabase
		.from('message')
		.select('message_id, message, category_id, source')
	if (data) return data
	if (error) return error
}

export const insertNewMessage = async message => {
	const { data, error } = await supabase.from('message').insert(message)
	if (data) return data
	if (error) return error
}
