import axios from 'axios';
import { useCallback, useState } from 'react';

export const useHttp = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const request = useCallback(async (url, method = 'get', body = null, headers = {}) => {
      setLoading(true)

      try {
         const response = await axios[method](url,
            body,
            headers
         )

         setLoading(false)

         return response.data
      } catch (error) {
         setLoading(false)
         setError(error.response.data.message)
         //console.log('useHttp: ', error.response.data.message || error.message)
         throw error
      }
   }, [])

   const clearError = useCallback(() => setError(null), [])

   return {loading, error, request, clearError}
}