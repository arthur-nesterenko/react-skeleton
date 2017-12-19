'use strict';



const isProd = process.env.NODE_ENV === 'production';



module.exports = {
    port           : 8080,
    host           : 'localhost',
    SERVER_API     : "localhost:5000/api",


    get publicPath () {
        return `http://${this.host}:${this.port}/`;
    },

};