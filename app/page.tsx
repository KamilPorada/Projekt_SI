'use client'
import heroImg from '../public/img/hero-img.jpg'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceLaughWink } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons' // Importujemy ikonę GitHub

export default function Home() {
	const [loading, setLoading] = useState(false)

	const handleDataLoad = () => {
		setLoading(true)
		// Tutaj załaduj dane z pliku Excela
		setTimeout(() => {
			setLoading(false) // Przykład opóźnienia dla załadunku
		}, 2000)
	}

	return (
		<div
			className='relative w-full h-screen bg-cover bg-center'
			style={{
				backgroundImage: `url(${heroImg.src})`,
			}}>
			{/* Nakładka przyciemniająca */}
			<div className='absolute inset-0 bg-black opacity-50'></div>

			{/* Okrąg z rozmytym tłem */}
			<div className='absolute inset-0 flex items-center justify-center'>
				<div className='h-2/3 flex flex-col justify-center items-center gap-10 aspect-square rounded-full bg-white bg-opacity-10 backdrop-blur-lg p-8 text-center'>
					{/* Tytuł */}
					<h1 className='text-4xl font-bold text-white mb-4 animate-fade-in upp'>
						Wizualizacja Danych za pomocą Twarzy Chernoffa
					</h1>
					{/* Ikona */}

					{/* Przycisk */}
					<button
						onClick={handleDataLoad}
						className={`mt-4 px-10 py-2 text-lg rounded-full bg-accentColor text-white transition duration-300 ease-in-out hover:bg-orange-600 ${
							loading ? 'animate-pulse' : ''
						}`}>
						{loading ? 'Wczytywanie...' : 'Wczytaj dane'}
					</button>
					{/* Stopka */}
					<footer className='flex justify-center items-center absolute bottom-0 w-full bg-transparent'>
						<div className=' w-1/2 py-4 text-center text-white'>
              <div className='w-full h-[1px] bg-gray-400 mb-2'></div>
							<p className='text-sm'>Kamil Porada &copy; {new Date().getFullYear()}</p>
							<a
								href='https://github.com/KamilPorada'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center mt-2'>
								<FontAwesomeIcon icon={faGithub} className='text-white text-xl mr-2' />
								<span className='text-sm'>GitHub</span>
							</a>
						</div>
					</footer>
				</div>
			</div>
		</div>
	)
}
