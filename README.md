# qhackweb

npm run
    "test": "echo \"Error: no test specified\" && exit 1",
    "sass": "sass --watch scss/qhack.scss:css/qhack.css",
    "build": "browserify main.js --debug | exorcist bundle.js.map > bundle.js",
    "watch": "watchify main.js -o 'exorcist bundle.js.map > bundle.js' --debug --verbose",
    "start": "beefy bundle.js"
