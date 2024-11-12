'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface ProjectDataContextType {
    projectName: string
    excelData: any[]
    setProjectName: (name: string) => void
    setExcelData: (data: any[]) => void
}

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined)

export const ProjectDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectName, setProjectName] = useState<string>('')
    const [excelData, setExcelData] = useState<any[]>([])

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedProjectName = localStorage.getItem('projectName')
        const storedExcelData = localStorage.getItem('excelData')

        if (storedProjectName) {
            setProjectName(storedProjectName)
        }
        if (storedExcelData) {
            setExcelData(JSON.parse(storedExcelData))
        }
    }, [])

    // Save data to localStorage when projectName or excelData changes
    useEffect(() => {
        localStorage.setItem('projectName', projectName)
        localStorage.setItem('excelData', JSON.stringify(excelData))
    }, [projectName, excelData])

    return (
        <ProjectDataContext.Provider value={{ projectName, excelData, setProjectName, setExcelData }}>
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
