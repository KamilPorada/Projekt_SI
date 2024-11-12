'use client'
import { useProjectData } from '@/contexts/ProjectDataContext'
import Navbar from '@/components/Navbar'

interface ExcelRow {
	[key: string]: string | number | null
}

export default function TableOfData() {
	const { projectName, excelData } = useProjectData()

	return (
		<>
			<Navbar />
			<div className='p-8 text-black bg-backgroundColor wrapper'>
				<h1 className='text-2xl font-bold mb-4'>Nazwa Projektu: {projectName}</h1>
				<table className='w-full text-left border-collapse'>
					<thead>
						<tr>
							{excelData.length > 0 &&
								Object.keys(excelData[0] as ExcelRow).map(key => (
									<th key={key} className='border-b-2 border-gray-300 p-2'>
										{key}
									</th>
								))}
						</tr>
					</thead>
					<tbody>
						{excelData.map((row: ExcelRow, rowIndex: number) => (
							<tr key={rowIndex}>
								{Object.values(row).map((value, cellIndex) => (
									<td key={cellIndex} className='border-b border-gray-300 p-2'>
										{value}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
