'use client'
import { useProjectData } from '@/contexts/ProjectDataContext'
import Navbar from '@/components/Navbar'
import SectionTitle from '@/components/UI/SectionTitle'

interface ExcelRow {
	[key: string]: string | number | null
}

export default function TableOfData() {
	const { projectName, excelData } = useProjectData()

	return (
		<>
			<Navbar />
			<div className='p-8 text-black bg-backgroundColor wrapper extra-padding'>
				<SectionTitle title='Przegląd danych' />
				<h1 className='text-lg md:text-xl lg:text-2xl font-bold mb-4 text-center'>{projectName}</h1>
				<div className='overflow-x-auto w-full ring-1 ring-secondaryColor'>
					<div className='min-w-[800px] md:min-w-full ring-1 ring-secondaryColor'>
						<table className='w-full text-left border-collapse ring-1 ring-secondaryColor'>
							<thead>
								<tr>
									{excelData.length > 0 &&
										Object.keys(excelData[0] as ExcelRow).map(key => (
											<th key={key} className='p-2 bg-secondaryColor text-white text-center'>
												{key}
											</th>
										))}
								</tr>
							</thead>
							<tbody>
								{excelData.map((row: ExcelRow, rowIndex: number) => (
									<tr key={rowIndex}>
										{Object.values(row).map((value, cellIndex) => (
											<td key={cellIndex} className='p-2 ring-1 ring-secondaryColor text-center'>
												{value}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}
