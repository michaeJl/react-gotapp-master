export default class GotService {
    constructor() {
        this.__apiBase = 'https://www.anapioficeandfire.com/api'
    }
    getResource = async (url) => {
        const res = await fetch(`${this.__apiBase}${url}`);

        if  (!res.ok){
            throw new Error(`Could not fetch ${url} recieved ${res.status}`)
        }
        return await res.json();
    }
    getAllCaracters = async () => {
        const res = await this.getResource('/characters?page=5');
        return res.map(this._transformCaracter);
    }
    getCaracter = async (id)=>{
        let res = await this.getResource(`/characters/${id}`);
        return this._transformCaracter(res);
    }
    getAllHouses = async ()=>{
        const res = await this.getResource(`/houses/`);
        console.log(res);
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }
    getAllBooks = async () =>{
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    getBook = async (id) =>{
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }

    _transform =(res)=>{
        let c = {};
        for(let key in res){
        if (res[key]==='' || res[key][0]===''){
            res[key] = 'no Data :(' 
            c[key] = res[key]
        } else {c[key]  = res[key]}
        }
        return c;
    }

    setId = (item)=>{
        return (item.url).match(/[0-9]/g).reduce((a,b) => (a + b + ''));
    }
    
    _transformCaracter = (char)=>{
        char = this._transform(char);
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: this.setId(char)
        }
    }
    _transformHouse =(house)=>{
        house = this._transform(house);
        return{
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            id: this.setId(house)
        }
    }
    _transformBook=(book)=>{
        book = this._transform(book);
        return{
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            id: this.setId(book)
        }
    }
}
