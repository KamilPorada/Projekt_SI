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
	const { columnStatistics } = useProjectData()
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
			p.createCanvas(600, 800)
		}

		p.draw = () => {
			p.background(255)

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

			if (quantileAssignments[2] == 1) {
				// Wesołe usta (półkole)
				p.stroke(255, 99, 71)
				p.strokeWeight(4)
				p.noFill()
				p.arc(300, 310, 100, 100, 0, Math.PI) // Wesołe usta z Math.PI
			} else if (quantileAssignments[2] == 2) {
				// // Normalne usta (prosta linia)
				p.stroke(255, 99, 71)
				p.strokeWeight(4)
				p.line(250, 330, 350, 330) // Prosta linia
			} else {
				// Smutne usta (odwrócone półkole)
				p.stroke(255, 99, 71)
				p.strokeWeight(4)
				p.noFill()
				p.arc(300, 350, 100, 100, Math.PI, Math.PI * 2) // Smutne usta z odwróconym łukiem
			}

			// Nos
			p.fill(255, 192, 203) // Jasny różowy kolor dla nosa
			p.stroke(255, 105, 180) // Ciemniejszy różowy dla konturu
			p.strokeWeight(1) // Grubość konturu

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

			if (quantileAssignments[4] == 1) {
				// Oczy wersja 1
				// lewe oko
				p.noFill() // Oko bez wypełnienia
				p.stroke(100, 150, 255) // Niebieska obramówka (naturalny niebieski kolor)
				p.strokeWeight(4) // Grubość obramówki
				p.ellipse(250, 170, 40, 40) // Środek (250, 170), średnica 40

				p.fill(0) // Czarna źrenica
				p.noStroke()
				p.ellipse(250, 170, 15, 15) // Środek (250, 170), średnica 15

				// prawe oko
				p.noFill() // Oko bez wypełnienia
				p.stroke(100, 150, 255) // Niebieska obramówka (naturalny niebieski kolor)
				p.strokeWeight(4) // Grubość obramówki
				p.ellipse(350, 170, 40, 40) // Środek (350, 170), średnica 40

				p.fill(0) // Czarna źrenica
				p.noStroke()
				p.ellipse(350, 170, 15, 15) // Środek (350, 170), średnica 15
			} else if (quantileAssignments[4] == 2) {
				// Oczy wersja 2
				// lewe oko
				p.noFill() // Oko bez wypełnienia
				p.stroke(100, 150, 255) // Niebieska obramówka (naturalny niebieski kolor)
				p.strokeWeight(4) // Grubość obramówki
				p.ellipse(250, 170, 40, 40) // Środek (250, 170), średnica 40

				p.fill(0) // Czarna źrenica
				p.noStroke()
				p.ellipse(250, 170, 20, 20) // Środek (250, 170), średnica 15

				// prawe oko
				p.noFill() // Oko bez wypełnienia
				p.stroke(100, 150, 255) // Niebieska obramówka (naturalny niebieski kolor)
				p.strokeWeight(4) // Grubość obramówki
				p.ellipse(350, 170, 40, 40) // Środek (350, 170), średnica 40

				p.fill(0) // Czarna źrenica
				p.noStroke()
				p.ellipse(350, 170, 20, 20) // Środek (350, 170), średnica 15
			} else {
				// Oczy wersja 3
				// lewe oko
				p.noFill() // Oko bez wypełnienia
				p.stroke(100, 150, 255) // Niebieska obramówka (naturalny niebieski kolor)
				p.strokeWeight(4) // Grubość obramówki
				p.ellipse(250, 170, 40, 40) // Środek (250, 170), średnica 40

				p.fill(0) // Czarna źrenica
				p.noStroke()
				p.ellipse(250, 170, 25, 25) // Środek (250, 170), średnica 15

				// prawe oko
				p.noFill() // Oko bez wypełnienia
				p.stroke(100, 150, 255) // Niebieska obramówka (naturalny niebieski kolor)
				p.strokeWeight(4) // Grubość obramówki
				p.ellipse(350, 170, 40, 40) // Środek (350, 170), średnica 40

				p.fill(0) // Czarna źrenica
				p.noStroke()
				p.ellipse(350, 170, 25, 25) // Środek (350, 170), średnica 15
			}

			//linia między twarza a legenda
			p.stroke(0)
			p.strokeWeight(1)
			p.line(0, 500, 600, 500)

			// p.line(300, 0, 300, 500)
			// p.line(0, 250, 600, 250)
		}
	}

	useEffect(() => {
		const updatedAssignments = assignMeanToQuantile(columnStatistics)
		setQuantileAssignments(updatedAssignments)
	}, [columnStatistics])

	return (
		<div className='p-8 bg-backgroundColor wrapper extra-padding'>
			<SectionTitle title='Twarze Chernoffa' />
			<div className='w-full flex justify-center items-center'>
				<ReactP5Wrapper sketch={sketch} />
			</div>
		</div>
	)
}
