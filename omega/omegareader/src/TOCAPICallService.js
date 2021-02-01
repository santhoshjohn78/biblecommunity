
import Config from './Config';

class TOCAPICallService{
    constructor(){
        this.config = new Config();
        this.url = this.config.VTOC_URL;
    }

    getToc(){
        return fetch(this.url,{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
    }
}

export default new TOCAPICallService();