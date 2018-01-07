import Observable from './Observable';

class Store {

    Data = {}
    status = ''

    fetchData = (serverLink) => {
        // const { Data, status } = this
        const xhr = new XMLHttpRequest();
        xhr.open('Get', serverLink + 'search', true)
        console.log(serverLink + 'search')
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.status = xhr.status
                if (xhr.status === 200) {
                    Object.assign(this.Data, JSON.parse(xhr.response))
                    // console.log(this.status)
                    // console.log(this.Data)
                    // return this.Data
                }
            }
            // return this.status
            // console.log(this.status)
        }
        xhr.send()
    }

    getData(x){
        return(this[`${x}`])
    }


}
export default new Store()