import APIUtils from "../common/APIUtils"
import { API_URL } from "../env"


export default class NewsAPI {

    static module = "news"


    static async getNews(category = undefined, quantity = undefined){
        let query = {}
        if(category) query.category = category
        if(quantity) query.quantity = quantity

        try{
            const response = await APIUtils.GET(`${API_URL}/${NewsAPI.module}/`, query)
            if(response.ok){
                return response.json()
            }
            return undefined
        }
        catch (e) {
            console.log(e)
            return undefined
        }
    }
}