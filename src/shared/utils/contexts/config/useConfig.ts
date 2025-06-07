import { ConfigContext } from './ConfigContext'
import { useContext } from 'react'

export const useConfig = () => useContext(ConfigContext)
