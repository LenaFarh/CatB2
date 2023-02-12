const configApi = {
    url: 'https://cats.petiteweb.dev/api/single/pesi',
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
    }
    }
    
     class Api {
        constructor(config){
            this._url = config.url;
            this._headers = config.headers;
        }

        _onResponce(res) {
return res.ok ? res.json() : Promise.reject({...res, message: 'error'})
        }

        getAllCats(){
           return fetch(`${this._url}/show`, {
                    method: 'GET'   
            }).then(this._onResponce); 
        }

        getAllCatsIds(){
            // отобразить все возможные айди котиков
           return fetch(`${this._url}/ids`, {
             method: 'GET'   
            }).then(this._onResponce); 
        }
        
        getCatById(id){
            //отобразить конкретного котика
          return  fetch(`${this._url}/show/${id}`, {
             method: 'GET'   
            }).then(this._onResponce); 
        }
        addNewCat(body){
        //добавить котика
        return fetch(`${this._url}/add`, {
        method: 'POST',  
        headers: this._headers,
        body: JSON.stringify(body)
       }).then(this._onResponce); 
    }
    updateCatById(id, data){
        //изменить информацию о котике
        return fetch(`${this._url}/update/${id}`, {
        method: 'PUT', 
        headers: this._headers,
        body: JSON.stringify(data)  
        }).then(this._onResponce); 
    }
    
    deleteCatsId(id){
        // удалить котика из базы данных
       return fetch(`${this._url}/delete/${id}`, {
         method: 'DELETE'   
        }).then(this._onResponce); 
    }
    }
    
    export const api = new Api(configApi);
    console.log(api);
    
    //const newCat = {
     //   id: 1674032335402,
      //  name: 'Timofey',
       // favorite: false,
       // rate: 5,
       // age: 3,
       // description: 'https://http.cat/203',
       // image: 'Неофициальная информация'
    //}
    
    //const updateCat = {
       // id: 1674032143147,
       // name: "Murzikupdate",
        //favorite: true,
       // rate: 9,
       // age: 2,
       // description: "Ошибка подключения к сети",
       // image: "https://http.cat/599"
    //}
    
    //api.getAllCats()
    //api.getAllCatsIds()
    //api.getCatById(1674041181286)
    //api.updateCatById(1674032143147,updateCat)
    //api.addNewCat(newCat)
    //api.deleteCatsId(1674032335402)
    