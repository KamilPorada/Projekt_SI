const Button: React.FC<{
	className?: string
	onClick?: () => void
	disabled?: boolean
	children: React.ReactNode
}> = props => {
	const buttonClassName = `text-sm md:text-base xl:text-lg relative px-6 py-2 mx-3 rounded-full font-semibold text-white
		${props.disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#F97316] hover:bg-[#d4570e]'}
		transition duration-300 ease-in-out
		shadow-inner 
		
		${props.className}`

	return (
		<button className={buttonClassName} onClick={props.onClick} disabled={props.disabled}>
			{props.children}
		</button>
	)
}

export default Button
