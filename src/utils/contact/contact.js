import { supabase } from '../supabase.client'

export const insertNewContact = async contact => {
	const { data, error } = await supabase.from('contact').insert(contact)
	if (data) return data
	if (error) return error
}
