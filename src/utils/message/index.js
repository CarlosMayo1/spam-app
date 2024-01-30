import { supabase } from '../supabase.client'

export const searchMessage = async message => {
	const { data } = await supabase
		.from('message')
		.select('message')
		.eq('message', message)
	if (data) return data
}

export const fetchMessages = async () => {
	const { data, error } = await supabase
		.from('message')
		.select('message_id, message, category(category_id, name), source')
	if (data) return data
	if (error) return error
}

export const insertNewMessage = async message => {
	const { data, error } = await supabase.from('message').insert(message)
	if (data) return data
	if (error) return error
}
