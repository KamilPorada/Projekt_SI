// app/page.tsx
'use client'
import heroImg from '../public/img/hero-img.jpg'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Button from '@/components/UI/Button'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/navigation'
import { useProjectData } from '../contexts/ProjectDataContext'

export default function Home() {
	const { projectName, setProjectName, excelData, setExcelData } = useProjectData()
	const [loading, setLoading] = useState(false)
	const [isTransitioned, setIsTransitioned] = useState(false)
	const [projectNameError, setProjectNameError] = useState(false)
	const [excelDataError, setExcelDataError] = useState(false)

	const router = useRouter()

	// Funkcja do walidacji
	const validateInputs = () => {
		let isValid = true
		if (!projectName.trim()) {
			setProjectNameError(true)
			isValid = false
		} else {
			setProjectNameError(false)
		}

		if (excelData.length === 0) {
			setExcelDataError(true)
			isValid = false
		} else {
			setExcelDataError(false)
		}

		return isValid
	}

	const handleDataLoad = () => {
		if (validateInputs()) {
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
				router.push('/table-of-data')
			}, 2000)
		}
	}

	const handleTransition = () => {
		setIsTransitioned(true)
	}

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target?.files && event.target.files[0]) {
			const file = event.target.files[0]
			const reader = new FileReader()

			reader.onload = e => {
				const data = new Uint8Array(e.target?.result as ArrayBuffer)
				const workbook = XLSX.read(data, { type: 'array' })
				const worksheet = workbook.Sheets[workbook.SheetNames[0]]
				const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

				const headers = jsonData[0] as string[]
				const rows = jsonData.slice(1)

				const dataArray = rows.map(row => {
					const rowData: { [key: string]: any } = {}
					headers.forEach((header: string, index: number) => {
						rowData[header] = (row as any[])[index]
					})
					return rowData
				})

				setExcelData(dataArray)
				console.log(dataArray)
			}

			reader.readAsArrayBuffer(file)
		}
	}

	return (
		<div
			className='relative w-full h-screen bg-cover bg-center overflow-hidden'
			style={{
				backgroundImage: `url(${heroImg.src})`,
			}}>
			<div className='absolute inset-0 bg-black opacity-50'></div>

			{/* Pierwszy ekran */}
			<div
				className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
					isTransitioned ? 'move-right' : 'start-center'
				}`}>
				<div className='h-1/2 md:h-2/3 flex flex-col justify-center items-center gap-10 aspect-square rounded-full bg-white bg-opacity-10 backdrop-blur-lg p-8 text-center'>
					<h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-white animate-fade-in'>
						Wizualizacja Danych za pomocą Twarzy Chernoffa
					</h1>
					<Button onClick={handleTransition}>Rozpocznij</Button>

					<footer className='flex justify-center items-center absolute bottom-0 w-full bg-transparent'>
						<div className='w-1/2 py-4 text-center text-white'>
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

			{/* Drugi ekran */}
			<div
				className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
					isTransitioned ? 'move-in-from-left' : 'hidden'
				}`}>
				<div className='h-1/2 md:h-2/3 flex flex-col items-center justify-center gap-6 aspect-square rounded-full bg-white bg-opacity-10 backdrop-blur-lg p-8'>
					<h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4'>Uzupełnij formularz</h2>
					<input
						type='text'
						value={projectName}
						onChange={e => setProjectName(e.target.value)}
						placeholder='Nazwa projektu'
						className={`w-3/4 p-2 text-xs md:text-base rounded-lg focus:outline-none bg-transparent border ${
							projectNameError ? 'border-red-500' : 'border-white'
						} text-white`}
					/>
					<input
						type='file'
						onChange={handleFileChange}
						className={`w-3/4 p-2 text-xs md:text-base mb-2 rounded-lg text-center focus:outline-none bg-transparent border ${
							excelDataError ? 'border-red-500' : 'border-white'
						} text-white`}
					/>
					<Button onClick={handleDataLoad}>{loading ? 'Wczytywanie...' : 'Wczytaj dane'}</Button>
				</div>
			</div>
		</div>
	)
}
