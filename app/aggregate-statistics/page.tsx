'use client'
import { useEffect, useState } from 'react'
import { useProjectData } from '@/contexts/ProjectDataContext'
import Navbar from '@/components/Navbar'
import SectionTitle from '@/components/UI/SectionTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalculator,
  faChartBar,
  faRulerVertical,
  faBalanceScale,
  faArrowUp,
  faArrowDown,
  faCrown,
  faSlash,
  faMountain,
} from '@fortawesome/free-solid-svg-icons'
import {
  mean,
  standardDeviation,
  median,
  modeFast as mode,
  min,
  max,
  sampleSkewness as skewness,
  sampleKurtosis as kurtosis,
  quantileSorted,
} from 'simple-statistics'

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

export default function StatystykiAgregujące() {
  const { excelData, setColumnStatistics } = useProjectData()
  const [statistics, setStatistics] = useState<Record<string, ColumnStatistics>>({})

  const calculateStatistics = (columnData: number[]): ColumnStatistics => {
    if (columnData.length === 0) {
      return {
        mean: null,
        stdDev: null,
        median: null,
        mode: null,
        min: null,
        max: null,
        skewness: null,
        kurtosis: null,
        quantiles: null,
      }
    }

    const sortedData = [...columnData].sort((a, b) => a - b)

    return {
      mean: mean(columnData),
      stdDev: standardDeviation(columnData),
      median: median(sortedData),
      mode: mode(columnData),
      min: min(columnData),
      max: max(columnData),
      skewness: skewness(columnData),
      kurtosis: kurtosis(columnData),
      quantiles: [
        quantileSorted(sortedData, 0.25),
        quantileSorted(sortedData, 0.5),
        quantileSorted(sortedData, 0.75),
      ],
    }
  }

  useEffect(() => {
    if (excelData.length > 0) {
      const newStatistics: Record<string, ColumnStatistics> = {}

      const numericColumns = Object.keys(excelData[0]).filter(
        (key, index) => index !== 0 && typeof excelData[0][key] === 'number'
      )

      numericColumns.forEach(column => {
        const columnData = excelData.map(row => row[column]).filter(value => typeof value === 'number') as number[]
        newStatistics[column] = calculateStatistics(columnData)
      })

      setStatistics(newStatistics)
      setColumnStatistics(newStatistics)
    }
  }, [excelData, setColumnStatistics])

  return (
    <>
      <Navbar />
      <div className='p-8 bg-backgroundColor wrapper extra-padding'>
        <SectionTitle title='Statystyki Agregujące' />
        <div className='flex flex-row justify-center items-center flex-wrap gap-8'>
          {Object.entries(statistics).map(([column, stats]) => (
            <div
              key={column}
              className='flex flex-col justify-between w-[350px] p-6 bg-white shadow-lg rounded-lg border border-secondaryColor text-black'
            >
              <h2 className='text-lg font-bold text-mainColor mb-2'>{column}</h2>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faCalculator} className='text-accentColor mr-2 w-4' />
                  <span><strong>Średnia:</strong> {stats.mean?.toFixed(2)}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faRulerVertical} className='text-accentColor mr-2 w-4' />
                  <span><strong>Odchylenie standardowe:</strong> {stats.stdDev?.toFixed(2)}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faBalanceScale} className='text-accentColor mr-2 w-4' />
                  <span><strong>Mediana:</strong> {stats.median?.toFixed(2)}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faCrown} className='text-accentColor mr-2 w-4' />
                  <span><strong>Dominanta:</strong> {stats.mode !== null ? stats.mode.toString() : 'Brak'}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faArrowDown} className='text-accentColor mr-2 w-4' />
                  <span><strong>Wartość min:</strong> {stats.min}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faArrowUp} className='text-accentColor mr-2 w-4' />
                  <span><strong>Wartość max:</strong> {stats.max}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faSlash} className='text-accentColor mr-2 w-4' />
                  <span><strong>Skośność:</strong> {stats.skewness?.toFixed(2)}</span>
                </li>
                <li className='flex items-center'>
                  <FontAwesomeIcon icon={faMountain} className='text-accentColor mr-2 w-4' />
                  <span><strong>Kurtoza:</strong> {stats.kurtosis?.toFixed(2)}</span>
                </li>
                {stats.quantiles && (
                  <>
                    <li className='flex items-center'>
                      <FontAwesomeIcon icon={faChartBar} className='text-accentColor mr-2 w-4' />
                      <span><strong>Kwantyl 25%:</strong> {stats.quantiles[0].toFixed(2)}</span>
                    </li>
                    <li className='flex items-center'>
                      <FontAwesomeIcon icon={faChartBar} className='text-accentColor mr-2 w-4' />
                      <span><strong>Kwantyl 50%:</strong> {stats.quantiles[1].toFixed(2)}</span>
                    </li>
                    <li className='flex items-center'>
                      <FontAwesomeIcon icon={faChartBar} className='text-accentColor mr-2 w-4' />
                      <span><strong>Kwantyl 75%:</strong> {stats.quantiles[2].toFixed(2)}</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
