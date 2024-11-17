'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

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

interface ProjectDataContextType {
    projectName: string
    excelData: any[]
    columnStatistics: Record<string, ColumnStatistics>
    setProjectName: (name: string) => void
    setExcelData: (data: any[]) => void
    setColumnStatistics: (statistics: Record<string, ColumnStatistics>) => void
}

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined)

export const ProjectDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectName, setProjectName] = useState<string>('')
    const [excelData, setExcelData] = useState<any[]>([])
    const [columnStatistics, setColumnStatistics] = useState<Record<string, ColumnStatistics>>({})

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedProjectName = localStorage.getItem('projectName')
        const storedExcelData = localStorage.getItem('excelData')
        const storedColumnStatistics = localStorage.getItem('columnStatistics')

        if (storedProjectName) {
            setProjectName(storedProjectName)
        }
        if (storedExcelData) {
            setExcelData(JSON.parse(storedExcelData))
        }
        if (storedColumnStatistics) {
            setColumnStatistics(JSON.parse(storedColumnStatistics))
        }
    }, [])

    // Save data to localStorage when projectName, excelData, or columnStatistics change
    useEffect(() => {
        localStorage.setItem('projectName', projectName)
        localStorage.setItem('excelData', JSON.stringify(excelData))
        localStorage.setItem('columnStatistics', JSON.stringify(columnStatistics))
    }, [projectName, excelData, columnStatistics])

    return (
        <ProjectDataContext.Provider value={{ projectName, excelData, columnStatistics, setProjectName, setExcelData, setColumnStatistics }}>
            {children}
        </ProjectDataContext.Provider>
    )
}

export const useProjectData = () => {
    const context = useContext(ProjectDataContext)
    if (context === undefined) {
        throw new Error('useProjectData must be used within a ProjectDataProvider')
    }
    return context
}
