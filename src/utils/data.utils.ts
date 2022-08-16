import axios from 'axios'

export const getWeather = async<T> (url: string): Promise<T> => {
   const { data }  = await axios.get(url)
   return data
}
