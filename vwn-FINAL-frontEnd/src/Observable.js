class Observable {

  observables = []

  subscribe(observable, observer) {
    this.observables[`${observable}`].observers.push(observer)
  }

  unSubscribe(observable, _observer) {
    this.observables[`${observable}`].observers = this.observables[`${observable}`].observers.filter(observer => observer !== _observer)
  }

  newStatefullObservable(newObservable) {
    this.observables[`${newObservable}`] = {
      data: {},
      observers: []
    }
  }

  updateState(observable, stateName, stateValue) {
    this.observables[`${observable}`].data[`${stateName}`] = stateValue
    this.observables[`${observable}`].observers.map(observer => {
      observer(this.observables[`${observable}`].data)
      return undefined
    })
  }

  setHash(URLHead, values, toggle) {
    let URLArray = window.location.hash.slice(1).split(',')
    if (typeof (values) === 'number') {
      let id = URLHead + values
      if (!toggle) {
        URLArray = URLArray.filter(e => e !== id)
      } else {
        if (URLArray.indexOf(id) === -1) {
          URLArray.push(id)
        } else {
          URLArray = URLArray.filter(val => val !== id)
        }
      }
    } else {
      let arrayOfValues = []
      this.hashURL = []
      for (const value in values) {
        if (values[value]) {
          if (arrayOfValues.indexOf(URLHead + value) === -1) {
            arrayOfValues.push(URLHead + value)
          }
          for (const id in arrayOfValues) {
            if (URLArray.indexOf(arrayOfValues[id]) === -1) {
              URLArray.push(arrayOfValues[id])
            }
          }
        } else {
          let toBeRemoved = URLHead + value
          URLArray = URLArray.filter(val => val !== toBeRemoved)
        }
      }
    }
    window.location.hash = URLArray.join(',')
  }

  getHash(URLHead) {
    let resultArray = {}
    let URLArray = window.location.hash.slice(1).split(",")
    URLArray.slice(1).map((x) => {
      if (x[0] === URLHead) {
        x = x.substr(1)
        resultArray[x] = true
      }
      return undefined
    })
    return (resultArray)
  }
}

export default new Observable();