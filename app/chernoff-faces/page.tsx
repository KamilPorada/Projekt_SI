'use client'

import React, { useEffect, useState } from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import { useProjectData } from '../../contexts/ProjectDataContext'
import SectionTitle from '@/components/UI/SectionTitle'

interface ColumnStatistics {
	mean: number | null
	stdDev: number | null
	median: number | null
	mode: number | null
	min: number | null
	max: number | null
	skewness: number | null
	kurtosis: number | null
	quantiles: number[] | null
}

type Statistics = Record<string, ColumnStatistics>

export default function ChernoffFaces() {
	const { columnStatistics, projectName, excelData } = useProjectData()
	const [quantileAssignments, setQuantileAssignments] = useState<number[]>([])

	const assignMeanToQuantile = (statistics: Statistics) => {
		const assignments: number[] = []

		Object.keys(statistics).forEach(columnKey => {
			const stat = statistics[columnKey]
			const { mean, quantiles } = stat

			if (!quantiles || mean === null) return

			if (mean < quantiles[0]) {
				assignments.push(1) // Q1
			} else if (mean < quantiles[1]) {
				assignments.push(2) // Q2
			} else {
				assignments.push(3) // Q3
			}
		})

		return assignments
	}

	const sketch = (p: any) => {
		p.setup = () => {
			p.createCanvas(600, 950)
		}

		p.draw = () => {
			p.background(255)

			//-------TWARZ CHERNOFFA------

			//Nazwa projektu
			p.fill(0) 
			p.textSize(22) 
			p.textAlign(p.CENTER, p.TOP)
			p.text(projectName, p.width / 2, 20)
			

			//Atrybut 1 - Kolor skóry
			if (quantileAssignments[0] == 1) {
				//Kolor skóry 1
				p.fill(255, 224, 189)
				p.stroke(255, 224, 189)
			} else if (quantileAssignments[0] == 2) {
				//Kolor skóry 2
				p.fill(204, 148, 115)
				p.stroke(204, 148, 115)
			} else {
				//Kolor skóry 3
				p.fill(139, 101, 80)
				p.stroke(139, 101, 80)
			}

			//Atrybut 2 - Owal twarzy
			if (quantileAssignments[1] == 1) {
				// Owal twarzy 1
				p.ellipse(300, 250, 350, 300)
			} else if (quantileAssignments[1] == 2) {
				// Owal twarzy 2
				p.ellipse(300, 250, 300, 300)
			} else {
				// Owal twarzy 3
				p.ellipse(300, 250, 250, 300)
			}

			//Atrybut 3 - Usta
			if (quantileAssignments[2] == 1) {
				// Wesołe usta (półkole)
				p.stroke(255, 99, 71)
				p.strokeWeight(4)
				p.noFill()
				p.arc(300, 310, 100, 100, 0, Math.PI)
			} else if (quantileAssignments[2] == 2) {
				// Normalne usta (prosta linia)
				p.stroke(255, 99, 71)
				p.strokeWeight(4)
				p.line(250, 330, 350, 330) // Prosta linia
			} else {
				// Smutne usta (odwrócone półkole)
				p.stroke(255, 99, 71)
				p.strokeWeight(4)
				p.noFill()
				p.arc(300, 350, 100, 100, Math.PI, Math.PI * 2)
			}

			//Atrybut 4 - Nos
			p.fill(255, 192, 203) 
			p.stroke(255, 105, 180) 
			p.strokeWeight(1) 

			if (quantileAssignments[3] == 1) {
				// Nos wersja 1
				p.triangle(300, 230, 275, 265, 325, 265)
			} else if (quantileAssignments[3] == 2) {
				// Nos wersja 2
				p.triangle(300, 210, 280, 265, 320, 265)
			} else {
				// Nos wersja 3
				p.triangle(300, 190, 285, 265, 315, 265)
			}

			//Atrybut 5 - Oczy
			if (quantileAssignments[4] == 1) {
				// Oczy wersja 1
				// lewe oko
				p.noFill() 
				p.stroke(100, 150, 255) 
				p.strokeWeight(4) 
				p.ellipse(250, 170, 40, 40) 

				p.fill(0) // lewa źrenica
				p.noStroke()
				p.ellipse(250, 170, 15, 15) 

				// prawe oko
				p.noFill() 
				p.stroke(100, 150, 255) 
				p.strokeWeight(4) 
				p.ellipse(350, 170, 40, 40) 

				p.fill(0) // prawa źrenica
				p.noStroke()
				p.ellipse(350, 170, 15, 15) 
			} else if (quantileAssignments[4] == 2) {
				// Oczy wersja 2
				// lewe oko
				p.noFill() 
				p.stroke(100, 150, 255) 
				p.strokeWeight(4) 
				p.ellipse(250, 170, 40, 40) 

				p.fill(0) // lewa źrenica
				p.noStroke()
				p.ellipse(250, 170, 20, 20) 

				// prawe oko
				p.noFill() 
				p.stroke(100, 150, 255) 
				p.strokeWeight(4) 
				p.ellipse(350, 170, 40, 40) 

				p.fill(0) // prawa źrenica
				p.noStroke()
				p.ellipse(350, 170, 20, 20) 
			} else {
				// Oczy wersja 3
				// lewe oko
				p.noFill() 
				p.stroke(100, 150, 255)
				p.strokeWeight(4)
				p.ellipse(250, 170, 40, 40) 

				p.fill(0) // lewa źrenica
				p.noStroke()
				p.ellipse(250, 170, 25, 25) 

				// prawe oko
				p.noFill()
				p.stroke(100, 150, 255)
				p.strokeWeight(4) 
				p.ellipse(350, 170, 40, 40) 

				p.fill(0) // prawa źrenica
				p.noStroke()
				p.ellipse(350, 170, 25, 25) 
			}
			
			//-----LEGENDA-------

			//Legenda - tytuł

			p.fill(0) 
			p.textSize(22)
			p.textAlign(p.CENTER, p.TOP) 
			p.text('Legenda', p.width / 2, 460)

			p.translate(10, 0)

			p.push()

			// Nazwy wierszy

			p.fill(0) 
			p.textStyle(p.NORMAL)
			p.textSize(14) 
			p.textAlign(p.LEFT, p.TOP) 
			p.text('Wysoki', 10, 700)

			p.fill(0) 
			p.textStyle(p.NORMAL)
			p.textSize(14) 
			p.textAlign(p.LEFT, p.TOP) 
			p.text(' Średni', 10, 795)

			p.fill(0) 
			p.textStyle(p.NORMAL)
			p.textSize(14)
			p.textAlign(p.LEFT, p.TOP) 
			p.text('   Niski', 10, 885)

			//Nazwy kolumn

			if (excelData && excelData.length > 0) {
				const columnNames = Object.keys(excelData[0])
				p.textSize(12)

				p.push()
				p.translate(130, 500)
				p.rotate(p.radians(90))

				if (columnNames[1]) p.text(`       ${columnNames[1]}`, 0, 0)
				p.pop()

				p.push()
				p.translate(230, 470)
				p.rotate(p.radians(90))

				if (columnNames[2]) p.text(`                 ${columnNames[2]}`, 0, 0)
				p.pop()

				p.push()
				p.translate(330, 470) 
				p.rotate(p.radians(90))

				if (columnNames[3]) p.text(`                         ${columnNames[3]}`, 0, 0)
				p.pop()

				p.push()
				p.translate(430, 470)
				p.rotate(p.radians(90))

				if (columnNames[4]) p.text(`                         ${columnNames[4]}`, 0, 0)
				p.pop()

				p.push()
				p.translate(530, 470)
				p.rotate(p.radians(90))

				if (columnNames[5]) p.text(`         ${columnNames[5]}`, 0, 0)
				p.pop()
			}

			//Legenda - Kolor skóry

			p.push()

			//Kolor skóry - Q3

			p.fill(139, 101, 80)
			p.stroke(139, 101, 80)
			p.rect(95, 682, 50, 50)

			//Kolor skóry - Q2

			p.fill(204, 148, 115)
			p.stroke(204, 148, 115)
			p.rect(95, 777, 50, 50)

			//Kolor skóry - Q1

			p.fill(255, 224, 189)
			p.stroke(255, 224, 189)
			p.rect(95, 872, 50, 50)

			p.pop()

			//Legenda - Owal twarzy

			p.push()

			p.fill(255, 255, 255) 
			p.stroke(0, 0, 0) 
			p.strokeWeight(1)

			//Owal twarzy Q3
			p.ellipse(220, 895, 60, 50)
			//Owal twarzy Q2
			p.ellipse(220, 802, 50, 50)
			//Owal twarzy Q1
			p.ellipse(220, 705, 40, 50)

			p.pop()

			//Legenda - Usta

			p.push()

			p.fill(255, 192, 203)
			p.stroke(255, 105, 180) 
			p.strokeWeight(1) 

			p.stroke(255, 99, 71)
			p.strokeWeight(4)
			p.noFill()

			// Usta - Q3
			p.arc(319, 720, 50, 50, Math.PI, Math.PI * 2) 
			// Usta - Q2
			p.line(294, 803, 344, 803) 
			// Usta - Q1
			p.arc(319, 888, 50, 50, 0, Math.PI) 

			p.pop()

			//Legenda - nos

			p.push()

			p.fill(255, 192, 203) 
			p.stroke(255, 105, 180) 
			p.strokeWeight(1)

			//Nos - Q3
			p.triangle(420, 670, 405, 745, 435, 745)
			//Nos - Q2
			p.triangle(420, 775, 405, 830, 435, 830)
			//Nos - Q1
			p.triangle(420, 880, 405, 915, 435, 915)

			p.pop()

			//Legenda - oczy

			p.push()

			//Oczy - Q3
			// lewe oko
			p.noFill()
			p.stroke(100, 150, 255) 
			p.strokeWeight(3) 
			p.ellipse(495, 708, 30, 30) 

			p.fill(0) // lewa źrenica
			p.noStroke()
			p.ellipse(495, 708, 15, 15) 

			// prawe oko
			p.noFill() 
			p.stroke(100, 150, 255) 
			p.strokeWeight(3) 
			p.ellipse(545, 708, 30, 30)

			p.fill(0) // prawa źrenica
			p.noStroke()
			p.ellipse(545, 708, 15, 15) 

			// Oczy - Q2
			// lewe oko
			p.noFill() 
			p.stroke(100, 150, 255) 
			p.strokeWeight(3) 
			p.ellipse(495, 802, 30, 30) 

			p.fill(0) // lewa źrenica
			p.noStroke()
			p.ellipse(495, 802, 10, 10) 

			// prawe oko
			p.noFill() 
			p.stroke(100, 150, 255) 
			p.strokeWeight(3) 
			p.ellipse(545, 802, 30, 30)

			p.fill(0) // prawa źrenica
			p.noStroke()
			p.ellipse(545, 802, 10, 10) 

			// Oczy - Q1
			// lewe oko
			p.noFill() 
			p.stroke(100, 150, 255) 
			p.strokeWeight(3) 
			p.ellipse(495, 896, 30, 30) 

			p.fill(0) // lewa źrenica
			p.noStroke()
			p.ellipse(495, 896, 5, 5) 

			// prawe oko
			p.noFill() 
			p.stroke(100, 150, 255) 
			p.strokeWeight(3) 
			p.ellipse(545, 896, 30, 30) 

			p.fill(0) // prawa źrenica
			p.noStroke()
			p.ellipse(545, 896, 5, 5)

			p.pop()

			p.pop()

			
		}
	}

	useEffect(() => {
		const updatedAssignments = assignMeanToQuantile(columnStatistics)
		setQuantileAssignments(updatedAssignments)
	}, [columnStatistics])

	return (
		<div className='p-8 bg-backgroundColor wrapper extra-padding'>
			<SectionTitle title='Twarze Chernoffa' />
			<div className='flex justify-center items-center'>
				<div className='bg-white shadow-lg rounded-lg border p-1 border-secondaryColor text-black'>
					<ReactP5Wrapper sketch={sketch} />
				</div>
			</div>
		</div>
	)
}
