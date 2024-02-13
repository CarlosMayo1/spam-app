// utils
import { fetchTags } from '../../utils/tag'
// store
import { tagActions } from './tag-redux'

export const fncFetchTags = () => {
	return async function fetchAllTags(dispatch) {
		fetchTags().then(response => {
			console.log(response)

			const tagArr = []
			response.map(tag =>
				tagArr.push({
					value: tag.tag_id,
					label: tag.name,
				}),
			)

			if (response !== null) {
				const sortedArr = tagArr.sort((a, b) => {
					if (a.name < b.name) {
						return -1
					}
					if (a.name > b.name) {
						return 1
					}
					return 0
				})
				dispatch(tagActions.fetchTags(sortedArr))
			} else {
				dispatch(tagActions.fetchTags(response))
			}
		})
	}
}
