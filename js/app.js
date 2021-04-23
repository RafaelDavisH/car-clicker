// Model === Data , View === UI, Controller === Brain - 


//Model
const model = {
    currentCar: null,
    cars: [
        {
            clickCount: 0,
            name: 'Coupe Maserati',
            imgSrc: 'img/black-convertible-coupe.jpg',
        },
        {
            clickCount: 0,
            name: 'Camaro SS 1LE',
            imgSrc: 'img/chevrolet-camaro.jpg',
        },
        {
            clickCount: 0,
            name: 'Dodger Charger 1970',
            imgSrc: 'img/dodge-charger.jpg',
        },
        {
            clickCount: 0,
            name: 'Ford Mustang 1966',
            imgSrc: 'img/ford-mustang.jpg',
        },
        {
            clickCount: 0,
            name: '190 SL Roadster 1962',
            imgSrc: 'img/mercedes-benz.jpg',
        },
    ],
};

// Controller
const controller = {
    init() {
        // set our current car to the first one in the list
        model.currentCar = model.cars[0];

        // tell our views to initialize
        carListView.init();
        carView.init();
    },

    getCurrentCar() {
        return model.currentCar;
    },

    getCars() {
        return model.cars;
    },

    // set the currently-selected car to the object passed in
    setCurrentCar(car) {
        model.currentCar = car;
    },

    // increments the counter for the currently-selected car
    incrementCounter() {
        model.currentCar.clickCount++;
        carView.render();
    },
};

// Views
const carView = {
    init() {
        // store pointer to our DOM elements for easy access later
        this.carElem = document.getElementById('car');
        this.carNameElem = document.getElementById('car-name');
        this.carImageElem = document.getElementById('car-img');
        this.countElem = document.getElementById('car-count');

        // on click increment the current car's counter
        this.carImageElem.addEventListener('click', this.clickHandler);

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    clickHandler() {
        return controller.incrementCounter();
    },

    render() {
        // update the DOM elements with values from the current car
        const currentCar = controller.getCurrentCar();
        this.countElem.textContent = currentCar.clickCount;
        this.carNameElem.textContent = currentCar.name;
        this.carImageElem.src = currentCar.imgSrc;
        this.carImageElem.style.cursor = 'pointer';
    },
};

const carListView = {
    init() {
        // store the DOM element for easy access later
        this.carListElem = document.getElementById('car-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render() {
        let car;
        let elem;
        let i;
        // get the cars we'll be rendering from the controller
        const cars = controller.getCars();

        // empty the car list
        this.carListElem.innerHTML = '';

        // loop over the cars
        for(let i = 0; i < cars.length; i++) {
            // this is the car we've currently looping over
            car = cars[i];

            // make a new car list item and set its text
            elem = document.createElement('li');
            elem.className = 'list-group-item d-flex justify-content-between lh-condensed';
            elem.style.cursor = 'pointer';
            elem.textContent = car.name;
            elem.addEventListener(
                'click',
                (function(carCopy) {
                  return function() {
                    controller.setCurrentCar(carCopy);
                    carView.render();
                  };
                })(car)
              );
                // finally, add the element to the list
                this.carListElem.appendChild(elem);
        }
    },
};

// Let's goo!
controller.init();