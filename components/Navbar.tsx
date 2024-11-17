// components/Navbar.tsx
'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartBar, faSmile, faUpload, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons' // Import ikony GitHub
import { useState } from 'react'

export default function Navbar() {
	const router = useRouter()
	const pathname = usePathname()
	const [isCollapsed, setIsCollapsed] = useState(true)

	// Funkcja do obsługi nawigacji
	const handleNavigate = (path: string) => {
		router.push(path)
	}

	// Lista przycisków nawigacyjnych
	const navItems = [
		{ label: 'Przegląd danych', icon: faTable, path: '/table-of-data' },
		{ label: 'Statystyki agregujące', icon: faChartBar, path: '/aggregate-statistics' },
		{ label: 'Twarze Chernoffa', icon: faSmile, path: '/chernoff-faces' },
		{ label: 'Wczytaj nowe dane', icon: faUpload, path: '/' },
	]

	return (
		<div
			className={`fixed flex ring-2 ring-mainColor z-10 ${
				isCollapsed ? 'w-16' : 'w-64'
			} h-screen bg-mainColor flex-col transition-all duration-300`}>
			<div className={`flex items-center p-4 text-white ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
				{!isCollapsed && (
					<h1 className='w-3/4 text-lg md:text-xl lg:text-2xl font-bold '>
						Wizualizacja danych za pomocą twarzy Chernoffa
					</h1>
				)}
				<button onClick={() => setIsCollapsed(!isCollapsed)} className='text-white text-xl lg:text-2xl'>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
			<nav className='flex flex-col gap-4 mt-4'>
				{navItems.map(item => (
					<button
						key={item.path}
						onClick={() => handleNavigate(item.path)}
						className={`flex items-center justify-center gap-4 p-4 text-left text-white transition-colors duration-200 ${
							!isCollapsed ? 'mx-4 ' : ''
						} ${
							pathname === item.path
								? 'bg-secondaryColor ring-2 ring-gray-800'
								: 'hover:bg-secondaryColor hover:ring-2 hover:ring-gray-800'
						}`}>
						<FontAwesomeIcon
							icon={item.icon}
							className={`text-xl lg:text-2xl  ${!isCollapsed ? 'text-accentColor' : 'test-white'} `}
						/>
						{!isCollapsed && <span className='uppercase font-bold text-md'>{item.label}</span>}
					</button>
				))}
			</nav>
			{/* Sekcja stopki */}
			<div className='p-4 text-center text-white mt-auto'>
				{!isCollapsed && (
					<>
						<p className='text-sm'>© {new Date().getFullYear()} Wszelkie prawa zastrzeżone</p>
						<div className='flex justify-center gap-2 mt-2'>
							<Link href='https://github.com/KamilPorada' target='_blank' className='flex items-center gap-1 text-sm '>
								<FontAwesomeIcon icon={faGithub} /> Kamil Porada
							</Link>
							<Link href='https://github.com/LMarcinEl' target='_blank' className='flex items-center gap-1 text-sm '>
								<FontAwesomeIcon icon={faGithub} /> Marcin Lach
							</Link>
						</div>
					</>
				)}
				{isCollapsed && (
					<>
						<p className='text-[13px] -mx-3'>©{new Date().getFullYear()}</p>
						<div
							className={`flex flex-col items-center justify-center gap-2 p-4 text-left text-white transition-colors duration-200 `}>
							<Link
								href='https://github.com/KamilPorada'
								target='_blank'
								className={`text-xl lg:text-2xl w-16 h-12 flex justify-center items-center  ${
									isCollapsed ? 'hover:bg-secondaryColor hover:ring-2 hover:ring-gray-800' : ''
								}`}>
								<FontAwesomeIcon icon={faGithub} />
							</Link>
							<Link
								href='https://github.com/LMarcinEl'
								target='_blank'
								className={`text-xl lg:text-2xl w-16 h-12 flex justify-center items-center  ${
									isCollapsed ? 'hover:bg-secondaryColor hover:ring-2 hover:ring-gray-800' : ''
								}`}>
								<FontAwesomeIcon icon={faGithub} />
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
