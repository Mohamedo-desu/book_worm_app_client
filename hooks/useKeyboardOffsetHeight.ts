import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardOffsetHeight = () => {
	const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState<number>(0)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			setKeyboardOffsetHeight(e.endCoordinates.height)
		})
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
			setKeyboardOffsetHeight(e.endCoordinates.height)
		})
		const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
			setKeyboardOffsetHeight(e.endCoordinates.height)
		})
		const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
			setKeyboardOffsetHeight(e.endCoordinates.height)
		})

		return () => {
			keyboardDidShowListener.remove()
			keyboardDidHideListener.remove()
			keyboardWillShowListener.remove()
			keyboardWillHideListener.remove()
		}
	}, [])

	return keyboardOffsetHeight
}
export default useKeyboardOffsetHeight
