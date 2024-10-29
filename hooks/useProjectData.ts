import { useState } from 'react'

interface ProjectData {
    projectName: string
    excelData: any[]
}

const useProjectData = () => {
    const [projectName, setProjectName] = useState<string>('')
    const [excelData, setExcelData] = useState<any[]>([])
    const [projectNameError, setProjectNameError] = useState<boolean>(false)
    const [excelDataError, setExcelDataError] = useState<boolean>(false)

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

    return {
        projectName,
        setProjectName,
        excelData,
        setExcelData,
        projectNameError,
        excelDataError,
        validateInputs,
    }
}

export default useProjectData
