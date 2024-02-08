import { supabase } from '../supabase.client'

export const searchMessage = async message => {
	const { data } = await supabase
		.from('message')
		.select('message')
		.eq('message', message)
	if (data) return data
}

export const fetchMessages = async filter => {
	const { data, error } = await supabase
		.from('message')
		.select('message_id, message, category!inner(category_id, name), source')
		.eq('status', 1)
		.eq(filter.category.category, filter.category.name)
		.ilike('message', `%${filter.query}%`)
		.limit(filter.limit)
	if (data) return data
	if (error) return error
}

export const insertNewMessage = async message => {
	const { data, error } = await supabase.from('message').insert(message)
	if (data) return data
	if (error) return error
}

export const updateMessage = async message => {
	const { data, error } = await supabase
		.from('message')
		.update(message)
		.eq('message_id', message.message_id)
	if (data) return data
	if (error) return error
}

export const deleteMessage = async id => {
	const { error } = await supabase.from('message').delete().eq('message_id', id)
	return error
}

export const searchBarMessage = async query => {
	const { data, error } = await supabase
		.from('message')
		.select('message_id, message, category(category_id, name), source')
		.ilike('message', `%${query}%`)
	if (data) return data
	if (error) return error
}

export const countTotalMesssage = async filter => {
	const { count, error } = await supabase
		.from('message')
		.select('message_id, message, category!inner(category_id, name), source', {
			count: 'exact',
			head: true,
		})
	// .eq('category.name', 'Libros')
	if (count) return count
	if (error) return error
}
